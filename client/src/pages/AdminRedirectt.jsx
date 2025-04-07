import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRedirect() {
  const [route, setRoute] = useState("");
  const navigate = useNavigate();

  const handleGo = () => {
    if (route.trim()) {
      navigate(`/${route}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-base-100">
            <div className="flex justify-center mb-4">
        <img 
          className='h-20 w-20' 
          src='https://upload.wikimedia.org/wikipedia/en/4/4f/Maulana_Azad_National_Institute_of_Technology_Logo.png'
          alt="MANIT Logo"
        />
      </div>
      <a href='/'>
      <h1 className="text-3xl font-bold text-center mb-8 text-accent">Studify</h1>
      </a>
      <div/>
      <input
        type="password"
        placeholder="Enter security code"
        className="input input-bordered w-64"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
        
      />
      <button onClick={handleGo} className="btn btn-accent">
        Enter Admin Panel
      </button>
    </div>
  );
}
