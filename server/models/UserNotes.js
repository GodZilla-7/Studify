import mongoose from 'mongoose';

const userNotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });

// Create a compound index for unique user-topic combinations
userNotesSchema.index({ user: 1, topic: 1 }, { unique: true });

const UserNotes = mongoose.model('UserNotes', userNotesSchema);
export default UserNotes;