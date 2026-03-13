"use client";

import { useState } from "react";
import { useCreateTodo } from "@/src/api/todo/mutations";
import type { components } from "@/src/api/generated";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";

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
    <form onSubmit={handleSubmit} className="mb-6 rounded-lg border p-4">
      <div className="mb-3">
        <Label className="mb-1 block">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
        />
      </div>
      <div className="mb-3">
        <Label className="mb-1 block">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
        />
      </div>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={createTodo.isPending}>
        {createTodo.isPending ? "Creating..." : "Add task"}
      </Button>
    </form>
  );
}
