"use client";

import Link from "next/link";
import { CreateTodoForm } from "@/src/components/todo/CreateTodoForm";

export default function NewTodoPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600">Create task</h1>
        <Link href="/todos" className="text-sm text-orange-600 underline">
          Back to list
        </Link>
      </div>
      <CreateTodoForm />
    </div>
  );
}
