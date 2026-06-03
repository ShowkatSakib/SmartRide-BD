// ─── REAL VERIFIED DHAKA FARES ───────────────────────────────────────────────
// Sources:
//   Uber Moto  : Uber Bangladesh official pricing
//   Pathao     : Pathao official statement (Aug 2022 fuel hike revision)
//   UberX      : Uber Dhaka official fare update
//   CNG        : BRTA government-set meter rate (Feb 2025 enforcement)
//   Rickshaw   : Common Dhaka negotiated street rate
//   Bus        : BRTC / local bus approximate flat fares
// ─────────────────────────────────────────────────────────────────────────────

export const DHAKA_LOCATIONS = [
  "Dhanmondi","Gulshan 1","Gulshan 2","Banani","Mirpur 1","Mirpur 10",
  "Mirpur 12","Uttara","Uttara Sector 7","Motijheel","Old Dhaka / Lalbagh",
  "Puran Dhaka","Wari","Hazaribagh","Mohammadpur","Rayer Bazar","Shyamoli",
  "Kalabagan","Panthapath","Farmgate","Tejgaon","Bashundhara R/A","Badda",
  "Rampura","Malibagh","Mouchak","Khilgaon","Shantinagar","Paltan","Shahbag",
  "Nilkhet","New Market","Elephant Road","Maghbazar","Moghbazar","Kawran Bazar",
  "Hazrat Shahjalal Airport","Cantonment","Mohakhali","Baridhara","Niketan",
  "DOHS Baridhara","Vatara","Aftabnagar","Bashabo","Mugda","Demra",
  "Narayanganj","Keraniganj","Savar","Ashulia","Gazipur","Tongi",
];

// GPS coordinates for accurate Haversine distance calculation
export const LOCATION_COORDS = {
  "dhanmondi":              [23.7461, 90.3742],
  "gulshan 1":              [23.7860, 90.4130],
  "gulshan 2":              [23.7943, 90.4145],
  "banani":                 [23.7937, 90.3976],
  "mirpur 1":               [23.8054, 90.3592],
  "mirpur 10":              [23.8223, 90.3654],
  "mirpur 12":              [23.8330, 90.3607],
  "uttara":                 [23.8759, 90.3795],
  "uttara sector 7":        [23.8690, 90.3830],
  "motijheel":              [23.7330, 90.4182],
  "old dhaka / lalbagh":    [23.7196, 90.3876],
  "puran dhaka":            [23.7099, 90.4071],
  "wari":                   [23.7178, 90.4197],
  "hazaribagh":             [23.7244, 90.3698],
  "mohammadpur":            [23.7630, 90.3563],
  "rayer bazar":            [23.7534, 90.3480],
  "shyamoli":               [23.7724, 90.3651],
  "kalabagan":              [23.7528, 90.3762],
  "panthapath":             [23.7524, 90.3874],
  "farmgate":               [23.7577, 90.3918],
  "tejgaon":                [23.7685, 90.4017],
  "bashundhara r/a":        [23.8141, 90.4269],
  "badda":                  [23.7788, 90.4274],
  "rampura":                [23.7656, 90.4271],
  "malibagh":               [23.7509, 90.4163],
  "mouchak":                [23.7490, 90.4178],
  "khilgaon":               [23.7455, 90.4266],
  "shantinagar":            [23.7369, 90.4139],
  "paltan":                 [23.7342, 90.4143],
  "shahbag":                [23.7387, 90.3963],
  "nilkhet":                [23.7330, 90.3875],
  "new market":             [23.7350, 90.3864],
  "elephant road":          [23.7408, 90.3843],
  "maghbazar":              [23.7463, 90.4064],
  "moghbazar":              [23.7520, 90.4080],
  "kawran bazar":           [23.7524, 90.3924],
  "hazrat shahjalal airport":[23.8506, 90.3975],
  "cantonment":             [23.8208, 90.3981],
  "mohakhali":              [23.7804, 90.4020],
  "baridhara":              [23.7984, 90.4153],
  "niketan":                [23.7758, 90.4154],
  "dohs baridhara":         [23.8211, 90.4017],
  "vatara":                 [23.8050, 90.4320],
  "aftabnagar":             [23.7718, 90.4395],
  "bashabo":                [23.7560, 90.4384],
  "mugda":                  [23.7514, 90.4340],
  "demra":                  [23.7132, 90.4587],
  "narayanganj":            [23.6238, 90.4996],
  "keraniganj":             [23.6789, 90.3542],
  "savar":                  [23.8573, 90.2662],
  "ashulia":                [23.8968, 90.3187],
  "gazipur":                [23.9999, 90.4203],
  "tongi":                  [23.9003, 90.4014],
};

// ─── TRANSPORT CONFIG WITH REAL FARES ────────────────────────────────────────
export const TRANSPORT_CONFIG = {
  uber_moto: {
    name: "Uber Moto",
    emoji: "🏍️",
    // Source: Uber Bangladesh official (Tk 30 base + Tk 12/km + Tk 0.5/min)
    baseFare: 30, perKm: 12, perMin: 0.5, minFare: 50,
    avgSpeedKmh: 28, capacity: 1, ac: false,
    surgeApplies: true, negotiated: false, fixedFare: false,
    color: "#F59E0B",
    fareNote: "Official Uber pricing. Surge applies during rain & rush hour.",
    source: "Uber Bangladesh official pricing",
  },
  pathao: {
    name: "Pathao Bike",
    emoji: "🛵",
    // Source: Pathao official (Aug 2022 revision after fuel hike)
    // Base Tk 25, per km raised from Tk 12 → Tk 15, min raised to Tk 50
    baseFare: 25, perKm: 15, perMin: 0.5, minFare: 50,
    avgSpeedKmh: 28, capacity: 1, ac: false,
    surgeApplies: true, negotiated: false, fixedFare: false,
    color: "#EF4444",
    fareNote: "Pathao revised fare (Aug 2022). Base Tk 25 + Tk 15/km, min Tk 50.",
    source: "Pathao official statement, The Daily Star Aug 2022",
  },
  uber_x: {
    name: "UberX Car",
    emoji: "🚗",
    // Source: Uber Dhaka official — Tk 40 base, Tk 21/km, Tk 3/min
    baseFare: 40, perKm: 21, perMin: 3, minFare: 80,
    avgSpeedKmh: 22, capacity: 4, ac: true,
    surgeApplies: true, negotiated: false, fixedFare: false,
    color: "#3B82F6",
    fareNote: "Tk 40 base + Tk 21/km + Tk 3/min. AC included.",
    source: "Uber Dhaka official fare update",
  },
  cng: {
    name: "CNG Auto",
    emoji: "🛺",
    // Source: BRTA govt meter rate — Tk 40 for first 2km, Tk 12/km after, Tk 2/min wait
    // Real street: drivers rarely follow meter; typical 1.5–2x
    baseFare: 40, perKm: 12, perMin: 2, minFare: 60,
    avgSpeedKmh: 20, capacity: 3, ac: false,
    surgeApplies: false, negotiated: true, fixedFare: false,
    color: "#10B981",
    fareNote: "BRTA meter: Tk 40 for 2km, then Tk 12/km + Tk 2/min waiting. Real street rate is typically 1.5–2× meter. Negotiate before boarding.",
    source: "BRTA government-set meter rate (Feb 2025 BRTA directive)",
  },
  rickshaw: {
    name: "Rickshaw",
    emoji: "🚲",
    // No official meter. Pure negotiation. ~Tk 20–30/km in practice.
    baseFare: 20, perKm: 22, perMin: 0, minFare: 30,
    avgSpeedKmh: 10, capacity: 2, ac: false,
    surgeApplies: false, negotiated: true, fixedFare: false,
    color: "#8B5CF6",
    fareNote: "No official meter. Purely negotiated. Agree fare BEFORE boarding. Typical: Tk 30–60 short trips, Tk 20–30/km.",
    source: "Common Dhaka street negotiated rate",
  },
  bus: {
    name: "Local Bus",
    emoji: "🚌",
    // BRTC & local bus flat fares; ~Tk 10–20 within city
    baseFare: 10, perKm: 2, minFare: 10, perMin: 0,
    avgSpeedKmh: 15, capacity: 50, ac: false,
    surgeApplies: false, negotiated: false, fixedFare: true,
    color: "#6366F1",
    fareNote: "Fixed flat fares per route. Tk 10–20 within Dhaka city. Route knowledge required.",
    source: "BRTC & local bus approximate flat fares",
  },
};

export const WEATHER_OPTIONS = [
  { value: "clear",      label: "Clear ☀️" },
  { value: "cloudy",     label: "Cloudy ⛅" },
  { value: "rain",       label: "Rain 🌧️" },
  { value: "heavy_rain", label: "Heavy Rain 🌩️" },
  { value: "storm",      label: "Storm ⛈️" },
];

// UI meta — colour & emoji only (fares are in TRANSPORT_CONFIG above)
export const TRANSPORT_META = Object.fromEntries(
  Object.entries(TRANSPORT_CONFIG).map(([k, v]) => [
    k,
    { emoji: v.emoji, color: v.color, bgColor: v.color + "18", label: v.name },
  ])
);

export const POPULAR_ROUTES = [
  { from: "Dhanmondi",      to: "Gulshan 2" },
  { from: "Mirpur 10",      to: "Farmgate" },
  { from: "Uttara",         to: "Motijheel" },
  { from: "Banani",         to: "Shahbag" },
  { from: "Mohammadpur",    to: "Gulshan 1" },
  { from: "Bashundhara R/A",to: "Kawran Bazar" },
  { from: "Rampura",        to: "Dhanmondi" },
  { from: "Mirpur 10",      to: "Paltan" },
];
