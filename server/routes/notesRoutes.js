import express from 'express';
import { getUserNotes, updateUserNotes } from '../controllers/notesController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:topicId', protect, getUserNotes);
router.put('/:topicId', protect, updateUserNotes);

export default router;