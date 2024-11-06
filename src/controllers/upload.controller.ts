import { Request, Response } from 'express';
import { UploadService } from '../services/upload.service';
import { logger } from '../utils/logger';

export class UploadController {
  private uploadService = new UploadService();

  public uploadImage = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file provided'
        });
      }

      const folder = `images/${req.user.id}`;
      const url = await this.uploadService.uploadImage(req.file, folder);

      res.json({
        success: true,
        data: { url }
      });
    } catch (error) {
      logger.error('Error in uploadImage:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  public uploadDocument = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file provided'
        });
      }

      const folder = `documents/${req.user.id}`;
      const key = await this.uploadService.uploadDocument(req.file, folder);

      res.json({
        success: true,
        data: { key }
      });
    } catch (error) {
      logger.error('Error in uploadDocument:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  public deleteFile = async (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      await this.uploadService.deleteFile(key);

      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } catch (error) {
      logger.error('Error in deleteFile:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  public getSignedUrl = async (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      const { expiresIn } = req.query;

      const url = this.uploadService.getSignedUrl(
        key,
        expiresIn ? parseInt(expiresIn as string) : undefined
      );

      res.json({
        success: true,
        data: { url }
      });
    } catch (error) {
      logger.error('Error in getSignedUrl:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
}