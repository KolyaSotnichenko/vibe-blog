import { useQuery } from "@tanstack/react-query";
import { todoService } from "./todoService";

export const todoKeys = {
  all: ["todos"] as const,
  detail: (id: string) => ["todos", id] as const,
};

export function useTodos() {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: () => todoService.list(),
  });
}

export function useTodo(id: string) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoService.get(id),
    enabled: Boolean(id),
  });
}
