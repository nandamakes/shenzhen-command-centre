import { useState } from 'react';
import './CommandCentre.css';

type Section = 'overview' | 'payments' | 'vpn' | 'banking' | 'transport' | 'restaurants' | 'culture' | 'tickets' | 'contingency';

export function CommandCentre() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [expandedCollapsibles, setExpandedCollapsibles] = useState<string[]>([]);

  const toggleCollapsible = (id: string) => {
    setExpandedCollapsibles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const sections = [
    { id: 'overview', label: 'Ringkasan', icon: '📋' },
    { id: 'payments', label: 'Pembayaran', icon: '💳' },
    { id: 'vpn', label: 'VPN & Aplikasi', icon: '🔒' },
    { id: 'banking', label: 'Banking', icon: '💰' },
    { id: 'transport', label: 'Transportasi', icon: '🚇' },
    { id: 'restaurants', label: 'Restoran', icon: '🍽️' },
    { id: 'culture', label: 'Budaya', icon: '🏯' },
    { id: 'tickets', label: 'Tiket & Booking', icon: '🎟️' },
    { id: 'contingency', label: 'Darurat', icon: '⚠️' },
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
      case 'tickets':
        return <TicketsSection />;
      case 'contingency':
        return <ContingencySection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="command-centre">
      <header className="cc-header">
        <h1>Panduan Operasional Shenzhen — Keluarga Makes</h1>
        <p>8–15 Maret 2026</p>
      </header>

      <nav className="cc-nav">
        <div className="nav-grid">
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
      </nav>

      <main className="cc-content">
        {renderSection()}
      </main>
    </div>
  );
}

// SECTIONS

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
    <section className="cc-section">
      <h2>Ringkasan Perjalanan</h2>
      
      <div className="intro-text">
        <p>Persiapan 8 hari di Shenzhen untuk 5 orang. Menginap di The Clouds Apartment, Shekou/Nanshan.</p>
      </div>

      <h3>Checklist Pra-Keberangkatan</h3>
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
          <label>Asuransi perjalanan</label>
        </li>
        <li>
          <input type="checkbox" checked={checklist.bank} onChange={() => toggleCheck('bank')} />
          <label>Notifikasi ke bank</label>
        </li>
        <li>
          <input type="checkbox" checked={checklist.maps} onChange={() => toggleCheck('maps')} />
          <label>Peta offline (AMap/Baidu)</label>
        </li>
        <li>
          <input type="checkbox" checked={checklist.vpn} onChange={() => toggleCheck('vpn')} />
          <label>VPN terinstall & ditest</label>
        </li>
        <li>
          <input type="checkbox" checked={checklist.apps} onChange={() => toggleCheck('apps')} />
          <label>Aplikasi penting diunduh</label>
        </li>
        <li>
          <input type="checkbox" checked={checklist.alipay} onChange={() => toggleCheck('alipay')} />
          <label>Alipay/WeChat Pay setup</label>
        </li>
        <li>
          <input type="checkbox" checked={checklist.reservations} onChange={() => toggleCheck('reservations')} />
          <label>Restoran dipesan (penting!)</label>
        </li>
      </ul>

      <h3>Apa yang Dibawa</h3>
      <div className="cards-grid">
        <div className="info-card">
          <h4>Elektronik</h4>
          <p>Paspor + fotokopi, power bank 2x, charger, headphone, kamera</p>
        </div>
        <div className="info-card">
          <h4>Pembayaran</h4>
          <p>2-3 kartu kredit, kartu debit, ¥500 cash RMB</p>
        </div>
        <div className="info-card">
          <h4>Kesehatan</h4>
          <p>Obat rutin, antasida, obat flu, first aid kit</p>
        </div>
        <div className="info-card">
          <h4>Pakaian</h4>
          <p>Lapisan musim semi, sepatu nyaman, outfit formal</p>
        </div>
      </div>
    </section>
  );
}

function PaymentsSection() {
  return (
    <section className="cc-section">
      <h2>Pembayaran Mobile</h2>

      <div className="warning">
        <strong>China 95% cashless.</strong> Setup pembayaran sebelum tiba.
      </div>

      <h3>Alipay (Universal)</h3>
      <div className="step">
        <h4>Langkah 1: Download</h4>
        <p>iOS: App Store | Android: Google Play</p>
      </div>

      <div className="step">
        <h4>Langkah 2: Register</h4>
        <p>Email internasional, nomor telepon, password kuat</p>
      </div>

      <div className="step">
        <h4>Langkah 3: Link Pembayaran</h4>
        <p>Visa/Mastercard, limit harian mulai ¥2,000</p>
      </div>

      <h3>WeChat Pay (Untuk Restoran)</h3>
      <div className="step">
        <h4>Setup</h4>
        <p>WeChat account, link payment method, verifikasi 24-72 jam</p>
      </div>

      <h3>Kapan Pakai Apa?</h3>
      <table className="comparison">
        <tr>
          <td>Fine dining</td>
          <td className="highlight">Alipay</td>
          <td>WeChat Pay (backup)</td>
        </tr>
        <tr>
          <td>Makanan jalanan</td>
          <td className="highlight">WeChat QR</td>
          <td>Alipay QR (backup)</td>
        </tr>
        <tr>
          <td>Metro card</td>
          <td className="highlight">Alipay app</td>
          <td>WeChat Pay (backup)</td>
        </tr>
        <tr>
          <td>Ride-share (Didi)</td>
          <td className="highlight">Alipay</td>
          <td>WeChat Pay (backup)</td>
        </tr>
      </table>

      <p className="note">Simpan ¥300-500 cash untuk temple, vendor lama, situasi darurat.</p>
    </section>
  );
}

function VPNSection({ expandedCollapsibles, toggleCollapsible }: { expandedCollapsibles: string[]; toggleCollapsible: (id: string) => void }) {
  return (
    <section className="cc-section">
      <h2>VPN &amp; Aplikasi</h2>

      <div className="warning">
        <strong>China memblokir Google, Facebook, Instagram, YouTube.</strong> VPN diperlukan.
      </div>

      <h3>VPN Installation (SEBELUM Tiba!)</h3>
      <p>Anda tidak bisa download VPN dari dalam China. Install sebelum landing.</p>

      <div className="collapsible-group">
        <button 
          className={`collapsible-header ${expandedCollapsibles.includes('vpn-list') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('vpn-list')}
        >
          Aplikasi VPN Rekomendasi
          <span className="icon">›</span>
        </button>
        {expandedCollapsibles.includes('vpn-list') && (
          <div className="collapsible-content">
            <div className="option">
              <h4>ExpressVPN</h4>
              <p>$9.99/bulan — Tercepat, paling andal (rekomen)</p>
            </div>
            <div className="option">
              <h4>NordVPN</h4>
              <p>$3.99/bulan — Keseimbangan baik, murah</p>
            </div>
          </div>
        )}
      </div>

      <h3>Aplikasi Penting</h3>
      <div className="cards-grid">
        <div className="info-card">
          <h4>AMap</h4>
          <p>Navigasi #1 2026. Akurat, real-time traffic, integrasi metro.</p>
        </div>
        <div className="info-card">
          <h4>Didi</h4>
          <p>Ride-share. Murah dari taksi, bayar via Alipay/WeChat.</p>
        </div>
        <div className="info-card">
          <h4>WeChat</h4>
          <p>Messaging + pembayaran. Essential untuk QR code ordering.</p>
        </div>
        <div className="info-card">
          <h4>Meituan</h4>
          <p>Yelp China. Browse restoran, booking, review customer.</p>
        </div>
      </div>

      <p className="note">Download priority: VPN → AMap → Didi → Alipay → WeChat → Meituan</p>
    </section>
  );
}

function BankingSection() {
  return (
    <section className="cc-section">
      <h2>Banking &amp; Mata Uang</h2>

      <h3>Kurs Tukar (Februari 2026)</h3>
      <table className="comparison">
        <tr>
          <td>1 USD</td>
          <td className="highlight">~¥6.45</td>
        </tr>
        <tr>
          <td>10,000 IDR</td>
          <td className="highlight">~¥4</td>
        </tr>
      </table>

      <h3>Mendapatkan RMB Cash</h3>
      <div className="step">
        <h4>Opsi 1: ATM Bandara (Rekomen)</h4>
        <p>ATM di Bandara Shenzhen Bao'an. Biaya ~¥8-12. Dapatkan ¥500-800 saja.</p>
      </div>

      <div className="step">
        <h4>Opsi 2: Counter Bandara</h4>
        <p>Kurs kurang menguntungkan, tapi aman. 5-10 menit. Bawa paspor.</p>
      </div>

      <h3>Budget 8 Hari (5 orang)</h3>
      <div className="cards-grid">
        <div className="info-card">
          <h4>Makanan</h4>
          <p>¥3,000-4,000/orang<br/>¥15,000-20,000 total</p>
        </div>
        <div className="info-card">
          <h4>Transportasi</h4>
          <p>¥200-400/orang<br/>¥1,000-2,000 total</p>
        </div>
        <div className="info-card">
          <h4>Aktivitas</h4>
          <p>¥500-1,500/orang<br/>¥2,500-7,500 total</p>
        </div>
        <div className="info-card">
          <h4>Total</h4>
          <p><strong>¥28,000</strong><br/>¥5,600/orang</p>
        </div>
      </div>

      <p className="note">Pakai tracking pengeluaran Alipay/WeChat. Otomatis kategorisasi spending.</p>
    </section>
  );
}

function TransportSection() {
  return (
    <section className="cc-section">
      <h2>Transportasi</h2>

      <h3>Shenzhen Metro (Paling Digunakan)</h3>
      <div className="info-box">
        <p><strong>Cepat, murah, andal.</strong> 11 garis, 6:30am–11:30pm, ¥2–5 per perjalanan</p>
      </div>

      <h3>Kartu Metro</h3>
      <div className="step">
        <h4>Opsi 1: Kartu Fisik</h4>
        <p>Beli di booth tiket stasiun. ¥50-100 (deposit + saldo). Staff bantu bahasa Inggris.</p>
      </div>

      <div className="step">
        <h4>Opsi 2: QR Pembayaran Mobile</h4>
        <p>Pakai Alipay/WeChat Pay di mesin tiket. Lebih cepat, butuh baterai telepon.</p>
      </div>

      <h3>Dari Hotel (Shekou)</h3>
      <table className="comparison">
        <tr>
          <td>Huaqiangbei (Tech)</td>
          <td>Line 2→1, 25 min</td>
          <td className="highlight">¥5</td>
        </tr>
        <tr>
          <td>Luohu (Pet Fair)</td>
          <td>Line 2→1, 35 min</td>
          <td className="highlight">¥5</td>
        </tr>
        <tr>
          <td>COCO Park</td>
          <td>Line 2, 10 min</td>
          <td className="highlight">¥2</td>
        </tr>
      </table>

      <h3>Pony.ai Robotaxi (Baru Nov 2025!)</h3>
      <p>Autonomous robotaxis sekarang beroperasi penuh di Shenzhen. Download app Pony, input tujuan, tunggu 5-10 menit. Biaya ~¥10-20. Cakupan: Futian, Nanshan, Luohu.</p>
    </section>
  );
}

function RestaurantsSection({ expandedCollapsibles, toggleCollapsible }: { expandedCollapsibles: string[]; toggleCollapsible: (id: string) => void }) {
  return (
    <section className="cc-section">
      <h2>Protokol Restoran</h2>

      <h3>QR Code Table Ordering</h3>
      <ol className="process">
        <li>Hostess dudukan Anda</li>
        <li>Scan QR code di meja dengan WeChat/Alipay camera</li>
        <li>Telusuri menu (banyak gambar, bisa Google Translate)</li>
        <li>Pesan dari telepon, bayar SEKARANG (bukan akhir)</li>
        <li>Tunggu 10-30 menit, makan</li>
        <li>Pergi — tidak perlu bon (sudah dibayar), jangan tip!</li>
      </ol>

      <h3>Etiket Makan</h3>
      <table className="comparison">
        <tr>
          <td><strong>Sumpit</strong></td>
          <td>Coba, minta garpu jika perlu</td>
          <td>Jangan tancap tegak di nasi</td>
        </tr>
        <tr>
          <td><strong>Tip</strong></td>
          <td>Jangan tip (menghina di China)</td>
          <td>No tipping = normal</td>
        </tr>
        <tr>
          <td><strong>Pujian</strong></td>
          <td>Katakan "太好吃了!" di akhir</td>
          <td>Jangan berlebihan puji saat makan</td>
        </tr>
      </table>

      <h3>Special Cases</h3>
      <div className="collapsible-group">
        <button 
          className={`collapsible-header ${expandedCollapsibles.includes('jyukan') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('jyukan')}
        >
          JYUKAN Omakase (Hari 3 — KRITIS!)
          <span className="icon">›</span>
        </button>
        {expandedCollapsibles.includes('jyukan') && (
          <div className="collapsible-content">
            <div className="warning">
              <strong>Antri sebelum jam 11 pagi tajam!</strong> Hanya 3 ronde, penuh dalam 15 menit.
            </div>
            <p>1. Tiba 10:45am → 2. Dapat ticket → 3. Tunggu 15-45 min → 4. Duduk counter 1.5 jam → 5. Chef lakukan omakase 25-30 pieces → 6. Bayar di counter → 7. Puas!</p>
          </div>
        )}
      </div>

      <div className="collapsible-group">
        <button 
          className={`collapsible-header ${expandedCollapsibles.includes('pigeon') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('pigeon')}
        >
          大鴿飯 Roasted Pigeon (Hari 7)
          <span className="icon">›</span>
        </button>
        {expandedCollapsibles.includes('pigeon') && (
          <div className="collapsible-content">
            <div className="warning">
              <strong>Tiba sebelum buka!</strong> Michelin-bintang sold out dalam 10 menit.
            </div>
            <p>1. Tiba 15 min sebelum buka → 2. Jadi orang pertama antrian → 3. Saat buka, pesan langsung → 4. "一只鴿子" → 5. Tunggu ~20 min → 6. Golden crispy pigeon seluruh → 7. Sobek dengan tangan, makan dengan nasi → 8. Sempurna!</p>
          </div>
        )}
      </div>
    </section>
  );
}

function CultureSection() {
  return (
    <section className="cc-section">
      <h2>Budaya &amp; Etiket</h2>

      <h3>Kartu Nama</h3>
      <div className="step">
        <h4>Saat Memberikan</h4>
        <p>Gunakan kedua tangan, presentasikan dengan teks menghadap penerima, membungkuk sedikit</p>
      </div>

      <div className="step">
        <h4>Saat Menerima</h4>
        <p>Terima dengan kedua tangan, baca dengan hormat, jangan tulis di atasnya, letakkan di meja</p>
      </div>

      <h3>Foto &amp; Izin</h3>
      <table className="comparison">
        <tr>
          <td>Foto restoran/makanan</td>
          <td className="highlight">✓ Ya</td>
          <td>Didorong</td>
        </tr>
        <tr>
          <td>Foto orang tanpa izin</td>
          <td className="highlight">✗ Tidak</td>
          <td>Tanya dulu</td>
        </tr>
        <tr>
          <td>Foto gedung pemerintah</td>
          <td className="highlight">✗ Tidak</td>
          <td>Hindari kantor polisi</td>
        </tr>
      </table>

      <h3>Tips Rasa Hormat</h3>
      <ul className="bullet-list">
        <li>Pakai pakaian sederhana (tidak tampilkan banyak kulit)</li>
        <li>Jangan diskusikan politik (topik sensitif)</li>
        <li>Jangan kritik China publik</li>
        <li>Terima teh/hadiah dengan baik</li>
        <li>Tepat waktu (ketepatan penting)</li>
        <li>Jangan tunjuk dengan satu jari</li>
      </ul>
    </section>
  );
}

function TicketsSection() {
  return (
    <section className="cc-section">
      <h2>Tiket &amp; Reservasi</h2>

      <h3>Reservasi Restoran (PRIORITAS TINGGI!)</h3>
      <div className="warning">
        <strong>Buku sekarang via Meituan!</strong> Restoran terbaik penuh 1-2 minggu sebelum kunjungan.
      </div>

      <div className="cards-grid">
        <div className="info-card">
          <h4>十贯 JYUKAN</h4>
          <p>Omakase sushi, ¥298/orang<br/>Hari 3 (Mar 10)<br/>Tiba 10:45am</p>
        </div>
        <div className="info-card">
          <h4>大鴿飯 Roasted Pigeon</h4>
          <p>Michelin roasted pigeon<br/>Hari 7 (Mar 14)<br/>Tiba sebelum jam 11</p>
        </div>
        <div className="info-card">
          <h4>Yun Jing (Raffles)</h4>
          <p>Fine dining skyline ¥800+<br/>Hari 4 (Mar 11)<br/>Sunset (terbaik!)</p>
        </div>
        <div className="info-card">
          <h4>ENSUE (3-Michelin)</h4>
          <p>Chef Kostow, ¥1500+<br/>Hari 6 (Mar 13)<br/>Opsional premium</p>
        </div>
      </div>

      <h3>Aplikasi untuk Booking</h3>
      <div className="step">
        <h4>Meituan (PRIMARY)</h4>
        <p>Open app → Search restoran → Click "预订" (booking) → Pilih jam/orang → Kirim request → Tunggu konfirmasi SMS</p>
      </div>

      <div className="step">
        <h4>WeChat Official Accounts</h4>
        <p>Follow restoran favorit di WeChat → Click "预约" → Book langsung</p>
      </div>

      <h3>Tiket Atraksi</h3>
      <table className="comparison">
        <tr>
          <td><strong>Shenzhen Pet Fair</strong></td>
          <td>Mar 12-15</td>
          <td className="highlight">Pre-book via Damai (Tencent)</td>
        </tr>
        <tr>
          <td><strong>Window of the World</strong></td>
          <td>Theme park, ¥160</td>
          <td className="highlight">Meituan atau at gate</td>
        </tr>
        <tr>
          <td><strong>OCT Loft</strong></td>
          <td>Art district, FREE</td>
          <td className="highlight">Walk-in</td>
        </tr>
        <tr>
          <td><strong>Konser/Events</strong></td>
          <td>F4, Jessie J, Jolin</td>
          <td className="highlight">Damai atau Meituan</td>
        </tr>
      </table>

      <h3>QR Codes untuk Penyimpanan</h3>
      <div className="info-box">
        <p>Buat folder di telepon: 📱 Screenshots → "Shenzhen Bookings"<br/>Simpan screenshot QR code konfirmasi. Tidak perlu internet untuk show ke staff.</p>
      </div>

      <h3>Checklist Booking</h3>
      <ul className="bullet-list">
        <li>☐ JYUKAN omakase (Hari 3, 10:45am)</li>
        <li>☐ Yun Jing dinner (Hari 4, sunset)</li>
        <li>☐ Restoran fine dining backup (Hari 6)</li>
        <li>☐ Roasted pigeon (Hari 7, before 11am)</li>
        <li>☐ Pet Fair tickets (Mar 12-15)</li>
        <li>☐ Konser/events yang diminati</li>
        <li>☐ Screencap semua QR codes</li>
      </ul>
    </section>
  );
}

function ContingencySection() {
  return (
    <section className="cc-section">
      <h2>Darurat &amp; Bantuan</h2>

      <h3>Nomor Darurat</h3>
      <table className="comparison">
        <tr>
          <td>Polisi</td>
          <td className="highlight">110</td>
        </tr>
        <tr>
          <td>Ambulans</td>
          <td className="highlight">120</td>
        </tr>
        <tr>
          <td>Polisi Pariwisata</td>
          <td className="highlight">400-161-0018</td>
          <td>(English)</td>
        </tr>
        <tr>
          <td>Front Desk Hotel</td>
          <td className="highlight">Tersimpan di telepon</td>
          <td>(English)</td>
        </tr>
      </table>

      <h3>Darurat Medis</h3>
      <div className="info-box">
        <p><strong>Hubungi concierge hotel DULU (berbahasa English).</strong> Mereka atur kunjungan dokter/rumah sakit dan mungkin menemani.</p>
      </div>

      <div className="step">
        <h4>Jika Sakit</h4>
        <p>1. Hubungi concierge 2. Mereka atur dokter/rumah sakit 3. Mereka mungkin metemani 4. Simpan bon untuk klaim asuransi</p>
      </div>

      <h3>Hilang Kartu/Uang</h3>
      <div className="step">
        <h4>Kartu Kredit</h4>
        <p>Hubungi bank langsung → Card di-block dalam menit → Pakai kartu backup → Lapor polisi (untuk asuransi)</p>
      </div>

      <h3>Dokumen Backup</h3>
      <ul className="bullet-list">
        <li>Fotokopi paspor (2 salinan)</li>
        <li>Fotokopi visa</li>
        <li>Kartu asuransi travel copy</li>
        <li>Nomor bank internasional</li>
        <li>Alamat hotel (multi-format)</li>
        <li>Email copy semua dokumen ke diri sendiri</li>
      </ul>
    </section>
  );
}
