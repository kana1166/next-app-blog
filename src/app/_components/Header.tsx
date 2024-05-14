import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-700 p-4 flex justify-between text-white">
      <Link href="/">Blog</Link>
      <Link href="/contact">お問い合わせ</Link>
      <Link href="/admin/posts">管理画面</Link>
    </header>
  );
};
