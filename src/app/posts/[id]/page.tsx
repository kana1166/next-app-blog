"use client";
import { useParams } from "next/navigation";
import { usePost } from "../../hooks/usePosts";

const Page = () => {
  const { id } = useParams();
  const { post, loading } = usePost(id as string);

  const formatDate = (jsonDate: string) => {
    const dateObj = new Date(jsonDate);
    const year = dateObj.getFullYear();
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    return `${year}/${month}/${date}`;
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!post) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex justify-center m-4">
          <img src={post.thumbnail.url} alt={post.title} />
        </div>
        <div className="flex justify-between w-full max-w-3xl px-4 text-xs">
          <p>{formatDate(post.createdAt)}</p>
          <div>
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="border border-gray-400 py-2 px-2 rounded ml-2"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-2xl m-4">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </>
  );
};

export default Page;
