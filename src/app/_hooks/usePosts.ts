/** @format */

import { useState, useEffect } from "react";
import { Post } from "../../types/Post";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const GET = await fetch("/api/posts");
      const data = await GET.json();
      setPosts(data.posts);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);
  return { posts, isLoading };
};

export const usePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const GET = await fetch(`/api/posts/${id}`);
      const data = await GET.json();
      setPost(data.post);
      setIsLoading(false);
    };
    fetcher();
  }, [id]);

  return { post, isLoading };
};
