// routes/userContacts.js
import { Router } from "express";
import {
  createUserContact,
  getUserContacts,
  updateUserContact,
  deleteUserContact,
  searchUserContacts,
} from "../controllers/userContact.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();

r.use(requireAuth);

r.post("/", createUserContact);              // owner
r.get("/user/:userId", getUserContacts);     // owner ili admin
r.get("/user/:userId/search", searchUserContacts);

r.put("/:id", updateUserContact);            // owner ili admin
r.delete("/:id", deleteUserContact);         // owner ili admin

export default r;
