import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import Navbar from "../components/Navbar";
import {
  Building2,
  Globe,
  Satellite,
  BarChart3,
  Map,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Download,
  Database,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "About - ClimateDash",
  description: "Tentang platform ClimateDash",
};

export default function AboutPage() {
  return (
    <main className="font-sans">
      <div className="w-full bg-linear-to-br from-blue-600 via-blue-700 to-blue-800">
        <Navbar />
        <section className="relative overflow-hidden ">
          <div className="absolute inset-0 " />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Tentang <span className="text-blue-200">ClimateDash</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Platform dashboard data iklim untuk keputusan yang lebih baik.
            </p>
          </div>
        </section>
      </div>

      {/*  Misi Kami */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Misi Kami</h2>
            <p className="text-lg text-gray-700 mb-6">
              ClimateDash mendemokratisasi akses data iklim berkualitas agar
              peneliti, pemerintah, dan publik dapat bertindak efektif.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow h-full w-96">
                <CardContent className="p-6 pt-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Database className="h-3 w-3 mr-1" />
                  </div>
                  <CardTitle className="mb-3">Data Terbuka</CardTitle>
                  <CardDescription>
                    Menyediakan data terbuka dan transparan
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow h-full w-96">
                <CardContent className="p-6 pt-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-3 w-3 mr-1" />
                  </div>
                  <CardTitle className="mb-3"> Analisis Inovatif</CardTitle>
                  <CardDescription>
                    Mengembangkan alat analisis inovatif
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow h-full w-96">
                <CardContent className="p-6 pt-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-3 w-3 mr-1" />
                  </div>
                  <CardTitle className="mb-3">Kolaborasi</CardTitle>
                  <CardDescription>
                    Mendorong kolaborasi lintas disiplin
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sumber Data */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sumber Data
            </h2>
            <p className="text-lg text-gray-600">
              Data iklim berkualitas tinggi dari berbagai institusi terpercaya
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="mb-3">BMKG</CardTitle>
                <CardDescription>
                  Badan Meteorologi, Klimatologi, dan Geofisika Indonesia
                  menyediakan data observasi cuaca dan iklim real-time serta
                  historis.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="mb-3">
                  GCM (Global Climate Models)
                </CardTitle>
                <CardDescription>
                  Model iklim global dari CMIP6 (Coupled Model Intercomparison
                  Project) untuk proyeksi iklim masa depan.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Satellite className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="mb-3">Satelit Cuaca</CardTitle>
                <CardDescription>
                  Data satelit cuaca dari Himawari-8, Meteosat, dan NOAA untuk
                  monitoring kondisi atmosfer real-time.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Panduan Membaca Grafik & Indeks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Panduan Membaca Grafik & Indeks
            </h2>
            <p className="text-lg text-gray-600">
              Cara memahami visualisasi dan indikator iklim
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 pt-8">
                  <CardTitle className="flex items-center text-blue-900 mb-4">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Membaca Grafik Tren
                  </CardTitle>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong>Sumbu X:</strong> Periode waktu (tahun/bulan)
                    </li>
                    <li>
                      • <strong>Sumbu Y:</strong> Nilai variabel (suhu, curah
                      hujan, dll)
                    </li>
                    <li>
                      • <strong>Garis tren:</strong> Menunjukkan arah perubahan
                      (naik/turun)
                    </li>
                    <li>
                      • <strong>R²:</strong> Tingkat kepercayaan model (0-1,
                      semakin tinggi semakin akurat)
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 pt-8">
                  <CardTitle className="flex items-center text-green-900 mb-4">
                    <Map className="w-5 h-5 mr-2" />
                    Membaca Peta Iklim
                  </CardTitle>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong>Warna:</strong> Intensitas nilai (biru=rendah,
                      merah=tinggi)
                    </li>
                    <li>
                      • <strong>Skala:</strong> Range nilai yang ditampilkan
                    </li>
                    <li>
                      • <strong>Resolusi:</strong> Tingkat detail spasial (1km,
                      5km, dll)
                    </li>
                    <li>
                      • <strong>Anomali:</strong> Perbedaan dari rata-rata
                      historis
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6 pt-8">
                  <CardTitle className="flex items-center text-purple-900 mb-4">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Indeks Iklim Penting
                  </CardTitle>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong>CDD (Cooling Degree Days):</strong> Hari-hari
                      yang memerlukan pendinginan
                    </li>
                    <li>
                      • <strong>DWD (Dry Weather Days):</strong> Hari tanpa
                      hujan berturut-turut
                    </li>
                    <li>
                      • <strong>RX5day:</strong> Curah hujan maksimum dalam 5
                      hari
                    </li>
                    <li>
                      • <strong>TX90p:</strong> Persentase hari panas ekstrem
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6 pt-8">
                  <CardTitle className="flex items-center text-orange-900 mb-4">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Interpretasi Data
                  </CardTitle>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong>Signifikansi:</strong> Perubahan yang bermakna
                      secara statistik
                    </li>
                    <li>
                      • <strong>Uncertainty:</strong> Tingkat ketidakpastian
                      dalam proyeksi
                    </li>
                    <li>
                      • <strong>Baseline:</strong> Periode referensi untuk
                      perbandingan
                    </li>
                    <li>
                      • <strong>Scenario:</strong> Asumsi kondisi masa depan
                      (RCP4.5, RCP8.5)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <HelpCircle className="w-8 h-8 mr-3 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Pertanyaan yang sering diajukan tentang ClimateDash
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <Card>
              <AccordionItem>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                    Apa itu ClimateDash?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    ClimateDash adalah platform dashboard data iklim nasional
                    yang menyediakan akses mudah ke data historis, proyeksi masa
                    depan, dan analisis indeks iklim untuk mendukung pengambilan
                    keputusan berbasis data.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Card>
            <Card>
              <AccordionItem>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center">
                    <Download className="w-5 h-5 mr-3 text-green-600" />
                    Bagaimana cara mengunduh data?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    Klik tombol &quot;Export Data&quot; di halaman Historical,
                    Forecast, atau Indices. Data dapat diunduh dalam format CSV
                    untuk analisis spreadsheet atau NetCDF untuk analisis
                    spasial lanjutan.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Card>
            <Card>
              <AccordionItem>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center">
                    <Database className="w-5 h-5 mr-3 text-purple-600" />
                    Seberapa akurat data yang disediakan?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    Data historis berasal dari observasi BMKG dengan akurasi
                    tinggi. Proyeksi masa depan menggunakan model GCM yang telah
                    divalidasi dan di-downscale menggunakan metode statistik
                    terbaru.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Card>
            <Card>
              <AccordionItem>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-3 text-orange-600" />
                    Apa perbedaan antara RCP4.5 dan RCP8.5?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    RCP4.5 adalah skenario emisi gas rumah kaca sedang,
                    sementara RCP8.5 adalah skenario emisi tinggi. RCP8.5
                    menunjukkan pemanasan global yang lebih ekstrem dibandingkan
                    RCP4.5.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Card>
            <Card>
              <AccordionItem>
                <AccordionTrigger className="px-6 py-4">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-teal-600" />
                    Bagaimana cara menggunakan data untuk penelitian?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">
                    Data dapat digunakan untuk penelitian akademik, perencanaan
                    adaptasi iklim, analisis risiko, dan pengembangan kebijakan.
                    Pastikan untuk mengutip sumber data dan metodologi yang
                    digunakan.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Card>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
