/** @format */

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Category } from "@/types/Category";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { fetchCategories } from "@/app/admin/_hooks/useAdminPost";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useSupabaseSession();

  useEffect(() => {
    const fetcher = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (token) {
      fetcher();
    }
  }, [token]);

  return (
    <div className="">
      <div className="flex justify-between items-center m-8">
        <h1 className="text-xl font-bold">カテゴリー一覧</h1>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/admin/categories/new">新規作成</Link>
        </button>
      </div>

      <div className="m-16">
        {categories.map((category) => {
          return (
            <Link href={`/admin/categories/${category.id}`} key={category.id}>
              <div className="flex items-center border border-gray-200 justify-center p-4 hover:bg-gray-100 cursor-pointer">
                <div className="text-xl font-bold">{category.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex mt-8 justify-center">
        <Link href="/admin/posts" passHref>
          <div className="px-6 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150">
            戻る
          </div>
        </Link>
      </div>
    </div>
  );
}
