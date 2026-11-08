import { Link } from 'react-router-dom';
import { CalendarClock, Filter, Search, CalendarPlus } from 'lucide-react';
import './BusinessPages.css';

const bookings = [
  { id: 'RSV-2041', client: 'Karim El Amrani', facility: 'Terrain Al Qods · 5v5', date: "17 août · 18:00 - 19:00", amount: '240 Dhs', status: 'confirmed' },
  { id: 'RSV-2040', client: 'Sara Mansouri', facility: 'Padel 2', date: "17 août · 19:30 - 20:30", amount: '160 Dhs', status: 'pending' },
  { id: 'RSV-2039', client: 'Youssef Bennani', facility: 'Terrain B · Foot 7', date: "18 août · 20:00 - 21:30", amount: '525 Dhs', status: 'confirmed' },
  { id: 'RSV-2038', client: 'Hind Taher', facility: 'Salle Basket', date: "18 août · 21:00 - 22:30", amount: '270 Dhs', status: 'cancelled' },
  { id: 'RSV-2037', client: 'Mehdi Idrissi', facility: 'Terrain Al Qods · 5v5', date: "19 août · 19:00 - 20:00", amount: '240 Dhs', status: 'completed' }
];

const statusStyles = {
  confirmed: { label: 'Confirmée', cls: 'status-confirmed' },
  pending: { label: 'En attente', cls: 'status-pending' },
  cancelled: { label: 'Annulée', cls: 'status-cancelled' },
  completed: { label: 'Terminée', cls: 'status-completed' }
};

export default function BusinessBookings() {
  return (
    <div className="biz-page">
      <div className="biz-page__head">
        <div>
          <h1>Réservations</h1>
          <p>Gérez toutes vos réservations et demandes clients.</p>
        </div>
        <div className="biz-page__head-actions">
          <Link to="/play" className="biz-btn biz-btn--ghost">
            <CalendarPlus size={15} /> Nouvelle réservation
          </Link>
        </div>
      </div>

      <section className="biz-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: 12, padding: '6px 12px', flex: 1, minWidth: 240
          }}>
            <Search size={16} style={{ color: '#94a3b8' }} />
            <input
              placeholder="Client, réservation, terrain..."
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                flex: 1, padding: '8px 4px', fontSize: 14,
                fontFamily: 'inherit', color: '#0f172a'
              }}
            />
          </div>
          <button className="biz-btn biz-btn--ghost"><Filter size={15} /> Filtres</button>
          <button className="biz-btn biz-btn--ghost"><CalendarClock size={15} /> Aujourd'hui</button>
        </div>

        <div className="biz-list">
          {bookings.map((b) => (
            <div key={b.id} className="biz-list__row">
              <div className="biz-list__icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                <CalendarClock size={14} />
              </div>
              <div className="biz-list__main">
                <div className="biz-list__title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {b.facility}
                  <span style={{ fontWeight: 600, fontSize: 11, color: '#64748b', letterSpacing: 0.03 }}>
                    {b.id}
                  </span>
                </div>
                <div className="biz-list__meta">{b.client} · {b.date}</div>
              </div>
              <div className="biz-list__right">
                <span className="biz-list__amount">{b.amount}</span>
                <span className={`status-badge ${statusStyles[b.status].cls}`}>
                  {statusStyles[b.status].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
