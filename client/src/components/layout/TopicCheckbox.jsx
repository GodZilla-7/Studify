import { useState, useEffect } from "react";
import { updateUserProgress, updateTopicNotes, getUserNotes } from "../../services/api";
import { FaYoutube, FaPlus } from "react-icons/fa";

const TopicCheckbox = ({ topic, initialIsCompleted = false, index }) => {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(false);

  // Fetch user's notes for this topic
  useEffect(() => {
    const fetchNotes = async () => {
      if (isModalOpen) {
        try {
          setLoadingNotes(true);
          const userNotes = await getUserNotes(topic._id);
          setNotes(userNotes.notes || "");
        } catch (error) {
          console.error("Error fetching notes:", error);
        } finally {
          setLoadingNotes(false);
        }
      }
    };

    fetchNotes();
  }, [isModalOpen, topic._id]);

  // Handle completion toggle
  const handleToggle = async () => {
    try {
      setLoading(true);
      const newStatus = !isCompleted;
      await updateUserProgress(topic._id, newStatus);
      setIsCompleted(newStatus);
    } catch (error) {
      console.error("Error updating progress:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle notes update
  const handleNotesUpdate = async () => {
    try {
      setSavingNotes(true);
      await updateTopicNotes(topic._id, notes);
    } catch (error) {
      console.error("Error updating notes:", error);
    } finally {
      setSavingNotes(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <tr className="hover">
        <th>
          <label>
            <input 
              type="checkbox" 
              className="checkbox ml-2" 
              checked={isCompleted}
              onChange={handleToggle}
            />
          </label>
        </th>
        <td>
          <div className="font-medium">{topic.name}</div>
        </td>
        <td>
          {topic.ytLink && (
            <a
              href={topic.ytLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-700 "
            >
              <FaYoutube className="w-5 h-5" />
            </a>
          )}
        </td>
        <th>
          <button 
            className="btn btn-ghost btn-xs"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="w-4 h-4" />
          </button>
        </th>
      </tr>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          {/* Semi-transparent dark overlay */}
          <div className="absolute inset-0 h-[100vh] bg-black/50"></div>

          {/* Modal Container */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[80vh] overflow-auto z-10 relative">
            
              <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{topic.name} Notes</h2><button
                onClick={() => setIsModalOpen(false)}
                className="btn px-4 py-2 bg-red-500 text-white rounded transition"
              >
                Close
              </button>
              </div>
            {loadingNotes ? (
              <div className="flex justify-center p-4">Loading notes...</div>
            ) : (
              <textarea
                className="w-full border p-2 rounded-md"
                placeholder="Add your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
              />
            )}
            <div className="flex justify-end space-x-2 mt-4">
              
              <button
                onClick={handleNotesUpdate}
                disabled={savingNotes || loadingNotes}
                className="btn px-4 py-2 bg-green-500 text-white rounded transition"
              >
                {savingNotes ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopicCheckbox;