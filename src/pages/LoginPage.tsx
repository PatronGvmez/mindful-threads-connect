
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { getOrCreateUserProfile } from '../utils/authUtils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = async (uid: string) => {
    setIsLoading(true);
    try {
      const userProfile = await getOrCreateUserProfile(uid);
      const redirectPath = userProfile.role === 'admin' ? '/admin' : '/forum';
      toast.success(`Logged in as ${userProfile.role}. Redirecting...`);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Error processing user login:", error);
      toast.error('Login failed. Could not retrieve user profile.');
      setIsLoading(false); // Ensure loading is false on error
    }
    // setIsLoading(false) will be effectively handled by navigation or error path
  };

  useEffect(() => {
    setIsLoading(true); // Start with loading true to check auth state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is already signed in, process login
        await handleLoginSuccess(currentUser.uid);
      } else {
        // No user signed in, ready for login action
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []); // Intentionally empty to run once on mount, navigate is stable

  const handleAnonymousLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInAnonymously(auth);
      await handleLoginSuccess(userCredential.user.uid);
    } catch (error) {
      console.error("Firebase Anonymous Sign-In Error:", error);
      toast.error('Anonymous sign-in failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <p className="text-lg text-gray-700">Loading, please wait...</p>
        {/* You could add a spinner here */}
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-lavender-light p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-deep-purple mb-4">Welcome to MindLink</h1>
        <p className="text-gray-600 mb-8">
          Sign in anonymously to share and connect in a safe space.
        </p>
        <Button 
          onClick={handleAnonymousLogin} 
          disabled={isLoading}
          className="w-full bg-lavender hover:bg-deep-purple text-white"
          size="lg"
        >
          <LogIn size={20} className="mr-2" />
          Login Anonymously
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;

