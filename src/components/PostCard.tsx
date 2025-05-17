
import React from 'react';
import { Post, UserProfile } from '@/utils/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import UserProfileDisplay from './UserProfileDisplay';
import { POST_CATEGORIES } from '@/utils/constants'; // To display category label
import { formatDistanceToNow } from 'date-fns';


interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const categoryLabel = POST_CATEGORIES.find(cat => cat.value === post.category)?.label || post.category;
  
  const timeAgo = post.timestamp ? formatDistanceToNow(post.timestamp.toDate(), { addSuffix: true }) : 'Unknown date';

  return (
    <Card className="mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <CardHeader>
        <Link to={`/post/${post.id}`} className="hover:underline">
          <CardTitle className="text-lavender-dark hover:text-deep-purple">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-gray-500 mt-1">
          Posted by <UserProfileDisplay authorUid={post.authorUid} isAnonymous={post.isAnonymous} />
          <span className="mx-1">|</span>
          <span>{timeAgo}</span>
          <span className="mx-1">|</span>
          <span className="px-2 py-0.5 bg-lavender text-deep-purple rounded-full text-xs">{categoryLabel}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="text-sm">
        <Link to={`/post/${post.id}`} className="text-lavender-dark hover:text-deep-purple font-medium">
          Read More & Comments ({post.replyCount || 0})
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
