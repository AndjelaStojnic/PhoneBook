import { Router } from "express";
import {
  createCall,
  getUserCalls,
  deleteCall,
  searchCalls,
} from "../controllers/call.js";

const r = Router();

r.post("/", createCall); // dodaj missed poziv
r.get("/user/:userId", getUserCalls); 
r.get("/user/:userId/search", searchCalls);
r.delete("/:id", deleteCall);

export default r;
