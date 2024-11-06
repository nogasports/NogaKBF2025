import { Router } from 'express';
import { MatchController } from '../controllers/match.controller';
import { authenticate } from '../middleware/auth';
import { validateMatch } from '../middleware/validation';

const router = Router();
const matchController = new MatchController();

// Public routes
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);
router.get('/:id/stats', matchController.getMatchStats);
router.get('/live', matchController.getLiveMatches);

// Protected routes
router.use(authenticate);
router.post('/', validateMatch, matchController.createMatch);
router.put('/:id', validateMatch, matchController.updateMatch);
router.delete('/:id', matchController.deleteMatch);
router.post('/:id/start', matchController.startMatch);
router.post('/:id/end', matchController.endMatch);
router.post('/:id/score', matchController.updateScore);
router.post('/:id/officials', matchController.assignOfficials);

export const matchRoutes = router;