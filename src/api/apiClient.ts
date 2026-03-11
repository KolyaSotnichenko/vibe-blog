export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function messageForStatus(status: number): string {
  switch (status) {
    case 400:
      return "Некоректний запит.";
    case 401:
      return "Потрібна авторизація.";
    case 403:
      return "Доступ заборонено.";
    case 404:
      return "Ресурс не знайдено.";
    case 422:
      return "Помилка валідації даних.";
    case 500:
      return "Внутрішня помилка сервера.";
    default:
      return "Невідома помилка.";
  }
}

export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const message = messageForStatus(response.status);
    throw new ApiError(response.status, message);
  }

  return response.json() as Promise<T>;
}
