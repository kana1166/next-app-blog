"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PostInterface {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
}

export default function Home() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fecher = async () => {
      const response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );
      const { posts } = await response.json();
      setPost(posts);
    };
    fecher();
  }, []);

  const formatDate = (jsonDate: string) => {
    const dateObj = new Date(jsonDate);
    const year = dateObj.getFullYear();
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    return `${year}/${month}/${date}`;
  };

  const limitContent = (content: string) => {
    const limit = 100;
    if (content.length > limit) {
      return content.slice(0, limit) + "...";
    }
    return content;
  };

  const replaceContent = (content: string) => {
    const replacedContent = content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
    return replacedContent;
  };

  return (
    <>
      <div>
        {post.map((post: PostInterface) => {
          const formattedDate = formatDate(post.createdAt);
          const limitedContent = limitContent(post.content);
          const replacedContent = replaceContent(limitedContent);
          return (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div className="shadow-md m-12" key={post.id}>
                <p className="p-4 text-xs">{formattedDate}</p>
                <h2 className="p-2 text-2xl">{post.title}</h2>
                <p className="p-4"> {replacedContent}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
