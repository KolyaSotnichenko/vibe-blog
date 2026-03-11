import type { Paths } from './generated/openapi';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async postPosts(body: unknown): Promise<Paths['/posts']['post']['responses'][201]> {
    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });

     if (!response.ok) {
       const err: any = new Error(`Request failed with status ${response.status}`);
       err.status = response.status;
       throw err;
     }

    return (await response.json()) as Paths['/posts']['post']['responses'][201];
  }

  async getPostById(id: number): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to load post');
    }

    return await response.json();
  }

  async updatePost(id: number, body: unknown): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update post');
    }

    return await response.json();
  }

  async getPosts(): Promise<unknown[]> {
    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to load posts');
    }

    return (await response.json()) as unknown[];
  }

  async deletePost(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
  }
}
