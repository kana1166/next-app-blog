/** @format */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "../_components/CategoryForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import {
  fetchCategory,
  updateCategory,
  deleteCategory,
} from "@/app/admin/_hooks/useAdminCategory";

export default function Page() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token || !id || Array.isArray(id)) return;

    const fetcher = async () => {
      const data = await fetchCategory(id, token);
      if (data.category && data.category.name) {
        setName(data.category.name);
      } else {
        setError("カテゴリー名がありません。");
      }
      setIsLoading(false);
    };

    fetcher();
  }, [token, id]);

  const handleFormSubmit = async (formData: { name: string }) => {
    if (!id || Array.isArray(id)) return;
    if (!token || Array.isArray(token)) return;

    const success = await updateCategory(id, formData, token);
    if (success) {
      alert("カテゴリーを更新しました。");
      router.push(`/admin/categories`);
    } else {
      alert("カテゴリーの更新に失敗しました。");
    }
  };

  const handleDeleteCategory = async () => {
    if (!id || Array.isArray(id)) return;
    if (!token || Array.isArray(token)) return;

    if (!confirm("カテゴリーを削除しますか？")) return;

    const success = await deleteCategory(id, token);
    if (success) {
      alert("カテゴリーを削除しました。");
      router.push("/admin/categories");
    } else {
      alert("カテゴリーの削除に失敗しました。");
    }
  };

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-center text-2xl font-bold m-4">カテゴリー編集</h1>
      </div>

      <CategoryForm
        mode="edit"
        name={name}
        onSubmit={handleFormSubmit}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
}
