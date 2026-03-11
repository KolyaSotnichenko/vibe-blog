import { Post } from "./types";
import { apiFetch } from "./apiClient";

export async function getPosts(): Promise<Post[]> {
  return apiFetch<Post[]>("/posts");
}
