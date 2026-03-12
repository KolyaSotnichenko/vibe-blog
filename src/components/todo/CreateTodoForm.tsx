"use client";

import { useState } from "react";
import { useCreateTodo } from "@/src/api/todo/mutations";
import type { components } from "@/src/api/generated";

type CreateTodoRequest = components["schemas"]["CreateTodoRequest"];

export function CreateTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const createTodo = useCreateTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const payload: CreateTodoRequest = {
      title: title.trim(),
      description: description.trim() || undefined,
    };

    try {
      await createTodo.mutateAsync(payload);
      setTitle("");
      setDescription("");
    } catch (error) {
      void error;
      setError("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 rounded border border-gray-200 p-4">
      <div className="mb-3">
        <label className="mb-1 block text-sm text-gray-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring"
          placeholder="New task title"
        />
      </div>
      <div className="mb-3">
        <label className="mb-1 block text-sm text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring"
          placeholder="Optional description"
        />
      </div>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={createTodo.isPending}
        className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {createTodo.isPending ? "Creating..." : "Add task"}
      </button>
    </form>
  );
}
