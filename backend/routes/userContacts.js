import { Router } from "express";
import {
  createUserContact,
  getUserContacts,
  updateUserContact,
  deleteUserContact,
  searchUserContacts,
} from "../controllers/userContact.js";

const r = Router();

r.post("/", createUserContact);
r.get("/user/:userId", getUserContacts);
r.get("/user/:userId/search", searchUserContacts);
r.put("/:id", updateUserContact);
r.delete("/:id", deleteUserContact);

export default r;
