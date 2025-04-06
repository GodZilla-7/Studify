// server/routes/subjectRoutes.js
import express from 'express';
import { getSubjectsBySemester } from '../controllers/subjectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getSubjectsBySemester);

export default router;