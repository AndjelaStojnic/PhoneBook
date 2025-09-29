import { apiFetch } from "./client";

export const contactsApi = {
  allCombined: (userId, q = "") =>
    apiFetch(`/contacts-combined/user/${userId}/all${q ? `?q=${encodeURIComponent(q)}` : ""}`),

  favorites: (userId) =>
    apiFetch(`/contacts-combined/user/${userId}/all`).then((res) => ({
      ...res,
      data: (res.data || []).filter((c) => c.favorite),
    })),

  // ➕ kreiranje ručnog kontakta
  create: (payload) =>
    apiFetch("/contacts", { method: "POST", body: payload }),

  // ➕ kreiranje userContact
  createUserContact: (payload) =>
    apiFetch("/user-contacts", { method: "POST", body: payload }),

  // ✏️ univerzalni update (radi i za userContact i za manualContact)
  update: (contact) => {
    if (contact.type === "userContact") {
      return apiFetch(`/user-contacts/${contact.id}`, {
        method: "PUT",
        body: {
          favorite: contact.favorite,
          nickname: contact.nickname,
        },
      });
    } else {
      return apiFetch(`/contacts/${contact.id}`, {
        method: "PUT",
        body: contact,
      });
    }
  },

  // 🗑 univerzalni remove (radi i za userContact i za manualContact)
  remove: (contact) => {
    if (contact.type === "userContact") {
      return apiFetch(`/user-contacts/${contact.id}`, { method: "DELETE" });
    } else {
      return apiFetch(`/contacts/${contact.id}`, { method: "DELETE" });
    }
  },
};
