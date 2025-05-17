
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getOrCreateUserProfile } from '../utils/authUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty.");
      setIsLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile in Firestore
      await getOrCreateUserProfile(user.uid, {
        email: user.email || undefined,
        displayName: displayName,
        role: role,
      });

      toast.success('Registration successful! Redirecting to login...');
      navigate('/login'); 
    } catch (error: any) {
      console.error("Registration Error:", error);
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-lavender-light p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-deep-purple mb-6">Create Account</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <Label htmlFor="displayName" className="block text-sm font-medium text-gray-700 text-left mb-1">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full"
              placeholder="Your Name"
            />
          </div>
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
          <div>
            <Label htmlFor="role" className="block text-sm font-medium text-gray-700 text-left mb-1">Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value as 'user' | 'admin')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-lavender-medium hover:bg-lavender-dark text-white"
            size="lg"
          >
            <UserPlus size={20} className="mr-2" />
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
         <p className="mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-lavender-dark hover:text-deep-purple">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

