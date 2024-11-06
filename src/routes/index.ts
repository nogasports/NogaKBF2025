import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { teamRoutes } from './team.routes';
import { playerRoutes } from './player.routes';
import { matchRoutes } from './match.routes';
import { officialRoutes } from './official.routes';
import { seasonRoutes } from './season.routes';
import { statsRoutes } from './stats.routes';
import { notificationRoutes } from './notification.routes';
import { fanRoutes } from './fan.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
router.use('/matches', matchRoutes);
router.use('/officials', officialRoutes);
router.use('/seasons', seasonRoutes);
router.use('/stats', statsRoutes);
router.use('/notifications', notificationRoutes);
router.use('/fans', fanRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export const routes = router;