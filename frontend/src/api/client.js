const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || res.statusText);
  }
  return data;
}
