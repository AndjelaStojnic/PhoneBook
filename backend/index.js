import express from "express";
import { sequelize } from "./config/db.js";

// modeli (da se syncaju)
import { Country } from "./models/Country.js";
import { City } from "./models/City.js";
import { User } from "./models/User.js";
import { Contact } from "./models/Contact.js";
import { UserContact } from "./models/UserContact.js";

// tvoje rute
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

// registruj rute
app.use("/api", routes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Postgres");

    // ovo pravi tabele ako ne postoje
    await sequelize.sync({ alter: true });
    console.log("✅ All models synced");

    app.listen(4001, () => {
      console.log("🚀 PhoneBook API running on port 4001");
    });
  } catch (err) {
    console.error("❌ DB init failed:", err);
  }
})();
