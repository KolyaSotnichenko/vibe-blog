"use client";

import { useTodos } from "@/src/api/todo/queries";
import Link from "next/link";
import { useDeleteTodo } from "@/src/api/todo/mutations";
import { useUpdateTodo } from "@/src/api/todo/mutations";
import { useState } from "react";

export default function TodosPage() {
  const { data, isLoading, isError, refetch } = useTodos();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
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
      <h1 className="mb-6 text-2xl font-bold text-orange-600">ToDo</h1>
      <div className="mb-6">
        <Link
          href="/todos/new"
          className="inline-block rounded bg-orange-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Create task
        </Link>
      </div>
      {data && data.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks yet</p>
      ) : (
        <ul className="space-y-3">
          {data?.map((todo) => (
            <li
              key={todo.id}
              className="rounded-2xl border-2 border-orange-300 bg-white p-4 shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-base font-semibold">{todo.title}</span>
                  <label className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={todo.status === "done"}
                      disabled={updateTodo.isPending}
                      onChange={() =>
                        updateTodo.mutate({
                          id: todo.id,
                          payload: { status: todo.status === "done" ? "pending" : "done" },
                        })
                      }
                    />
                    {todo.status === "done" ? "Done" : "Pending"}
                  </label>
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
