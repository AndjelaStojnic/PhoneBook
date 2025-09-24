import { Router } from "express";
import {
  createCall,
  getUserCalls,
  searchCalls,
  deleteCall,
} from "../controllers/call.js";

const r = Router();

/* =====================
   Call Routes
===================== */
r.post("/", createCall);

r.get("/user/:userId", getUserCalls);
r.get("/user/:userId/search", searchCalls);

r.delete("/:id", deleteCall);

export default r;
