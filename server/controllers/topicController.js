
// server/controllers/topicController.js
import Topic from '../models/Topic.js';

// @desc    Get topics by chapter
// @route   GET /api/topics
// @access  Private
export const getTopicsByChapter = async (req, res) => {
  try {
    const { chapterId } = req.query;
    
    if (!chapterId) {
      return res.status(400).json({ message: 'Chapter ID parameter is required' });
    }

    const topics = await Topic.find({ chapter: chapterId });
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};