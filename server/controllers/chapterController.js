// server/controllers/chapterController.js
import Chapter from '../models/Chapter.js';

// @desc    Get chapters by subject
// @route   GET /api/chapters
// @access  Private
export const getChaptersBySubject = async (req, res) => {
  try {
    const { subjectId } = req.query;
    
    if (!subjectId) {
      return res.status(400).json({ message: 'Subject ID parameter is required' });
    }

    const chapters = await Chapter.find({ subject: subjectId });
    res.json(chapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
