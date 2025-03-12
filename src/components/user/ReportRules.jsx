import React from 'react';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiX, FiAlertTriangle } from 'react-icons/fi';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import List, { ListItem } from '@/components/common/List';
import Checkbox from '@/components/common/Checkbox';
import PageContainer from '@/components/user/layout/PageContainer';

const ReportRules = ({ onAccept, accepted, onAcceptedChange }) => {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-primary text-3xl font-extrabold text-center mb-4">Panduan Pelaporan Whistle Blowing System (WBS)</h1>
        <p className="text-gray-700 mb-4 text-center">
          Sebelum mengajukan laporan, harap perhatikan panduan berikut agar laporan Anda dapat ditindaklanjuti dengan baik.
        </p>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Syarat Laporan yang Valid</h3>
        <p className="text-gray-700 mb-2">Laporan yang Anda ajukan harus diusahakan memenuhi kriteria berikut:</p>
        
        <List className="mb-4 space-y-2" variant="none">
          <ListItem className="flex items-start">
            <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>Faktual & Jelas</strong> – Berisi informasi yang dapat diverifikasi, bukan opini atau dugaan.
            </span>
          </ListItem>
          <ListItem className="flex items-start">
            <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>Disertai Bukti</strong> – Jika memungkinkan, sertakan dokumen, gambar, atau rekaman pendukung.
            </span>
          </ListItem>
          <ListItem className="flex items-start">
            <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>Menyebutkan Pihak Terlibat</strong> – Identitas terlapor atau instansi terkait harus dijelaskan.
            </span>
          </ListItem>
          <ListItem className="flex items-start">
            <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>Memuat Kronologi Kejadian</strong> – Jelaskan waktu, tempat, dan bagaimana pelanggaran terjadi.
            </span>
          </ListItem>
          <ListItem className="flex items-start">
            <FiX className="text-red-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">
              Laporan yang mengandung fitnah, informasi palsu, atau tidak relevan tidak akan diproses.
            </span>
          </ListItem>
        </List>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Cara Membuat Laporan yang Baik</h3>
        <List className="mb-4 ml-4" variant="disc" marker="outside">
          <ListItem className="text-gray-700">Pilih apakah Anda ingin melaporkan secara teridentifikasi atau anonim.</ListItem>
          <ListItem className="text-gray-700">Isi formulir dengan informasi selengkap mungkin sesuai dengan syarat laporan valid.</ListItem>
          <ListItem className="text-gray-700">Gunakan bahasa yang jelas dan hindari informasi yang membingungkan atau tidak relevan.</ListItem>
          <ListItem className="text-gray-700">Jika melaporkan secara anonim, simpan kode unik yang diberikan untuk memantau status laporan.</ListItem>
        </List>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Alur Setelah Laporan Dikirim</h3>
        <List className="mb-4 space-y-2" variant="none">
          <ListItem className="flex items-start">
            <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2 flex-shrink-0">📥</span>
            <span className="text-gray-700">
              <strong>Diterima</strong> – Laporan masuk ke sistem dan akan ditinjau oleh Admin Verifikator.
            </span>
          </ListItem>
          <ListItem className="flex items-start">
            <span className="bg-yellow-100 text-yellow-800 p-1 rounded-full mr-2 flex-shrink-0">🔍</span>
            <span className="text-gray-700">
              <strong>Verifikasi</strong> – Admin Verifikator akan mengevaluasi apakah laporan memenuhi kriteria.
            </span>
          </ListItem>
          <ListItem className="flex items-start">
            <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2 flex-shrink-0">✓</span>
            <span className="text-gray-700">
              <strong>Diproses</strong> – Jika valid, laporan diteruskan ke Admin Prosesor untuk investigasi lebih lanjut.
            </span>
          </ListItem>
          <ListItem className="flex items-start">
            <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2 flex-shrink-0">📋</span>
            <span className="text-gray-700">
              <strong>Tindak Lanjut</strong> – Admin Prosesor akan memperbarui status laporan dan berkomunikasi dengan Anda.
            </span>
          </ListItem>
          <ListItem className="flex items-start">
            <span className="bg-gray-100 text-gray-800 p-1 rounded-full mr-2 flex-shrink-0">📃</span>
            <span className="text-gray-700">
              <strong>Selesai</strong> – Laporan akan ditutup setelah proses penyelesaian terdokumentasi.
            </span>
          </ListItem>
        </List>
        
        <Card className="bg-yellow-50 border-yellow-200 mb-4">
          <div className="flex items-start">
            <FiAlertTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-yellow-800">
                <strong>Catatan:</strong> Jika Anda melapor secara anonim, pastikan menyimpan kode unik yang diberikan untuk memantau perkembangan laporan.
              </p>
            </div>
          </div>
        </Card>
        
        <p className="text-gray-700 font-medium">
          Terima kasih telah berkontribusi dalam menciptakan lingkungan yang lebih transparan dan adil!
        </p>
      </div>
      
      <div className="mb-6">
        <Checkbox
          id="accept-guidelines"
          checked={accepted}
          onChange={(e) => onAcceptedChange(e.target.checked)}
          label="Saya mengerti dan menyetujui panduan di atas"
        />
      </div>
      
      <div className="flex justify-center">
        <Button
          variant="primary"
          disabled={!accepted}
          onClick={onAccept}
          block
        >
          Buat Laporan
        </Button>
      </div>
    </PageContainer>
  );
};

ReportRules.propTypes = {
  onAccept: PropTypes.func.isRequired,
  accepted: PropTypes.bool.isRequired,
  onAcceptedChange: PropTypes.func.isRequired
};

export default ReportRules;