import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path if necessary

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="text-white">Flavor</span>
            <span className="bg-gradient-to-r from-bule-400 to-blue-600 text-gray-800 px-2 ml-1 rounded">
              Haven
            </span>
          </h1>
          <p className="text-sm mt-1">From Street Eats to Global Treats</p>
        </div>
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>
      <div className='w-72 hidden custom-md:block'></div>
      <img
        src={logo}
        alt="Logo"
        className="h-16 w-16 rounded-lg mx-auto border-2 border-white mt-4 md:mt-0 hidden md:block"
      />
      <nav className={`flex-col md:flex-row md:flex ${isOpen ? 'flex' : 'hidden'} md:space-x-4 mt-4 md:mt-0`}>
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/menu" className="hover:underline">
          Menu
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
      </nav>
    </header>
  );
};

export default Header;