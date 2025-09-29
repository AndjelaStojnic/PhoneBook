import { apiFetch } from "./client";

export const usersApi = {
  get: (id) => apiFetch(`/users/${id}`),

  update: (id, payload) =>
    apiFetch(`/users/${id}`, { method: "PUT", body: payload }),

  remove: (id) =>
    apiFetch(`/users/${id}`, { method: "DELETE" }),

  list: () =>
    apiFetch("/users", { method: "GET" }),

  // 📧 promjena emaila
  requestEmailChange: (userId, newEmail) =>
    apiFetch("/users/change-email", { method: "POST", body: { userId, newEmail } }),

  verifyNewEmail: (token) =>
    apiFetch(`/users/verify-email/${token}`, { method: "GET" }),

  // 🔑 promjena lozinke
  changePassword: (userId, newPassword) =>
    apiFetch("/users/change-password", {
      method: "POST",
      body: { userId, newPassword },
    }),
};
