import { Router } from "express";
import {
  createContact,
  getUserContacts,
  updateContact,
  deleteContact,
  searchContacts,
} from "../controllers/contact.js";

const r = Router();

// Dodaj kontakt
r.post("/", createContact);

// Svi kontakti jednog user-a
r.get("/user/:userId", getUserContacts);
r.get("/user/:userId/search", searchContacts);

// Update
r.put("/:id", updateContact);

// Brisanje
r.delete("/:id", deleteContact);

export default r;
