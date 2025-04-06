import UserNotes from '../models/UserNotes.js';
import Topic from '../models/Topic.js';

// @desc    Get user notes for a topic
// @route   GET /api/notes/:topicId
// @access  Private
export const getUserNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const { topicId } = req.params;

    let userNotes = await UserNotes.findOne({ user: userId, topic: topicId });
    
    if (!userNotes) {
      // If no notes exist yet, return an empty object with the topic ID
      return res.json({ topic: topicId, notes: '' });
    }
    
    res.json(userNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user notes for a topic
// @route   PUT /api/notes/:topicId
// @access  Private
export const updateUserNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const { topicId } = req.params;
    const { notes } = req.body;

    if (!notes && notes !== '') {
      return res.status(400).json({ message: 'Notes content is required' });
    }

    // Find the topic to make sure it exists
    const topicExists = await Topic.findById(topicId);
    if (!topicExists) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Update or create user notes
    const userNotes = await UserNotes.findOneAndUpdate(
      { user: userId, topic: topicId },
      { notes },
      { new: true, upsert: true }
    );

    res.json(userNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};