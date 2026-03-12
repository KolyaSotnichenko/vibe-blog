import Link from "next/link";

export function BlogNav() {
  return (
    <header className="w-full border-b border-gray-200">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3 text-sm">
        <Link href="/" className="font-medium hover:underline">
          Home
        </Link>
        <Link href="/posts/create" className="hover:underline">
          New Post
        </Link>
      </nav>
    </header>
  );
}
