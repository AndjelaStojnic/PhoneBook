// backend/models/associations.js
import { User } from "./User.js";
import { Contact } from "./Contact.js";
import { UserContact } from "./UserContact.js";
import { Call } from "./Call.js";
import { Country } from "./Country.js";
import { City } from "./City.js";

/* =====================
   User ↔ Contact
===================== */
User.hasMany(Contact, { foreignKey: "userId", onDelete: "CASCADE" });
Contact.belongsTo(User, { foreignKey: "userId" });

/* =====================
   User ↔ UserContact
===================== */
// lista kontakata korisnika
User.hasMany(UserContact, { foreignKey: "userId", onDelete: "CASCADE" });
UserContact.belongsTo(User, { foreignKey: "userId" });

// veza na drugog korisnika (friend link)
User.hasMany(UserContact, { foreignKey: "contactUserId", onDelete: "SET NULL" });
UserContact.belongsTo(User, { foreignKey: "contactUserId" });

/* =====================
   User ↔ Country / City
===================== */
User.belongsTo(Country, { foreignKey: "countryId" });
User.belongsTo(City, { foreignKey: "cityId" });

Country.hasMany(User, { foreignKey: "countryId" });
City.hasMany(User, { foreignKey: "cityId" });

Country.hasMany(City, { foreignKey: "countryId" });
City.belongsTo(Country, { foreignKey: "countryId" });

/* =====================
   Calls
===================== */
User.hasMany(Call, { foreignKey: "callerId", onDelete: "CASCADE" });
Call.belongsTo(User, { foreignKey: "callerId", as: "caller" });

User.hasMany(Call, { foreignKey: "calledUserId", onDelete: "SET NULL" });
Call.belongsTo(User, { foreignKey: "calledUserId", as: "calledUser" });

Contact.hasMany(Call, { foreignKey: "calledContactId", onDelete: "SET NULL" });
Call.belongsTo(Contact, { foreignKey: "calledContactId", as: "calledContact" });

export { User, Contact, UserContact, Call, Country, City };
