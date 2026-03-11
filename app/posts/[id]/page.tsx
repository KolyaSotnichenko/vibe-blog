"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/src/api/posts";
import { Post } from "@/src/api/types";

function StatusMessage({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-3xl py-16 text-center text-sm text-gray-500">
      {message}
    </div>
  );
}

export default function PostPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const query = useQuery<Post, Error>({
    queryKey: ["post", id],
    enabled: Number.isFinite(id),
    queryFn: async () => {
      if (!Number.isFinite(id)) {
        throw new Error("Invalid post id");
      }
      return getPostById(id);
    },
  });

  if (!Number.isFinite(id)) {
    return <StatusMessage message="Некоректний ідентифікатор поста." />;
  }

  if (query.isLoading) {
    return <StatusMessage message="Завантаження поста…" />;
  }

  if (query.isError) {
    return <StatusMessage message={query.error.message} />;
  }

  const post = query.data;
  if (!post) {
    return <StatusMessage message="Пост не знайдено." />;
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-semibold">{post.title}</h1>
      <div className="mb-8 text-sm text-gray-500">
        <span>Post #{post.id}</span> · <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="prose prose-neutral max-w-none">{post.excerpt}</div>
    </article>
  );
}
