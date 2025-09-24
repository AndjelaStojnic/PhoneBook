// backend/controllers/contact.js
import { Contact } from "../models/Contact.js";
import { Op } from "sequelize";

// Kreiraj novi kontakt
export async function createContact(req, res) {
  try {
    const { userId, fullName, phone, email, note, favorite } = req.body;

    if (!userId || !fullName || !phone) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const contact = await Contact.create({
      userId,
      fullName,
      phone,
      email,
      note,
      favorite: favorite || false,
    });

    res.status(201).json({ ok: true, contact });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Vrati sve kontakte za jednog user-a
export async function getUserContacts(req, res) {
  try {
    const { userId } = req.params;
    const contacts = await Contact.findAll({ where: { userId } });
    res.json({ ok: true, contacts });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Update kontakta
export async function updateContact(req, res) {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ ok: false, error: "Not found" });
    }

    await contact.update(req.body);
    res.json({ ok: true, contact });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Brisanje kontakta
export async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ ok: false, error: "Not found" });
    }

    await contact.destroy();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Pretrazivanje kontakta
export async function searchContacts(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.json({ ok: true, contacts: [] });

    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [
          { fullName: { [Op.iLike]: `%${q}%` } },
          { phone: { [Op.iLike]: `%${q}%` } },
        ],
      },
    });

    res.json({ ok: true, contacts });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
