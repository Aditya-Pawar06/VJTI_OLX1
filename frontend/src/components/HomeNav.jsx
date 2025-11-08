import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = ({ scrollToSection, refs }) => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <nav 
      className="text-white"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay for Opacity */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1,
        }}
      ></div>

      <div className="mycontainer flex justify-between items-center h-10 px-1 py-12" style={{ position: 'relative', zIndex: 2 }}>

        {/* Logo */}
        <div className="flex items-center gap-4">
          <img 
            src="icons/logo.png" 
            alt="logo" 
            width={130} 
            className="mx-2 rounded-full border border-gray-300 shadow-md" 
          />
        </div>

        {/* Navigation Options */}
        <div className="flex items-center gap-8">
          {/* People */}
          <button 
            className="text-black font-semibold hover:underline"
            onClick={() => scrollToSection(refs.peopleRef)}
          >
            People 
          </button>

          {/* Insights */}
          <button 
            className="text-black font-semibold hover:underline"
            onClick={() => scrollToSection(refs.insightsRef)}
          >
            Insights
          </button>

          {/* Contact */}
          <button 
            className="text-black font-semibold hover:underline"
            onClick={() => scrollToSection(refs.contactRef)}
          >
            Contact
          </button>

          {/* Login */}
          <button 
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500"
            onClick={() => navigate('/login')} // Navigate to the Login page
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
