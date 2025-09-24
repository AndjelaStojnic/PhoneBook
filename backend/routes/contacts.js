import { Router } from "express";
import {
  createContact,
  getUserContacts,
  updateContact,
  deleteContact,
  searchContacts,
} from "../controllers/contact.js";

const r = Router();

/* =====================
   Contact Routes
===================== */
r.post("/", createContact);

r.get("/user/:userId", getUserContacts);
r.get("/user/:userId/search", searchContacts);

r.put("/:id", updateContact);
r.delete("/:id", deleteContact);

export default r;
