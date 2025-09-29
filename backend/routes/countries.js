// routes/countries.js
import { Router } from "express";
import { listCountries, listCities } from "../controllers/country.js";

const r = Router();

// javno dostupno (nema privatnih podataka)
r.get("/", listCountries);
r.get("/:countryId/cities", listCities);

export default r;
