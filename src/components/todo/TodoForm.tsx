"use client";

import { useEffect } from "react";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Alert } from "@/src/components/ui/alert";
import type { components } from "@/src/api/generated";
import { useTodoForm } from "@/src/hooks/useTodoForm";

type Todo = components["schemas"]["Todo"];

export type TodoFormMode = "create" | "edit";

type Props = {
  mode: TodoFormMode;
  initialTodo?: Todo;
};

export function TodoForm({ mode, initialTodo }: Props) {
  const { values, errors, isSubmitting, submitError, setField, submit } = useTodoForm({
    mode,
    initialTodo,
  });

  useEffect(() => {
    if (initialTodo) {
      setField("title", initialTodo.title);
      setField("description", initialTodo.description ?? "");
      if (mode === "edit") {
        setField("status", initialTodo.status);
      }
    }
  }, [initialTodo, mode, setField]);

  return (
    <Card className="mb-6">
      <form onSubmit={submit} className="space-y-6" noValidate>
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={values.title}
            onChange={(e) => setField("title", e.target.value)}
            aria-invalid={Boolean(errors.title)}
            placeholder="Task title"
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={values.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Optional description"
          />
          {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
        </div>

        {mode === "edit" && (
          <div className="space-y-1">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={values.status}
              onChange={(e) => setField("status", e.target.value as Todo["status"])}
              className="w-full border border-rule bg-paper px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rule"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        )}

        {submitError && <Alert>{submitError}</Alert>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create task"
              : "Save changes"}
        </Button>
      </form>
    </Card>
  );
}
