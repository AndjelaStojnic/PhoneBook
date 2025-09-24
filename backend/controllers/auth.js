import { User } from "../models/User.js";
import crypto from "crypto";

// Helper za hash
function sha1(str) {
  return crypto.createHash("sha1").update(str).digest("hex");
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    // Ako user nije aktivan
    if (!user.active) {
      return res.status(403).json({ ok: false, error: "Account not active" });
    }

    // Provera lockout
    const now = new Date();
    if (
      user.attempts >= 5 &&
      user.attemptedAt &&
      now - user.attemptedAt < 10 * 60 * 1000 // 10 min
    ) {
      return res.status(429).json({
        ok: false,
        error: "Too many failed attempts. Try again later.",
      });
    }

    // Provera lozinke
    if (user.password !== sha1(password)) {
      await user.update({
        attempts: user.attempts + 1,
        attemptedAt: new Date(),
      });

      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    // Ako je prošlo više od 10 minuta od poslednjeg pokušaja → resetuj attempts
    if (user.attemptedAt && now - user.attemptedAt > 10 * 60 * 1000) {
      user.attempts = 0;
    }

    // Reset attempta i upiši login vreme
    await user.update({
      attempts: 0,
      attemptedAt: null,
      lastLoginAt: new Date(),
    });

    // TODO: ovde ide JWT token ako želiš session
    res.json({
      ok: true,
      message: "Login successful",
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function logout(_req, res) {
  // Samo frontend obriše token, backend nema state
  res.json({ ok: true, message: "Logged out" });
}
