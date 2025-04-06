import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from '../models/Subject.js';
import Chapter from '../models/Chapter.js';
import Topic from '../models/Topic.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Subjects data
const subjects = [
  {
    name: 'Theory of Computation',
    semester: 4,
    description: 'Study of formal languages, automata, and computation models',
    bookLink: 'https://www.example.com/theory-of-computation-book',
    pyqLink: 'https://www.example.com/theory-of-computation-pyq',
    iconLink: 'https://www.example.com/icons/theory-of-computation.png'
  },
  {
    name: 'Data Communication',
    semester: 4,
    description: 'Fundamentals of data transmission and networking',
    bookLink: 'https://www.example.com/data-communication-book',
    pyqLink: 'https://www.example.com/data-communication-pyq',
    iconLink: 'https://www.example.com/icons/data-communication.png'
  },
  {
    name: 'Software Engineering',
    semester: 4,
    description: 'Principles and methodologies of software development',
    bookLink: 'https://www.example.com/software-engineering-book',
    pyqLink: 'https://www.example.com/software-engineering-pyq',
    iconLink: 'https://www.example.com/icons/software-engineering.png'
  },
  {
    name: 'Computer Structure & Organization',
    semester: 4,
    description: 'Understanding the architecture of computer systems',
    bookLink: 'https://www.example.com/cso-book',
    pyqLink: 'https://www.example.com/cso-pyq',
    iconLink: 'https://www.example.com/icons/cso.png'
  },
  {
    name: 'Algorithm Design',
    semester: 4,
    description: 'Study of algorithmic techniques and problem-solving strategies',
    bookLink: 'https://www.example.com/algorithm-design-book',
    pyqLink: 'https://www.example.com/algorithm-design-pyq',
    iconLink: 'https://www.example.com/icons/algorithm-design.png'
  }
];

// Function to generate chapters
const generateChapters = (subjectId, subjectName) => {
  return Array.from({ length: 5 }, (_, i) => ({
    name: `${subjectName} Chapter ${i + 1}`,
    subject: subjectId,
    description: `Detailed study of ${subjectName} concepts in chapter ${i + 1}`,
    pyqLink: `https://www.example.com/${subjectName.toLowerCase()}-pyq-${i + 1}`
  }));
};

// Function to generate topics
const generateTopics = (chapterId, chapterName) => {
  return Array.from({ length: 6 + Math.floor(Math.random() * 2) }, (_, i) => ({
    name: `${chapterName} Topic ${i + 1}`,
    chapter: chapterId,
    description: `Understanding ${chapterName} concepts, topic ${i + 1}`,
    ytLink: `https://www.youtube.com/watch?v=dummy${i + 1}`
  }));
};

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await Subject.deleteMany({});
    await Chapter.deleteMany({});
    await Topic.deleteMany({});
    console.log('Cleared existing data');

    // Insert subjects
    const createdSubjects = await Subject.insertMany(subjects);
    console.log(`Inserted ${createdSubjects.length} subjects`);

    // Insert chapters and topics
    for (const subject of createdSubjects) {
      const chapters = generateChapters(subject._id, subject.name);
      const createdChapters = await Chapter.insertMany(chapters);
      console.log(`Inserted ${createdChapters.length} chapters for ${subject.name}`);

      for (const chapter of createdChapters) {
        const topics = generateTopics(chapter._id, chapter.name);
        await Topic.insertMany(topics);
        console.log(`Inserted ${topics.length} topics for ${chapter.name}`);
      }
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();
