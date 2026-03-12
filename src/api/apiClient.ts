export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function apiClient<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${input}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    let details: unknown = undefined;
    try {
      details = await res.json();
    } catch {
      // ignore parse error
    }

    const error: ApiError = {
      status: res.status,
      message: res.statusText || "Request failed",
      details,
    };
    throw error;
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
