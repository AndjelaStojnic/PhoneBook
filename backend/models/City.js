// backend/models/City.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Country } from "./Country.js";

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
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: "countryId",
      },
    },
  },
  {
    tableName: "cities",
    timestamps: false,
  }
);

// Veze
Country.hasMany(City, { foreignKey: "countryId" });
City.belongsTo(Country, { foreignKey: "countryId" });
