import { apiClient } from "../apiClient";
import type { components } from "../generated";

type Todo = components["schemas"]["Todo"];
type CreateTodoRequest = components["schemas"]["CreateTodoRequest"];
type UpdateTodoRequest = components["schemas"]["UpdateTodoRequest"];

export const todoService = {
  list(params?: { search?: string }): Promise<Todo[]> {
    const query = params?.search ? `?search=${encodeURIComponent(params.search)}` : "";
    return apiClient<Todo[]>(`/todos${query}`);
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
  async removeBulk(
    ids: string[],
  ): Promise<{ successIds: string[]; failed: { id: string; error: unknown }[] }> {
    const successIds: string[] = [];
    const failed: { id: string; error: unknown }[] = [];
    for (const id of ids) {
      try {
        await this.remove(id);
        successIds.push(id);
      } catch (error) {
        failed.push({ id, error });
      }
    }
    return { successIds, failed };
  },
};
