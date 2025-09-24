// backend/models/UserContact.js
// Veza između korisnika i drugih korisnika (friend list), ili fallback u ručni kontakt

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";

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
      allowNull: false,
    },
    contactUserId: {
      type: DataTypes.BIGINT,
      allowNull: true, // ako obriše nalog → postaje NULL
    },
    fullName: {
      type: DataTypes.STRING(150),
      allowNull: true, // čuvamo ime da ostane i kad contactUserId nestane
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
        fields: ["userId", "contactUserId"],
      },
    ],
  }
);

// 🔹 Veza sa vlasnikom kontakta (userId)
User.hasMany(UserContact, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
UserContact.belongsTo(User, { as: "owner", foreignKey: "userId" });

// 🔹 Veza prema kontakt korisniku (contactUserId)
User.hasMany(UserContact, {
  foreignKey: "contactUserId",
  onDelete: "SET NULL",
});
UserContact.belongsTo(User, { as: "contact", foreignKey: "contactUserId" });
