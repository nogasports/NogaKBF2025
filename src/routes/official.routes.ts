import { Router } from 'express';
import { OfficialController } from '../controllers/official.controller';
import { authenticate } from '../middleware/auth';
import { validateOfficial } from '../middleware/validation';

const router = Router();
const officialController = new OfficialController();

// Public routes
router.get('/', officialController.getAllOfficials);
router.get('/:id', officialController.getOfficialById);

// Protected routes
router.use(authenticate);
router.post('/', validateOfficial, officialController.createOfficial);
router.put('/:id', validateOfficial, officialController.updateOfficial);
router.delete('/:id', officialController.deleteOfficial);
router.get('/:id/assignments', officialController.getOfficialAssignments);
router.post('/:id/assignments/accept', officialController.acceptAssignment);
router.post('/:id/assignments/decline', officialController.declineAssignment);

export const officialRoutes = router;