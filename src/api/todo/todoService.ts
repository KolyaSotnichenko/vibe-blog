import { apiClient } from "../apiClient";
import type { components } from "../generated";

type Todo = components["schemas"]["Todo"];
type CreateTodoRequest = components["schemas"]["CreateTodoRequest"];
type UpdateTodoRequest = components["schemas"]["UpdateTodoRequest"];

export const todoService = {
  list(): Promise<Todo[]> {
    return apiClient<Todo[]>("/todos");
  },

  get(id: string): Promise<Todo> {
    return apiClient<Todo>(`/todos/${id}`);
  },

  create(payload: CreateTodoRequest): Promise<Todo> {
    return apiClient<Todo>("/todos", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: UpdateTodoRequest): Promise<Todo> {
    return apiClient<Todo>(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  remove(id: string): Promise<void> {
    return apiClient<void>(`/todos/${id}`, {
      method: "DELETE",
    });
  },
};
