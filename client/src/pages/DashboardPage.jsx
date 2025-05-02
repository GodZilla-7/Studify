import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubjectsBySemester } from '../services/api';
import Navbar from '../components/layout/Navbar';
import SubjectCard from '../components/layout/SubjectCard';
import Clock from '../components/layout/Clock';
import Quotes from 'inspirational-quotes';
import SearchBox from '../components/layout/Search';

const DashboardPage = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjectsBySemester(user.semester);
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setError('Failed to load subjects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
    setQuote(Quotes.getQuote().text);
  }, [user.semester]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        <Clock />
        
        <SearchBox />
        {loading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : error ? (
          <div className="alert alert-error shadow-lg">{error}</div>
        ) : subjects.length === 0 ? (
          <div className="alert alert-warning shadow-lg">
            No subjects found for semester {user.semester}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map(subject => (
              <SubjectCard key={subject._id} subject={subject} />
            ))}
          </div>
        )}
        <p className="text-gray-400 mt-2">"{quote}"</p>
      </div>
    </div>
  );
};

export default DashboardPage;
