
import { db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { UserProfile } from './types';

/**
 * Fetches a user profile from Firestore. If it doesn't exist,
 * it creates a new one.
 * @param uid The user's unique ID from Firebase Auth.
 * @param initialData Optional data to use when creating a new profile.
 * @returns A Promise resolving to the UserProfile object.
 */
export async function getOrCreateUserProfile(
  uid: string,
  initialData?: Partial<Pick<UserProfile, 'email' | 'displayName' | 'role'>>
): Promise<UserProfile> {
  const userDocRef = doc(db, "users", uid);
  let userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    const newUserProfileData: Omit<UserProfile, 'joinedAt' | 'uid'> & { joinedAt: any, uid: string } = {
      uid,
      email: initialData?.email,
      displayName: initialData?.displayName,
      role: initialData?.role || "user", // Default to "user" if not provided
      joinedAt: serverTimestamp(),
    };
    await setDoc(userDocRef, newUserProfileData);
    // Re-fetch to get the document with server-generated timestamp and confirm creation
    userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      throw new Error("Failed to create or fetch user document after attempting creation.");
    }
  }
  
  const data = userDocSnap.data();
  if (!data) {
    throw new Error("User document data is undefined after fetch/create.");
  }

  // Ensure the role is one of the expected values, defaulting to "user" if invalid or missing.
  const role = (data.role === "admin" || data.role === "user") ? data.role : "user";

  return {
    uid: data.uid || uid,
    email: data.email,
    displayName: data.displayName,
    role,
    joinedAt: data.joinedAt as Timestamp,
  };
}

