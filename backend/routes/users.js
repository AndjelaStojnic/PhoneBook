// routes/users.js
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
  changePassword,   // 👈 dodaj import
} from "../controllers/user.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const r = Router();

// javni endpoint-i
r.post("/register", register);
r.post("/login", login);
r.get("/verify/:token", verify);
r.post("/change-email", requestEmailChange);
r.get("/verify-email/:token", verifyNewEmail);

// privatni endpoint-i
r.use(requireAuth);

r.get("/", list);                           // svi useri zbog dodavanja novih kontakata
r.get("/:id", get);                         // sam ili admin
r.put("/:id", update);                      // sam ili admin
r.delete("/:id", requireRole("admin"), remove); // samo admin
r.post("/change-password", changePassword); // 👈 nova ruta za promjenu lozinke

export default r;
