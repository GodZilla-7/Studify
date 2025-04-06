// server/routes/topicRoutes.js
import express from 'express';
import { getTopicsByChapter } from '../controllers/topicController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getTopicsByChapter);


export default router;