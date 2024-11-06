export interface UploadedFile {
  url: string;
  key: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

export interface UploadConfig {
  maxFileSize: number;
  allowedImageTypes: string[];
  allowedDocumentTypes: string[];
  imageResizeOptions: {
    width: number;
    height: number;
    fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  };
}