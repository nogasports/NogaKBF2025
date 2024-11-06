import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const teamController = new TeamController();

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.post('/', authenticate, teamController.createTeam);
router.put('/:id', authenticate, teamController.updateTeam);
router.delete('/:id', authenticate, teamController.deleteTeam);

export const teamRoutes = router;