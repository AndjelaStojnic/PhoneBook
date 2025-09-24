// backend/models/Contact.js
// Kontakti koje korisnik ručno dodaje (nisu nužno registrovani korisnici)

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";

export const Contact = sequelize.define(
  "Contact",
  {
    contactId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "contacts",
    timestamps: false,
  }
);

// Veza sa korisnikom
User.hasMany(Contact, {
  foreignKey: "userId",
  onDelete: "CASCADE", // briše sve kontakte ako user obriše nalog
});
Contact.belongsTo(User, { foreignKey: "userId" });
