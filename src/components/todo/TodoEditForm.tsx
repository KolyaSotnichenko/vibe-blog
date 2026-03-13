"use client";

import { useTodo } from "@/src/api/todo/queries";
import { TodoForm } from "@/src/components/todo/TodoForm";

type UpdateTodoRequest = components["schemas"]["UpdateTodoRequest"];

export function TodoEditForm({ id, onDone }: { id: string; onDone?: () => void }) {
  const { data, isLoading, error } = useTodo(id);

  if (isLoading) {
    return <p className="text-sm text-ink-muted">Loading...</p>;
  }

  if (error || !data) {
    return <p className="text-sm text-ink-muted">Failed to load task</p>;
  }
  return <TodoForm mode="edit" initialTodo={data} />;
}
