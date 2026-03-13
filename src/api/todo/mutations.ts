import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "./todoService";
import { todoKeys } from "./queries";
import type { components } from "../generated";

type CreateTodoRequest = components["schemas"]["CreateTodoRequest"];
type UpdateTodoRequest = components["schemas"]["UpdateTodoRequest"];

export function useCreateTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTodoRequest) => todoService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}

export function useUpdateTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTodoRequest }) =>
      todoService.update(id, payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: todoKeys.detail(id) });
      qc.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}

export function useDeleteTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => todoService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}

export function useDeleteTodosBulk() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => todoService.removeBulk(ids),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
