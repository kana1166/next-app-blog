"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "../_components/Form";
import { Category } from "../../../../types/Category";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [thumbnailUrl, setthumbnailUrl] = useState(
    "https://placehold.jp/800x400.png"
  ); // 画像URLは、一旦このURL固定でお願いします。後ほど画像アップロード処理を実装します。
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, thumbnailUrl, categories }),
    });
    const { id } = await res.json();
    if (!id) {
      alert("記事の作成に失敗しました。");
      return;
    }

    router.push(`/admin/posts`);

    alert("記事を作成しました。");
  };

  return (
    <div>
      <h1 className="text-center m-4">新規作成</h1>
      <PostForm
        mode="new"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        categories={categories}
        setCategories={setCategories}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setthumbnailUrl}
        onSubmit={onSubmit}
      />
    </div>
  );
}
