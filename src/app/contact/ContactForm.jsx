"use client";

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah dikirim.");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Depan</label>
          <input className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-500" placeholder="Nama depan Anda" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Belakang</label>
          <input className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-500" placeholder="Nama belakang Anda" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-500" placeholder="email@contoh.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900">
          <option>Pilih subjek</option>
          <option>Pertanyaan tentang Data</option>
          <option>Bantuan Teknis</option>
          <option>Kemitraan</option>
          <option>Masukan & Saran</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
        <textarea rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder:text-gray-500" placeholder="Tuliskan pesan Anda di sini..." />
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl">Kirim Pesan</button>
    </form>
  );
}