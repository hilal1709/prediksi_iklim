"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import ClimateChart from "../components/Chart";
import { generateIndicesData, getCurrentIndices, generateIndicesHeatmapData, indexInfo } from "../lib/indicesData";

export default function IndicesPage() {
  const [selectedIndex, setSelectedIndex] = useState("CDD");
  const [selectedProvince, setSelectedProvince] = useState("Jawa Timur");
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Get current indices values
  const currentIndices = getCurrentIndices();

  // Generate historical trend data
  const trendData = generateIndicesData(2000, 2020).map(item => ({
    year: item.year,
    value: item[selectedIndex],
  }));

  // Generate heatmap data
  const heatmapData = generateIndicesHeatmapData({
    index: selectedIndex,
    province: selectedProvince,
    regency: selectedRegency,
  });

  const indicesList = [
    {
      code: "CDD",
      name: "Cooling Degree Days",
      value: currentIndices.CDD.toLocaleString(),
      unit: "days/year",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      code: "DWD",
      name: "Dry Weather Days",
      value: currentIndices.DWD.toLocaleString(),
      unit: "days/year",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      code: "RX5day",
      name: "Max 5-day Rainfall",
      value: currentIndices.RX5day.toLocaleString(),
      unit: "mm",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      code: "TX90p",
      name: "Warm Days",
      value: currentIndices.TX90p.toLocaleString(),
      unit: "% of days",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-6 lg:px-8">
        <div className="lg:col-span-3">
          {/* Index Overview */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Overview Indeks Terpilih
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {indicesList.map((i) => (
                <div 
                  key={i.code} 
                  className={`rounded-lg p-4 border cursor-pointer transition-all hover:shadow-md ${
                    selectedIndex === i.code ? 'ring-2 ring-blue-500' : ''
                  } ${i.bg}`}
                  onClick={() => setSelectedIndex(i.code)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {i.code}
                      </h3>
                      <p className="text-xs text-gray-500">{i.name}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${i.color}`}>
                        {i.value}
                      </p>
                      <p className="text-xs text-gray-500">{i.unit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Index Distribution Map */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Peta Distribusi {selectedIndex}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {indexInfo[selectedIndex]?.name} - {selectedProvince}
                  {selectedRegency && `, ${selectedRegency}`}
                </p>
              </div>
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
            <div className="p-6">
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
                <Map
                  selectedProvince={selectedProvince}
                  selectedRegency={selectedRegency}
                  showHeatmap={showHeatmap}
                  heatmapData={heatmapData}
                  variable={indexInfo[selectedIndex]?.name || selectedIndex}
                />
              </div>
              
              {/* Legend Heatmap */}
              {showHeatmap && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Legenda Heatmap - {selectedIndex}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 rounded" style={{ background: 'linear-gradient(to right, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)' }}></div>
                      <span className="text-xs text-gray-600">Rendah → Tinggi</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {indexInfo[selectedIndex]?.description}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Index Trends Chart */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Grafik Tren Indeks - {selectedIndex}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {indexInfo[selectedIndex]?.name} (2000-2020)
                  </p>
                </div>
                <div className="flex gap-2">
                  {Object.keys(indexInfo).map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedIndex === index
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {index}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              <ClimateChart
                data={trendData}
                variable={indexInfo[selectedIndex]?.name || selectedIndex}
                unit={indexInfo[selectedIndex]?.unit || ""}
              />
            </div>
          </div>

          {/* Index Data Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Tabel Data Indeks (2000-2020)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tahun
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CDD (days)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DWD (days)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RX5day (mm)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TX90p (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {generateIndicesData(2000, 2020).reverse().map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.CDD.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.DWD.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.RX5day.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.TX90p}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
