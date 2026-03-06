import type { Paths } from './generated/openapi';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async postPosts(): Promise<Paths['/posts']['post']['responses'][201]> {
    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as Paths['/posts']['post']['responses'][201];
  }
}
