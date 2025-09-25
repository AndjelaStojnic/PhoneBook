import { apiFetch } from "./client";

export const contactsApi = {
  allCombined: (userId, q = "") =>
    apiFetch(`/contacts-combined/user/${userId}/all${q ? `?q=${encodeURIComponent(q)}` : ""}`),

    favorites: (userId) =>
    apiFetch(`/contacts-combined/user/${userId}/all`).then((res) => ({
      ...res,
      data: (res.data || []).filter((c) => c.favorite),
    })),

  create: (payload) =>
    apiFetch("/contacts", { method: "POST", body: payload }),

  update: (id, payload) =>
    apiFetch(`/contacts/${id}`, { method: "PUT", body: payload }),

  remove: (id) =>
    apiFetch(`/contacts/${id}`, { method: "DELETE" }),
};
