
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type ApiOptions = {
  method?: "GET" | "POST";
  body?: unknown;
};

export async function apiRequest<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    credentials: "include",
    headers: options.body
      ? { "Content-Type": "application/json" }
      : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = data.detail;
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((item: { msg?: string }) => item.msg).join(", ")
          : "Something went wrong. Please try again.";

    throw new Error(message);
  }

  return data as T;
}

export type UserRole = "freelancer" | "employer" | "admin";

export type User = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active?: boolean;
};
