import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8960/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register user
  const register = async (userData) => {
    try {
        const response = await fetch('http://localhost:8960/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          });
          
  
      const text = await response.text(); // Read response as text
      console.log("Response Text:", text); // Debugging
  
      if (!response.ok) {
        throw new Error(text || 'Registration failed');
      }
  
      return JSON.parse(text); // Parse JSON only if response is OK
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};