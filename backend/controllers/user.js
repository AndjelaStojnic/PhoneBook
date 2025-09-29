// backend/controllers/user.js
import { User, Country, City } from "../models/associations.js";
import { VerificationToken } from "../models/VerificationToken.js";
import { UserContact } from "../models/UserContact.js";
import { transporter } from "../config/mailer.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// makni osjetljive podatke
function sanitizeUser(user) {
  const data = user.toJSON();
  delete data.password;
  return data;
}

// JWT token
function generateJWT(user) {
  return jwt.sign(
    { id: user.userId, admin: user.admin },  // samo id + admin
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );
}

// ➕ Registracija
export async function register(req, res) {
  try {
    const { email, firstName, lastName, phone, password } = req.body;
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({ ok: false, error: "Nedostaju polja" });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(409).json({ ok: false, error: "Email zauzet" });
    }
    if (await User.findOne({ where: { phone } })) {
      return res.status(409).json({ ok: false, error: "Telefon zauzet" });
    }

    const hashed = bcrypt.hashSync(password, 10);
    const user = await User.create({
      email, firstName, lastName, phone,
      password: hashed, active: false, admin: false,
    });

    const token = crypto.randomBytes(32).toString("hex");
    await VerificationToken.create({ userId: user.userId, token });

    const verifyUrl = `${process.env.APP_URL}/api/users/verify/${token}`;
    await transporter.sendMail({
      from: `"PhoneBook" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Potvrdite nalog",
      html: `<p>Zdravo ${user.firstName},</p>
             <p>Kliknite <a href="${verifyUrl}">ovdje</a> da potvrdite nalog.</p>`,
    });

    res.status(201).json({ ok: true, message: "Registracija uspješna, provjerite email." });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// ✅ Verifikacija emaila
export async function verify(req, res) {
  try {
    const v = await VerificationToken.findOne({ where: { token: req.params.token } });
    if (!v) return res.redirect("http://localhost:5173/register-failed"); // nova stranica za fail

    const user = await User.findByPk(v.userId);
    if (!user) return res.redirect("http://localhost:5173/register-failed");

    user.active = true;
    await user.save();
    await v.destroy();

    // redirect na frontend success page
    return res.redirect("http://localhost:5173/register-verified");
  } catch (err) {
    return res.redirect("http://localhost:5173/register-failed");
  }
}

// 🔑 Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Nedostaju podaci" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ ok: false, error: "Pogrešan email ili lozinka" });
    }
    if (!user.active) {
      return res.status(403).json({ ok: false, error: "Nalog nije verifikovan" });
    }

    const token = generateJWT(user);

    // 🚀 Vrati token i sanitized user
    res.json({
      ok: true,
      data: {
        token,
        user: sanitizeUser(user),
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// 📧 Promjena emaila
export async function requestEmailChange(req, res) {
  try {
    const { userId, newEmail } = req.body;
    if (!userId || !newEmail) return res.status(400).json({ ok: false, error: "Nedostaju polja" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ ok: false, error: "Korisnik ne postoji" });
    if (await User.findOne({ where: { email: newEmail } })) {
      return res.status(409).json({ ok: false, error: "Email zauzet" });
    }

    user.newEmail = newEmail;
    await user.save();

    const token = crypto.randomBytes(32).toString("hex");
    await VerificationToken.create({ userId: user.userId, token });

    const verifyUrl = `${process.env.APP_URL}/api/users/verify-email/${token}`;
    await transporter.sendMail({
      from: `"PhoneBook" <${process.env.SMTP_USER}>`,
      to: newEmail,
      subject: "Potvrdite novi email",
      html: `<p>Kliknite <a href="${verifyUrl}">ovdje</a> da potvrdite novu adresu.</p>`,
    });

    return res.json({
      ok: true,
      message: "Link poslat na novi email.",
      data: sanitizeUser(user),   // 👈 vrati user da frontend ne izgubi state
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// ✅ Potvrda novog emaila
export async function verifyNewEmail(req, res) {
  try {
    const v = await VerificationToken.findOne({ where: { token: req.params.token } });
    if (!v) return res.redirect("http://localhost:5173/email-change-failed"); // fail stranica

    const user = await User.findByPk(v.userId);
    if (!user) return res.redirect("http://localhost:5173/email-change-failed");
    if (!user.newEmail) return res.redirect("http://localhost:5173/email-change-failed");

    user.email = user.newEmail;
    user.newEmail = null;
    await user.save();
    await v.destroy();

    // ✅ uspješno
    return res.redirect("http://localhost:5173/email-change-success");
  } catch (err) {
    return res.redirect("http://localhost:5173/email-change-failed");
  }
}

// 📋 Lista korisnika
export async function list(_req, res) {
  try {
    const users = await User.findAll({
      include: [{ model: Country, attributes: ["name"] }, { model: City, attributes: ["name"] }],
      attributes: { exclude: ["password", "newEmail"] },
    });
    res.json({ ok: true, data: users });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// 👤 Jedan korisnik
export async function get(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Country, attributes: ["name"] }, { model: City, attributes: ["name"] }],
      attributes: { exclude: ["password", "newEmail"] },
    });
    if (!user) return res.status(404).json({ ok: false, error: "Nije pronađen" });
    res.json({ ok: true, data: user });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// ✏️ Update
export async function update(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ ok: false, error: "Nije pronađen" });

    const data = { ...req.body };

    // ako ima password, hashuj ga
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    // 🚫 blokiraj direktnu promjenu email-a → koristi requestEmailChange
    if (data.email && data.email !== user.email) {
      req.body.userId = user.userId;
      req.body.newEmail = data.email;

      // pokreni postojeću logiku
      return await requestEmailChange(req, res);
    }

    // ostale promjene (ime, telefon, grad itd.)
    await user.update(data);

    // 🔥 propagiraj promjene u UserContact
    await UserContact.update(
      {
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        email: user.email, // ostaje stari dok novi ne potvrdi
      },
      { where: { contactUserId: user.userId } }
    );

    res.json({
      ok: true,
      message: "Korisnik ažuriran",
      data: sanitizeUser(user),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, data: sanitizeUser(user),});
  }
}

// 🔑 Promjena passworda (ulogovan korisnik)
export async function changePassword(req, res) {
  try {
    const { userId, newPassword } = req.body;
    if (!userId || !newPassword) {
      return res.status(400).json({ ok: false, error: "Nedostaju polja" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ ok: false, error: "Korisnik ne postoji" });

    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();

    res.json({ ok: true, message: "Lozinka uspješno promijenjena." });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// ❌ Brisanje
export async function remove(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ ok: false, error: "Nije pronađen" });
    await user.destroy();
    res.json({ ok: true, message: "Korisnik obrisan" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
