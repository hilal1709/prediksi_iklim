import Link from "next/link";
import Navbar from "./components/Navbar";
import WeatherDisplay from "./components/Weather";

export default function Home() {
  return (
    <main className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 lg:py-24 2xl:py-32 px-6 lg:px-16">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-white leading-tight">
              Dashboard Data Iklim{" "}
              <span className="block text-blue-200 mt-2">Nasional</span>
            </h1>
            <p className="mt-6 text-base md:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto lg:mx-0">
              Akses data iklim komprehensif, tren historis, dan proyeksi masa depan dengan monitoring real-time
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
              <Link
                href="/historical"
                className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg text-center"
              >
                Jelajahi Data
              </Link>
              <Link
                href="/forecast"
                className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base bg-blue-500 text-white hover:bg-blue-400 transition-all duration-300 hover:scale-105 shadow-lg text-center"
              >
                Lihat Proyeksi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="w-full bg-gray-50 py-8">
        <WeatherDisplay />
      </section>
    </main>
  );
}
