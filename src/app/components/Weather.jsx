"use client";

import React, { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import Rain from "public/icons/Rain";
import Cloud from "public/icons/Cloud";
import { Thermometer, ThermometerSun, Wind } from "lucide-react";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        const params = {
          latitude: -5,
          longitude: 120,
          hourly: [
            "temperature_2m",
            "wind_speed_10m",
            "weather_code",
            "rain",
            "precipitation",
            "relative_humidity_2m",
          ],
          models: "ecmwf_ifs",
          timezone: "auto",
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        // Process first location
        const response = responses[0];

        // Attributes for timezone and location
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const hourly = response.hourly();

        // Process weather data with all variables
        const processedData = {
          latitude,
          longitude,
          elevation,
          utcOffsetSeconds,
          hourly: {
            time: [
              ...Array(
                Math.floor(
                  (Number(hourly.timeEnd()) - Number(hourly.time())) /
                  hourly.interval()
                )
              ),
            ].map(
              (_, i) =>
                new Date(
                  (Number(hourly.time()) +
                    i * hourly.interval() +
                    utcOffsetSeconds) *
                  1000
                )
            ),
            temperature: Array.from(hourly.variables(0).valuesArray()),
            windSpeed: Array.from(hourly.variables(1).valuesArray()),
            weatherCode: Array.from(hourly.variables(2).valuesArray()),
            rain: Array.from(hourly.variables(3).valuesArray()),
            precipitation: Array.from(hourly.variables(4).valuesArray()),
            humidity: Array.from(hourly.variables(5).valuesArray()),
          },
        };

        setWeatherData(processedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Function to get location name based on coordinates
  const getLocationName = (lat, lon) => {
    // Koordinat -4.956, 120.024 adalah sekitar Sulawesi Selatan
    if (lat >= -5.5 && lat <= -4.5 && lon >= 119.5 && lon <= 120.5) {
      return "Sulawesi Selatan, Indonesia";
    }
    // Koordinat -5, 120 adalah sekitar Sulawesi Tengah
    if (lat >= -6 && lat <= -4 && lon >= 119 && lon <= 121) {
      return "Sulawesi Tengah, Indonesia";
    }
    return "Indonesia Tengah";
  };

  const getWeatherIcon = (weatherCode, precipitation) => {
    if (precipitation > 0) {
      return <Rain className="w-8 h-8" />;
    }
    return <Cloud className="w-8 h-8 text-blue-500" />;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-lg text-gray-600">Memuat data cuaca...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 text-lg font-semibold">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  // Get next 24 hours
  const next24Hours = weatherData.hourly.time.slice(0, 24);
  const currentTemp = weatherData.hourly.temperature[0];
  const currentPrecip = weatherData.hourly.precipitation[0];
  const currentWind = weatherData.hourly.windSpeed[0];
  const currentHumidity = weatherData.hourly.humidity[0];
  const currentRain = weatherData.hourly.rain[0];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                📍 {getLocationName(weatherData.latitude, weatherData.longitude)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div className="flex-1">
              <div className="text-6xl font-bold text-gray-900">
                {currentTemp.toFixed(1)}°C
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-2 ">
                  <Rain className="h-6 text-blue-500" />
                  <span className="font-medium text-sm text-gray-700">
                    Curah Hujan: {currentPrecip.toFixed(1)} mm
                  </span>
                </div>
                <div className="flex items-center gap-2 ">
                  <Wind className="h-5 text-green-500" />
                  <span className="font-medium text-sm text-gray-700">
                    Kecepatan angin: {currentWind.toFixed(1)} km/h
                  </span>
                </div>
              </div>

              {currentRain > 0 && (
                <div className="mt-2 text-lg text-gray-600">
                  Rain: {currentRain.toFixed(1)} mm
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">Model: ECMWF IFS</div>
        </div>

        {/* Hourly Forecast */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            Prakiraan 24 Jam
          </h2>

          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-3 pb-4 min-w-max">
              {next24Hours.map((time, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 rounded-xl p-4 text-center transition-all flex-shrink-0 w-28 border border-gray-200 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="text-xs text-gray-600 font-semibold mb-3">
                    {time.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex justify-center mb-3">
                    {getWeatherIcon(
                      weatherData.hourly.weatherCode[index],
                      weatherData.hourly.precipitation[index]
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-3">
                    {weatherData.hourly.temperature[index].toFixed(1)}°
                  </div>
                  <div className="text-xs opacity-70 mb-1">
                    {weatherData.hourly.precipitation[index].toFixed(1)} mm
                  </div>
                  <div className="text-xs opacity-70">
                    {weatherData.hourly.windSpeed[index].toFixed(1)} km/j
                  </div>
                  {weatherData.hourly.rain[index] > 0 && (
                    <div className="text-xs opacity-70 mt-1 text-blue-300">
                      Rain: {weatherData.hourly.rain[index].toFixed(1)} mm
                    </div>
                  )}
                  <div className="text-xs text-gray-600">
                    💨 {weatherData.hourly.windSpeed[index].toFixed(0)}km/h
                  </div>
                  <div className="text-xs text-gray-600">
                    💦 {weatherData.hourly.humidity[index].toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          <Card title="Suhu Rata-rata (24j)" iconType="avgtemp">
            {(
              weatherData.hourly.temperature
                .slice(0, 24)
                .reduce((a, b) => a + b, 0) / 24
            ).toFixed(1)}
            °C
          </Card>

          <Card title="Suhu Maksimal (24j)" iconType="temp">
            {Math.max(...weatherData.hourly.temperature.slice(0, 24)).toFixed(
              1
            )}
            °C
          </Card>

          <Card title="Total Curah Hujan (24j)" iconType="rain">
            {weatherData.hourly.precipitation
              .slice(0, 24)
              .reduce((a, b) => a + b, 0)
              .toFixed(1)}{" "}
            mm
          </Card>

          <Card title="Rata kecepatan angin (24j)" iconType="wind">
            {(
              weatherData.hourly.windSpeed
                .slice(0, 24)
                .reduce((a, b) => a + b, 0) / 24
            ).toFixed(1)}{" "}
            km/h
          </Card>
        </div>

        
      </div>
    </div>
  );

  function Card({ title, children, iconType }) {
    const getIcon = () => {
      switch (iconType) {
        case "rain":
          return <Rain className="h-4 text-blue-500" />;
        case "avgtemp":
          return <ThermometerSun className="h-4 text-yellow-500" />;
        case "temp":
          return <Thermometer className="h-4 text-red-500" />;
        case "wind":
          return <Wind className="h-4 text-emerald-500" />;
        default:
          return <Rain className="h-4 text-blue-500" />;
      }
    };

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg pb-12">
        <div className="text-sm flex items-center gap-2 mb-2 text-gray-600">
          {getIcon()}
          {title}
        </div>
        <div className="text-3xl font-bold text-gray-900">{children}</div>
      </div>
    );
  }
};

export default WeatherDisplay;
