import { Router } from "express";
import { searchAllContacts } from "../controllers/contactCombined.js";

const r = Router();

// kombinovani search ili lista
r.get("/user/:userId/all", searchAllContacts);

export default r;
