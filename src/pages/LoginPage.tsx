
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getOrCreateUserProfile } from '../utils/authUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuthState, setIsCheckingAuthState] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = async (uid: string) => {
    try {
      // For email/password login, profile should ideally exist.
      // getOrCreateUserProfile will fetch it, or create a default 'user' one if somehow missing.
      const userProfile = await getOrCreateUserProfile(uid); 
      const redirectPath = userProfile.role === 'admin' ? '/admin' : '/forum';
      toast.success(`Logged in as ${userProfile.displayName || userProfile.email || userProfile.role}. Redirecting...`);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Error processing user login:", error);
      toast.error('Login failed. Could not retrieve user profile.');
    } finally {
      setIsLoading(false); // Ensure loading is false after processing
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsLoading(true); // Set loading true while processing existing session
        await handleLoginSuccess(currentUser.uid);
      } else {
        setIsCheckingAuthState(false); // No user, ready for login action
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []); // navigate is stable, handleLoginSuccess changes are fine

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will trigger handleLoginSuccess
    } catch (error: any) {
      console.error("Firebase Email/Password Sign-In Error:", error);
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      }
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  if (isCheckingAuthState) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <p className="text-lg text-gray-700">Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-lavender-light p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-deep-purple mb-6">Login to MindLink</h1>
        <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-1">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left mb-1">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              placeholder="••••••••"
            />
          </div>
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-lavender hover:bg-deep-purple text-white"
            size="lg"
          >
            <LogIn size={20} className="mr-2" />
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-lavender-dark hover:text-deep-purple">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

