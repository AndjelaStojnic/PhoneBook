import { Op } from "sequelize";
import { UserContact } from "../models/UserContact.js";
import { Contact } from "../models/Contact.js";
import { User } from "../models/User.js";

// Kombinovani search (userContacts + manual contacts)
export async function searchAllContacts(req, res) {
  try {
    const { userId } = req.params;
    const { q } = req.query; // tekst koji korisnik kuca

    // uslov pretrage (ako q postoji)
    const whereSearch = q
      ? {
          [Op.or]: [
            { fullName: { [Op.iLike]: `%${q}%` } },
            { phone: { [Op.iLike]: `%${q}%` } },
            { email: { [Op.iLike]: `%${q}%` } },
          ],
        }
      : {};

    // 1️⃣ User-to-user kontakti
    const userContacts = await UserContact.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "contact",
          attributes: ["userId", "firstName", "lastName", "email", "phone"],
          where: q
            ? {
                [Op.or]: [
                  { firstName: { [Op.iLike]: `%${q}%` } },
                  { lastName: { [Op.iLike]: `%${q}%` } },
                  { email: { [Op.iLike]: `%${q}%` } },
                  { phone: { [Op.iLike]: `%${q}%` } },
                ],
              }
            : undefined,
        },
      ],
    });

    const formattedUserContacts = userContacts.map((uc) => ({
      type: "userContact",
      id: uc.userContactId,
      favorite: uc.favorite,
      createdAt: uc.createdAt,
      contact: uc.contact
        ? {
            userId: uc.contact.userId,
            firstName: uc.contact.firstName,
            lastName: uc.contact.lastName,
            email: uc.contact.email,
            phone: uc.contact.phone,
          }
        : {
            fullName: uc.fullName,
            email: uc.email,
            phone: uc.phone,
          },
    }));

    // 2️⃣ Ručno dodati kontakti
    const manualContacts = await Contact.findAll({
      where: { userId, ...whereSearch },
    });

    const formattedManualContacts = manualContacts.map((c) => ({
      type: "manualContact",
      id: c.contactId,
      favorite: c.favorite,
      createdAt: c.createdAt,
      contact: {
        fullName: c.fullName,
        email: c.email,
        phone: c.phone,
        note: c.note,
      },
    }));

    // 3️⃣ Spojeno
    const allContacts = [...formattedUserContacts, ...formattedManualContacts];

    // sortiraj po favorite pa po createdAt
    allContacts.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json({ ok: true, contacts: allContacts });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
