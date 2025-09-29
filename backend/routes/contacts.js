// routes/contacts.js
import { Router } from "express";
import {
  createContact,
  getUserContacts,
  updateContact,
  deleteContact,
  searchContacts,
} from "../controllers/contact.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();

r.use(requireAuth);

r.post("/", createContact);                  // samo owner
r.get("/user/:userId", getUserContacts);     // owner ili admin
r.get("/user/:userId/search", searchContacts);

r.put("/:id", updateContact);                // owner ili admin
r.delete("/:id", deleteContact);             // owner ili admin

export default r;
