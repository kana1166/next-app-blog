"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Post } from "../../../types/Post";
import Link from "next/link";

export default function Page() {
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/posts");
      const { posts } = await res.json();
      setPosts(posts);
    };
    fetcher();
  }, []);

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
        <ul className="m-4">
          {posts.map((post) => (
            <Link href={`/admin/posts/${post.id}`}>
              <div className="flex items-center border border-gray-200">
                <div className="m-4">
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-[200px] h-auto"
                  />
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
