import { Router } from 'express';
import { FanController } from '../controllers/fan.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const fanController = new FanController();

router.use(authenticate);
router.get('/profile', fanController.getProfile);
router.put('/profile', fanController.updateProfile);
router.get('/favorites', fanController.getFavoriteTeams);
router.post('/favorites/:teamId', fanController.addFavoriteTeam);
router.delete('/favorites/:teamId', fanController.removeFavoriteTeam);
router.post('/matches/:matchId/vote', fanController.voteForMVP);
router.get('/matches/:matchId/votes', fanController.getMatchVotes);

export const fanRoutes = router;