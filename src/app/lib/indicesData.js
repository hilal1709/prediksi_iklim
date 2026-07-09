// indicesData.js - Dummy data untuk Climate Indices

// ==================== INDICES DATA GENERATOR ====================
export const generateIndicesData = (startYear = 2000, endYear = 2020) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  // Base values untuk setiap index
  const baseValues = {
    CDD: 1100,      // Cooling Degree Days
    DWD: 180,      // Dry Weather Days
    RX5day: 200,   // Max 5-day Rainfall
    TX90p: 15.0,   // Warm Days percentage
  };

  // Trends per decade
  const trends = {
    CDD: 15,       // +15 days per decade
    DWD: -2,       // -2 days per decade
    RX5day: 5,     // +5 mm per decade
    TX90p: 2.5,    // +2.5% per decade
  };

  return years.map((year, index) => {
    const yearsSinceStart = index;
    const decadeProgress = yearsSinceStart / 10;
    
    // Generate data dengan trend dan variasi
    const cdd = baseValues.CDD + (trends.CDD * decadeProgress) + Math.sin(index * 0.3) * 50 + (Math.random() - 0.5) * 30;
    const dwd = baseValues.DWD + (trends.DWD * decadeProgress) + Math.sin(index * 0.4) * 15 + (Math.random() - 0.5) * 10;
    const rx5day = baseValues.RX5day + (trends.RX5day * decadeProgress) + Math.sin(index * 0.5) * 20 + (Math.random() - 0.5) * 15;
    const tx90p = baseValues.TX90p + (trends.TX90p * decadeProgress) + Math.sin(index * 0.35) * 2 + (Math.random() - 0.5) * 1.5;

    return {
      year: year.toString(),
      CDD: Math.round(Math.max(0, cdd)),
      DWD: Math.round(Math.max(0, dwd)),
      RX5day: Math.round(Math.max(0, rx5day)),
      TX90p: Math.max(0, Math.min(100, Number(tx90p.toFixed(1)))),
    };
  });
};

// ==================== CURRENT INDICES VALUES ====================
export const getCurrentIndices = () => {
  const data = generateIndicesData(2020, 2020);
  return data[0];
};

// ==================== HEATMAP DATA FOR INDICES ====================
export const generateIndicesHeatmapData = ({ index, province, regency }) => {
  // Koordinat pusat untuk setiap provinsi
  const provinceCoords = {
    "Jawa Timur": { lat: -7.5, lng: 112.5 },
    "Jawa Barat": { lat: -6.9, lng: 107.6 },
    "Jawa Tengah": { lat: -7.15, lng: 110.14 },
    "Sumatera Utara": { lat: 3.6, lng: 98.7 },
  };

  // Koordinat untuk kabupaten
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

  // Generate random points around the selected area
  const points = [];
  const numPoints = regency ? 100 : 200;
  const spread = regency ? 0.4 : 1.5;

  // Base intensity berdasarkan index
  const baseIntensities = {
    CDD: 0.5,
    DWD: 0.4,
    RX5day: 0.45,
    TX90p: 0.55,
  };

  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sqrt(Math.random()) * spread;
    
    const lat = baseCoord.lat + radius * Math.cos(angle);
    const lng = baseCoord.lng + radius * Math.sin(angle);

    const spatialVariation = Math.sin(lat * 10) * Math.cos(lng * 10) * 0.2;
    const baseIntensity = baseIntensities[index] || 0.5;
    const intensity = Math.max(0.1, Math.min(1.0, baseIntensity + Math.random() * 0.4 + spatialVariation));

    points.push([lat, lng, intensity]);
  }

  return points;
};

// ==================== INDEX INFO ====================
export const indexInfo = {
  CDD: {
    name: "Cooling Degree Days",
    description: "Jumlah hari dengan suhu di atas threshold untuk pendinginan",
    unit: "days/year",
    color: "blue",
  },
  DWD: {
    name: "Dry Weather Days",
    description: "Jumlah hari tanpa hujan",
    unit: "days/year",
    color: "green",
  },
  RX5day: {
    name: "Max 5-day Rainfall",
    description: "Curah hujan maksimum dalam 5 hari berturut-turut",
    unit: "mm",
    color: "purple",
  },
  TX90p: {
    name: "Warm Days",
    description: "Persentase hari dengan suhu maksimum di atas persentil ke-90",
    unit: "% of days",
    color: "red",
  },
};

