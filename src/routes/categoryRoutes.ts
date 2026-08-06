import { Router } from 'express';
import * as controller from '../controllers/categoryController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(requireAuth);
router.route('/').post(controller.create).get(controller.getAll);
router.route('/:id').put(controller.update).delete(controller.remove);
export default router;
