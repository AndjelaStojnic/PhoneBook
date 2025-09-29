// routes/combinedContacts.js
import { Router } from "express";
import { searchAllContacts } from "../controllers/contactCombined.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();

r.use(requireAuth);

r.get("/user/:userId/all", searchAllContacts); // owner ili admin

export default r;
