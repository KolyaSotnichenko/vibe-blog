"use client";

import { useTodos } from "@/src/api/todo/queries";
import { CreateTodoForm } from "@/src/components/todo/CreateTodoForm";
import { useDeleteTodo } from "@/src/api/todo/mutations";
import { useState } from "react";

export default function TodosPage() {
  const { data, isLoading, isError, refetch } = useTodos();
  const deleteTodo = useDeleteTodo();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="space-y-3">
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <p className="mb-4 text-sm text-gray-600">Failed to load tasks</p>
        <button
          onClick={() => refetch()}
          className="rounded border border-gray-300 px-3 py-1 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-xl font-medium">ToDo</h1>
      <CreateTodoForm />
      {data && data.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks yet</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {data?.map((todo) => (
            <li key={todo.id} className="py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-900">{todo.title}</span>
                  <span className="text-xs text-gray-500">{todo.status}</span>
                </div>
                {confirmId === todo.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setConfirmId(null)}
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                      disabled={deleteTodo.isPending}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        deleteTodo.mutate(todo.id, { onSuccess: () => setConfirmId(null) })
                      }
                      className="rounded bg-red-600 px-2 py-1 text-xs text-white disabled:opacity-50"
                      disabled={deleteTodo.isPending}
                    >
                      {deleteTodo.isPending ? "Deleting..." : "Confirm"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(todo.id)}
                    className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
              {deleteTodo.isError && confirmId === todo.id && (
                <p className="mt-2 text-xs text-red-600">Failed to delete task</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
