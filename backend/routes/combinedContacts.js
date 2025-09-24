import { Router } from "express";
import { searchAllContacts } from "../controllers/contactCombined.js";

const r = Router();

/* =====================
   Combined Contacts Routes
===================== */
r.get("/user/:userId/all", searchAllContacts);

export default r;
