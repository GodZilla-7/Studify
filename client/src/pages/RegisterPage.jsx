// client/src/pages/RegisterPage.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import Navbar from '../components/layout/Navbar';

const RegisterPage = () => {
  return (
    <div
    className="flex justify-center items-center h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp9116802.jpg')" }}
    >
      
        <RegisterForm />
     
    </div>
  );
};

export default RegisterPage;

