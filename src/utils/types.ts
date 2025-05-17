
import { Timestamp } from 'firebase/firestore';
import { PostCategoryValue } from './constants';

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
  category: PostCategoryValue;
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

// Add other types as the application grows

