
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareHeart, Users, ShieldCheck, LogIn, Home, PlusSquare } from 'lucide-react'; // Using MessageSquareHeart as a placeholder for app icon

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-lavender-dark hover:text-deep-purple">
          <MessageSquareHeart size={32} className="mr-2" />
          <span className="font-bold text-xl">MindLink</span>
          <span className="ml-2 text-2xl">🐰</span> {/* Bunny Mascot */}
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-lavender-dark px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <Home size={18} className="mr-1" /> Home
          </Link>
          <Link to="/forum" className="text-gray-700 hover:text-lavender-dark px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <Users size={18} className="mr-1" /> Forum
          </Link>
          <Link to="/new" className="text-gray-700 hover:text-lavender-dark px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <PlusSquare size={18} className="mr-1" /> Create Post
          </Link>
          <Link to="/admin" className="text-gray-700 hover:text-lavender-dark px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <ShieldCheck size={18} className="mr-1" /> Admin
          </Link>
          {/* We'll add auth state later to show Login/User button */}
          {/* For now, a placeholder login link */}
          <Link to="/login" className="text-gray-700 hover:text-lavender-dark px-3 py-2 rounded-md text-sm font-medium flex items-center">
             <LogIn size={18} className="mr-1" /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
