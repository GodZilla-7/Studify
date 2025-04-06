import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="navbar bg-base-100 dark:bg-gray-800 dark:text-white shadow-sm transition-all">
      <div className="flex-1">
        <Link to="/" className="text-xl">
          <img
            className='h-8 dark:invert-100' // Inverts the logo in light mode for contrast
            src="https://static.wixstatic.com/media/3256bc_e6a64b36c2694917a4a9b066ee74f246~mv2.png/v1/fill/w_739,h_213,al_c,q_85,enc_avif,quality_auto/Horizont%C3%A1ln%C3%AD%20%C4%8Dern%C3%A9%20STUDIFY%20logo%20s%20textem.png"
            alt="Studify Logo"
          />
        </Link>
      </div>
      <div className="flex-none">
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-gray-300 dark:text-gray-300">
              Semester {user.semester}
            </span>
            <button
              onClick={logout}
              className="btn btn-square btn-ghost hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            >
              <FaSignOutAlt className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <Link
              to="/login"
              className="btn btn-sm btn-primary dark:btn-accent"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm btn-secondary dark:btn-neutral"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
