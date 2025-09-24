import { Router } from "express";
import {
  register,
  verify,
  login,
  requestEmailChange,
  verifyNewEmail,
  list,
  get,
  update,
  remove,
} from "../controllers/user.js";

const r = Router();

/* =====================
   User Routes
===================== */
r.post("/register", register);
r.get("/verify/:token", verify);

r.post("/login", login);

r.post("/change-email", requestEmailChange);
r.get("/verify-email/:token", verifyNewEmail);

r.get("/", list);
r.get("/:id", get);
r.put("/:id", update);
r.delete("/:id", remove);

export default r;
