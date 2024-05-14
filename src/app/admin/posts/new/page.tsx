/** @format */
"use client";

import PostForm from "@/app/admin/posts/_componets/PostForm";
import { Category } from "@/types/Category";
import React, { useState, useEffect } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { FormData } from "@/types/FormData";
import { fetchCategories, createPost } from "@/app/admin/_hooks/useAdminPost";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useSupabaseSession();
  const [thumbnailImageKey, setThumbnailImageKey] = useState("");
  const [title] = useState("");
  const [content] = useState("");

  const handleFormSubmit = async (data: FormData) => {
    if (!token) return;

    const postData = {
      title: data.title,
      content: data.content,
      thumbnailImageKey: data.thumbnailImageKey,
      categories: [data.category],
    };

    const createdPost = await createPost(token, postData);
    if (createdPost) {
      alert("記事を作成しました。");
    } else {
      alert("記事の作成に失敗しました。");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">投稿作成</h1>
      </div>
      {categories.length > 0 && (
        <PostForm
          mode="new"
          title={title}
          content={content}
          thumbnailImageKey={thumbnailImageKey}
          setThumbnailImageKey={setThumbnailImageKey}
          categories={categories}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
