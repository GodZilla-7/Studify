import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProgress, getTopicsByChapter } from '../../services/api'; 
const ChapterCard = ({ chapter, subjectId }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // First get all topics for this chapter
        const topics = await getTopicsByChapter(chapter._id);
        
        if (topics.length === 0) {
          setProgress({ completed: 0, total: 0, percentage: 0 });
          return;
        }
        
        // Get progress data for all topic IDs
        const topicIds = topics.map(topic => topic._id);
        const progressData = await getUserProgress(topicIds);
        
        // Calculate completion stats
        const completedTopics = progressData.filter(item => item.isCompleted).length;
        const totalTopics = topics.length;
        const completionPercentage = totalTopics > 0 
          ? Math.round((completedTopics / totalTopics) * 100) 
          : 0;
        
        setProgress({
          completed: completedTopics,
          total: totalTopics,
          percentage: completionPercentage
        });
      } catch (error) {
        console.error('Error fetching chapter progress:', error);
        setProgress({ completed: 0, total: 0, percentage: 0 });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProgress();
  }, [chapter._id]);

  return (
    <Link
      to={`/subjects/${subjectId}/chapters/${chapter._id}/topics`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-bold text-blue-600 mb-2">{chapter.name}</h3>
      {chapter.description && <p className="text-gray-600 mb-4">{chapter.description}</p>}
      
      {/* Progress section */}
      {loading ? (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div className="bg-gray-400 h-2.5 rounded-full animate-pulse w-full"></div>
        </div>
      ) : progress && progress.total > 0 ? (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1 text-sm">
            
            <span className="text-gray-700">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic mt-4">No topics available</p>
      )}
    </Link>
  );
};

export default ChapterCard;