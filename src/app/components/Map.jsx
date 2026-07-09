// app/components/Map.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function Map({ selectedProvince, selectedRegency, showHeatmap = false, heatmapData = [], variable = "Suhu" }) {
  const mapRef = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const [regencyData, setRegencyData] = useState(null);
  const provinceLayerRef = useRef(null);
  const regencyLayerRef = useRef(null);
  const heatmapLayerRef = useRef(null);

  // ==================== HELPERS ====================
  const normalizeName = (str) =>
    (str || "")
      .toLowerCase()
      .replace(/kabupaten|kota/g, "")
      .trim();

  const getProvinceName = (properties) =>
    properties?.Propinsi ||
    properties?.provinsi ||
    properties?.NAME_1 ||
    properties?.name ||
    properties?.WADMPR ||
    "";

  const getRegencyName = (properties) =>
    properties?.WADMKK ||
    properties?.Kabupaten ||
    properties?.kabupaten ||
    properties?.NAME_2 ||
    properties?.name ||
    "";

  const filterProvinceFeatures = (geo, provinceName) => {
    if (!geo?.features) return { type: "FeatureCollection", features: [] };
    return {
      ...geo,
      features: geo.features.filter((f) => {
        const name = getProvinceName(f.properties);
        return name?.toLowerCase().includes((provinceName || "").toLowerCase());
      }),
    };
  };

  const filterRegencyFeatures = (reg, regencyName, provinceName) => {
    if (!reg?.features) return { type: "FeatureCollection", features: [] };
    return {
      ...reg,
      features: reg.features.filter((f) => {
        const kabName = getRegencyName(f.properties);
        const provName = getProvinceName(f.properties);
        const matchesRegency = normalizeName(kabName).includes(
          normalizeName(regencyName)
        );
        const matchesProvince =
          !provinceName ||
          normalizeName(provName).includes(normalizeName(provinceName));
        return matchesRegency && matchesProvince;
      }),
    };
  };

  const removeLayer = (map, layerRef) => {
    if (layerRef.current) {
      try {
        map.removeLayer(layerRef.current);
      } catch {}
      layerRef.current = null;
    }
  };

  // ✅ Perbaikan utama: guard fitBounds dengan cek layers & angka finite
  const fitBoundsIfValid = (map, layer, name) => {
    if (!map || !layer || typeof layer.getBounds !== "function") return;

    const hasLayers =
      typeof layer.getLayers === "function" && layer.getLayers().length > 0;
    if (!hasLayers) {
      console.warn("⚠️ Tidak ada feature untuk:", name);
      return;
    }

    const bounds = layer.getBounds();
    if (!bounds || typeof bounds.isValid !== "function" || !bounds.isValid()) {
      console.warn("⚠️ Bounds tidak valid (empty) untuk:", name);
      return;
    }

    const sw = bounds.getSouthWest?.();
    const ne = bounds.getNorthEast?.();
    const nums = [sw?.lat, sw?.lng, ne?.lat, ne?.lng];
    const allFinite = nums.every((v) => Number.isFinite(v));
    if (!allFinite) {
      console.warn("⚠️ Bounds mengandung nilai non-finite untuk:", name, nums);
      return;
    }

    map.whenReady(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { animate: true, duration: 2 });
    });
  };

  const getProvinceColor = (provinceName) => {
    const colorMap = {
      "Jawa Barat": "blue",
      "Jawa Tengah": "green",
      "Jawa Timur": "red",
      "Sumatera Utara": "purple",
    };
    return colorMap[provinceName] || "#0088ff";
  };

  // ==================== INIT LEAFLET ====================
  useEffect(() => {
    // Inject CSS hanya sekali
    if (!document.querySelector('link[href*="leaflet.min.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }

    // Inject JS hanya sekali
    const ensureLeaflet = () =>
      new Promise((resolve) => {
        if (window.L) return resolve(window.L);
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
        script.onload = () => resolve(window.L);
        document.head.appendChild(script);
      });

    // Inject Leaflet.heat plugin
    const ensureLeafletHeat = () =>
      new Promise((resolve) => {
        if (window.L?.heatLayer) return resolve(window.L);
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/leaflet.heat@0.2.0/dist/leaflet-heat.js";
        script.onload = () => resolve(window.L);
        document.head.appendChild(script);
      });

    (async () => {
      const L = await ensureLeaflet();
      await ensureLeafletHeat();
      
      if (!mapRef.current) {
        const map = L.map("map", { zoomControl: false }).setView(
          [-2.5489, 113.9213],
          4
        );
        mapRef.current = map;

        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attributionControl: false,
            maxZoom: 19,
          }
        ).addTo(map);

        try {
          const [provRes, regRes] = await Promise.all([
            fetch("/geojson/id.json"),
            fetch("/geojson/regency.json"),
          ]);
          const [prov, reg] = await Promise.all([
            provRes.json(),
            regRes.json(),
          ]);
          setGeoData(prov);
          setRegencyData(reg);
        } catch (error) {
          console.error("Error loading GeoJSON:", error);
        } finally {
          map.whenReady(() => map.invalidateSize());
        }
      }
    })();
  }, []);

  // ==================== PROVINCE LAYER ====================
  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    // Render provinsi hanya jika tidak ada regency terpilih
    if (!L || !map || !geoData || !selectedProvince || !!selectedRegency) {
      return;
    }

    removeLayer(map, provinceLayerRef);

    const filtered = filterProvinceFeatures(geoData, selectedProvince);
    if (!filtered.features || filtered.features.length === 0) {
      console.warn("⚠️ Tidak ditemukan provinsi:", selectedProvince);
      return;
    }

    const color = getProvinceColor(selectedProvince);
    const layer = L.geoJSON(filtered, {
      style: { color, weight: 2, fillOpacity: 0.3 },
      onEachFeature: (feature, lyr) => {
        const name = getProvinceName(feature.properties) || selectedProvince;
        lyr.bindPopup(name);
      },
    }).addTo(map);

    provinceLayerRef.current = layer;
    fitBoundsIfValid(map, layer, selectedProvince);
  }, [selectedProvince, geoData, selectedRegency]);

  // ==================== REGENCY LAYER ====================
  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!L || !map || !regencyData || !selectedRegency) return;

    removeLayer(map, provinceLayerRef);
    removeLayer(map, regencyLayerRef);

    const filtered = filterRegencyFeatures(
      regencyData,
      selectedRegency,
      selectedProvince
    );

    if (!filtered.features || filtered.features.length === 0) {
      console.warn(
        "⚠️ Tidak ditemukan kabupaten:",
        selectedRegency,
        "di",
        selectedProvince
      );
      return;
    }

    const layer = L.geoJSON(filtered, {
      style: { color: "orange", weight: 2, fillOpacity: 0.45 },
      onEachFeature: (feature, lyr) => {
        const name = getRegencyName(feature.properties) || selectedRegency;
        lyr.bindPopup(name);
      },
    }).addTo(map);

    regencyLayerRef.current = layer;
    fitBoundsIfValid(map, layer, selectedRegency);
  }, [selectedRegency, regencyData, selectedProvince]);

  // Helper function to check if point is inside polygon
  const isPointInPolygon = (point, polygon) => {
    const [lat, lng] = point;
    let inside = false;
    
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][1], yi = polygon[i][0];
      const xj = polygon[j][1], yj = polygon[j][0];
      
      const intersect = ((yi > lat) !== (yj > lat))
        && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    
    return inside;
  };

  // Helper to get polygon coordinates from GeoJSON layer
  const getPolygonCoords = (layer) => {
    if (!layer) return null;
    
    let coords = [];
    layer.eachLayer((l) => {
      if (l.feature && l.feature.geometry) {
        const geom = l.feature.geometry;
        if (geom.type === 'Polygon') {
          coords = geom.coordinates[0].map(c => [c[1], c[0]]); // [lat, lng]
        } else if (geom.type === 'MultiPolygon') {
          // Use the largest polygon
          let largest = [];
          geom.coordinates.forEach(poly => {
            if (poly[0].length > largest.length) {
              largest = poly[0].map(c => [c[1], c[0]]);
            }
          });
          coords = largest;
        }
      }
    });
    
    return coords.length > 0 ? coords : null;
  };

  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!L || !map || !L.heatLayer) return;

    if (heatmapLayerRef.current) {
      map.removeLayer(heatmapLayerRef.current);
      heatmapLayerRef.current = null;
    }

    if (showHeatmap && heatmapData.length > 0) {
      const activeLayer = regencyLayerRef.current || provinceLayerRef.current;
      let filteredData = heatmapData;
      
      if (activeLayer) {
        const polygonCoords = getPolygonCoords(activeLayer);
        if (polygonCoords && polygonCoords.length > 0) {
          filteredData = heatmapData.filter(point => {
            return isPointInPolygon([point[0], point[1]], polygonCoords);
          });
        }
      }

      if (filteredData.length > 0) {
        let gradient = {
          0.0: 'blue',
          0.3: 'cyan',
          0.5: 'lime',
          0.7: 'yellow',
          1.0: 'red'
        };
        
        if (variable === "Suhu") {
          gradient = {
            0.0: 'blue',
            0.3: 'cyan',
            0.5: 'lime',
            0.7: 'yellow',
            1.0: 'red'
          };
        } else if (variable === "Curah Hujan") {
          gradient = {
            0.0: 'yellow',
            0.3: 'orange',
            0.5: 'lightblue',
            0.7: 'blue',
            1.0: 'darkblue'
          };
        }
        
        const heatLayer = L.heatLayer(filteredData, {
          radius: 25,
          blur: 15,
          maxZoom: 10,
          max: 1.0,
          gradient: gradient
        }).addTo(map);
        
        heatmapLayerRef.current = heatLayer;
      }
    }
  }, [showHeatmap, heatmapData, selectedProvince, selectedRegency, variable, geoData, regencyData]);

  // ==================== RENDER ====================
  return <div id="map" className="w-full h-[500px] rounded-2xl"></div>;
}
