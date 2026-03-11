"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById, updatePost, deletePost } from "@/src/api/posts";
import { Post } from "@/src/api/types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: async () => updatePost(id, { title, content }),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => deletePost(id),
  });

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
  if (title === "" && content === "") {
    setTitle(post.title);
    setContent(post.excerpt);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 text-2xl font-semibold">Редагування поста</h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <input
          className="w-full rounded border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full rounded border px-3 py-2"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          disabled={mutation.isPending}
        >
          Зберегти
        </button>
        {mutation.isError && (
          <p className="text-sm text-red-600">Помилка оновлення поста</p>
        )}
        {mutation.isSuccess && (
          <p className="text-sm text-green-600">Пост оновлено</p>
        )}
      </form>

      <div className="mt-10 border-t pt-6">
        <h2 className="mb-2 text-lg font-medium">Видалення поста</h2>
        <p className="mb-4 text-sm text-gray-600">
          Цю дію неможливо скасувати. Ви впевнені, що хочете видалити пост?
        </p>
        <button
          className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
          disabled={deleteMutation.isPending}
          onClick={() => {
            if (confirm("Підтвердити видалення поста?")) {
              deleteMutation.mutate();
            }
          }}
        >
          Видалити пост
        </button>
        {deleteMutation.isError && (
          <p className="mt-2 text-sm text-red-600">Помилка видалення поста</p>
        )}
        {deleteMutation.isSuccess && (
          <p className="mt-2 text-sm text-green-600">Пост видалено</p>
        )}
      </div>
    </div>
  );
}
