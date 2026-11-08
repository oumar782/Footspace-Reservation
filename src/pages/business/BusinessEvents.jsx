import { Link } from 'react-router-dom';
import { CalendarDays, Plus, Trophy, Users, MapPin } from 'lucide-react';
import './BusinessPages.css';

const rows = [
  { title: 'Open PlayForest Cup', type: 'Tournoi', date: '24 sept. - 2 oct.', participants: 48, location: 'Casablanca', status: 'confirmed' },
  { title: 'Stage intensif U18', type: 'Stage', date: '15 au 19 sept.', participants: 24, location: 'Rabat', status: 'pending' },
  { title: 'Match Inter-Communautés', type: 'Match', date: 'Samedi 24 août · 19h', participants: 28, location: 'Casablanca', status: 'confirmed' },
  { title: 'Padel Summer Challenge', type: 'Compétition', date: '30 août', participants: 32, location: 'Marrakech', status: 'cancelled' }
];

const statusStyles = {
  confirmed: { label: 'Confirmé', cls: 'status-confirmed' },
  pending: { label: 'Inscriptions ouvertes', cls: 'status-pending' },
  cancelled: { label: 'Annulé', cls: 'status-cancelled' }
};

export default function BusinessEvents() {
  return (
    <div className="biz-page">
      <div className="biz-page__head">
        <div>
          <h1>Événements et tournois</h1>
          <p>Créez et gérez vos événements, stages, matchs et tournois.</p>
        </div>
        <div className="biz-page__head-actions">
          <Link to="/business/events/create" className="biz-btn biz-btn--primary">
            <Plus size={15} /> Nouvel événement
          </Link>
        </div>
      </div>

      <section className="biz-card">
        <div className="biz-card__head">
          <h2>Événements à venir</h2>
          <span className="biz-chip biz-chip--green">{rows.length} au total</span>
        </div>

        <div className="biz-list">
          {rows.map((e) => (
            <div key={e.title} className="biz-list__row">
              <div className="biz-list__icon" style={{
                background: e.type === 'Tournoi' ? '#fef3c7' : '#ecfdf5',
                color: e.type === 'Tournoi' ? '#92400e' : '#047857'
              }}>
                {e.type === 'Tournoi' ? <Trophy size={14} /> : <CalendarDays size={14} />}
              </div>
              <div className="biz-list__main">
                <div className="biz-list__title">{e.title} <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>· {e.type}</span></div>
                <div className="biz-list__meta">
                  <Users size={12} style={{ marginRight: 4 }} /> {e.participants} participants · <MapPin size={12} style={{ margin: '0 4px 0 8px' }} /> {e.location} · {e.date}
                </div>
              </div>
              <div className="biz-list__right">
                <span className={`status-badge ${statusStyles[e.status].cls}`}>
                  {statusStyles[e.status].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
