"use client";

import { useTodos } from "@/src/api/todo/queries";
import Link from "next/link";
import { useDeleteTodo } from "@/src/api/todo/mutations";
import { useUpdateTodo } from "@/src/api/todo/mutations";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Alert } from "@/src/components/ui/alert";

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
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-orange-600">ToDo</h1>
      <div className="mb-6">
        <Button asChild>
          <Link href="/todos/new">Create task</Link>
        </Button>
      </div>
      {data && data.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks yet</p>
      ) : (
        <ul className="space-y-3">
          {data?.map((todo) => (
            <li key={todo.id}>
              <Card>
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setConfirmId(null)}
                        disabled={deleteTodo.isPending}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          deleteTodo.mutate(todo.id, { onSuccess: () => setConfirmId(null) })
                        }
                        disabled={deleteTodo.isPending}
                      >
                        {deleteTodo.isPending ? "Deleting..." : "Confirm"}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setConfirmId(todo.id)}>
                      Delete
                    </Button>
                  )}
                </div>
                {deleteTodo.isError && confirmId === todo.id && (
                  <Alert className="mt-2">Failed to delete task</Alert>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
