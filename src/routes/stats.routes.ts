import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const statsController = new StatsController();

// Public routes
router.get('/leaderboard', statsController.getLeaderboard);
router.get('/team/:teamId', statsController.getTeamStats);
router.get('/player/:playerId', statsController.getPlayerStats);
router.get('/match/:matchId', statsController.getMatchStats);

// Protected routes
router.use(authenticate);
router.post('/match/:matchId/player/:playerId', statsController.recordPlayerStats);
router.put('/match/:matchId/player/:playerId', statsController.updatePlayerStats);

export const statsRoutes = router;