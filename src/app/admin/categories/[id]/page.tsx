"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "../_components/CategoryForm";

export default function Page() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    alert("カテゴリーを更新しました。");
    router.push(`/admin/categories`);
  };

  const handleDeletePost = async () => {
    if (!confirm("カテゴリーを削除しますか？")) return;

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });

    alert("カテゴリーを削除しました。");

    router.push("/admin/categories");
  };

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`);
        const data = await res.json();
        if (data.category && data.category.name) {
          setName(data.category.name);
        } else {
          console.error("カテゴリー名がありません。", data);
        }
      } catch (error) {
        console.error("カテゴリーの取得に失敗しました。", error);
      }
    };

    fetcher();
  }, [id]);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-center text-2xl font-bold m-4">カテゴリー編集</h1>
      </div>

      <CategoryForm
        mode="edit"
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
