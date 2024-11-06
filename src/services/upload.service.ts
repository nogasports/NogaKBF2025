import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { logger } from '../utils/logger';

export class UploadService {
  private s3Client: S3Client;
  private readonly allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  private readonly allowedDocTypes = ['application/pdf'];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }

  public async uploadImage(file: Express.Multer.File, folder: string): Promise<string> {
    try {
      if (!this.allowedImageTypes.includes(file.mimetype)) {
        throw new Error('Invalid file type. Only JPEG, PNG and WebP images are allowed.');
      }

      if (file.size > this.maxFileSize) {
        throw new Error('File size exceeds 5MB limit.');
      }

      // Process image with sharp
      const processedImage = await sharp(file.buffer)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .toBuffer();

      const key = `${folder}/${uuidv4()}.webp`;

      await this.s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: processedImage,
        ContentType: 'image/webp',
        ACL: 'public-read',
        Metadata: {
          'original-filename': file.originalname
        }
      }));

      logger.info(`Image uploaded successfully to ${key}`);
      return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;
    } catch (error) {
      logger.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  public async uploadDocument(file: Express.Multer.File, folder: string): Promise<string> {
    try {
      if (!this.allowedDocTypes.includes(file.mimetype)) {
        throw new Error('Invalid file type. Only PDF documents are allowed.');
      }

      if (file.size > this.maxFileSize) {
        throw new Error('File size exceeds 5MB limit.');
      }

      const key = `${folder}/${uuidv4()}-${file.originalname}`;

      await this.s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'private',
        Metadata: {
          'original-filename': file.originalname
        }
      }));

      logger.info(`Document uploaded successfully to ${key}`);
      return key; // Return only the key for private documents
    } catch (error) {
      logger.error('Error uploading document:', error);
      throw new Error('Failed to upload document');
    }
  }

  public async deleteFile(key: string): Promise<void> {
    try {
      await this.s3Client.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key
      }));

      logger.info(`File deleted successfully: ${key}`);
    } catch (error) {
      logger.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }

  public getSignedUrl(key: string, expiresIn: number = 3600): string {
    // Implementation for generating signed URLs for private files
    return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}?signed=${expiresIn}`;
  }
}