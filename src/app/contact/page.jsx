import ContactForm from "./ContactForm";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Contact - ClimateDash",
  description: "Hubungi tim ClimateDash",
};

export default function ContactPage() {
  return (
    <main className="font-sans">
      <div className="w-full bg-linear-to-br from-blue-600 via-blue-700 to-blue-800">
        <Navbar />
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 " />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Hubungi <span className="text-blue-200">Kami</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Punya pertanyaan atau masukan? Kami siap membantu.
            </p>
          </div>
        </section>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Kirim Pesan
            </h3>
            {/* Interactive form extracted to client component */}
            <ContactForm />
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Informasi Kontak
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>Email: support@climatedash.id</li>
                <li>Telepon: +62 21 1234 5678</li>
                <li>Alamat: Surabaya, Indonesia</li>
                <li>Jam Kerja: Senin - Jumat, 09:00 - 17:00 WIB</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Media Sosial
              </h3>
              <div className="grid grid-cols-2 gap-4 text-gray-800">
                <a
                  href="#"
                  className="p-4 bg-blue-50 text-blue-800 rounded-xl hover:bg-blue-100"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="p-4 bg-blue-50 text-blue-800 rounded-xl hover:bg-blue-100"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="p-4 bg-pink-50 text-pink-800 rounded-xl hover:bg-pink-100"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="p-4 bg-blue-50 text-blue-800 rounded-xl hover:bg-blue-100"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
