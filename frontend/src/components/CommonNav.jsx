import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CommonNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md text-black">
      <div className="flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/">
          <img src="../icons/logo.png" alt="logo" width={130} className="mx-2" />
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-yellow-500 font-bold px-4 ">Home</Link>
          <Link to="/marketplace" className="hover:text-yellow-500 font-bold px-4">Marketplace</Link>
          <Link to="/profile" className="hover:text-yellow-500 font-bold px-4">Wishlist</Link>
        </div>

        {/* Account Button */}
        <button
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 flex items-center gap-2"
          onClick={() => navigate('/profile')}
        >
          Account
        </button>
      </div>
    </nav>
  );
};

export default CommonNav;
