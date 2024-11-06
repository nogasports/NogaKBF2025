import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { upload } from '../middleware/upload';
import { authenticate } from '../middleware/auth';

const router = Router();
const uploadController = new UploadController();

router.use(authenticate);

// Image uploads
router.post(
  '/image',
  upload.single('image'),
  uploadController.uploadImage
);

// Document uploads
router.post(
  '/document',
  upload.single('document'),
  uploadController.uploadDocument
);

// Delete file
router.delete('/:key', uploadController.deleteFile);

// Get signed URL for private files
router.get('/signed-url/:key', uploadController.getSignedUrl);

export const uploadRoutes = router;