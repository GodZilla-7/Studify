import UserProgress from '../models/UserProgress.js';

// @desc    Get user progress for topics
// @route   GET /api/progress
// @access  Private
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { topicIds } = req.query;

    let query = { user: userId };

    if (topicIds) {
      const topicIdArray = topicIds.split(',');
      query.topic = { $in: topicIdArray };
    }

    const progress = await UserProgress.find(query);
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user progress for a topic
// @route   POST /api/progress
// @access  Private
export const updateUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { topicId, isCompleted } = req.body;

    if (!topicId) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    const progress = await UserProgress.findOneAndUpdate(
      { user: userId, topic: topicId },
      { isCompleted, completedAt: isCompleted ? Date.now() : null },
      { new: true, upsert: true }
    );

    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
