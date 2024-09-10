/** @format */
import { Post } from "@/types/Post";
import { Category } from "@/types/Category";
import { useState, useEffect } from "react";

export const useAdminPost = (id: string, token: string | null) => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token || !id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "投稿の取得に失敗しました。");
        }

        const data = await res.json();
        setPost(data.post || null);
      } catch (err) {
        setError("投稿の取得に失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, token]);

  return { post, error, isLoading };
};

export const useFetchPostData = (id: string, token: string | null) => {
  const { post, error: postError, isLoading } = useAdminPost(id, token);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesError, setCategoriesError] = useState<string>("");

  useEffect(() => {
    if (!token) return;

    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setCategoriesError("カテゴリの取得に失敗しました。");
      }
    };

    fetchCategoriesData();
  }, [token]);

  return { post, postError, isLoading, categories, categoriesError };
};

export const createPost = async (
  token: string,
  postData: any
): Promise<any> => {
  const res = await fetch("/api/admin/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(postData),
  });
  const data = await res.json();
  return data;
};

export const updatePost = async (
  id: string,
  token: string,
  postData: any
): Promise<boolean> => {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error:", errorData);
  }

  return response.ok;
};

export const deletePost = async (
  id: string,
  token: string
): Promise<boolean> => {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  return response.ok;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch("/api/admin/categories");
  const data = await res.json();
  return data.categories || [];
};

export const createCategory = async (formData: {
  name: string;
}): Promise<boolean> => {
  const res = await fetch("/api/admin/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return res.ok;
};
