/** @format */

"use client";

import { CategoryForm } from "../_components/CategoryForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";
import {
  fetchCategories,
  createCategory,
} from "@/app/admin/_hooks/useAdminPost";

export default function Page() {
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      await fetchCategories();
    };

    fetcher();
  }, [token]);

  const handleFormSubmit = async (formData: { name: string }) => {
    const success = await createCategory(formData);

    if (success) {
      alert("カテゴリーを作成しました。");
    } else {
      alert("カテゴリーの作成に失敗しました。");
    }
  };
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">カテゴリー作成</h1>
      </div>
      <CategoryForm mode="new" name="" onSubmit={handleFormSubmit} />
    </div>
  );
}
