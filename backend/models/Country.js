// backend/models/Country.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/* =====================
   Country Model
===================== */
export const Country = sequelize.define(
  "Country",
  {
    countryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    isoCode: {
      type: DataTypes.STRING(3), // ISO 3166-1 alpha-3
      allowNull: false,
    },
    iso2: {
      type: DataTypes.STRING(2), // ISO 3166-1 alpha-2
      allowNull: false,
    },
  },
  {
    tableName: "countries",
    timestamps: false,
  }
);
