import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 p-4">
      <div className="flex flex-1">
        <a href="/" className="btn btn-ghost text-xl hover:bg-base-100">Mentra</a>
      </div>
      <div className="flex flex-none">
        <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
