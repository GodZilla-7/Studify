import express from 'express';
import { getUserProgress, updateUserProgress } from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getUserProgress);
router.post('/', protect, updateUserProgress);

export default router;