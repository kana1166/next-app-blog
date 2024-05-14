/** @format */

"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Post } from "../../../types/Post";
import Link from "next/link";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Image from "next/image";
import { useAdminPosts } from "../_hooks/useAdminPosts";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      const posts = await useAdminPosts(token);
      setPosts([...posts]);
    };

    fetchData();
  }, [token]);

  const limitContent = (content: string) => {
    const limit = 10;
    if (content.length > limit) {
      return content.slice(0, limit) + "...";
    }
    return content;
  };

  const formatDate = (jsonDate: string) => {
    const dateObj = new Date(jsonDate);
    const year = dateObj.getFullYear();
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    return `${year}/${month}/${date}`;
  };

  return (
    <>
      <div className="text-center m-4">
        記事一覧
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/admin/posts/new">新規作成</Link>
        </button>
        <ul className="m-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/admin/posts/${post.id}`}>
              <div className="flex items-center border border-gray-200">
                <div className="m-4">
                  {post.thumbnailImageKey ? (
                    <Image
                      src={`https://qxsmvoftnuaqdbtoqkug.supabase.co/storage/v1/object/public/blog/${post.thumbnailImageKey}`}
                      alt={post.title}
                      width={200}
                      height={200}
                      className="w-[200px] h-auto"
                    />
                  ) : (
                    <Image
                      src="/path/to/default-image.jpg"
                      alt="default image"
                      width={200}
                      height={200}
                      className="w-[200px] h-auto"
                    />
                  )}
                </div>
                <div className="space-y-2 m-4">
                  <p>投稿日時：{formatDate(post.createdAt)}</p>
                  <h2>タイトル：{post.title}</h2>
                  <p>
                    カテゴリ：
                    {post.postCategories
                      ?.map((category) => category.category.name)
                      .join(",") || ""}
                  </p>
                  <p>{limitContent(post.content)}</p>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
