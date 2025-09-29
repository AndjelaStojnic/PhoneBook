// backend/models/associations.js
import { User } from "./User.js";
import { Contact } from "./Contact.js";
import { UserContact } from "./UserContact.js";
import { Call } from "./Call.js";
import { Country } from "./Country.js";
import { City } from "./City.js";

/* =====================
   User ↔ Contact (manualni kontakti)
===================== */
User.hasMany(Contact, { foreignKey: "userId", onDelete: "CASCADE" });
Contact.belongsTo(User, { foreignKey: "userId" });

/* =====================
   User ↔ UserContact (link između korisnika)
===================== */
// vlasnik liste kontakata
User.hasMany(UserContact, { foreignKey: "userId", onDelete: "CASCADE" });
UserContact.belongsTo(User, { foreignKey: "userId" });

// povezani korisnik (ono što frontend vidi kao "contact")
User.hasMany(UserContact, { foreignKey: "contactUserId", onDelete: "SET NULL" });
UserContact.belongsTo(User, { as: "contact", foreignKey: "contactUserId" });

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
Call.belongsTo(User, { foreignKey: "callerId", as: "callerUser" });

User.hasMany(Call, { foreignKey: "calledUserId", onDelete: "SET NULL" });
Call.belongsTo(User, { foreignKey: "calledUserId", as: "calledUser" });

Contact.hasMany(Call, { foreignKey: "calledContactId", onDelete: "SET NULL" });
Call.belongsTo(Contact, { foreignKey: "calledContactId", as: "calledContact" });

export { User, Contact, UserContact, Call, Country, City };
