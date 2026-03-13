import { useQuery } from "@tanstack/react-query";
import { todoService } from "./todoService";

export const todoKeys = {
  all: ["todos"] as const,
  detail: (id: string) => ["todos", id] as const,
};

export function useTodos(search?: string) {
  return useQuery({
    queryKey: [...todoKeys.all, search ?? ""],
    queryFn: async () => {
      const todos = await todoService.list();
      if (!search) {
        return todos;
      }
      const needle = search.toLowerCase();
      return todos.filter((todo) => {
        const titleMatch = todo.title.toLowerCase().includes(needle);
        const descriptionMatch = todo.description
          ? todo.description.toLowerCase().includes(needle)
          : false;
        return titleMatch || descriptionMatch;
      });
    },
  });
}

export function useTodo(id: string) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoService.get(id),
    enabled: Boolean(id),
  });
}
