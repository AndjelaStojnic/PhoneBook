import { Call } from "../models/Call.js";
import { User } from "../models/User.js";
import { Contact } from "../models/Contact.js";
import { Op } from "sequelize";

// Dodaj poziv (uvek missed, automatski određuje kome ide)
export async function createCall(req, res) {
  try {
    const { callerId, phone } = req.body;

    if (!callerId || !phone) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing callerId or phone" });
    }

    let calledUserId = null;
    let calledContactId = null;
    let calledPhone = phone;

    // 1️⃣ da li postoji user sa tim brojem?
    const user = await User.findOne({ where: { phone } });
    if (user) {
      calledUserId = user.userId;
      calledPhone = null;
    } else {
      // 2️⃣ da li postoji ručni kontakt sa tim brojem?
      const contact = await Contact.findOne({ where: { phone } });
      if (contact) {
        calledContactId = contact.contactId;
        calledPhone = null;
      }
    }

    // 3️⃣ upis u bazu
    const call = await Call.create({
      callerId,
      calledUserId,
      calledContactId,
      calledPhone,
      status: "missed",
    });

    res.status(201).json({ ok: true, call });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Lista poziva za korisnika
export async function getUserCalls(req, res) {
  try {
    const { userId } = req.params;

    const calls = await Call.findAll({
      where: { callerId: userId },
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

    // mapiramo u lep format
    const formatted = calls.map((c) => {
      let to = null;

      if (c.calledUser) {
        to = { type: "user", user: c.calledUser };
      } else if (c.calledContact) {
        to = { type: "contact", contact: c.calledContact };
      } else if (c.calledPhone) {
        to = { type: "phone", number: c.calledPhone };
      }

      return {
        callId: c.callId,
        status: c.status,
        createdAt: c.createdAt,
        from: c.callerUser,
        to,
      };
    });

    res.json({ ok: true, calls: formatted });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Brisanje poziva
export async function deleteCall(req, res) {
  try {
    const call = await Call.findByPk(req.params.id);
    if (!call) return res.status(404).json({ ok: false, error: "Not found" });

    await call.destroy();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

// Pretrazivanje kontakta
export async function searchCalls(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.json({ ok: true, calls: [] });

    const calls = await Call.findAll({
      include: [
        { model: User, as: "calledUser", attributes: ["firstName", "lastName", "phone"] },
        { model: Contact, as: "calledContact", attributes: ["fullName", "phone"] },
      ],
      where: {
        [Op.or]: [
          { calledPhone: { [Op.iLike]: `%${q}%` } },
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    // dodatno filtriraj po user/contact ako treba
    const filtered = calls.filter(
      (c) =>
        (c.calledUser &&
          (`${c.calledUser.firstName} ${c.calledUser.lastName}`.toLowerCase().includes(q.toLowerCase()) ||
            c.calledUser.phone.includes(q))) ||
        (c.calledContact &&
          (c.calledContact.fullName.toLowerCase().includes(q.toLowerCase()) ||
            c.calledContact.phone.includes(q))) ||
        (c.calledPhone && c.calledPhone.includes(q))
    );

    res.json({ ok: true, calls: filtered });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}