export default function Statistik() {
    return (
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Statistik</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-4xl font-bold text-blue-900">57,000</p>
              <p className="text-gray-600">Jumlah Pengguna</p>
            </div>
            {/* Tambahkan 2 statistik lainnya */}
          </div>
        </div>
      </section>
    );
}