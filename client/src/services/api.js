const BASE_URL = 'http://localhost:8960'; // Use correct server port

// Helper function to handle API requests with authentication
const authFetch = async (endpoint, options = {}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const publicEndpoints = ['/api/auth/login', '/api/auth/register'];
  const isPublic = publicEndpoints.includes(endpoint);

  if (!isPublic && user?.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  const config = { ...options, headers };
  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
};

// Subject API calls
export const getSubjectsBySemester = (semester) =>
  authFetch(`/api/subjects?semester=${semester}`);

// Chapter API calls
export const getChaptersBySubject = (subjectId) =>
  authFetch(`/api/chapters?subjectId=${subjectId}`);

// Topic API calls
export const getTopicsByChapter = (chapterId) =>
  authFetch(`/api/topics?chapterId=${chapterId}`);

// Progress API calls
export const getUserProgress = (topicIds = null) => {
  const query = topicIds ? `?topicIds=${topicIds.join(',')}` : '';
  return authFetch(`/api/progress${query}`);
};

export const updateUserProgress = (topicId, isCompleted) =>
  authFetch('/api/progress', {
    method: 'POST',
    body: JSON.stringify({ topicId, isCompleted }),
  });



// Authentication API calls
export const login = (email, password) =>
  authFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const register = (userData) =>
  authFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
// Update your API.js file by modifying the updateTopicNotes function and adding getUserNotes

export const getUserNotes = async (topicId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = { 'Content-Type': 'application/json' };
  
    if (user?.token) {
      headers.Authorization = `Bearer ${user.token}`;
    } else {
      throw new Error('Not authorized, no token');
    }
  
    const response = await fetch(`${BASE_URL}/api/notes/${topicId}`, {
      method: 'GET',
      headers
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to get notes');
    }
  
    return response.json();
  };
  
  export const updateTopicNotes = async (topicId, notes) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = { 'Content-Type': 'application/json' };
  
    if (user?.token) {
      headers.Authorization = `Bearer ${user.token}`;
    } else {
      throw new Error('Not authorized, no token');
    }
  
    const response = await fetch(`${BASE_URL}/api/notes/${topicId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ notes }),
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update notes');
    }
  
    return response.json();
  };