"use client";

import { useTodos } from "@/src/api/todo/queries";
import Link from "next/link";
import { useDeleteTodo } from "@/src/api/todo/mutations";
import { useUpdateTodo } from "@/src/api/todo/mutations";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Alert } from "@/src/components/ui/alert";
import { Input } from "@/src/components/ui/input";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";

export default function TodosPage() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { data, isLoading, isError, refetch } = useTodos(debouncedSearch);
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
    <div className="grid grid-cols-1 gap-6">
      <section>
        <div className="mb-4 rounded-md border bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-lg font-semibold">Tasks</h1>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button size="sm" asChild>
                <Link href="/todos/new">Create</Link>
              </Button>
            </div>
          </div>
        </div>

        {data && data.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks yet</p>
        ) : (
          <ul className="space-y-3">
            {data?.map((todo) => (
              <li key={todo.id}>
                <Card className="hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-base font-medium">{todo.title}</span>
                      <label className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          checked={todo.status === "done"}
                          disabled={updateTodo.isPending}
                          onChange={() =>
                            updateTodo.mutate({
                              id: todo.id,
                              payload: {
                                status: todo.status === "done" ? "pending" : "done",
                              },
                            })
                          }
                        />
                        {todo.status === "done" ? "Completed" : "Pending"}
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
                          Confirm
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
      </section>
    </div>
  );
}
