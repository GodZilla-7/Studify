import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTopicsByChapter, getUserProgress } from "../services/api";
import Navbar from "../components/layout/Navbar";
import TopicCheckbox from "../components/layout/TopicCheckbox";
import SearchBox from "../components/layout/Search";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to={`/subjects/${subjectId}/chapters`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Chapters
          </Link>
        </div>
    

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {chapter ? chapter.name : "Chapter"} Topics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Check off topics as you complete them to track your progress.
          </p>
          {topics.length > 0 && (
            <p className="mt-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
              Progress: {completedCount}/{topics.length}
            </p>
          )}
        </div>
    <SearchBox/>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        ) : topics.length === 0 ? (
          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded">
            No topics found for this chapter.
          </div>
        ) : (
          <div className="card bg-base-100 dark:bg-gray-800 shadow-xl">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
              <table className="table table-zebra">
                  {/* Table Head */}
                  <thead>
                    <tr className=" bg-base-100 dark:text-gray-300">
                      <th>Status</th>
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
