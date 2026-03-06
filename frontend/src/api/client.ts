import type { HealthResponse } from "./generated";

const API_BASE_URL = "/api";

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (typeof data === "object" && data !== null && "status" in data) {
    return data as HealthResponse;
  }

  throw new Error("Invalid response format");
}
