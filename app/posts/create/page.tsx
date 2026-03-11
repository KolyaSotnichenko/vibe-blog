"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost, CreatePostInput } from "@/src/api/posts";

export default function CreatePostPage() {
  const [form, setForm] = useState<CreatePostInput>({
    title: "",
    content: "",
    author: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setSuccess(true);
      setError(null);
    },
    onError: (e: unknown) => {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    },
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    mutation.mutate(form);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Title"
          className="w-full border p-2"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={onChange}
          placeholder="Content"
          className="w-full border p-2"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={onChange}
          placeholder="Author"
          className="w-full border p-2"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white disabled:opacity-50"
          disabled={mutation.isPending}
        >
          Create
        </button>
      </form>
      {success && (
        <p className="text-green-600 mt-4" role="status" aria-live="polite">
          Post created successfully
        </p>
      )}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
