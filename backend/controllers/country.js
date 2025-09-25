import { Country } from "../models/Country.js";
import { City } from "../models/City.js";

export async function listCountries(req, res) {
  try {
    const countries = await Country.findAll({ order: [["name", "ASC"]] });
    res.json({ ok: true, data: countries });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function listCities(req, res) {
  try {
    const { countryId } = req.params;
    if (!countryId) return res.status(400).json({ ok: false, error: "countryId required" });

    const cities = await City.findAll({ where: { countryId }, order: [["name", "ASC"]] });
    res.json({ ok: true, data: cities });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
