// dataDummy.js - Centralized dummy data for climate visualization

// ==================== KABUPATEN DATA ====================
export const kabupatenData = {
  "Jawa Timur": [
    "Surabaya",
    "Malang",
    "Sidoarjo",
    "Gresik",
    "Mojokerto",
    "Pasuruan",
    "Probolinggo",
    "Jember",
    "Banyuwangi",
  ],
  "Jawa Barat": [
    "Bandung",
    "Bekasi",
    "Bogor",
    "Depok",
    "Cirebon",
    "Sukabumi",
    "Tasikmalaya",
    "Karawang",
    "Purwakarta",
  ],
  "Jawa Tengah": [
    "Semarang",
    "Surakarta",
    "Magelang",
    "Salatiga",
    "Pekalongan",
    "Tegal",
    "Sukoharjo",
    "Boyolali",
    "Klaten",
  ],
  "Sumatera Utara": [
    "Medan",
    "Deli Serdang",
    "Langkat",
    "Binjai",
    "Tebing Tinggi",
    "Pematang Siantar",
    "Tanjung Balai",
    "Simalungun",
  ],
};

// ==================== CLIMATE BASE VALUES ====================
// Base values berbeda untuk setiap model prediksi dan resolusi
export const climateBaseValues = {
  Suhu: {
    "LSTM with Bias Correction": {
      "1km": { base: 28.5, variance: 1.5, trend: 0.02 },
      "5km": { base: 28.0, variance: 1.8, trend: 0.025 },
      "10km": { base: 27.5, variance: 2.2, trend: 0.03 },
    },
    "LSTM without Bias Correction": {
      "1km": { base: 28.8, variance: 2.0, trend: 0.022 },
      "5km": { base: 28.3, variance: 2.5, trend: 0.027 },
      "10km": { base: 27.8, variance: 3.0, trend: 0.032 },
    },
  },
  "Curah Hujan": {
    "LSTM with Bias Correction": {
      "1km": { base: 2300, variance: 300, trend: -5 },
      "5km": { base: 2200, variance: 380, trend: -6 },
      "10km": { base: 2100, variance: 450, trend: -8 },
    },
    "LSTM without Bias Correction": {
      "1km": { base: 2350, variance: 400, trend: -4.5 },
      "5km": { base: 2250, variance: 480, trend: -5.5 },
      "10km": { base: 2150, variance: 550, trend: -7.5 },
    },
  },
};

// ==================== REGIONAL MODIFIERS ====================
// Modifier berdasarkan wilayah untuk membuat data lebih realistis
export const regionalModifiers = {
  provinces: {
    "Jawa Timur": {
      Suhu: 0.5,
      "Curah Hujan": 100,
    },
    "Jawa Barat": {
      Suhu: -0.3,
      "Curah Hujan": 200,
    },
    "Jawa Tengah": {
      Suhu: 0.2,
      "Curah Hujan": 50,
    },
    "Sumatera Utara": {
      Suhu: 1.2,
      "Curah Hujan": 300,
    },
  },
  regencies: {
    // Jawa Timur
    Surabaya: { Suhu: 0.8, "Curah Hujan": -100 },
    Malang: { Suhu: -1.5, "Curah Hujan": 150 },
    Banyuwangi: { Suhu: 0.5, "Curah Hujan": 200 },

    // Jawa Barat
    Bandung: { Suhu: -2.0, "Curah Hujan": 100 },
    Bekasi: { Suhu: 0.5, "Curah Hujan": -50 },
    Bogor: { Suhu: -1.0, "Curah Hujan": 300 },

    // Jawa Tengah
    Semarang: { Suhu: 0.3, "Curah Hujan": 50 },
    Surakarta: { Suhu: 0.5, "Curah Hujan": -80 },
    Magelang: { Suhu: -1.8, "Curah Hujan": 200 },

    // Sumatera Utara
    Medan: { Suhu: 0.5, "Curah Hujan": 100 },
    "Deli Serdang": { Suhu: 0.3, "Curah Hujan": 150 },
  },
};

// ==================== DATA GENERATOR FUNCTION ====================
export const generateClimateData = ({
  variable,
  method,
  resolution,
  period,
  province,
  regency,
}) => {
  // Parse period
  const [startYear, endYear] = period.split("-").map(Number);
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  // Get base configuration
  const config = climateBaseValues[variable]?.[method]?.[resolution];

  if (!config) {
    console.error("Invalid configuration:", { variable, method, resolution });
    return [];
  }

  // Apply regional modifiers
  let baseValue = config.base;

  if (province && regionalModifiers.provinces[province]) {
    baseValue += regionalModifiers.provinces[province][variable] || 0;
  }

  if (regency && regionalModifiers.regencies[regency]) {
    baseValue += regionalModifiers.regencies[regency][variable] || 0;
  }

  // Generate data with trend and variance
  return years.map((year, index) => {
    const yearsSinceStart = index;
    const trendEffect = config.trend * yearsSinceStart;
    const seasonalEffect = Math.sin(index * 0.6) * config.variance;
    const randomNoise = (Math.random() - 0.5) * (config.variance * 0.4);

    const value = baseValue + trendEffect + seasonalEffect + randomNoise;

    return {
      year: year.toString(),
      value: Number(value.toFixed(variable === "Curah Hujan" ? 0 : 1)),
    };
  });
};

// ==================== UNIT HELPER ====================
export const getUnit = (variable) => {
  const units = {
    Suhu: "°C",
    "Curah Hujan": " mm/tahun",
  };
  return units[variable] || "";
};

// ==================== METHOD DATA ====================
export const methodData = {
  "LSTM with Bias Correction": {
    name: "LSTM with Bias Correction",
    references: ["Hochreiter & Schmidhuber, 1997", "Teutschbein & Seibert, 2012"],
    description:
      "Model Long Short-Term Memory (LSTM) dengan koreksi bias untuk prediksi data iklim. LSTM mampu menangkap pola temporal jangka panjang, dan bias correction memastikan output model sesuai dengan distribusi data observasi historis.",
    biasCorrection: true,
  },
  "LSTM without Bias Correction": {
    name: "LSTM without Bias Correction",
    references: ["Hochreiter & Schmidhuber, 1997"],
    description:
      "Model Long Short-Term Memory (LSTM) murni tanpa koreksi bias untuk prediksi data iklim. Model ini menggunakan output langsung dari neural network tanpa penyesuaian statistik tambahan, cocok untuk analisis pola temporal mentah.",
    biasCorrection: false,
  },
};

// ==================== FILTER DATA ====================
export const filterData = {
  Wilayah: ["Jawa Barat", "Jawa Tengah", "Jawa Timur", "Sumatera Utara"],
  Kabupaten: [],
  "Variabel Iklim": ["Suhu", "Curah Hujan"],
  "Periode Waktu": ["2000-2010", "2010-2020", "2020-2025","2025-2050", "2050-2100"],
  "Model Prediksi": [
    "LSTM with Bias Correction",
    "LSTM without Bias Correction",
  ],
  Resolusi: ["1km", "5km", "10km"],
};

// ==================== HEATMAP DATA GENERATOR ====================
export const generateHeatmapData = ({ variable, province, regency }) => {
  const provinceCoords = {
    "Jawa Timur": { lat: -7.5, lng: 112.5 },
    "Jawa Barat": { lat: -6.9, lng: 107.6 },
    "Jawa Tengah": { lat: -7.15, lng: 110.14 },
    "Sumatera Utara": { lat: 3.6, lng: 98.7 },
  };

  const regencyCoords = {
    Surabaya: { lat: -7.25, lng: 112.75 },
    Malang: { lat: -7.98, lng: 112.63 },
    Bandung: { lat: -6.91, lng: 107.61 },
    Semarang: { lat: -6.99, lng: 110.42 },
    Medan: { lat: 3.59, lng: 98.67 },
  };

  const baseCoord = regency
    ? regencyCoords[regency] || provinceCoords[province]
    : provinceCoords[province];

  if (!baseCoord) return [];

  const points = [];
  const numPoints = regency ? 100 : 200;
  const spread = regency ? 0.4 : 1.5;

  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sqrt(Math.random()) * spread;
    const lat = baseCoord.lat + radius * Math.cos(angle);
    const lng = baseCoord.lng + radius * Math.sin(angle);

    let baseIntensity = 0.5;
    const spatialVariation = Math.sin(lat * 10) * Math.cos(lng * 10) * 0.2;
    
    if (variable === "Suhu") {
      baseIntensity = 0.4 + Math.random() * 0.5 + spatialVariation;
    } else if (variable === "Curah Hujan") {
      baseIntensity = 0.3 + Math.random() * 0.6 + spatialVariation;
    }

    const intensity = Math.max(0.1, Math.min(1.0, baseIntensity));
    points.push([lat, lng, intensity]);
  }

  return points;
};
