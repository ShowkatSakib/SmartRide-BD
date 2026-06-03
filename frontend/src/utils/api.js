import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const predictFare    = async (payload) => (await api.post("/api/predict-fare", payload)).data;
export const compareRides   = async (payload) => (await api.post("/api/compare-rides", payload)).data;
export const getAnalytics   = async ()         => (await api.get("/api/analytics")).data;
export const getSurgeInfo   = async (hour, weather, dow) =>
  (await api.get(`/api/surge?hour=${hour}&weather=${weather}&dow=${dow}`)).data;
export const searchLocations = async (q) => (await api.get(`/api/locations?q=${q}`)).data.locations;
export const getFareInfo     = async ()   => (await api.get("/api/fare-info")).data;
export default api;
