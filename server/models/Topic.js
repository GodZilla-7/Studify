import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  ytLink: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
});

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;