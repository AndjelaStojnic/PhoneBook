// backend/models/City.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/* =====================
   City Model
===================== */
export const City = sequelize.define(
  "City",
  {
    cityId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cities",
    timestamps: false,
  }
);
