import { Post } from "./types";
import { apiFetch } from "./apiClient";

export async function getPosts(): Promise<Post[]> {
  return apiFetch<Post[]>("/posts");
}

export async function getPostById(id: number): Promise<Post> {
  return apiFetch<Post>(`/posts/${id}`);
}

export interface UpdatePostInput {
  title: string;
  content: string;
}

export async function updatePost(id: number, input: UpdatePostInput): Promise<Post> {
  return apiFetch<Post>(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
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

export async function deletePost(id: number): Promise<void> {
  await apiFetch<void>(`/posts/${id}`, {
    method: "DELETE",
  });
}
