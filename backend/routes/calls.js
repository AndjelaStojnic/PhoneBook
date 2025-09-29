// routes/calls.js
import { Router } from "express";
import {
  createCall,
  getUserCalls,
  searchCalls,
  deleteCall,
  hardDeleteCall,
} from "../controllers/call.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const r = Router();

r.use(requireAuth);

r.post("/", createCall); // svaki logovani user može

r.get("/user/:userId", getUserCalls);         // samo owner ili admin
r.get("/user/:userId/search", searchCalls);   // samo owner ili admin

r.delete("/:id/:userId", deleteCall);         // caller/called ili admin
r.delete("/hard/:id", requireRole("admin"), hardDeleteCall); // samo admin

export default r;
