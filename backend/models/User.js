// backend/models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/* =====================
   User Model
===================== */
export const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255), // bcrypt hash
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    attemptedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    _createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    newEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false, // koristimo ručne timestamp kolone
  }
);
