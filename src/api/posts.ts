import { Post } from "./types";
import { apiFetch } from "./apiClient";

export async function getPosts(): Promise<Post[]> {
  return apiFetch<Post[]>("/posts");
}

export async function getPostById(id: number): Promise<Post> {
  return apiFetch<Post>(`/posts/${id}`);
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  return apiFetch<Post>("/posts", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
