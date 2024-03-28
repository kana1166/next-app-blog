"use client";
import Link from "next/link";
import { usePosts } from "./hooks/usePosts";

export default function Home() {
  const { posts } = usePosts();

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
        {posts.map((post) => {
          const formattedDate = formatDate(post.createdAt);
          const limitedContent = limitContent(post.content);
          const replacedContent = replaceContent(limitedContent);
          return (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div className="shadow-md m-12" key={post.id}>
                <p className="p-4 text-xs">{formattedDate}</p>
                <h2 className="p-2 text-2xl">{post.title}</h2>
                <img src={post.thumbnail.url} alt={post.title} />
                <p className="p-4"> {replacedContent}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
