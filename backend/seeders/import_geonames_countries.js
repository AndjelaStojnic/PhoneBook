import fs from "fs";
import readline from "readline";
import { sequelize } from "../config/db.js";
import { Country } from "../models/Country.js";

async function run() {
  await sequelize.authenticate();
  console.log("✅ Connected to DB");

  const countries = [];
  const rl = readline.createInterface({
    input: fs.createReadStream("./backend/seeders/geonames/countryInfo.txt", { encoding: "utf8" }),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (!line || line.startsWith("#")) continue; // preskoči komentare
    const cols = line.split("\t");
    const iso2 = cols[0]?.trim();
    const iso3 = cols[1]?.trim();
    const name = cols[4]?.trim();
    if (!iso2 || !iso3 || !name) continue;

    countries.push({ name, isoCode: iso3, iso2, });
  }

  await Country.bulkCreate(countries, { ignoreDuplicates: true });
  console.log(`✅ Imported ${countries.length} countries`);
  process.exit(0);
}

run().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
