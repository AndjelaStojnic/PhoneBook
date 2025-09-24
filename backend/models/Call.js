// backend/models/Call.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Contact } from "./Contact.js";

export const Call = sequelize.define(
  "Call",
  {
    callId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    calledPhone: {
      type: DataTypes.STRING(50),
      allowNull: true, // slobodan broj, ako nije user/contact
    },
    callerId: {
      type: DataTypes.BIGINT,
      allowNull: false, // user koji zove
    },
    calledUserId: {
      type: DataTypes.BIGINT,
      allowNull: true, // ako zove registrovanog usera
    },
    calledContactId: {
      type: DataTypes.BIGINT,
      allowNull: true, // ako zove ručni kontakt
    },
    status: {
      type: DataTypes.ENUM("missed", "outgoing", "incoming"),
      defaultValue: "missed",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "calls",
    timestamps: false,
  }
);

// ✅ Asocijacije sa unikatnim aliasima
Call.belongsTo(User, { as: "callerUser", foreignKey: "callerId" });
Call.belongsTo(User, { as: "calledUser", foreignKey: "calledUserId" });
Call.belongsTo(Contact, { as: "calledContact", foreignKey: "calledContactId" });
