// server/routes/chapterRoutes.js
import express from 'express';
import { getChaptersBySubject } from '../controllers/chapterController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getChaptersBySubject);

export default router;

