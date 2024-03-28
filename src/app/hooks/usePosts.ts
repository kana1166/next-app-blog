import { useState, useEffect } from "react";
import { MicroCmsPost } from "../../types/Post";

export const usePosts = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_MICROCMS_API_ENDPOINT + "/blogs",
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );

      const { contents } = await res.json();
      setPosts(contents);
    };
    fetchPosts();
  }, []);

  return { posts };
};

export const usePost = (id: string) => {
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_MICROCMS_API_ENDPOINT + `/blogs/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const data = await response.json();
      setPost(data);
      setLoading(false);
    };
    if (id) {
      fetcher();
    }
  }, [id]);

  return { post, loading };
};
