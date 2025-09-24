import { Router } from "express";
import { sequelize } from "../config/db.js";

import users from "./users.js";
import contacts from "./contacts.js";
import userContacts from "./userContacts.js";
import calls from "./calls.js";
import combinedContacts from "./combinedContacts.js";

const r = Router();

/* =====================
   Health & DB check
===================== */
r.get("/health", (_req, res) => res.json({ ok: true }));

r.get("/db/ping", async (_req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT 1 AS ok");
    res.json({ ok: true, db: rows?.[0]?.ok === 1 });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/* =====================
   API Modules
===================== */
r.use("/users", users);
r.use("/contacts", contacts);
r.use("/user-contacts", userContacts);
r.use("/calls", calls);
r.use("/contacts-combined", combinedContacts);

export default r;
