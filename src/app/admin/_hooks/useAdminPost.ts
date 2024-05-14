/** @format */
import { Post } from "@/types/Post";
import { Category } from "@/types/Category";

export const useAdminPost = async (
  id: string,
  token: string
): Promise<Post | null> => {
  const res = await fetch(`/api/admin/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // 👈 Header に token を付与
    },
  });
  const data = await res.json();
  return data.post || null;
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
      Authorization: token,
    },
    body: JSON.stringify(postData),
  });
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
