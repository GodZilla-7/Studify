import React, { useState, useEffect } from 'react';
import { getSubjectsBySemester, getChaptersBySubject, getTopicsByChapter } from '../services/api';

const AdminPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);

  // Subject fields
  const [subjectName, setSubjectName] = useState('');
  const [subjectSemester, setSubjectSemester] = useState(1);
  const [subjectDescription, setSubjectDescription] = useState('');
  const [subjectBookLink, setSubjectBookLink] = useState('');
  const [subjectPyqLink, setSubjectPyqLink] = useState('');
  const [subjectIconLink, setSubjectIconLink] = useState('');

  // Chapter fields
  const [chapterName, setChapterName] = useState('');
  const [chapterDescription, setChapterDescription] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Topic fields
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [topicYtLink, setTopicYtLink] = useState('');
  const [topicNotes, setTopicNotes] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  const [activeTab, setActiveTab] = useState('subjects');
  const [currentSemester, setCurrentSemester] = useState(1);

  const BASE_URL = 'http://localhost:8960';

  useEffect(() => {
    fetchSubjects();
  }, [currentSemester]);

  const fetchSubjects = async () => {
    try {
      const data = await getSubjectsBySemester(currentSemester);
      setSubjects(data);
    } catch (error) {
      console.error('Failed to use imported function, falling back to direct fetch:', error);
      try {
        const res = await fetch(`${BASE_URL}/api/subjects?semester=${currentSemester}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setSubjects(data);
      } catch (fetchError) {
        console.error('Failed to fetch subjects:', fetchError);
        setSubjects([]);
      }
    }
  };

  const fetchChapters = async (subjectId) => {
    try {
      const data = await getChaptersBySubject(subjectId);
      setChapters(data);
    } catch (error) {
      console.error('Failed to fetch chapters:', error);
      setChapters([]);
    }
  };

  const fetchTopics = async (chapterId) => {
    try {
      const data = await getTopicsByChapter(chapterId);
      setTopics(data);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
      setTopics([]);
    }
  };

  const addSubject = async () => {
    if (!subjectName.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/api/admin/subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: subjectName,
          semester: subjectSemester,
          description: subjectDescription,
          bookLink: subjectBookLink,
          pyqLink: subjectPyqLink,
          iconLink: subjectIconLink,
        })
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      // Clear the form fields after successful submission
      setSubjectName('');
      setSubjectDescription('');
      setSubjectBookLink('');
      setSubjectPyqLink('');
      setSubjectIconLink('');
      fetchSubjects();
    } catch (error) {
      console.error('Failed to add subject:', error);
      alert('Failed to add subject. Please try again.');
    }
  };

  const deleteSubject = async (id) => {
    if (confirm('Are you sure you want to delete this subject? This will also delete all related chapters and topics.')) {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/subjects/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        fetchSubjects();
      } catch (error) {
        console.error('Failed to delete subject:', error);
        alert('Failed to delete subject. Please try again.');
      }
    }
  };

  const addChapter = async () => {
    if (!chapterName.trim() || !selectedSubject) return;
    try {
      const res = await fetch(`${BASE_URL}/api/admin/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: chapterName,
          subject: selectedSubject,
          description: chapterDescription,
        })
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      setChapterName('');
      setChapterDescription('');
      fetchChapters(selectedSubject);
    } catch (error) {
      console.error('Failed to add chapter:', error);
      alert('Failed to add chapter. Please try again.');
    }
  };

  const deleteChapter = async (id) => {
    if (confirm('Are you sure you want to delete this chapter? This will also delete all related topics.')) {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/chapters/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        fetchChapters(selectedSubject);
      } catch (error) {
        console.error('Failed to delete chapter:', error);
        alert('Failed to delete chapter. Please try again.');
      }
    }
  };

  const addTopic = async () => {
    if (!topicName.trim() || !selectedChapter) return;
    try {
      const res = await fetch(`${BASE_URL}/api/admin/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: topicName,
          chapter: selectedChapter,
          description: topicDescription,
          ytLink: topicYtLink,
          notes: topicNotes,
        })
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      setTopicName('');
      setTopicDescription('');
      setTopicYtLink('');
      setTopicNotes('');
      fetchTopics(selectedChapter);
    } catch (error) {
      console.error('Failed to add topic:', error);
      alert('Failed to add topic. Please try again.');
    }
  };

  const deleteTopic = async (id) => {
    if (confirm('Are you sure you want to delete this topic?')) {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/topics/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        fetchTopics(selectedChapter);
      } catch (error) {
        console.error('Failed to delete topic:', error);
        alert('Failed to delete topic. Please try again.');
      }
    }
  };

  const changeSemester = (semesterNum) => {
    setCurrentSemester(semesterNum);
  };

  return (
    <div className='min-h-[100vh] bg-gray-100 flex items-center justify-center py-12'>

  
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div className="flex justify-center mb-4">
        <img 
          className='h-20 w-20' 
          src='https://upload.wikimedia.org/wikipedia/en/4/4f/Maulana_Azad_National_Institute_of_Technology_Logo.png'
          alt="MANIT Logo"
        />
      </div>
      <a href='/'>
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">Studify</h1>
      </a>
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'subjects' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('subjects')}
        >
          Subjects
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'chapters' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('chapters')}
        >
          Chapters
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'topics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('topics')}
        >
          Topics
        </button>
      </div>

      {activeTab === 'subjects' && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Semester:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <button
                  key={sem}
                  className={`px-3 py-1 rounded ${currentSemester === sem ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => changeSemester(sem)}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Subject</h2>
            <div className="flex flex-wrap gap-3">
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={subjectName} 
                onChange={(e) => setSubjectName(e.target.value)} 
                placeholder="Subject Name" 
              />
              <input 
                type="number" 
                className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={subjectSemester} 
                onChange={(e) => setSubjectSemester(parseInt(e.target.value) || 1)} 
                placeholder="Sem" 
                min="1"
                max="8"
              />
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={subjectDescription} 
                onChange={(e) => setSubjectDescription(e.target.value)} 
                placeholder="Description" 
              />
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={subjectBookLink} 
                onChange={(e) => setSubjectBookLink(e.target.value)} 
                placeholder="Book Link" 
              />
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={subjectPyqLink} 
                onChange={(e) => setSubjectPyqLink(e.target.value)} 
                placeholder="PYQ Link" 
              />
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={subjectIconLink} 
                onChange={(e) => setSubjectIconLink(e.target.value)} 
                placeholder="Icon Link" 
              />
              <button 
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
                onClick={addSubject}
              >
                Add Subject
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects && subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <tr key={subject._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{subject.semester}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteSubject(subject._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      {subjects ? 'No subjects found for this semester. Add your first subject above.' : 'Loading subjects...'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'chapters' && (
        <div>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Chapter</h2>
            <div className="flex flex-wrap gap-3">
              <select 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={selectedSubject}
                onChange={(e) => { 
                  setSelectedSubject(e.target.value); 
                  if (e.target.value) fetchChapters(e.target.value); 
                }}
              >
                <option value="">Select Subject</option>
                {subjects && subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name} (Sem {sub.semester})</option>
                ))}
              </select>
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={chapterName} 
                onChange={(e) => setChapterName(e.target.value)} 
                placeholder="Chapter Name" 
                disabled={!selectedSubject}
              />
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={chapterDescription} 
                onChange={(e) => setChapterDescription(e.target.value)} 
                placeholder="Chapter Description" 
                disabled={!selectedSubject}
              />
              <button 
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-300"
                onClick={addChapter}
                disabled={!selectedSubject}
              >
                Add Chapter
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapter Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedSubject ? (
                  chapters && chapters.length > 0 ? (
                    chapters.map((chapter) => (
                      <tr key={chapter._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{chapter.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteChapter(chapter._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                        {chapters ? 'No chapters found for this subject. Add your first chapter above.' : 'Loading chapters...'}
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-gray-500">Please select a subject first.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Topic</h2>
            <div className="flex flex-wrap gap-3">
              <select 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={selectedChapter}
                onChange={(e) => { 
                  setSelectedChapter(e.target.value); 
                  if (e.target.value) fetchTopics(e.target.value); 
                }}
              >
                <option value="">Select Chapter</option>
                {chapters && chapters.map((chap) => (
                  <option key={chap._id} value={chap._id}>{chap.name}</option>
                ))}
              </select>
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={topicName} 
                onChange={(e) => setTopicName(e.target.value)} 
                placeholder="Topic Name" 
                disabled={!selectedChapter}
              />
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={topicDescription} 
                onChange={(e) => setTopicDescription(e.target.value)} 
                placeholder="Topic Description" 
                disabled={!selectedChapter}
              />
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={topicYtLink} 
                onChange={(e) => setTopicYtLink(e.target.value)} 
                placeholder="YouTube Link" 
                disabled={!selectedChapter}
              />
              <input 
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                value={topicNotes} 
                onChange={(e) => setTopicNotes(e.target.value)} 
                placeholder="Notes" 
                disabled={!selectedChapter}
              />
              <button 
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-300"
                onClick={addTopic}
                disabled={!selectedChapter}
              >
                Add Topic
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedChapter ? (
                  topics && topics.length > 0 ? (
                    topics.map((topic) => (
                      <tr key={topic._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{topic.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteTopic(topic._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                        {topics ? 'No topics found for this chapter. Add your first topic above.' : 'Loading topics...'}
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-gray-500">Please select a chapter first.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminPage;
