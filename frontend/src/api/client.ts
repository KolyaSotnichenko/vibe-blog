import type { Paths } from './generated';

export class ApiClient {
  async request<T>(path: keyof Paths): Promise<T> {
    const response = await fetch(String(path), {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return (await response.json()) as T;
  }
}

export const apiClient = new ApiClient();
