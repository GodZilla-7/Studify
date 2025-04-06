import express from 'express';
import Subject from '../models/Subject.js';
import Chapter from '../models/Chapter.js';
import Topic from '../models/Topic.js';

const router = express.Router();

// Add a subject
router.post('/subjects', async (req, res) => {
  try {
    const { name, semester, description, bookLink, pyqLink, iconLink } = req.body;
    const newSubject = new Subject({ name, semester, description, bookLink, pyqLink, iconLink });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error adding subject', error });
  }
});

// Delete a subject
router.delete('/subjects/:id', async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error });
  }
});

// Add a chapter
router.post('/chapters', async (req, res) => {
  try {
    const { name, subject, description } = req.body;
    const newChapter = new Chapter({ name, subject, description });
    await newChapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: 'Error adding chapter', error });
  }
});

// Delete a chapter
router.delete('/chapters/:id', async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chapter deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chapter', error });
  }
});

// Add a topic
router.post('/topics', async (req, res) => {
  try {
    const { name, chapter, description, ytLink, notes } = req.body;
    const newTopic = new Topic({ name, chapter, description, ytLink, notes });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: 'Error adding topic', error });
  }
});

// Delete a topic
router.delete('/topics/:id', async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting topic', error });
  }
});

export default router;
