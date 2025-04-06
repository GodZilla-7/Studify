// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8960;


app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// API Routes

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/admin', adminRoutes);

// Start server


if (!process.env.VERCEL_ENV) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
export default app;