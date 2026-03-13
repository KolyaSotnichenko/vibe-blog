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
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border-2 border-orange-300 bg-white p-4 shadow-md"
    >
      <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border-2 border-orange-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="New task title"
        />
      </div>
      <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border-2 border-orange-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Optional description"
        />
      </div>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={createTodo.isPending}
        className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 disabled:opacity-50"
      >
        {createTodo.isPending ? "Creating..." : "Add task"}
      </button>
    </form>
  );
}
