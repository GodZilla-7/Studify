
// server/models/Subject.js
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  description: {
    type: String,
    trim: true
  },
  bookLink: {
    type: String,
    trim: true
  },
  pyqLink: {
    type: String,
    trim: true
  },
  iconLink:{
    type: String,
    trim: true
  }
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;