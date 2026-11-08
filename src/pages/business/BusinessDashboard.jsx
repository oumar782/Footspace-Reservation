import { Link } from 'react-router-dom';
import {
  TrendingUp,
  CalendarClock,
  MapPin,
  Users,
  ArrowRight,
  CalendarDays,
  Trophy,
  Banknote,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import './BusinessPages.css';

const kpis = [
  { label: "Chiffre d'affaires", value: '48 620 Dhs', delta: '+12,4%', Icon: Banknote, accent: 'green', period: 'ce mois' },
  { label: "Taux d'occupation", value: '82 %', delta: '+6 pts', Icon: TrendingUp, accent: 'blue', period: '7j glissant' },
  { label: 'Réservations', value: '148', delta: '+23', Icon: CalendarClock, accent: 'orange', period: 'cette semaine' },
  { label: 'Clients actifs', value: '342', delta: '+18', Icon: Users, accent: 'violet', period: '30j' }
];

const recentBookings = [
  { id: 1, client: 'Karim E.', terrain: 'Terrain Al Qods · 5v5', date: "Aujourd'hui · 18:00", amount: '240 Dhs', status: 'confirmed' },
  { id: 2, client: 'Sara M.', terrain: 'Padel 2', date: "Aujourd'hui · 19:30", amount: '160 Dhs', status: 'pending' },
  { id: 3, client: 'Youssef B.', terrain: 'Terrain B · Foot 7', date: 'Demain · 20:00', amount: '350 Dhs', status: 'confirmed' },
  { id: 4, client: 'Hind T.', terrain: 'Salle Basket', date: 'Demain · 21:00', amount: '180 Dhs', status: 'cancelled' }
];

const statusStyles = {
  confirmed: { label: 'Confirmée', cls: 'status-confirmed' },
  pending: { label: 'En attente', cls: 'status-pending' },
  cancelled: { label: 'Annulée', cls: 'status-cancelled' },
  completed: { label: 'Terminée', cls: 'status-completed' }
};

export default function BusinessDashboard() {
  return (
    <div className="biz-page">
      <div className="biz-page__head">
        <div>
          <h1>Aujourd'hui</h1>
          <p>Vue d'ensemble de votre activité · Complexe Al Qods</p>
        </div>
        <div className="biz-page__head-actions">
          <Link to="/business/bookings" className="biz-btn biz-btn--ghost">
            <CalendarDays size={15} /> Planning
          </Link>
          <Link to="/business/events/create" className="biz-btn biz-btn--primary">
            <Trophy size={15} /> Nouvel événement
          </Link>
        </div>
      </div>

      <div className="biz-kpis">
        {kpis.map(({ label, value, delta, Icon, accent, period }) => (
          <article key={label} className={`biz-kpi biz-kpi--${accent}`}>
            <div className="biz-kpi__top">
              <div className="biz-kpi__icon"><Icon size={18} /></div>
              <button className="biz-icon-btn" aria-label="Plus"><MoreHorizontal size={16} /></button>
            </div>
            <div className="biz-kpi__value">{value}</div>
            <div className="biz-kpi__bottom">
              <span className="biz-kpi__label">{label}</span>
              <span className="biz-kpi__delta">{delta} · {period}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="biz-grid biz-grid--2">
        <section className="biz-card">
          <div className="biz-card__head">
            <h2>Réservations à venir</h2>
            <Link to="/business/bookings" className="biz-link">
              Tout voir <ChevronRight size={14} />
            </Link>
          </div>

          <div className="biz-list">
            {recentBookings.map((b) => (
              <div key={b.id} className="biz-list__row">
                <div className="biz-list__icon"><MapPin size={14} /></div>
                <div className="biz-list__main">
                  <div className="biz-list__title">{b.terrain}</div>
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

        <section className="biz-card">
          <div className="biz-card__head">
            <h2>Performance 7 derniers jours</h2>
            <span className="biz-chip biz-chip--green">Très bonne semaine</span>
          </div>

          <div className="biz-chart">
            <div className="biz-chart__legend">
              <span className="biz-chart__legend-item"><span className="dot dot--green" /> Réservations</span>
              <span className="biz-chart__legend-item"><span className="dot dot--orange" /> Revenus (x100 Dhs)</span>
            </div>
            <div className="biz-chart__bars">
              {[40, 55, 48, 72, 60, 88, 76].map((v, i) => (
                <div key={i} className="biz-chart__col">
                  <div
                    className="biz-chart__bar biz-chart__bar--green"
                    style={{ height: `${v}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="biz-chart__labels">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>

          <div className="biz-actions">
            <Link to="/business/analytics" className="biz-btn biz-btn--outline">
              Consulter les statistiques <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
