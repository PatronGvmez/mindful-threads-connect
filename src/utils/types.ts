
import { Timestamp } from 'firebase/firestore';
import { PostCategoryValue as ImportedPostCategoryValue } from './constants'; // Import with an alias

export interface UserProfile {
  uid: string;
  email?: string; 
  displayName?: string; 
  role: "user" | "admin";
  joinedAt: Timestamp;
}

export interface Post {
  id: string;
  authorUid: string;
  category: ImportedPostCategoryValue; // Use the imported alias
  title: string;
  content: string;
  timestamp: Timestamp;
  flagged?: boolean;
  replyCount?: number;
  isAnonymous: boolean; // Added for anonymous posting
}

export interface Comment {
  id: string;
  postId: string;
  authorUid: string;
  text: string;
  timestamp: Timestamp;
}

// Re-export PostCategoryValue so it's available to other modules importing from types.ts
export type PostCategoryValue = ImportedPostCategoryValue;

// Add other types as the application grows
