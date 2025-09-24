// backend/models/Contact.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/* =====================
   Contact Model
   (ručno dodati kontakti)
===================== */
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
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "contacts",
    timestamps: false,
  }
);
