import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateLogin, validateRegister } from '../middleware/validation';

const router = Router();
const authController = new AuthController();

router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

export const authRoutes = router;