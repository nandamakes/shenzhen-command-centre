import { useState } from 'react';
import './CommandCentre.css';

type Section = 'overview' | 'payments' | 'vpn' | 'banking' | 'transport' | 'restaurants' | 'culture' | 'contingency';

export function CommandCentre() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [expandedCollapsibles, setExpandedCollapsibles] = useState<string[]>([]);

  const toggleCollapsible = (id: string) => {
    setExpandedCollapsibles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const sections = [
    { id: 'overview', label: '📋 Ringkasan', icon: '📋' },
    { id: 'payments', label: '💳 Pembayaran', icon: '💳' },
    { id: 'vpn', label: '🔒 VPN & Aplikasi', icon: '🔒' },
    { id: 'banking', label: '💰 Banking & Mata Uang', icon: '💰' },
    { id: 'transport', label: '🚇 Transportasi', icon: '🚇' },
    { id: 'restaurants', label: '🍽️ Restoran', icon: '🍽️' },
    { id: 'culture', label: '🏯 Budaya & Etiket', icon: '🏯' },
    { id: 'contingency', label: '⚠️ Darurat & Bantuan', icon: '⚠️' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'payments':
        return <PaymentsSection />;
      case 'vpn':
        return <VPNSection expandedCollapsibles={expandedCollapsibles} toggleCollapsible={toggleCollapsible} />;
      case 'banking':
        return <BankingSection />;
      case 'transport':
        return <TransportSection />;
      case 'restaurants':
        return <RestaurantsSection expandedCollapsibles={expandedCollapsibles} toggleCollapsible={toggleCollapsible} />;
      case 'culture':
        return <CultureSection />;
      case 'contingency':
        return <ContingencySection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="command-centre">
      <div className="cc-header">
        <div className="header-content">
          <h1>🎯 Panduan Operasional Shenzhen</h1>
          <p>8-15 Maret 2026 | Untuk Keluarga Tersayang</p>
        </div>
      </div>

      <div className="cc-nav">
        <div className="nav-buttons">
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id as Section)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-label">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="cc-content">
        {renderSection()}
      </div>
    </div>
  );
}

// SECTION COMPONENTS

function OverviewSection() {
  const [checklist, setChecklist] = useState({
    passports: false,
    visas: false,
    insurance: false,
    bank: false,
    maps: false,
    vpn: false,
    apps: false,
    alipay: false,
    reservations: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="cc-section">
      <h2>📋 Ringkasan Perjalanan</h2>
      
      <div className="section-content">
        <h3>🎯 Misi Keluarga</h3>
        <p className="mission-text">
          Petualangan 8 hari di Shenzhen (8-15 Maret 2026) untuk 5 orang. Menginap di The Clouds Apartment, Shekou/Nanshan.<br />
          <strong>Tujuan:</strong> Pengalaman kuliner kelas dunia, inovasi teknologi, immersi budaya, dan mastery logistik perjalanan.
        </p>

        <h3>✅ Checklist Pra-Keberangkatan (Sebelum 8 Maret)</h3>
        <ul className="checklist">
          <li>
            <input type="checkbox" checked={checklist.passports} onChange={() => toggleCheck('passports')} />
            <label>Paspor berlaku &gt;6 bulan</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.visas} onChange={() => toggleCheck('visas')} />
            <label>Visa China diperoleh</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.insurance} onChange={() => toggleCheck('insurance')} />
            <label>Asuransi perjalanan dibeli</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.bank} onChange={() => toggleCheck('bank')} />
            <label>Notifikasi bank tentang tanggal perjalanan</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.maps} onChange={() => toggleCheck('maps')} />
            <label>Unduh peta offline (AMap/Baidu)</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.vpn} onChange={() => toggleCheck('vpn')} />
            <label>Install & test VPN</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.apps} onChange={() => toggleCheck('apps')} />
            <label>Install aplikasi penting</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.alipay} onChange={() => toggleCheck('alipay')} />
            <label>Daftar Alipay/WeChat Pay</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.reservations} onChange={() => toggleCheck('reservations')} />
            <label>Pemesanan restoran (KRITIS!)</label>
          </li>
        </ul>

        <h3>💼 Apa yang Dibawa</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <h4>📱 Elektronik</h4>
            <p>Paspor + fotokopi, power bank 2x, charger, headphone, kamera</p>
          </div>
          <div className="feature-card">
            <h4>💳 Pembayaran</h4>
            <p>2-3 kartu kredit, kartu debit, ¥500 cash RMB, dompet</p>
          </div>
          <div className="feature-card">
            <h4>🏥 Kesehatan</h4>
            <p>Obat rutin + travel, antasida, obat flu, first aid, rx copy</p>
          </div>
          <div className="feature-card">
            <h4>👕 Pakaian</h4>
            <p>Lapisan musim semi (15-25°C), sepatu nyaman, outfit formal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentsSection() {
  return (
    <div className="cc-section">
      <h2>💳 Pembayaran Mobile</h2>

      <div className="alert-box">
        <strong>⚠️ KRITIS:</strong> China 95% cashless. Setup pembayaran SEBELUM tiba!
      </div>

      <h3>🏦 Setup Alipay (Paling Universal)</h3>
      <div className="step-box">
        <h4>Langkah 1: Download & Verifikasi</h4>
        <p>iOS: App Store | Android: Google Play</p>
      </div>

      <div className="step-box">
        <h4>Langkah 2: Registrasi Akun</h4>
        <p>• Email (internasional OK)<br />• Nomor telepon (+62 atau +1 bisa)<br />• Password (kuat!)<br />• Pertanyaan keamanan</p>
      </div>

      <div className="step-box">
        <h4>Langkah 3: Link Metode Pembayaran</h4>
        <p>• Visa/Mastercard (kredit atau debit)<br />• Daily limit: Mulai ¥2,000/hari<br />• Aktifkan notifikasi instant</p>
      </div>

      <h3>💬 Setup WeChat Pay</h3>
      <div className="step-box">
        <h4>Penting untuk Restoran</h4>
        <p>• WeChat account (daftar internasional)<br />• Link payment method (Visa/Mastercard)<br />• Verifikasi bank: 24-72 jam</p>
      </div>

      <h3>📊 Metode Pembayaran (Kapan Pakai?)</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Situasi</th>
            <th>Pilihan Terbaik</th>
            <th>Backup</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Restoran fine dining</td>
            <td>Alipay</td>
            <td>WeChat Pay</td>
          </tr>
          <tr>
            <td>Makanan jalanan & casual</td>
            <td>WeChat Pay (QR)</td>
            <td>Alipay QR</td>
          </tr>
          <tr>
            <td>Metro card top-up</td>
            <td>Alipay app</td>
            <td>WeChat Pay</td>
          </tr>
          <tr>
            <td>Ride-share (Didi)</td>
            <td>Alipay (biaya rendah)</td>
            <td>WeChat Pay</td>
          </tr>
        </tbody>
      </table>

      <div className="tip-box">
        <strong>💡 Pro Tip:</strong> Simpan ¥300-500 cash untuk temple donation, vendor lama, situasi darurat.
      </div>
    </div>
  );
}

function VPNSection({ expandedCollapsibles, toggleCollapsible }: { expandedCollapsibles: string[]; toggleCollapsible: (id: string) => void }) {
  return (
    <div className="cc-section">
      <h2>🔒 VPN & Aplikasi Penting</h2>

      <div className="alert-box">
        <strong>⚠️ KRITIS:</strong> China memblokir Google, Facebook, Instagram, YouTube. VPN DIPERLUKAN!
      </div>

      <h3>🔒 Instalasi VPN (SEBELUM Tiba!)</h3>
      <div className="alert-box">
        <strong>⚠️ PERINGATAN:</strong> Anda TIDAK BISA download VPN dari dalam China. Install sebelum landing!
      </div>

      <div className="collapsible-group">
        <div 
          className={`collapsible-header ${expandedCollapsibles.includes('vpn-list') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('vpn-list')}
        >
          📱 Aplikasi VPN Rekomendasi
          <span className="collapsible-icon">▼</span>
        </div>
        {expandedCollapsibles.includes('vpn-list') && (
          <div className="collapsible-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>VPN App</th>
                  <th>Harga</th>
                  <th>Kecepatan</th>
                  <th>Terbaik Untuk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ExpressVPN</strong></td>
                  <td>$9.99/bln</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>Tercepat & andal (rekomen)</td>
                </tr>
                <tr>
                  <td><strong>NordVPN</strong></td>
                  <td>$3.99/bln</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>Keseimbangan baik, murah</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <h3>📲 Aplikasi Penting (Download SEBELUM Tiba)</h3>
      <div className="feature-grid">
        <div className="feature-card">
          <h4>🗺️ AMap</h4>
          <p>Navigasi #1 2026. Akurat, real-time traffic, integrasi metro sempurna.</p>
        </div>
        <div className="feature-card">
          <h4>🚕 Didi</h4>
          <p>Ride-share utama. Lebih murah dari taksi, bayar via Alipay/WeChat.</p>
        </div>
        <div className="feature-card">
          <h4>💬 WeChat</h4>
          <p>Messaging + pembayaran. Semua orang pakai. Essential untuk QR ordering.</p>
        </div>
        <div className="feature-card">
          <h4>🍽️ Meituan</h4>
          <p>Yelp China. Browse restoran, booking table, review customer nyata.</p>
        </div>
      </div>

      <div className="tip-box">
        <strong>💡 Download Priority:</strong><br />
        1. VPN (sebelum tiba!) | 2. AMap | 3. Didi | 4. Alipay | 5. WeChat | 6. Meituan
      </div>
    </div>
  );
}

function BankingSection() {
  return (
    <div className="cc-section">
      <h2>💰 Banking & Mata Uang</h2>

      <h3>💴 Kurs Tukar (Februari 2026)</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Pasangan Mata Uang</th>
            <th>Kurs</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 USD = ¥ RMB</td>
            <td>~6.45</td>
            <td>Gunakan untuk konversi kasar</td>
          </tr>
          <tr>
            <td>1 IDR = ¥ RMB</td>
            <td>~0.0004</td>
            <td>10,000 IDR = ~4 RMB</td>
          </tr>
        </tbody>
      </table>

      <h3>🏧 Mendapatkan Uang Tunai RMB</h3>
      <div className="step-box">
        <h4>Opsi 1: ATM Bandara (Rekomen)</h4>
        <p>• ATM di Bandara Shenzhen Bao'an (terminal 1 & 3)<br />• Kartu debit internasional bekerja<br />• Biaya: ~¥8-12<br />• DAPATKAN ¥500-800 saja</p>
      </div>

      <div className="step-box">
        <h4>Opsi 2: Tukar di Counter Bandara</h4>
        <p>• Kurs kurang menguntungkan tapi aman<br />• 5-10 menit<br />• Bawa paspor</p>
      </div>

      <h3>📊 Budget Breakdown (8 Hari, 5 Orang)</h3>
      <div className="feature-grid">
        <div className="feature-card">
          <h4>Budget Makan</h4>
          <p>¥3,000-4,000/orang<br />¥15,000-20,000 total<br />(Fine dining included)</p>
        </div>
        <div className="feature-card">
          <h4>Budget Transportasi</h4>
          <p>¥200-400/orang<br />¥1,000-2,000 total</p>
        </div>
        <div className="feature-card">
          <h4>Aktivitas & Shopping</h4>
          <p>¥500-1,500/orang<br />¥2,500-7,500 total</p>
        </div>
        <div className="feature-card">
          <h4>Total Budget</h4>
          <p>¥28,000 (~$4,300)<br />¥5,600/orang</p>
        </div>
      </div>

      <div className="tip-box">
        <strong>💡 Tracking:</strong> Gunakan fitur tracking pengeluaran Alipay/WeChat. Otomatis kategorisasi spending!
      </div>
    </div>
  );
}

function TransportSection() {
  return (
    <div className="cc-section">
      <h2>🚇 Transportasi</h2>

      <h3>🚇 Shenzhen Metro (Paling Digunakan)</h3>
      <div className="step-box">
        <h4>Overview</h4>
        <p><strong>Mengapa:</strong> Cepat, murah, andal. 11 garis seluruh kota.<br />
        <strong>Jam:</strong> 6:30am - 11:30pm<br />
        <strong>Frekuensi:</strong> 3-5 min (puncak) / 10-15 min (off-peak)<br />
        <strong>Biaya:</strong> ¥2-5 per perjalanan</p>
      </div>

      <div className="step-box">
        <h4>Setup Kartu Metro</h4>
        <p><strong>Opsi 1: Kartu Fisik</strong><br />• Beli di booth tiket stasiun metro<br />• Biaya: ¥50-100 (deposit + saldo awal)<br />• Staff bantu bahasa Inggris<br /><br />
        <strong>Opsi 2: QR Pembayaran Mobile</strong><br />• Pakai Alipay/WeChat Pay QR di mesin tiket<br />• Lebih cepat tapi butuh baterai telepon</p>
      </div>

      <h3>🏨 Dari Hotel (The Clouds, Shekou)</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Tujuan</th>
            <th>Garis Metro</th>
            <th>Waktu</th>
            <th>Biaya</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Huaqiangbei (Tech)</td>
            <td>Line 2 → 1</td>
            <td>25 min</td>
            <td>¥5</td>
          </tr>
          <tr>
            <td>Luohu (Pet Fair)</td>
            <td>Line 2 → 1</td>
            <td>35 min</td>
            <td>¥5</td>
          </tr>
          <tr>
            <td>COCO Park</td>
            <td>Line 2</td>
            <td>10 min</td>
            <td>¥2</td>
          </tr>
        </tbody>
      </table>

      <h3>🤖 Pony.ai Robotaxi (BARU Nov 2025+!)</h3>
      <div className="alert-box">
        <strong>🎉 Fully operational sejak November 2025!</strong> Robotaxi otonom di Shenzhen!
      </div>
      <div className="step-box">
        <h4>Cara Pakai</h4>
        <p>1. Download app Pony<br />2. Input tujuan<br />3. Konfirmasi harga<br />4. Tunggu 5-10 min<br />5. Duduk & nikmati autonomous driving!<br /><br />
        <strong>Cakupan:</strong> Shenzhen Central (Futian, Nanshan, Luohu)<br />
        <strong>Biaya:</strong> ~¥10-20</p>
      </div>
    </div>
  );
}

function RestaurantsSection({ expandedCollapsibles, toggleCollapsible }: { expandedCollapsibles: string[]; toggleCollapsible: (id: string) => void }) {
  return (
    <div className="cc-section">
      <h2>🍽️ Protokol Restoran</h2>

      <h3>📱 QR-Code Table Ordering</h3>
      <div className="step-box">
        <h4>Proses Standar</h4>
        <p>
          <strong>1. Tiba:</strong> Hostess dudukan Anda<br /><br />
          <strong>2. Scan QR code di meja:</strong> QR → scan dengan kamera WeChat/Alipay → buka menu PDF<br /><br />
          <strong>3. Telusuri menu:</strong> Banyak gambar, bisa Google Translate, harga jelas<br /><br />
          <strong>4. Pesan dari telepon:</strong> Pilih item, jumlah, bayar SEKARANG (bukan akhir)<br /><br />
          <strong>5. Tunggu & makan:</strong> Waktu estimasi ditampilkan, tunggu 10-30 min<br /><br />
          <strong>6. Pergi:</strong> Tidak perlu bon (sudah dibayar), jangan tip di China!
        </p>
      </div>

      <h3>🍴 Etiket Makan</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Situasi</th>
            <th>Lakukan</th>
            <th>Jangan Lakukan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sumpit</td>
            <td>Coba, minta garpu jika perlu</td>
            <td>Jangan tancap tegak di nasi (gestur pemakaman)</td>
          </tr>
          <tr>
            <td>Tip</td>
            <td>Jangan tip (menghina di China)</td>
            <td>No tipping = normal praktik</td>
          </tr>
          <tr>
            <td>Pujian</td>
            <td>Katakan "太好吃了!" (enak sekali!) di akhir</td>
            <td>Jangan berlebihan puji saat makan</td>
          </tr>
        </tbody>
      </table>

      <h3>🚨 Special Restaurant Cases</h3>
      <div className="collapsible-group">
        <div 
          className={`collapsible-header ${expandedCollapsibles.includes('jyukan') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('jyukan')}
        >
          🍣 JYUKAN Omakase (Hari 3 - KRITIS!)
          <span className="collapsible-icon">▼</span>
        </div>
        {expandedCollapsibles.includes('jyukan') && (
          <div className="collapsible-content">
            <div className="alert-box">
              <strong>⚠️ ANTRI SEBELUM JAM 11 PAGI TAJAM!</strong><br />Hanya 3 ronde makan siang. Penuh dalam 15 menit!
            </div>
            <p>1. Tiba jam 10:45am<br />2. Dapatkan ticket stub<br />3. Tunggu (~15-45 min)<br />4. Duduk di counter (~1.5 jam)<br />5. Chef lakukan omakase (~25-30 pieces)<br />6. Bayar di counter<br />7. Puas!</p>
          </div>
        )}
      </div>

      <div className="collapsible-group">
        <div 
          className={`collapsible-header ${expandedCollapsibles.includes('pigeon') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('pigeon')}
        >
          🦆 大鴿飯 Roasted Pigeon (Hari 7)
          <span className="collapsible-icon">▼</span>
        </div>
        {expandedCollapsibles.includes('pigeon') && (
          <div className="collapsible-content">
            <div className="alert-box">
              <strong>⚠️ TIBA SEBELUM BUKA!</strong><br />Pigeon Michelin-bintang sold out dalam 10 menit!
            </div>
            <p>1. Tiba 15 min sebelum buka<br />2. Jadi orang pertama antrian<br />3. Saat buka, pesan langsung<br />4. "一只鴿子" (one pigeon)<br />5. Tunggu (~20 min)<br />6. Golden crispy pigeon seluruh<br />7. Sobek dengan tangan, makan dengan nasi<br />8. SEMPURNA!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CultureSection() {
  return (
    <div className="cc-section">
      <h2>🏯 Budaya & Etiket</h2>

      <h3>🤝 Etiket Kartu Nama</h3>
      <div className="step-box">
        <h4>Saat Memberikan Kartu</h4>
        <p>• Gunakan kedua tangan<br />• Presentasikan dengan teks menghadap penerima<br />• Membungkuk sedikit</p>
      </div>

      <div className="step-box">
        <h4>Saat Menerima Kartu</h4>
        <p>• Terima dengan kedua tangan<br />• Baca dengan hormat<br />• Jangan tulis di atasnya<br />• Letakkan di meja, bukan saku</p>
      </div>

      <h3>📸 Foto & Izin</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Situasi</th>
            <th>OK?</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foto restoran/makanan</td>
            <td>✅ Ya</td>
            <td>Didorong! Lokal lakukan terus</td>
          </tr>
          <tr>
            <td>Foto orang tanpa izin</td>
            <td>❌ Tidak</td>
            <td>Selalu tanya izin dulu (senyum + tunjuk)</td>
          </tr>
          <tr>
            <td>Foto gedung pemerintah</td>
            <td>❌ Tidak</td>
            <td>Hindari kantor polisi, gedung pemerintah</td>
          </tr>
        </tbody>
      </table>

      <h3>🎯 Tips Rasa Hormat</h3>
      <ul className="checklist">
        <li>
          <input type="checkbox" />
          <label>Pakai pakaian sederhana (tidak tampilkan banyak kulit)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Jangan diskusikan politik (topik sensitif)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Jangan kritik China publik (penduduk sensitif)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Terima teh/hadiah dengan baik (jangan tolak)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Tepat waktu (ketepatan penting)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Jangan tunjuk dengan satu jari (pakai tangan terbuka)</label>
        </li>
      </ul>
    </div>
  );
}

function ContingencySection() {
  return (
    <div className="cc-section">
      <h2>⚠️ Darurat & Bantuan</h2>

      <h3>📞 Nomor Darurat</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Jenis Darurat</th>
            <th>Nomor</th>
            <th>English?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Polisi</td>
            <td>110</td>
            <td>Terbatas (coba English)</td>
          </tr>
          <tr>
            <td>Ambulans</td>
            <td>120</td>
            <td>Tidak (pakai concierge hotel)</td>
          </tr>
          <tr>
            <td>Polisi Pariwisata</td>
            <td>400-161-0018</td>
            <td>✅ Ya! Bahasa English</td>
          </tr>
          <tr>
            <td>Front Desk Hotel</td>
            <td>Tersimpan di telepon</td>
            <td>✅ Ya!</td>
          </tr>
        </tbody>
      </table>

      <h3>🏥 Darurat Medis</h3>
      <div className="alert-box">
        <strong>⚠️ KRITIS:</strong> The Clouds punya layanan concierge. Hubungi DULU untuk darurat medis (berbahasa English)!
      </div>

      <div className="step-box">
        <h4>Jika Sakit</h4>
        <p>1. Hubungi concierge hotel (English)<br />
        2. Mereka atur kunjungan dokter/rumah sakit<br />
        3. Mereka mungkin menemani<br />
        4. Simpan bon untuk klaim asuransi<br /><br />
        <strong>Rumah Sakit Top Shenzhen:</strong><br />
        • Rumah Sakit Umum Universitas Shenzhen<br />
        • Klinik Internasional Swasta (mahal tapi staff English)</p>
      </div>

      <h3>💰 Hilang Kartu/Uang</h3>
      <div className="step-box">
        <h4>Kartu Kredit Hilang</h4>
        <p>1. Hubungi bank Anda langsung<br />2. Kartu di-block dalam menit<br />3. Pakai kartu backup<br />4. Lapor polisi (untuk asuransi)</p>
      </div>

      <h3>🧳 Dokumen Backup</h3>
      <ul className="checklist">
        <li>
          <input type="checkbox" />
          <label>Fotokopi paspor (2 salinan)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Fotokopi visa</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Kartu asuransi perjalanan copy</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Nomor telepon bank internasional</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Alamat hotel (multi-format)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Email salinan semua dokumen ke diri sendiri</label>
        </li>
      </ul>
    </div>
  );
}
