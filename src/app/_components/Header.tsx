import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-100 text-center p-4">
      <Link href="/">Blog</Link>
      <Link href="/contact">お問い合わせ</Link>
    </header>
  );
};
