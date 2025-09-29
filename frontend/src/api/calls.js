import { apiFetch } from "./client";

const BASE = "/calls";

export const callsApi = {
  create: (data) => apiFetch(BASE, { method: "POST", body: data }),
  listByUser: (userId) => apiFetch(`${BASE}/user/${userId}`),
  search: (userId, q) =>
    apiFetch(`${BASE}/user/${userId}/search?q=${encodeURIComponent(q)}`),
  remove: (id, userId) => apiFetch(`${BASE}/${id}/${userId}`, { method: "DELETE" }),

};
