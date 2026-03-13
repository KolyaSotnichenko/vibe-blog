"use client";

import { useRouter } from "next/navigation";
import type { components } from "@/src/api/generated";
import { todoService } from "@/src/api/todo/todoService";

type Todo = components["schemas"]["Todo"];

type Props = {
  todo: Todo;
};

export function TodoActions({ todo }: Props) {
  const router = useRouter();

  async function onDelete() {
    await todoService.remove(todo.id);
    router.push("/todos");
  }

  async function onToggleComplete() {
    await todoService.update(todo.id, { completed: !todo.completed });
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={onToggleComplete}
        className="rounded-md bg-black px-4 py-2 text-sm text-white"
      >
        {todo.completed ? "Reopen" : "Complete"}
      </button>

      <button
        onClick={() => router.push(`/todos/${todo.id}/edit`)}
        className="rounded-md border px-4 py-2 text-sm"
      >
        Edit
      </button>

      <button
        onClick={onDelete}
        className="rounded-md border border-red-500 px-4 py-2 text-sm text-red-600"
      >
        Delete
      </button>
    </div>
  );
}
