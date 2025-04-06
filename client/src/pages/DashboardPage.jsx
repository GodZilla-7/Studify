import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubjectsBySemester } from '../services/api';
import Navbar from '../components/layout/Navbar';
import SubjectCard from '../components/layout/SubjectCard';
import Clock from '../components/layout/Clock';
import Quotes from 'inspirational-quotes'; // Import package

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

    // Fetch a motivational quote from the package
    setQuote(Quotes.getQuote().text);
  }, [user.semester]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        {/* Motivational Quote Section */}
        <Clock/>
   
       
     

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : subjects.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            No subjects found for semester {user.semester}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map(subject => (
              <SubjectCard key={subject._id} subject={subject} />
            ))}
          </div>
        )}
           <p className="text-gray-600 mt-2">
          "{quote}"
          </p>
      </div>
    </div>
  );
};

export default DashboardPage;
