import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTopicsByChapter, getUserProgress } from "../services/api";
import Navbar from "../components/layout/Navbar";
import TopicCheckbox from "../components/layout/TopicCheckbox";

const TopicsPage = () => {
  const { subjectId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [topics, setTopics] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch topics
        const topicsData = await getTopicsByChapter(chapterId);
        setTopics(topicsData);

        if (topicsData.length > 0) {
          const topicIds = topicsData.map((topic) => topic._id);
          const progressData = await getUserProgress(topicIds);

          // Create progress mapping
          const progressMap = {};
          let completed = 0;
          progressData.forEach((item) => {
            progressMap[item.topic] = item.isCompleted;
            if (item.isCompleted) completed++;
          });

          setProgressMap(progressMap);
          setCompletedCount(completed);
        }

        setChapter({ _id: chapterId, name: "Chapter" });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load topics. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chapterId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to={`/subjects/${subjectId}/chapters`}
            className="text-blue-600 hover:underline"
          >
            ← Back to Chapters
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {chapter ? chapter.name : "Chapter"} Topics
          </h1>
          <p className="text-gray-600">
            Check off topics as you complete them to track your progress.
          </p>
          {topics.length > 0 && (
            <p className="mt-2 text-lg font-semibold text-primary">
              Progress: {completedCount}/{topics.length}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        ) : topics.length === 0 ? (
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>No topics found for this chapter.</span>
          </div>
        ) : (
          
          <div className="card bg-base-100 shadow-xl">
            
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>
                        Status
                      </th>
                      <th>Topic Name</th>
                      <th>Video</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topics.map((topic, index) => (
                      <TopicCheckbox
                        key={topic._id}
                        topic={topic}
                        initialIsCompleted={progressMap[topic._id] || false}
                        index={index + 1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicsPage;