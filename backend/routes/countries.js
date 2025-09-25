import { Router } from "express";
import { listCountries, listCities } from "../controllers/country.js";

const r = Router();

r.get("/", listCountries);
r.get("/:countryId/cities", listCities);

export default r;
