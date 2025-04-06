// server/controllers/subjectController.js
import Subject from '../models/Subject.js';

// @desc    Get subjects by semester
// @route   GET /api/subjects
// @access  Private
export const getSubjectsBySemester = async (req, res) => {
  try {
    const { semester } = req.query;
    
    if (!semester) {
      return res.status(400).json({ message: 'Semester parameter is required' });
    }

    const subjects = await Subject.find({ semester: Number(semester) });
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

