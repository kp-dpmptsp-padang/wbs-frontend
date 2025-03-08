import React from 'react';
import { Link } from 'react-router-dom';

export default function Workflow() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-primary-dark sm:text-4xl">
            Cara Kerja Sistem
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Mengenal proses pelaporan dan penanganan kasus melalui sistem Whistle Blowing. Semua langkah dirancang untuk kemudahan pengguna dengan tetap menjaga kerahasiaan identitas.
          </p>
        </div>
        {/* End Title */}

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          {/* Image */}
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <div className="bg-white rounded-xl h-full flex items-center justify-center p-8">
              <div className="text-center text-primary">
                {/* Anda bisa ganti ini dengan gambar yang sebenarnya */}
                <img src="/images/workflow.jpg" alt="illustrasi_workflow" className="rounded-3xl"/>
              </div>
            </div>
          </div>
          {/* End Image */}

          {/* Timeline */}
          <div>
            {/* Heading */}
            <div className="mb-6">
              <h3 className="text-primary text-sm font-semibold uppercase">
                Langkah-langkah
              </h3>
            </div>
            {/* End Heading */}

            {/* Item 1 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-primary text-white bg-primary font-semibold text-xs rounded-full">
                    1
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5 pb-8">
                <h4 className="text-lg font-medium text-primary-dark mb-1">Registrasi</h4>
                <p className="text-gray-600">
                  Masukkan atau login dengan akun untuk mendaftarkan diri
                  <br />Anda dengan menggunakan NIK dan email pribadi.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item */}

            {/* Item 2 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-primary text-white bg-primary font-semibold text-xs rounded-full">
                    2
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5 pb-8">
                <h4 className="text-lg font-medium text-primary-dark mb-1">Login</h4>
                <p className="text-gray-600">
                  Masuk ke platform dengan akun yang telah terdaftar dan membuat
                  <br />laporan pelanggaran hak Anda.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item */}

            {/* Item 3 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-primary text-white bg-primary font-semibold text-xs rounded-full">
                    3
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5 pb-8">
                <h4 className="text-lg font-medium text-primary-dark mb-1">Mengisi Laporan</h4>
                <p className="text-gray-600">
                  Ajukan laporan secara detail agar dapat membuat laporan
                  <br />dengan format laporan yang tersedia.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item */}

            {/* Item 4 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-primary text-white bg-primary font-semibold text-xs rounded-full">
                    4
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5 pb-8">
                <h4 className="text-lg font-medium text-primary-dark mb-1">Mendapatkan Kode Tracking</h4>
                <p className="text-gray-600">
                  Dapatkan kode unik sebagai alat melacak sejarah dan
                  <br />status kode untuk pemantauan.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item */}

            {/* Item 5 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-primary text-white bg-primary font-semibold text-xs rounded-full">
                    5
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5">
                <h4 className="text-lg font-medium text-primary-dark mb-1">Memantau Progress</h4>
                <p className="text-gray-600">
                  Pantau status perkembangan laporan yang dibuat dan
                  <br />berkomunikasi dengan admin yang menangani laporan.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item */}

            <div className="mt-8 ms-14">
              <Link 
                to="/buat-laporan"
                className="inline-flex items-center gap-x-2 py-3 px-4 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Buat Laporan
              </Link>
            </div>
          </div>
          {/* End Timeline */}
        </div>
        {/* End Grid */}
      </div>
    </section>
  );
}