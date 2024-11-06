import { Router } from 'express';
import { SeasonController } from '../controllers/season.controller';
import { authenticate } from '../middleware/auth';
import { validateSeason } from '../middleware/validation';

const router = Router();
const seasonController = new SeasonController();

// Public routes
router.get('/', seasonController.getAllSeasons);
router.get('/:id', seasonController.getSeasonById);
router.get('/:id/standings', seasonController.getSeasonStandings);
router.get('/:id/schedule', seasonController.getSeasonSchedule);

// Protected routes
router.use(authenticate);
router.post('/', validateSeason, seasonController.createSeason);
router.put('/:id', validateSeason, seasonController.updateSeason);
router.delete('/:id', seasonController.deleteSeason);
router.post('/:id/teams', seasonController.registerTeam);
router.delete('/:id/teams/:teamId', seasonController.removeTeam);

export const seasonRoutes = router;