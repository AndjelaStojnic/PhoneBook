// backend/models/UserContact.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/* =====================
   UserContact Model
   (friend lista ili fallback u ručni kontakt)
===================== */
export const UserContact = sequelize.define(
  "UserContact",
  {
    userContactId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false, // vlasnik liste
    },
    contactUserId: {
      type: DataTypes.BIGINT,
      allowNull: true, // ako user obriše nalog → NULL
    },
    fullName: {
      type: DataTypes.STRING(150),
      allowNull: true, // čuvamo ime i ako user više ne postoji
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
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
    tableName: "user_contacts",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userId", "contactUserId"], // jedan kontakt ne može dva puta
      },
    ],
  }
);
