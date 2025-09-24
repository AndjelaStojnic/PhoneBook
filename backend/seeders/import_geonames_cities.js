// backend/seeders/import_geonames_cities.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "../config/db.js";
import { City } from "../models/City.js";
import { Country } from "../models/Country.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildCountryMap() {
  const rows = await Country.findAll({ attributes: ["countryId", "iso2"] });
  const map = new Map();
  for (const r of rows) {
    map.set(r.iso2, r.countryId);
  }
  return map;
}

async function importCities() {
  try {
    console.log("DEBUG ENV:", {
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASS: process.env.DB_PASS,
    });

    await sequelize.authenticate();
    console.log("✅ Connected to DB");

    const countryMap = await buildCountryMap();

    const filePath = path.join(__dirname, "geonames/cities15000.txt");
    const data = fs.readFileSync(filePath, "utf8").split("\n");

    const cities = [];
    for (const line of data) {
      if (!line.trim() || line.startsWith("#")) continue;

      const parts = line.split("\t");
      if (parts.length < 15) continue;

      const name = parts[1]; // asciiname (kolona 2)
      const countryCode = parts[8]; // ISO2 (kolona 9)
      const population = parseInt(parts[14], 10) || null;

      const countryId = countryMap.get(countryCode);
      if (!countryId) continue;

      // samo gradove sa > 0 populacije
      if (population && population > 0) {
        cities.push({
          name,
          countryId,
        });
      }
    }

    if (cities.length > 0) {
      await City.bulkCreate(cities, { ignoreDuplicates: true });
    }

    const count = await City.count();
    console.log(`✅ Cities import done. Total in DB: ${count}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

importCities();
