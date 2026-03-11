import { Post } from "./types";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch("/posts");

  if (!response.ok) {
    throw new Error(`Failed to load posts: ${response.status}`);
  }

  return response.json() as Promise<Post[]>;
}
