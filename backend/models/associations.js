import { User } from "./User.js";
import { Contact } from "./Contact.js";
import { UserContact } from "./UserContact.js";
import { Call } from "./Call.js";

// User → Contact
User.hasMany(Contact, { foreignKey: "userId", onDelete: "CASCADE" });
Contact.belongsTo(User, { foreignKey: "userId" });

// User → UserContact (friend list)
User.hasMany(UserContact, { foreignKey: "userId", onDelete: "CASCADE" });
UserContact.belongsTo(User, { foreignKey: "userId" });

// User ↔ UserContact (friend link)
User.hasMany(UserContact, { foreignKey: "contactUserId", onDelete: "SET NULL" });
UserContact.belongsTo(User, { foreignKey: "contactUserId" });

// Calls
User.hasMany(Call, { foreignKey: "callerId", onDelete: "CASCADE" });
Call.belongsTo(User, { foreignKey: "callerId", as: "caller" });

// Ako calleeUserId je drugi korisnik
User.hasMany(Call, { foreignKey: "calleeUserId", onDelete: "SET NULL" });
Call.belongsTo(User, { foreignKey: "calleeUserId", as: "calleeUser" });

// Ako calleeContactId je ručni kontakt
Contact.hasMany(Call, { foreignKey: "calleeContactId", onDelete: "SET NULL" });
Call.belongsTo(Contact, { foreignKey: "calleeContactId", as: "calleeContact" });

export { User, Contact, UserContact, Call };
