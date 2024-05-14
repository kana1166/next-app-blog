/** @format */

"use client";
import { useParams } from "next/navigation";
import { usePost } from "../../_hooks/usePosts";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const { id } = useParams();
  const { post } = usePost(id as string);

  const formatDate = (jsonDate: string) => {
    const dateObj = new Date(jsonDate);
    const year = dateObj.getFullYear();
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    return `${year}/${month}/${date}`;
  };

  if (!post) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex justify-center m-4">
          <Image
            src={`https://qxsmvoftnuaqdbtoqkug.supabase.co/storage/v1/object/public/blog/${post.thumbnailImageKey}`}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
        <div className="flex justify-between w-full max-w-3xl px-4 text-xs">
          <p>{formatDate(post.createdAt)}</p>
          <div>
            {post.postCategories.map((category, index) => (
              <span
                key={index}
                className="border border-gray-400 py-2 px-2 rounded ml-2"
              >
                {category.category.name}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-2xl m-4">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <Link href="/">
          <div className="mt-8 inline-block px-6 py-2 text-white bg-gray-500 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ">
            戻る
          </div>
        </Link>
      </div>
    </>
  );
};

export default Page;
