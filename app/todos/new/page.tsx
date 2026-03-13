"use client";

import Link from "next/link";
import { CreateTodoForm } from "@/src/components/todo/CreateTodoForm";
import { Button } from "@/src/components/ui/button";

export default function NewTodoPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600">Create task</h1>
        <Button asChild variant="outline" size="sm">
          <Link href="/todos">Back to list</Link>
        </Button>
      </div>
      <CreateTodoForm />
    </div>
  );
}
