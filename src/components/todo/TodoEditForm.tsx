"use client";

import { useState } from "react";
import { useTodo } from "@/src/api/todo/queries";
import { useUpdateTodo } from "@/src/api/todo/mutations";
import type { components } from "@/src/api/generated";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";

type UpdateTodoRequest = components["schemas"]["UpdateTodoRequest"];

export function TodoEditForm({ id, onDone }: { id: string; onDone?: () => void }) {
  const { data, isLoading, error } = useTodo(id);

  if (isLoading) {
    return <p className="text-sm text-gray-600">Loading...</p>;
  }

  if (error || !data) {
    return <p className="text-sm text-red-600">Failed to load task</p>;
  }

  return <InnerEditForm id={id} data={data} onDone={onDone} />;
}

function InnerEditForm({
  id,
  data,
  onDone,
}: {
  id: string;
  data: components["schemas"]["Todo"];
  onDone?: () => void;
}) {
  const updateTodo = useUpdateTodo();
  const [title, setTitle] = useState(data.title ?? "");
  const [description, setDescription] = useState(data.description ?? "");
  const [status, setStatus] = useState(data.status);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }

    const payload: UpdateTodoRequest = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
    };

    try {
      await updateTodo.mutateAsync({ id, payload });
      onDone?.();
    } catch (e) {
      void e;
      setFormError("Failed to update task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded border p-4">
      <div className="mb-3">
        <Label className="mb-1 block">Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <Label className="mb-1 block">Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      {formError && <p className="mb-3 text-sm text-red-600">{formError}</p>}
      <Button type="submit" disabled={updateTodo.isPending}>
        {updateTodo.isPending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
