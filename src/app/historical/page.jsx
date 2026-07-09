"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FilterSection from "../components/Filter";
import Map from "../components/Map";
import ClimateChart from "../components/Chart";
import {
  getUnit,
  methodData,
  filterData,
  generateHeatmapData,
} from "../lib/dataDummy";
import { useLSTMData } from "../lib/useLSTMData";
import HistoricalTable from "./components/TableHistorical";
import Filter from "../../../public/icons/Filter";

export default function HistoricalPage() {
  const [selectedMethod, setSelectedMethod] = useState(
    "LSTM with Bias Correction"
  );
  const [selectedProvince, setSelectedProvince] = useState("Jawa Timur");
  const [selectedRegency, setSelectedRegency] = useState("Surabaya");
  const [selectedVariable, setSelectedVariable] = useState("Suhu");
  const [selectedPeriod, setSelectedPeriod] = useState("2000-2010");
  const [selectedResolution, setSelectedResolution] = useState("1km");
  const [open, setOpen] = useState();
  const [showHeatmap, setShowHeatmap] = useState(true);

  const handleRegencySelect = (regency) => {
    setSelectedRegency(regency);
  };

  // Fetch data menggunakan dummy data
  const { data: chartData, loading: chartLoading, error: chartError } = useLSTMData({
    variable: selectedVariable,
    method: selectedMethod,
    province: selectedProvince,
    regency: selectedRegency,
    period: selectedPeriod,
    resolution: selectedResolution,
  });

  // Generate heatmap data
  const heatmapData = generateHeatmapData({
    variable: selectedVariable,
    province: selectedProvince,
    regency: selectedRegency,
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 px-4 md:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gray-700 hover:scale-95 transition duration-200 font-medium text-white cursor-pointer"
          >
            <Filter className="h-4 text-white" />
            Filter
          </button>
        </div>
        {/* Filter Section */}
        {open && (
          <FilterSection
            filterData={filterData}
            onMethodSelect={setSelectedMethod}
            onProvinceSelect={setSelectedProvince}
            onRegencySelect={handleRegencySelect}
            onClimateVariableSelect={setSelectedVariable}
            onPeriodSelect={setSelectedPeriod}
            onResolutionSelect={setSelectedResolution}
            selectedProvince={selectedProvince}
            setOpen={setOpen}
          />
        )}

        {/* Model Prediksi Details Card */}
        {selectedMethod && methodData[selectedMethod] && (
          <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-md">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">
                    {methodData[selectedMethod].name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        methodData[selectedMethod].biasCorrection
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {methodData[selectedMethod].biasCorrection
                        ? "✓ Bias Corrected"
                        : "⚠ Raw Output"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-blue-800 mb-4 leading-relaxed">
              {methodData[selectedMethod].description}
            </p>
            <div className="text-sm text-blue-700 bg-white/50 rounded-lg p-3">
              <span className="font-semibold">📚 Referensi: </span>
              {methodData[selectedMethod].references.join(", ")}
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Peta Distribusi {selectedVariable}
            </h3>
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                showHeatmap
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {showHeatmap ? "🔥 Heatmap ON" : "🗺️ Heatmap OFF"}
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
            <Map
              selectedProvince={selectedProvince}
              selectedRegency={selectedRegency}
              showHeatmap={showHeatmap}
              heatmapData={heatmapData}
              variable={selectedVariable}
            />
          </div>
          
          {/* Legend Heatmap */}
          {showHeatmap && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Legenda Heatmap - {selectedVariable}
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                {selectedVariable === "Suhu" && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 rounded" style={{ background: 'linear-gradient(to right, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)' }}></div>
                      <span className="text-xs text-gray-600">Rendah → Tinggi</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Biru: Dingin | Kuning: Sedang | Merah: Panas
                    </div>
                  </>
                )}
                {selectedVariable === "Curah Hujan" && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 rounded" style={{ background: 'linear-gradient(to right, #ffff00, #ffa500, #add8e6, #0000ff, #00008b)' }}></div>
                      <span className="text-xs text-gray-600">Sedikit → Banyak</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Kuning: Sedikit | Biru: Sedang | Biru Tua: Banyak
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chart Section */}
        <ClimateChart
          data={chartData}
          variable={selectedVariable}
          unit={getUnit(selectedVariable)}
        />

        {/* Table Section */}
        <HistoricalTable />
      </div>
    </div>
  );
}
