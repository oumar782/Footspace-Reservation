import { Link } from 'react-router-dom';
import { MapPin, Settings, Plus, ChevronRight } from 'lucide-react';
import './BusinessPages.css';

const facilities = [
  { name: 'Terrain Al Qods - 5v5', type: 'Football · Synthétique', status: 'Actif', price: '240 Dhs / h', rate: 4.8, bookings: 84 },
  { name: 'Terrain B - Foot 7', type: 'Football · Synthétique', status: 'Actif', price: '350 Dhs / h', rate: 4.7, bookings: 62 },
  { name: 'Padel Center 1', type: 'Padel · Intérieur', status: 'Actif', price: '160 Dhs / h', rate: 4.9, bookings: 118 },
  { name: 'Salle Basketball Medina', type: 'Basket · Intérieur', status: 'Maintenance', price: '180 Dhs / h', rate: 4.5, bookings: 46 }
];

export default function BusinessFacilities() {
  return (
    <div className="biz-page">
      <div className="biz-page__head">
        <div>
          <h1>Gestion des terrains</h1>
          <p>Ajoutez, modifiez et suivez vos terrains et installations sportives.</p>
        </div>
        <div className="biz-page__head-actions">
          <Link to="/business/facilities/new" className="biz-btn biz-btn--primary">
            <Plus size={15} /> Ajouter un terrain
          </Link>
        </div>
      </div>

      <section className="biz-card">
        <div className="biz-card__head">
          <h2>Vos terrains ({facilities.length})</h2>
          <span className="biz-chip biz-chip--blue">3 actifs · 1 en maintenance</span>
        </div>

        <div className="biz-list">
          {facilities.map((f) => (
            <div key={f.name} className="biz-list__row">
              <div className="biz-list__icon"><MapPin size={14} /></div>
              <div className="biz-list__main">
                <div className="biz-list__title">{f.name}</div>
                <div className="biz-list__meta">{f.type} · {f.bookings} réservations · ⭐ {f.rate}</div>
              </div>
              <div className="biz-list__right">
                <span className="biz-list__amount">{f.price}</span>
                <div style={{ display: 'inline-flex', gap: 6 }}>
                  <span className={`status-badge ${f.status === 'Actif' ? 'status-confirmed' : 'status-pending'}`}>
                    {f.status}
                  </span>
                  <button className="biz-icon-btn" aria-label="Paramètres"><Settings size={16} /></button>
                  <Link to="/business/facilities/1" className="biz-icon-btn" aria-label="Détails"><ChevronRight size={16} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
