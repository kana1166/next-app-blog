/** @format */
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Post } from "@/types/Post";
import PostForm from "@/app/admin/posts/_componets/PostForm";
import { useParams, useRouter } from "next/navigation";
import { Category } from "@/types/Category";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { FormData } from "@/types/FormData";
import {
  useAdminPost,
  updatePost,
  deletePost,
  fetchCategories,
} from "@/app/admin/_hooks/useAdminPost";

export default function Page() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useSupabaseSession();
  const [thumbnailImageKey, setThumbnailImageKey] = useState("");

  useEffect(() => {
    if (!token || !id || Array.isArray(id)) return;

    const fetchData = async () => {
      const post = await useAdminPost(id, token);
      if (post) {
        setPost(post);
        setThumbnailImageKey(post.thumbnailImageKey || "");
      } else {
        setError("投稿がありません。");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [token, id]);

  const handleFormSubmit = async (data: FormData) => {
    if (!id || Array.isArray(id)) return;
    if (!token || Array.isArray(token)) return;

    const postData = {
      title: data.title,
      content: data.content,
      thumbnailImageKey: data.thumbnailImageKey,
      categories: [data.category], // categoriesを選択したカテゴリのIDに変更
    };
    const success = await updatePost(id, token, postData);
    if (success) {
      alert("投稿を更新しました。");
      router.push(`/admin/posts`);
    } else {
      alert("投稿の更新に失敗しました。");
    }
  };

  const handleDeletePost = async () => {
    if (!id || Array.isArray(id)) return;
    if (!token || Array.isArray(token)) return;
    if (!confirm("投稿を削除しますか？")) return;

    const success = await deletePost(id, token);
    if (success) {
      alert("投稿を削除しました。");
      router.push("/admin/posts");
    } else {
      alert("投稿の削除に失敗しました。");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    fetchData();
  }, []);

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">編集</h1>
      </div>
      {categories.length > 0 && post && (
        <PostForm
          mode="edit"
          title={post.title}
          content={post.content}
          categories={categories}
          thumbnailImageKey={thumbnailImageKey}
          setThumbnailImageKey={setThumbnailImageKey}
          onSubmit={handleFormSubmit}
          onDelete={handleDeletePost}
        />
      )}
    </div>
  );
}
