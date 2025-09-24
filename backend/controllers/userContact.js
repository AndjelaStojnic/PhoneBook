// backend/controllers/userContact.js
import { UserContact } from "../models/UserContact.js";
import { User } from "../models/User.js";
import { Op } from "sequelize";

// ➕ Kreiranje veze user ↔ user
export async function createUserContact(req, res) {
  try {
    const { userId, contactUserId, favorite } = req.body;

    if (!userId || !contactUserId) {
      return res.status(400).json({ ok: false, error: "userId i contactUserId su obavezni" });
    }
    if (userId === contactUserId) {
      return res.status(400).json({ ok: false, error: "Ne možete dodati sami sebe" });
    }

    const contactUser = await User.findByPk(contactUserId);
    if (!contactUser) {
      return res.status(404).json({ ok: false, error: "Korisnik za povezivanje nije pronađen" });
    }

    const uc = await UserContact.create({
      userId,
      contactUserId,
      fullName: `${contactUser.firstName} ${contactUser.lastName}`,
      phone: contactUser.phone,
      email: contactUser.email,
      favorite: favorite || false,
    });

    res.status(201).json({
      ok: true,
      message: "Veza uspješno kreirana",
      data: uc,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// 📋 Lista svih kontakata jednog user-a
export async function getUserContacts(req, res) {
  try {
    const list = await UserContact.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: User,
          as: "contact",
          attributes: ["userId", "firstName", "lastName", "email", "phone"],
        },
      ],
    });

    res.json({ ok: true, data: list });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// ✏️ Update veze (npr. favorite)
export async function updateUserContact(req, res) {
  try {
    const uc = await UserContact.findByPk(req.params.id);
    if (!uc) return res.status(404).json({ ok: false, error: "Veza nije pronađena" });

    await uc.update(req.body);
    res.json({
      ok: true,
      message: "Veza ažurirana",
      data: uc,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// ❌ Brisanje veze
export async function deleteUserContact(req, res) {
  try {
    const uc = await UserContact.findByPk(req.params.id);
    if (!uc) return res.status(404).json({ ok: false, error: "Veza nije pronađena" });

    await uc.destroy();
    res.json({ ok: true, message: "Veza obrisana" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// 🔍 Pretraga kontakata jednog user-a
export async function searchUserContacts(req, res) {
  try {
    const { userId } = req.params;
    const { q } = req.query;

    if (!q) return res.json({ ok: true, data: [] });

    const list = await UserContact.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "contact",
          attributes: ["userId", "firstName", "lastName", "email", "phone"],
          where: {
            [Op.or]: [
              { firstName: { [Op.iLike]: `%${q}%` } },
              { lastName: { [Op.iLike]: `%${q}%` } },
              { email: { [Op.iLike]: `%${q}%` } },
              { phone: { [Op.iLike]: `%${q}%` } },
            ],
          },
          required: false,
        },
      ],
    });

    res.json({ ok: true, data: list });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
