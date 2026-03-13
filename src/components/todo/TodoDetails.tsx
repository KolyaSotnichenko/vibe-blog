"use client";

import type { components } from "@/src/api/generated";
import { useState } from "react";
import { useUpdateTodo } from "@/src/api/todo/mutations";

type Todo = components["schemas"]["Todo"];

type Props = {
  todo: Todo;
};

export function TodoDetails({ todo }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const updateTodo = useUpdateTodo();

  function onSave() {
    updateTodo.mutate({ id: todo.id, payload: { title } });
    setEditing(false);
  }

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        {editing ? (
          <div className="flex gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border px-2 py-1"
            />
            <button onClick={onSave} className="text-sm underline">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="text-sm underline">
              Cancel
            </button>
          </div>
        ) : (
          <h1
            className="cursor-pointer text-2xl font-semibold leading-tight"
            onClick={() => setEditing(true)}
          >
            {todo.title}
          </h1>
        )}
        <p className="text-sm text-muted-foreground">
          Status: {todo.completed ? "Completed" : "Open"}
        </p>
      </header>

      {todo.description && (
        <p className="whitespace-pre-wrap text-base leading-relaxed">{todo.description}</p>
      )}
    </section>
  );
}
