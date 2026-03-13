"use client";

import { useTodos } from "@/src/api/todo/queries";
import Link from "next/link";
import { useDeleteTodo } from "@/src/api/todo/mutations";
import { useUpdateTodo } from "@/src/api/todo/mutations";
import { useState } from "react";
import { useBulkTodoSelection } from "@/src/hooks/useBulkTodoSelection";
import { todoService } from "@/src/api/todo/todoService";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Alert } from "@/src/components/ui/alert";
import { Input } from "@/src/components/ui/input";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import { useExportTodosCsv } from "@/src/hooks/useExportTodosCsv";

export default function TodosPage() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { data, isLoading, isError, refetch } = useTodos(debouncedSearch);
  const PAGE_SIZE = 10;
  const [page, setPage] = useState<number>(1);
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const { selectedIds, clear } = useBulkTodoSelection();
  const [bulkLoading, setBulkLoading] = useState<boolean>(false);
  const [bulkError, setBulkError] = useState<string | null>(null);
  const exportTodosCsv = useExportTodosCsv();

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

  const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0;
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedData = data ? data.slice(startIndex, startIndex + PAGE_SIZE) : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Tasks</h1>
          <Button size="sm" asChild>
            <Link href="/todos/new">New task</Link>
          </Button>
        </header>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9"
          />
          <Button
            size="sm"
            variant="outline"
            disabled={!data || data.length === 0}
            onClick={() => exportTodosCsv(paginatedData)}
          >
            Export
          </Button>
        </div>

        {data && data.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks yet</p>
        ) : (
          <>
            {selectedIds.size > 0 && (
              <div className="mb-3 flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={bulkLoading}
                  onClick={async () => {
                    setBulkLoading(true);
                    setBulkError(null);
                    const result = await todoService.removeBulk(Array.from(selectedIds));
                    setBulkLoading(false);
                    if (result.failed.length > 0) {
                      setBulkError("Some tasks failed to delete");
                    }
                    clear();
                    refetch();
                  }}
                >
                  Delete selected ({selectedIds.size})
                </Button>
                {bulkError && <Alert>{bulkError}</Alert>}
              </div>
            )}
            <ul className="divide-y rounded-md border bg-white">
              {paginatedData.map((todo) => (
                <li key={todo.id}>
                  <Card className="rounded-none border-0 shadow-none">
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
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
                        <span
                          className={
                            todo.status === "done"
                              ? "text-sm text-gray-400 line-through"
                              : "text-sm"
                          }
                        >
                          {todo.title}
                        </span>
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
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
