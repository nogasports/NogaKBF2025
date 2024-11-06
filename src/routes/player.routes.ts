import { Router } from 'express';
import { PlayerController } from '../controllers/player.controller';
import { authenticate } from '../middleware/auth';
import { validatePlayer } from '../middleware/validation';

const router = Router();
const playerController = new PlayerController();

// Public routes
router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.get('/:id/stats', playerController.getPlayerStats);

// Protected routes
router.use(authenticate);
router.post('/', validatePlayer, playerController.createPlayer);
router.put('/:id', validatePlayer, playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);
router.post('/:id/transfer', playerController.transferPlayer);
router.put('/:id/status', playerController.updatePlayerStatus);

export const playerRoutes = router;