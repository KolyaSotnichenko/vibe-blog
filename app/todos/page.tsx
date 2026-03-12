"use client";

import { useTodos } from "@/src/api/todo/queries";
import { CreateTodoForm } from "@/src/components/todo/CreateTodoForm";

export default function TodosPage() {
  const { data, isLoading, isError, refetch } = useTodos();

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
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900">{todo.title}</span>
                <span className="text-xs text-gray-500">{todo.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
