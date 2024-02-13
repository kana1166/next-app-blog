"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PostInterface {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<PostInterface | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fecher = async () => {
      const response = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      );

      const { post } = await response.json();
      setPosts(post);
    };
    fecher();
  }, [id]);

  const formatDate = (jsonDate: string) => {
    const dateObj = new Date(jsonDate);
    const year = dateObj.getFullYear();
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    return `${year}/${month}/${date}`;
  };

  if (!posts) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex justify-center m-4">
          <img src={posts.thumbnailUrl} alt={posts.title} />
        </div>
        <div className="flex justify-between w-full max-w-3xl px-4 text-xs">
          <p>{formatDate(posts.createdAt)}</p>
          <div>
            {posts.categories.map((category, index) => (
              <span
                key={index}
                className="border border-gray-400 py-2 px-2 rounded ml-2"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-2xl m-4">{posts.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: posts.content }}></div>
      </div>
    </>
  );
};

export default Post;
