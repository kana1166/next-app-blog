/** @format */
"use client";
import React, { useState, useEffect } from "react";
import PostForm from "@/app/admin/posts/_componets/PostForm";
import { useParams, useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { FormData } from "@/types/FormData";
import { updatePost, deletePost } from "@/app/admin/_hooks/useAdminPost";
import {
  useFetchPostData,
  useAdminPost,
} from "@/app/admin/_hooks/useAdminPost";

export default function Page() {
  const { id } = useParams<{ id: string | string[] }>();
  const router = useRouter();
  const { token } = useSupabaseSession();
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string>("");

  useEffect(() => {
    console.log("Token:", token); // トークンをログ出力して確認
  }, [token]);

  const { post, postError, isLoading, categories, categoriesError } =
    useFetchPostData(id as string, token);

  useEffect(() => {
    if (post && post.thumbnailImageKey) {
      setThumbnailImageKey(post.thumbnailImageKey);
    }
  }, [post]);

  const handleFormSubmit = async (data: FormData) => {
    if (!id || !token) return;

    const postData = {
      title: data.title,
      content: data.content,
      thumbnailImageKey: data.thumbnailImageKey,
      categories: [data.category],
    };
    const success = await updatePost(id as string, token, postData);
    if (success) {
      alert("投稿を更新しました。");
      router.push(`/admin/posts`);
    } else {
      alert("投稿の更新に失敗しました。");
    }
  };

  const handleDeletePost = async () => {
    if (!id || !token) return;
    if (!confirm("投稿を削除しますか？")) return;

    const success = await deletePost(id as string, token);
    if (success) {
      alert("投稿を削除しました。");
      router.push("/admin/posts");
    } else {
      alert("投稿の削除に失敗しました。");
    }
  };

  if (isLoading) return <p>読み込み中...</p>;
  if (postError || categoriesError)
    return <p>エラー: {postError || categoriesError}</p>;
  if (!post) return <p>投稿が見つかりません。</p>;

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
