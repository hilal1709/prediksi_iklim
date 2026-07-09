"use client";

import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

export default function ClimateChart({ data, variable, unit }) {
  // Custom tooltip styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            {payload[0].payload.year}
          </p>
          <p className="text-sm text-blue-600">
            {variable}:{" "}
            <span className="font-bold">
              {payload[0].value}
              {unit}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
      {/* Chart Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {variable.includes("Resolusi Satelit") ? variable : `Data ${variable}`}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {variable.includes("Resolusi Satelit") 
            ? "Visualisasi data historis berdasarkan filter yang dipilih"
            : "Tren historis data indeks iklim"}
        </p>
      </div>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="year" stroke="#6b7280" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
            label={{
              value: unit,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: "12px", fill: "#6b7280" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "13px", paddingTop: "10px" }}
            iconType="line"
          />
          <Area
            type="monotone"
            dataKey="value"
            fill="url(#colorValue)"
            stroke="none"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
            name={variable}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Chart Footer Info */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>Data from satelitte </span>
        <span>Source: Historical Climate Data</span>
      </div>
    </div>
  );
}