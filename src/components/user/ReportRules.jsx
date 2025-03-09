// src/components/user/ReportRules.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiX, FiAlertTriangle } from 'react-icons/fi';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const ReportRules = ({ onAccept, accepted, onAcceptedChange }) => {
  return (
    <Card>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Panduan Pelaporan Whistle Blowing System (WBS)
        </h2>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Sebelum mengajukan laporan, harap perhatikan panduan berikut agar laporan Anda dapat ditindaklanjuti dengan baik.
          </p>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Syarat Laporan yang Valid</h3>
          <p className="text-gray-700 mb-2">Laporan yang Anda ajukan harus diusahakan memenuhi kriteria berikut:</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Faktual & Jelas</strong> – Berisi informasi yang dapat diverifikasi, bukan opini atau dugaan.
              </span>
            </li>
            <li className="flex items-start">
              <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Disertai Bukti</strong> – Jika memungkinkan, sertakan dokumen, gambar, atau rekaman pendukung.
              </span>
            </li>
            <li className="flex items-start">
              <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Menyebutkan Pihak Terlibat</strong> – Identitas terlapor atau instansi terkait harus dijelaskan.
              </span>
            </li>
            <li className="flex items-start">
              <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Memuat Kronologi Kejadian</strong> – Jelaskan waktu, tempat, dan bagaimana pelanggaran terjadi.
              </span>
            </li>
            <li className="flex items-start">
              <FiX className="text-red-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                Laporan yang mengandung fitnah, informasi palsu, atau tidak relevan tidak akan diproses.
              </span>
            </li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Cara Membuat Laporan yang Baik</h3>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li className="text-gray-700">Pilih apakah Anda ingin melaporkan secara teridentifikasi atau anonim.</li>
            <li className="text-gray-700">Isi formulir dengan informasi selengkap mungkin sesuai dengan syarat laporan valid.</li>
            <li className="text-gray-700">Gunakan bahasa yang jelas dan hindari informasi yang membingungkan atau tidak relevan.</li>
            <li className="text-gray-700">Jika melaporkan secara anonim, simpan kode unik yang diberikan untuk memantau status laporan.</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Alur Setelah Laporan Dikirim</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2 flex-shrink-0">📥</span>
              <span className="text-gray-700">
                <strong>Diterima</strong> – Laporan masuk ke sistem dan akan ditinjau oleh Admin Verifikator.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-100 text-yellow-800 p-1 rounded-full mr-2 flex-shrink-0">🔍</span>
              <span className="text-gray-700">
                <strong>Verifikasi</strong> – Admin Verifikator akan mengevaluasi apakah laporan memenuhi kriteria.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2 flex-shrink-0">✓</span>
              <span className="text-gray-700">
                <strong>Diproses</strong> – Jika valid, laporan diteruskan ke Admin Prosesor untuk investigasi lebih lanjut.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2 flex-shrink-0">📋</span>
              <span className="text-gray-700">
                <strong>Tindak Lanjut</strong> – Admin Prosesor akan memperbarui status laporan dan berkomunikasi dengan Anda.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-100 text-gray-800 p-1 rounded-full mr-2 flex-shrink-0">📃</span>
              <span className="text-gray-700">
                <strong>Selesai</strong> – Laporan akan ditutup setelah proses penyelesaian terdokumentasi.
              </span>
            </li>
          </ul>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
            <p className="text-yellow-800">
              <FiAlertTriangle className="inline-block mr-2" />
              <strong>Catatan:</strong> Jika Anda melapor secara anonim, pastikan menyimpan kode unik yang diberikan untuk memantau perkembangan laporan.
            </p>
          </div>
          
          <p className="text-gray-700 font-medium">
            Terima kasih telah berkontribusi dalam menciptakan lingkungan yang lebih transparan dan adil!
          </p>
        </div>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="accept-guidelines"
            checked={accepted}
            onChange={(e) => onAcceptedChange(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="accept-guidelines" className="ml-2 block text-gray-700">
            Saya mengerti dan menyetujui panduan di atas
          </label>
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="primary"
            disabled={!accepted}
            onClick={onAccept}
            className="px-8"
          >
            Buat Laporan
          </Button>
        </div>
      </div>
    </Card>
  );
};

ReportRules.propTypes = {
  onAccept: PropTypes.func.isRequired,
  accepted: PropTypes.bool.isRequired,
  onAcceptedChange: PropTypes.func.isRequired
};

export default ReportRules;