/** @format */
import { Category } from "@/types/Category";

export const fetchCategory = async (
  id: string,
  token: string
): Promise<any> => {
  const res = await fetch(`/api/admin/categories/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const updateCategory = async (
  id: string,
  formData: { name: string },
  token: string
): Promise<boolean> => {
  const res = await fetch(`/api/admin/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return res.ok;
};

export const deleteCategory = async (
  id: string,
  token: string
): Promise<boolean> => {
  const res = await fetch(`/api/admin/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.ok;
};

export const fetchCategories = async (token: string): Promise<Category[]> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`; // トークンを正しく設定
  }

  const res = await fetch("/api/admin/categories", { headers });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(`Failed to fetch categories: ${errorResponse.message}`);
  }

  const data = await res.json();
  return data.categories || [];
};
