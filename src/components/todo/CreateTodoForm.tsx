"use client";

import { useState } from "react";
import { useCreateTodo } from "@/src/api/todo/mutations";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Alert } from "@/src/components/ui/alert";
import { Label } from "@/src/components/ui/label";
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
    <Card className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task title"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>
        {error && <Alert>{error}</Alert>}
        <Button type="submit" disabled={createTodo.isPending}>
          {createTodo.isPending ? "Creating..." : "Add task"}
        </Button>
      </form>
    </Card>
  );
}
