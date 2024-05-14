"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-[300px] h-screen bg-gray-100 flex flex-col">
        <Link href="/admin/posts/new" className={"p-4 block hover:bg-blue-100"}>
          記事作成
        </Link>
        <Link
          href="/admin/categories"
          className={"p-4 block hover:bg-blue-100 "}
        >
          カテゴリー管理
        </Link>
      </div>
      <div className="flex-1">
        <div className="container mx-auto px-4">{children}</div>
      </div>
    </div>
  );
}
