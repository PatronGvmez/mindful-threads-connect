
import { db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { UserProfile } from './types';

/**
 * Fetches a user profile from Firestore. If it doesn't exist,
 * it creates a new one with a default role of "user".
 * @param uid The user's unique ID from Firebase Auth.
 * @returns A Promise resolving to the UserProfile object.
 */
export async function getOrCreateUserProfile(uid: string): Promise<UserProfile> {
  const userDocRef = doc(db, "users", uid);
  let userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    const newUserProfileData = {
      uid,
      role: "user" as UserProfile["role"],
      joinedAt: serverTimestamp(),
    };
    await setDoc(userDocRef, newUserProfileData);
    // Re-fetch to get the document with server-generated timestamp and confirm creation
    userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      // This case should ideally not be reached if setDoc was successful
      throw new Error("Failed to create or fetch user document after attempting creation.");
    }
  }
  
  const data = userDocSnap.data();
  if (!data) {
    throw new Error("User document data is undefined after fetch/create.");
  }

  // Ensure the role is one of the expected values, defaulting to "user" if invalid.
  const role = (data.role === "admin" || data.role === "user") ? data.role : "user";

  return {
    uid: data.uid || uid, // Use UID from data or fallback to input UID
    role,
    joinedAt: data.joinedAt as Timestamp, // Firestore Timestamps are fetched directly
  };
}

