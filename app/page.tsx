"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../src/api/posts";

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <main className="max-w-2xl mx-auto p-8">Loading...</main>;
  }

  if (error instanceof Error) {
    return <main className="max-w-2xl mx-auto p-8">Error: {error.message}</main>;
  }

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <ul className="space-y-4">
        {data?.length === 0 && <li>No posts yet</li>}
        {data?.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <a href={`/posts/${post.id}`} className="block hover:underline">
              <h2 className="text-xl font-medium">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.createdAt}</p>
              <p className="mt-2 text-gray-700">{post.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
