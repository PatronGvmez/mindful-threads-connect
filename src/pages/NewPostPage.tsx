
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { createPost } from '@/utils/postUtils';
import { POST_CATEGORIES, PostCategoryValue } from '@/utils/constants';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be 100 characters or less"),
  content: z.string().min(20, "Content must be at least 20 characters").max(5000, "Content must be 5000 characters or less"),
  category: z.enum(POST_CATEGORIES.map(cat => cat.value) as [PostCategoryValue, ...PostCategoryValue[]], {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  isAnonymous: z.boolean().default(false),
});

type PostFormData = z.infer<typeof postSchema>;

const NewPostPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      category: POST_CATEGORIES[0].value, // Default to the first category
      isAnonymous: false,
    },
  });

  const onSubmit = async (data: PostFormData) => {
    if (!currentUser) {
      toast.error("You must be logged in to create a post.");
      return;
    }
    try {
      await createPost({ ...data, authorUid: currentUser.uid });
      toast.success("Post created successfully!");
      navigate('/forum'); // Or navigate to the new post's page: `/post/${newPostId}`
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error("Post creation error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-deep-purple">Create a New Post</CardTitle>
          <CardDescription>Share your thoughts and experiences with the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Share what's on your mind..." {...field} rows={8} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {POST_CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isAnonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-lavender-light">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Post Anonymously</FormLabel>
                      <FormDescription>
                        If checked, your display name will not be shown with this post.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-lavender-medium hover:bg-lavender-dark" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Create Post"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPostPage;
