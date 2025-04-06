// client/src/pages/LoginPage.js
import LoginForm from '../components/auth/LoginForm';
import Navbar from '../components/layout/Navbar';

const LoginPage = () => {
  return (
    <div
    className="flex justify-center items-center h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp9116802.jpg')" }}
    >
      
        <LoginForm />
     
    </div>
  );
};

export default LoginPage;



