import { useState } from 'react';
import './CommandCentre.css';

type Section = 'overview' | 'payments' | 'vpn' | 'banking' | 'transport' | 'restaurants' | 'culture' | 'contingency' | 'events' | 'itinerary';

export function CommandCentre() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [expandedCollapsibles, setExpandedCollapsibles] = useState<string[]>([]);

  const toggleCollapsible = (id: string) => {
    setExpandedCollapsibles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const sections = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'payments', label: '📱 Mobile Payments', icon: '📱' },
    { id: 'vpn', label: '🔐 VPN & Apps', icon: '🔐' },
    { id: 'banking', label: '💱 Banking & Currency', icon: '💱' },
    { id: 'transport', label: '🚇 Transportation', icon: '🚇' },
    { id: 'restaurants', label: '🍽️ Restaurant Protocols', icon: '🍽️' },
    { id: 'culture', label: '🌏 Cultural Etiquette', icon: '🌏' },
    { id: 'contingency', label: '🚨 Contingency', icon: '🚨' },
    { id: 'events', label: '🎪 Events & Activities', icon: '🎪' },
    { id: 'itinerary', label: '📅 8-Day Itinerary', icon: '📅' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'payments':
        return <PaymentsSection expandedCollapsibles={expandedCollapsibles} toggleCollapsible={toggleCollapsible} />;
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
      case 'events':
        return <EventsSection expandedCollapsibles={expandedCollapsibles} toggleCollapsible={toggleCollapsible} />;
      case 'itinerary':
        return <ItinerarySection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="command-centre">
      <div className="cc-header">
        <h1>🗺️ Shenzhen Command Centre</h1>
        <p>📅 March 8-15, 2026 | Complete operational briefing</p>
      </div>

      <div className="cc-nav">
        <h2>📋 Select Section</h2>
        <div className="nav-buttons">
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id as Section)}
            >
              {section.label}
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

// ===== SECTION COMPONENTS =====

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
      <h2>📊 Trip Overview & Pre-Departure Checklist</h2>
      
      <div className="section-content">
        <h3>🎯 Mission Brief</h3>
        <p className="mission-text">
          8-day Shenzhen expedition (March 8-15, 2026) for 5 people. Staying at The Clouds Apartment, Shekou/Nanshan district.
          <strong>Goal:</strong> Experience world-class dining, tech innovation, cultural immersion, and adventure logistics mastery.
        </p>

        <h3>📋 Pre-Departure Checklist (Before March 8)</h3>
        <ul className="checklist">
          <li>
            <input type="checkbox" checked={checklist.passports} onChange={() => toggleCheck('passports')} />
            <label>✅ Passports valid &gt;6 months</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.visas} onChange={() => toggleCheck('visas')} />
            <label>✅ China visas obtained</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.insurance} onChange={() => toggleCheck('insurance')} />
            <label>✅ Travel insurance purchased</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.bank} onChange={() => toggleCheck('bank')} />
            <label>✅ Notify banks of trip dates</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.maps} onChange={() => toggleCheck('maps')} />
            <label>✅ Download offline maps (AMap/Baidu)</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.vpn} onChange={() => toggleCheck('vpn')} />
            <label>✅ Install & test VPN</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.apps} onChange={() => toggleCheck('apps')} />
            <label>✅ Install essential apps</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.alipay} onChange={() => toggleCheck('alipay')} />
            <label>✅ Register Alipay/WeChat Pay</label>
          </li>
          <li>
            <input type="checkbox" checked={checklist.reservations} onChange={() => toggleCheck('reservations')} />
            <label>✅ Make dinner reservations (CRITICAL!)</label>
          </li>
        </ul>

        <div className="feature-grid">
          <div className="feature-card">
            <h4>📱 Electronics</h4>
            <p>Passports + copies, USB power banks (2x), chargers, headphones, camera</p>
          </div>
          <div className="feature-card">
            <h4>💳 Payment</h4>
            <p>2-3 credit cards, debit card, ¥500 RMB cash, receipts wallet</p>
          </div>
          <div className="feature-card">
            <h4>🏥 Health</h4>
            <p>Regular medications + travel meds, antacids, cold medicine, first aid, rx copies</p>
          </div>
          <div className="feature-card">
            <h4>👕 Clothing</h4>
            <p>Spring layers (15-25°C), comfortable walking shoes, fine dining outfit</p>
          </div>
        </div>

        <div className="tip-box">
          <strong>💡 Pro Tip:</strong> Make 2 copies of passport + visa. One in hotel safe, one in separate bag.
        </div>
      </div>
    </div>
  );
}

function PaymentsSection({ expandedCollapsibles, toggleCollapsible }: any) {
  return (
    <div className="cc-section">
      <h2>📱 Mobile Payment Ecosystem</h2>

      <div className="alert-box">
        <strong>⚠️ CRITICAL:</strong> China is 95% cashless. Setup payments before arriving!
      </div>

      <h3>🏦 Alipay Setup (Most Universal)</h3>
      <div className="step-box">
        <h4>Step 1: Download & Verify</h4>
        <p>iOS: App Store | Android: Google Play<br />Version: Latest stable (Feb 2026+)</p>
      </div>

      <div className="step-box">
        <h4>Step 2: Register Account</h4>
        <p>• Email address (international OK)<br />
        • Phone number (can use international +62 or +1)<br />
        • Password (strong!)<br />
        • Security question backup</p>
      </div>

      <div className="step-box">
        <h4>Step 3: Link Payment Method</h4>
        <p>• Visa/Mastercard (credit or debit)<br />
        • Daily limit: Start ¥2,000/day, increase gradually<br />
        • Enable instant notifications</p>
      </div>

      <h3>💬 WeChat Pay Setup (Essential for Restaurants)</h3>
      <div className="step-box">
        <h4>Requirements</h4>
        <p>• WeChat account (register internationally)<br />
        • Linked payment method (Visa/Mastercard)<br />
        • Bank verification takes 24-72 hours</p>
      </div>

      <h3>📊 Payment Method Decision Tree</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Situation</th>
            <th>Best Method</th>
            <th>Backup</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fine dining restaurants</td>
            <td>Alipay</td>
            <td>WeChat Pay</td>
          </tr>
          <tr>
            <td>Street food & casual vendors</td>
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
            <td>Alipay (lower fees)</td>
            <td>WeChat Pay</td>
          </tr>
        </tbody>
      </table>

      <div className="tip-box">
        <strong>💡 Pro Tip:</strong> Keep ¥300-500 cash backup for temples, old vendors, emergencies.
      </div>
    </div>
  );
}

function VPNSection({ expandedCollapsibles, toggleCollapsible }: any) {
  return (
    <div className="cc-section">
      <h2>🔐 VPN Setup & Essential Apps</h2>

      <div className="alert-box">
        <strong>⚠️ CRITICAL:</strong> China's "Great Firewall" blocks Google, Facebook, Instagram, YouTube. VPN REQUIRED!
      </div>

      <h3>🔐 VPN Installation (BEFORE Arriving)</h3>
      <div className="alert-box">
        <strong>⚠️ WARNING:</strong> You CANNOT download VPN from inside China. Install before landing!
      </div>

      <div className="collapsible-group">
        <div 
          className={`collapsible-header ${expandedCollapsibles.includes('vpn-list') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('vpn-list')}
        >
          📱 Recommended VPN Apps
          <span className="collapsible-icon">▼</span>
        </div>
        {expandedCollapsibles.includes('vpn-list') && (
          <div className="collapsible-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>VPN App</th>
                  <th>Cost</th>
                  <th>Speed</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ExpressVPN</strong></td>
                  <td>$9.99/mo</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>Fastest, most reliable (recommended)</td>
                </tr>
                <tr>
                  <td><strong>NordVPN</strong></td>
                  <td>$3.99/mo</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>Good balance, cheap</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <h3>📲 Essential Apps (Download BEFORE Arriving)</h3>
      <div className="collapsible-group">
        <div 
          className={`collapsible-header ${expandedCollapsibles.includes('apps-nav') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('apps-nav')}
        >
          🗺️ Navigation Apps
          <span className="collapsible-icon">▼</span>
        </div>
        {expandedCollapsibles.includes('apps-nav') && (
          <div className="collapsible-content">
            <div className="step-box">
              <h4>🥇 AMap (Preferred 2026)</h4>
              <p><strong>Why:</strong> AMap now standard. More accurate, real-time traffic, excellent metro integration.<br />
              <strong>Features:</strong> Chinese text, English option, offline maps, metro timer<br />
              <strong>Download:</strong> App Store | Google Play</p>
            </div>
          </div>
        )}
      </div>

      <div className="tip-box">
        <strong>💡 Summary - Download These (Priority Order):</strong><br />
        ✅ VPN (before arriving!)<br />
        ✅ AMap (navigation)<br />
        ✅ Didi (rides)<br />
        ✅ Alipay (payment)<br />
        ✅ WeChat (messaging + payment)<br />
        ✅ Meituan (food booking)
      </div>
    </div>
  );
}

function BankingSection() {
  return (
    <div className="cc-section">
      <h2>💱 Banking & Currency Logistics</h2>

      <h3>💴 Exchange Rates (Feb 2026)</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Currency Pair</th>
            <th>Rate</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 USD = ¥ RMB</td>
            <td>~6.45</td>
            <td>Use for rough conversion</td>
          </tr>
          <tr>
            <td>1 IDR = ¥ RMB</td>
            <td>~0.0004</td>
            <td>10,000 IDR = ~4 RMB</td>
          </tr>
        </tbody>
      </table>

      <h3>🏧 Getting RMB Cash</h3>
      <div className="step-box">
        <h4>Option 1: Airport ATM (Recommended)</h4>
        <p>• ATMs at Shenzhen Bao'an Airport (terminals 1 & 3)<br />
        • International debit card works<br />
        • Fee: ~¥8-12 per withdrawal<br />
        • GET ¥500-800 only (won't need much cash)</p>
      </div>

      <div className="step-box">
        <h4>Option 2: Airport Counter</h4>
        <p>• Less favorable rates but safe<br />
        • Takes 5-10 minutes<br />
        • Bring passport</p>
      </div>

      <h3>📊 Budget Breakdown (8 Days, 5 People)</h3>
      <div className="feature-grid">
        <div className="feature-card">
          <h4>Dining Budget</h4>
          <p>¥3,000-4,000/person<br />¥15,000-20,000 total<br />(Fine dining included)</p>
        </div>
        <div className="feature-card">
          <h4>Transport Budget</h4>
          <p>¥200-400/person (Didi + metro)<br />¥1,000-2,000 total</p>
        </div>
        <div className="feature-card">
          <h4>Activities & Shopping</h4>
          <p>¥500-1,500/person<br />¥2,500-7,500 total</p>
        </div>
        <div className="feature-card">
          <h4>Total Budget</h4>
          <p>¥28,000 (~$4,300)<br />¥5,600/person</p>
        </div>
      </div>

      <div className="tip-box">
        <strong>💡 Spending Tracking:</strong> Use Alipay/WeChat expense tracking. Both categorize spending automatically!
      </div>
    </div>
  );
}

function TransportSection() {
  return (
    <div className="cc-section">
      <h2>🚇 Transportation Systems & Navigation</h2>

      <h3>🚇 Shenzhen Metro (Most Used)</h3>
      <div className="step-box">
        <h4>Overview</h4>
        <p><strong>Why:</strong> Fast, cheap, reliable. 11 lines covering entire city.<br />
        <strong>Hours:</strong> 6:30am - 11:30pm<br />
        <strong>Frequency:</strong> 3-5 min (peak) / 10-15 min (off-peak)<br />
        <strong>Cost:</strong> ¥2-5 per ride</p>
      </div>

      <div className="step-box">
        <h4>Shenzhen Metro Card Setup</h4>
        <p><strong>Option 1: Physical Card</strong><br />
        • Buy at any metro station ticket booth<br />
        • Cost: ¥50-100 (deposit + initial balance)<br />
        • Staff can help in English<br /><br />
        <strong>Option 2: Mobile Payment QR</strong><br />
        • Use Alipay/WeChat Pay QR at ticket machine<br />
        • Faster but requires phone battery</p>
      </div>

      <h3>🏨 From Hotel (The Clouds, Shekou/Shuiwan Metro)</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Metro Line</th>
            <th>Time</th>
            <th>Cost</th>
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

      <h3>🤖 Pony.ai Robotaxi (NEW - Nov 2025+)</h3>
      <div className="alert-box">
        <strong>🎉 Fully operational since November 2025!</strong> Autonomous robotaxis in Shenzhen!
      </div>
      <div className="step-box">
        <h4>How to Use</h4>
        <p>1. Download Pony app (or find in Didi)<br />
        2. Enter destination<br />
        3. Confirm price (usually cheaper than Didi)<br />
        4. Wait 5-10 min for robotaxi<br />
        5. Sit back & enjoy autonomous driving!<br /><br />
        <strong>Coverage:</strong> Central Shenzhen (Futian, Nanshan, Luohu)<br />
        <strong>Cost:</strong> ~¥10-20</p>
      </div>
    </div>
  );
}

function RestaurantsSection({ expandedCollapsibles, toggleCollapsible }: any) {
  return (
    <div className="cc-section">
      <h2>🍽️ Restaurant Protocols & Dining In China</h2>

      <h3>📱 QR-Code Table Ordering</h3>
      <div className="step-box">
        <h4>Standard Process</h4>
        <p>
          <strong>1. Arrive</strong><br />Hostess seats you.<br /><br />
          <strong>2. Scan table QR code</strong><br />QR code on table → scan with WeChat/Alipay camera → opens menu PDF.<br /><br />
          <strong>3. Browse menu</strong><br />• Mostly pictures (even if Chinese text)<br />
          • Can Google Translate<br />
          • Prices listed clearly<br /><br />
          <strong>4. Order from phone</strong><br />
          • Select items, quantities, special requests<br />
          • Add to cart<br />
          • PAY NOW (not at end)<br />
          • Receipt prints at kitchen<br /><br />
          <strong>5. Wait & eat</strong><br />
          • Estimated time shown<br />
          • Typical wait: 10-30 min<br /><br />
          <strong>6. Leave</strong><br />
          • No bill needed (already paid)<br />
          • Just stand up and go<br />
          • NO TIPPING IN CHINA
        </p>
      </div>

      <h3>🍴 Dining Etiquette</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Situation</th>
            <th>Do This</th>
            <th>Don't Do This</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chopsticks</td>
            <td>Try your best, ask for fork if needed</td>
            <td>Don't stick upright in rice (funeral gesture)</td>
          </tr>
          <tr>
            <td>Tipping</td>
            <td>Don't tip (insulting in China)</td>
            <td>No tipping = normal</td>
          </tr>
          <tr>
            <td>Compliments</td>
            <td>Say "太好吃了!" at end of meal</td>
            <td>Don't overpraise during meal</td>
          </tr>
        </tbody>
      </table>

      <h3>🚨 Special Restaurant Cases</h3>
      <div className="collapsible-group">
        <div 
          className={`collapsible-header ${expandedCollapsibles.includes('jyukan') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('jyukan')}
        >
          🍣 JYUKAN Omakase (Day 3 - CRITICAL!)
          <span className="collapsible-icon">▼</span>
        </div>
        {expandedCollapsibles.includes('jyukan') && (
          <div className="collapsible-content">
            <div className="alert-box">
              <strong>⚠️ QUEUE BY 11:00 AM SHARP!</strong><br />Only 3 lunch rounds. Fills within 15 minutes of opening.
            </div>
            <p>
              1. Arrive by 10:45am<br />
              2. Get ticket stub with number<br />
              3. Wait (~15-45 min)<br />
              4. Seated at counter (~1.5 hours)<br />
              5. Chef does omakase (~25-30 pieces)<br />
              6. Pay at counter<br />
              7. Leave satisfied!
            </p>
          </div>
        )}
      </div>

      <div className="collapsible-group">
        <div 
          className={`collapsible-header ${expandedCollapsibles.includes('pigeon') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('pigeon')}
        >
          🦆 大鴿飯 Roasted Pigeon (Day 7)
          <span className="collapsible-icon">▼</span>
        </div>
        {expandedCollapsibles.includes('pigeon') && (
          <div className="collapsible-content">
            <div className="alert-box">
              <strong>⚠️ ARRIVE BEFORE OPENING!</strong><br />Michelin-starred pigeon sells out in 10 minutes.
            </div>
            <p>
              1. Arrive 15 min before opening<br />
              2. Be first in line<br />
              3. When door opens, order immediately<br />
              4. "一只鴿子" (one roasted pigeon)<br />
              5. Wait (~20 min)<br />
              6. Golden crispy pigeon served whole<br />
              7. Tear by hand, eat with rice<br />
              8. PERFECTION!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CultureSection() {
  return (
    <div className="cc-section">
      <h2>🌏 Cultural Etiquette & Respect</h2>

      <h3>🤝 Business Card Etiquette</h3>
      <div className="step-box">
        <h4>When Giving a Card</h4>
        <p>• Use both hands<br />
        • Present with text facing recipient<br />
        • Bow slightly</p>
      </div>

      <div className="step-box">
        <h4>When Receiving a Card</h4>
        <p>• Accept with both hands<br />
        • Read it respectfully<br />
        • Don't write on it<br />
        • Place on table, not in pocket</p>
      </div>

      <h3>📸 Photos & Permissions</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Situation</th>
            <th>OK?</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Photograph restaurant/food</td>
            <td>✅ Yes</td>
            <td>Encouraged! Locals do constantly</td>
          </tr>
          <tr>
            <td>Photograph people without asking</td>
            <td>❌ No</td>
            <td>Always ask first (smile + point)</td>
          </tr>
          <tr>
            <td>Photograph gov buildings</td>
            <td>❌ No</td>
            <td>Avoid police stations, gov offices</td>
          </tr>
        </tbody>
      </table>

      <h3>🎯 General Respect Tips</h3>
      <ul className="checklist">
        <li>
          <input type="checkbox" />
          <label>Dress modestly (no revealing clothing)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Don't discuss politics (sensitive topic)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Don't criticize China publicly</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Accept tea/gifts graciously (don't refuse)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Be punctual (timeliness matters)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Don't point with one finger (use open hand)</label>
        </li>
      </ul>
    </div>
  );
}

function ContingencySection() {
  return (
    <div className="cc-section">
      <h2>🚨 Contingency Planning & Emergency Contacts</h2>

      <h3>📞 Emergency Numbers</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Emergency Type</th>
            <th>Number</th>
            <th>English?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Police</td>
            <td>110</td>
            <td>Limited (try English)</td>
          </tr>
          <tr>
            <td>Fire & Ambulance</td>
            <td>120</td>
            <td>No (use hotel concierge)</td>
          </tr>
          <tr>
            <td>Tourist Police</td>
            <td>400-161-0018</td>
            <td>✅ Yes! English-speaking</td>
          </tr>
          <tr>
            <td>Hotel Front Desk</td>
            <td>Programmed in phone</td>
            <td>✅ Yes!</td>
          </tr>
        </tbody>
      </table>

      <h3>🏥 Medical Emergency</h3>
      <div className="alert-box">
        <strong>⚠️ CRITICAL:</strong> The Clouds has concierge service. Call them FIRST for emergencies (English-speaking)!
      </div>

      <div className="step-box">
        <h4>If You Get Sick</h4>
        <p>
          1. Call hotel concierge (English)<br />
          2. They arrange doctor/hospital visit<br />
          3. They may accompany you<br />
          4. Keep receipts for insurance claim<br /><br />
          <strong>Top Hospitals:</strong><br />
          • Shenzhen University General Hospital<br />
          • Shenzhen Children's Hospital<br />
          • Private International Clinic
        </p>
      </div>

      <h3>💰 Lost Card/Cash</h3>
      <div className="step-box">
        <h4>Lost Credit Card</h4>
        <p>
          1. Call your bank immediately<br />
          2. Card blocked within minutes<br />
          3. Use backup card<br />
          4. Report to police (for insurance)
        </p>
      </div>

      <div className="step-box">
        <h4>Lost Cash</h4>
        <p>
          1. Withdraw more from ATM (backup card)<br />
          2. Report to police if &gt;¥2,000
        </p>
      </div>

      <h3>🧳 Backup Documents</h3>
      <ul className="checklist">
        <li>
          <input type="checkbox" />
          <label>Photocopy passport (2 copies)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Photocopy visa</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Travel insurance card copy</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Bank international number</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Hotel address (multi-format)</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Email copies of all documents</label>
        </li>
      </ul>
    </div>
  );
}

function EventsSection({ expandedCollapsibles, toggleCollapsible }: any) {
  return (
    <div className="cc-section">
      <h2>🎪 Events, Activities & Special Experiences</h2>

      <h3>🐾 Shenzhen Pet Fair (March 12-15)</h3>
      <div className="step-box">
        <h4>Event Details</h4>
        <p>
          <strong>Dates:</strong> March 12-15, 2026<br />
          <strong>Hours:</strong> Usually 10am-6pm daily<br />
          <strong>Location:</strong> Luohu District<br />
          <strong>Cost:</strong> ¥30-50 entry<br /><br />
          <strong>What to See:</strong><br />
          • Pet products & accessories<br />
          • Live animal performances<br />
          • Pet adoption booths<br />
          • Pet grooming demos<br />
          • Food & beverage vendors<br /><br />
          <strong>Pro Tips:</strong><br />
          ✅ Arrive early (10-11am)<br />
          ✅ Bring portable charger<br />
          ✅ Use AMap from metro<br />
          ✅ Try pet-themed cafes nearby
        </p>
      </div>

      <h3>🏭 Huaqiangbei Electronics District (Day 3)</h3>
      <div className="collapsible-group">
        <div 
          className={`collapsible-header ${expandedCollapsibles.includes('huaqiangbei') ? 'open' : ''}`}
          onClick={() => toggleCollapsible('huaqiangbei')}
        >
          🏭 Huaqiangbei Electronics Market
          <span className="collapsible-icon">▼</span>
        </div>
        {expandedCollapsibles.includes('huaqiangbei') && (
          <div className="collapsible-content">
            <p>
              <strong>What It Is:</strong> World's largest electronics market. 30,000+ shops!<br /><br />
              <strong>Key Stores:</strong><br />
              ✅ DJI Flagship - Drones, gimbals, cameras<br />
              ✅ Apple Store - Latest iPhones<br />
              ✅ Xiaomi Store - Chinese phones, tablets<br />
              ✅ Electronics malls (6 floors each)<br /><br />
              <strong>Prices:</strong> 20% cheaper than international retail<br />
              Haggling acceptable in some shops<br />
              Tax refund possible for tourists<br /><br />
              <strong>What to Buy:</strong><br />
              🛒 DJI Air 3S (~¥7,000 vs ¥900 abroad)<br />
              🛒 DJI Neo (~¥1,700)<br />
              🛒 Huawei laptops/phones<br />
              🛒 Xiaomi gadgets<br /><br />
              <strong>Pro Tips:</strong><br />
              ✅ Go off-peak (2-4pm, weekdays)<br />
              ✅ Know specs you want<br />
              ✅ Bring power bank<br />
              ✅ Use AMap for navigation<br />
              ✅ Don't buy from street vendors (fakes)
            </p>
          </div>
        )}
      </div>

      <h3>🏪 K11 ECOAST Waterfront</h3>
      <div className="step-box">
        <h4>Overview</h4>
        <p>
          <strong>What:</strong> Luxury shopping + dining + art in waterfront<br />
          <strong>Location:</strong> Shekou (15 min walk from hotel)<br />
          <strong>Hours:</strong> 10am-10pm<br /><br />
          <strong>What to Do:</strong><br />
          ✅ High-end shopping<br />
          ✅ Modern art museum<br />
          ✅ Waterfront dining<br />
          ✅ Sunset walk<br /><br />
          <strong>Pro Tips:</strong><br />
          ✅ Go late afternoon for sunset<br />
          ✅ Reserve restaurants in advance<br />
          ✅ Free entry to complex
        </p>
      </div>
    </div>
  );
}

function ItinerarySection() {
  return (
    <div className="cc-section">
      <h2>📅 8-Day Itinerary (March 8-15, 2026)</h2>

      <div className="tip-box">
        <strong>💡 Quick Overview:</strong> See full details in dedicated Itinerary section for day-by-day breakdown!
      </div>

      <h3>Quick Overview</h3>
      <div className="feature-grid">
        <div className="feature-card">
          <h4>Day 1 (Mar 8)</h4>
          <p>🛬 Arrival<br />Shekou Seafood Market</p>
        </div>
        <div className="feature-card">
          <h4>Day 2 (Mar 9)</h4>
          <p>🎯 Nanshan Cluster<br />Sichuan + Coconut Chicken</p>
        </div>
        <div className="feature-card">
          <h4>Day 3 (Mar 10)</h4>
          <p>🏭 Huaqiangbei Tech<br />JYUKAN Omakase ⭐</p>
        </div>
        <div className="feature-card">
          <h4>Day 4 (Mar 11)</h4>
          <p>🦐 Uni Hotpot<br />Yun Jing 70th Floor</p>
        </div>
        <div className="feature-card">
          <h4>Day 5 (Mar 12)</h4>
          <p>🎪 Pet Fair<br />Dongmen Street Food</p>
        </div>
        <div className="feature-card">
          <h4>Day 6 (Mar 13)</h4>
          <p>🎭 Heritage Chef<br />Private Kitchen + Roast Goose</p>
        </div>
        <div className="feature-card">
          <h4>Day 7 (Mar 14)</h4>
          <p>⭐ Michelin Magic<br />Pigeon + Spa</p>
        </div>
        <div className="feature-card">
          <h4>Day 8 (Mar 15)</h4>
          <p>🎉 Departure<br />Last breakfast</p>
        </div>
      </div>

      <div className="alert-box">
        <strong>🔥 CRITICAL DATES:</strong><br />
        Day 3: QUEUE FOR JYUKAN BY 11AM!<br />
        Day 7: ARRIVE BEFORE PIGEON RESTAURANT OPENS!
      </div>
    </div>
  );
}
