import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email?: string; // Optional: for email/password users
  displayName?: string; // Optional: for users who set a display name
  role: "user" | "admin";
  joinedAt: Timestamp;
}

export interface Post {
  id: string;
  authorUid: string;
  category: 'GBV' | 'Stress' | 'Depression' | 'SuicidalThoughts' | 'GeneralSupport' | 'Other';
  title: string; // Added title for better PostCard display
  content: string;
  timestamp: Timestamp;
  flagged?: boolean; // For admin moderation
  replyCount?: number; // Optional: to show on PostCard
}

export interface Comment {
  id: string;
  postId: string;
  authorUid: string;
  text: string;
  timestamp: Timestamp;
}

// Add other types as the application grows
