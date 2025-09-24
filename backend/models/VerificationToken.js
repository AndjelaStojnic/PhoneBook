// backend/models/VerificationToken.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/* =====================
   VerificationToken Model
   (za verifikaciju emaila i promjene podataka)
===================== */
export const VerificationToken = sequelize.define(
  "VerificationToken",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "verification_tokens",
    timestamps: false,
  }
);
