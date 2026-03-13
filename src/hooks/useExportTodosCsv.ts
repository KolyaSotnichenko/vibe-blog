import { toCsv } from "@/src/lib/csv";
import { components } from "@/src/api/schema";

type Todo = components["schemas"]["Todo"];

export function useExportTodosCsv() {
  return (todos: Todo[]): void => {
    const headers = ["id", "title", "status", "createdAt", "updatedAt"];
    const rows = todos.map((todo) => [
      String(todo.id),
      todo.title,
      todo.status,
      todo.createdAt,
      todo.updatedAt,
    ]);

    const csv = toCsv(headers, rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `todos-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };
}
