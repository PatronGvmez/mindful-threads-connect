
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { UserProfile } from '@/utils/types';

interface UserProfileDisplayProps {
  authorUid: string;
  isAnonymous: boolean;
}

const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({ authorUid, isAnonymous }) => {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAnonymous) {
      setDisplayName("Anonymous Contributor");
      setIsLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, "users", authorUid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserProfile;
          setDisplayName(userData.displayName || "User");
        } else {
          setDisplayName("Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setDisplayName("Error loading name");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [authorUid, isAnonymous]);

  if (isLoading) {
    return <span className="text-sm text-gray-500">Loading author...</span>;
  }

  return <span className="font-semibold text-deep-purple">{displayName}</span>;
};

export default UserProfileDisplay;
