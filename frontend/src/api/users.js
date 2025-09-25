import { apiFetch } from "./client";

export const usersApi = {
  get: (id) => apiFetch(`/users/${id}`),
  update: (id, payload) => apiFetch(`/users/${id}`, { method: "PUT", body: payload }),
  remove: (id) => apiFetch(`/users/${id}`, { method: "DELETE" }),

  // posebne rute
  requestEmailChange: (userId, newEmail) =>
    apiFetch("/users/change-email", { method: "POST", body: { userId, newEmail } }),
};
