import { apiFetch } from "./client";

export const geoApi = {
  countries: () => apiFetch("/countries"),
  cities: (countryId) => apiFetch(`/countries/${countryId}/cities`),
};
