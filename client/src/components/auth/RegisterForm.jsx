import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    semester: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.semester) {
      return setError('All fields are required');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        semester: Number(formData.semester)
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-96 shadow-lg p-8 rounded-lg bg-opacity-10 backdrop-blur-md">
      <div className="flex justify-center mb-4">
        <img 
          className='h-20 w-20' 
          src='https://upload.wikimedia.org/wikipedia/en/4/4f/Maulana_Azad_National_Institute_of_Technology_Logo.png'
          alt="MANIT Logo"
        />
      </div>
      
          
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <div>
          <label className="form-control w-full flex flex-col gap-1" htmlFor="name">
            <span className="label-text font-semibold text-white">Full Name</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <label className="form-control w-full flex flex-col gap-1" htmlFor="email">
            <span className="label-text font-semibold text-white">Email</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="input w-full"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="form-control w-full flex flex-col gap-1" htmlFor="password">
            <span className="label-text font-semibold text-white">Password</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="input w-full"
            placeholder="Enter your password"
          />
        </div>
        
        <div>
          <label className="form-control w-full flex flex-col gap-1" htmlFor="confirmPassword">
            <span className="label-text font-semibold text-white">Confirm Password</span>
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input w-full"
            placeholder="Confirm your password"
          />
        </div>
        
        <div className="mb-2">
          <label className="form-control w-full flex flex-col gap-1" htmlFor="semester">
            <span className="label-text font-semibold text-white">Semester</span>
          </label>
          <select
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-4"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-white">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;