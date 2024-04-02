import { useState, useEffect } from "react";
import { Post } from "../../types/Post";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const GET = await fetch("/api/posts");
      const data = await GET.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return { posts };
};

export const usePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const GET = await fetch(`/api/posts/${id}`);
      const data = await GET.json();
      setPost(data.post);
      setLoading(false);
    };
    fetcher();
  }, [id]);

  return { post, loading };
};
