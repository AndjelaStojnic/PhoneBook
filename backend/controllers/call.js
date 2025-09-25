// backend/controllers/call.js
import { Call } from "../models/Call.js";
import { User } from "../models/User.js";
import { Contact } from "../models/Contact.js";
import { Op } from "sequelize";

// ➕ Dodaj poziv (uvek missed)
export async function createCall(req, res) {
  try {
    const { callerId, phone } = req.body;
    if (!callerId || !phone) {
      return res
        .status(400)
        .json({ ok: false, error: "callerId i phone su obavezni" });
    }

    let calledUserId = null;
    let calledContactId = null;
    let calledPhone = phone;

    // Da li postoji user sa tim brojem?
    const user = await User.findOne({ where: { phone } });
    if (user) {
      calledUserId = user.userId;
      calledPhone = null;
    } else {
      // Da li postoji ručni kontakt?
      const contact = await Contact.findOne({ where: { phone } });
      if (contact) {
        calledContactId = contact.contactId;
        calledPhone = null;
      }
    }

    // Upis u bazu
    const call = await Call.create({
      callerId,
      calledUserId,
      calledContactId,
      calledPhone,
      status: "missed",
    });

    res.status(201).json({
      ok: true,
      message: "Poziv zabilježen",
      data: call,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// 📞 Lista poziva za korisnika
export async function getUserCalls(req, res) {
  try {
    const { userId } = req.params;

    const calls = await Call.findAll({
      where: {
        [Op.or]: [{ callerId: userId }, { calledUserId: userId }],
      },
      include: [
        {
          model: User,
          as: "calledUser",
          attributes: ["userId", "firstName", "lastName", "email", "phone"],
        },
        {
          model: Contact,
          as: "calledContact",
          attributes: ["contactId", "fullName", "phone", "email"],
        },
        {
          model: User,
          as: "callerUser",
          attributes: ["userId", "firstName", "lastName", "email", "phone"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Formatiranje izlaza
    const formatted = calls.map((c) => {
      let to = null;
      if (c.calledUser) to = { type: "user", user: c.calledUser };
      else if (c.calledContact) to = { type: "contact", contact: c.calledContact };
      else if (c.calledPhone) to = { type: "phone", number: c.calledPhone };

      return {
        callId: c.callId,
        status: c.status,
        createdAt: c.createdAt,
        from: c.callerUser,
        to,
      };
    });

    res.json({ ok: true, data: formatted });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// ❌ Hard delete poziva
export async function deleteCall(req, res) {
  try {
    const call = await Call.findByPk(req.params.id);
    if (!call) {
      return res
        .status(404)
        .json({ ok: false, error: "Poziv nije pronađen" });
    }

    await call.destroy(); // sada brišemo trajno

    res.json({ ok: true, message: "Poziv obrisan" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// 🔍 Pretraga poziva
export async function searchCalls(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.json({ ok: true, data: [] });

    const calls = await Call.findAll({
      where: {
        [Op.or]: [{ calledPhone: { [Op.iLike]: `%${q}%` } }],
      },
      include: [
        {
          model: User,
          as: "calledUser",
          attributes: ["firstName", "lastName", "phone"],
        },
        {
          model: Contact,
          as: "calledContact",
          attributes: ["fullName", "phone"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Filtriranje po imenu, prezimenu ili broju
    const filtered = calls.filter(
      (c) =>
        (c.calledUser &&
          (`${c.calledUser.firstName} ${c.calledUser.lastName}`
            .toLowerCase()
            .includes(q.toLowerCase()) ||
            c.calledUser.phone.includes(q))) ||
        (c.calledContact &&
          (c.calledContact.fullName
            .toLowerCase()
            .includes(q.toLowerCase()) ||
            c.calledContact.phone.includes(q))) ||
        (c.calledPhone && c.calledPhone.includes(q))
    );

    res.json({ ok: true, data: filtered });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
