// backend/controllers/user.js
// Controller za User logiku (registracija, CRUD)

import { User } from "../models/User.js";
import { VerificationToken } from "../models/VerificationToken.js";
import { transporter } from "../config/mailer.js";
import crypto from "crypto"; // za hash (SHA1 za sad)

// Helper za SHA1 hash
function sha1(str) {
  return crypto.createHash("sha1").update(str).digest("hex");
}

// Registracija sa email verifikacijom
export async function register(req, res) {
  try {
    const { email, firstName, lastName, phone, password } = req.body;

    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ ok: false, error: "Email already in use" });
    }

    const phoneExists = await User.findOne({ where: { phone } });
    if (phoneExists) {
    return res.status(409).json({ ok: false, error: "Phone number already in use" });
    }

    const user = await User.create({
      email,
      firstName,
      lastName,
      phone,
      password: sha1(password),
      active: false, // tek posle potvrde ide true
      admin: false,
    });

    // kreiraj token
    const token = crypto.randomBytes(32).toString("hex");
    await VerificationToken.create({ userId: user.userId, token });

    const verifyUrl = `${process.env.APP_URL}/api/users/verify/${token}`;

    // šaljemo mail
    await transporter.sendMail({
      from: `"PhoneBook" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Verify your PhoneBook account",
      text: `Click this link to verify: ${verifyUrl}`,
      html: `<p>Hello ${user.firstName},</p>
             <p>Click <a href="${verifyUrl}">here</a> to verify your account.</p>`,
    });

    res.status(201).json({
      ok: true,
      message: "Registration successful. Check your email to activate account.",
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Verifikacija
export async function verify(req, res) {
  try {
    const { token } = req.params;

    const v = await VerificationToken.findOne({ where: { token } });
    if (!v) {
      return res.status(400).json({ ok: false, error: "Invalid or expired token" });
    }

    const user = await User.findByPk(v.userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    user.active = true;
    await user.save();
    await v.destroy();

    res.json({ ok: true, message: "Account verified successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Zahtev za promenu email-a
export async function requestEmailChange(req, res) {
  try {
    const { userId, newEmail } = req.body;

    if (!userId || !newEmail) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    const exists = await User.findOne({ where: { email: newEmail } });
    if (exists) {
      return res.status(409).json({ ok: false, error: "Email already in use" });
    }

    user.newEmail = newEmail;
    await user.save();

    const token = crypto.randomBytes(32).toString("hex");
    await VerificationToken.create({ userId: user.userId, token });

    const verifyUrl = `${process.env.APP_URL}/api/users/verify-email/${token}`;

    await transporter.sendMail({
      from: `"PhoneBook" <${process.env.SMTP_USER}>`,
      to: newEmail,
      subject: "Confirm your new email",
      text: `Click this link to confirm your new email: ${verifyUrl}`,
      html: `<p>Hello ${user.firstName},</p>
             <p>Click <a href="${verifyUrl}">here</a> to confirm your new email.</p>`,
    });

    res.json({ ok: true, message: "Verification link sent to new email." });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Verifikacija promene email-a
export async function verifyNewEmail(req, res) {
  try {
    const { token } = req.params;

    const v = await VerificationToken.findOne({ where: { token } });
    if (!v) {
      return res.status(400).json({ ok: false, error: "Invalid or expired token" });
    }

    const user = await User.findByPk(v.userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    if (!user.newEmail) {
      return res.status(400).json({ ok: false, error: "No new email to verify" });
    }

    user.email = user.newEmail;
    user.newEmail = null;
    await user.save();
    await v.destroy();

    res.json({ ok: true, message: "Email updated successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}


// List all
export async function list(_req, res) {
  const users = await User.findAll();
  res.json({ ok: true, users });
}

// Get one
export async function get(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ ok: false, error: "Not found" });
  res.json({ ok: true, user });
}

// Update
export async function update(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ ok: false, error: "Not found" });

  const data = { ...req.body };
  if (data.password) {
    data.password = sha1(data.password);
  }

  await user.update(data);
  res.json({ ok: true, user });
}

// Delete
export async function remove(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ ok: false, error: "Not found" });
  await user.destroy();
  res.json({ ok: true });
}
