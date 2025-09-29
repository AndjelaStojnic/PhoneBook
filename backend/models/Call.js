// backend/models/Call.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/* =====================
   Call Model
===================== */
export const Call = sequelize.define(
  "Call",
  {
    callId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    callerId: {
      type: DataTypes.BIGINT,
      allowNull: false, // user koji poziva
    },
    calledUserId: {
      type: DataTypes.BIGINT,
      allowNull: true, // pozvani registrovani korisnik
    },
    calledContactId: {
      type: DataTypes.BIGINT,
      allowNull: true, // pozvani ručni kontakt
    },
    calledPhone: {
      type: DataTypes.STRING(50),
      allowNull: true, // slobodan broj (ako nije user/contact)
    },
    status: {
      type: DataTypes.ENUM("missed", "accepted"),
      allowNull: false,
    },
    deletedByCaller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedByCalled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
