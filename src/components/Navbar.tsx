import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquareHeart, Users, LogIn, Home, PlusSquare, UserPlus, LogOut, BookOpenText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth'; 
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button'; 

const NavLink: React.FC<{ to: string; children: React.ReactNode; icon?: React.ElementType }> = ({ to, children, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === "/forum" && location.pathname.startsWith("/forum"));
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors
        ${isActive ? 'bg-lavender text-deep-purple' : 'text-gray-700 hover:text-lavender-dark hover:bg-lavender-light'}`}
    >
      {Icon && <Icon size={18} className="mr-1" />} {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out.');
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-lavender-dark hover:text-deep-purple">
          <MessageSquareHeart size={32} className="mr-2" />
          <span className="font-bold text-xl">MindLink</span>
          <span className="ml-2 text-2xl">🐰</span>
        </Link>
        <div className="space-x-1 md:space-x-2 flex items-center">
          {!isLoading && (
            <>
              <NavLink to="/" icon={Home}>Home</NavLink>
              {currentUser ? (
                <>
                  <NavLink to="/forum" icon={Users}>Forum</NavLink>
                  <NavLink to="/new" icon={PlusSquare}>Create Post</NavLink>
                  <NavLink to="/resources" icon={BookOpenText}>Resources</NavLink>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout} 
                    className="text-gray-700 hover:text-lavender-dark px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <LogOut size={18} className="mr-1" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/register" icon={UserPlus}>Register</NavLink>
                  <NavLink to="/login" icon={LogIn}>Login</NavLink>
                </>
              )}
            </>
          )}
          {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;