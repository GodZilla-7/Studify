import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getChaptersBySubject } from '../services/api';
import Navbar from '../components/layout/Navbar';
import ChapterCard from '../components/layout/ChapterCard';

const ChaptersPage = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const data = await getChaptersBySubject(subjectId);
        setChapters(data);
        if (data.length > 0 && data[0].subject) {
          setSubject({ _id: data[0].subject, name: 'Subject' });
        }
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setError('Failed to load chapters. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchChapters();
  }, [subjectId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {subject ? subject.name : 'Subject'} Chapters
          </h1>
          <p className="text-gray-600">
            Select a chapter to view topics and track your progress.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : chapters.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            No chapters found for this subject.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter._id} chapter={chapter} subjectId={subjectId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChaptersPage;