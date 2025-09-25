const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || "API error");
  }
  return data;
}

export const authApi = {
  register: (payload) => request("/users/register", { method: "POST", body: payload }),
  login: (payload) => request("/users/login", { method: "POST", body: payload }),
};
