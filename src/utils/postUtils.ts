
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { Post, PostCategoryValue } from './types';

export const createPost = async (postData: Omit<Post, 'id' | 'timestamp' | 'replyCount' | 'flagged'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      timestamp: serverTimestamp(),
      replyCount: 0,
      flagged: false,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating post: ", error);
    throw error;
  }
};

export const getPosts = async (category?: PostCategoryValue): Promise<Post[]> => {
  try {
    let postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    if (category) {
      postsQuery = query(collection(db, 'posts'), where('category', '==', category), orderBy('timestamp', 'desc'));
    }
    
    const querySnapshot = await getDocs(postsQuery);
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
    return posts;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};

export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const postDocRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postDocRef);
    if (postSnap.exists()) {
      return { id: postSnap.id, ...postSnap.data() } as Post;
    }
    return null;
  } catch (error) {
    console.error("Error fetching post by ID: ", error);
    throw error;
  }
};

