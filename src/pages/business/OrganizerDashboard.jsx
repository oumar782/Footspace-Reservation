import { Link } from 'react-router-dom';
import { Trophy, Users2, Calendar, LineChart, Plus, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import '../business/BusinessPages.css';

const stats = [
  { label: 'Tournois en cours', value: 3, Icon: Trophy, accent: 'orange', period: 'actifs' },
  { label: 'Inscriptions totales', value: 128, Icon: Users2, accent: 'green', period: 'sur 3 tournois' },
  { label: 'Matchs à planifier', value: 24, Icon: Calendar, accent: 'blue', period: 'cette semaine' },
  { label: 'Revenus générés', value: '26 800 Dhs', Icon: DollarSign, accent: 'violet', period: 'en août' }
];

export default function OrganizerDashboard() {
  return (
    <div className="biz-page">
      <div className="biz-page__head">
        <div>
          <h1>Dashboard Organisateur</h1>
          <p>Gérez vos tournois, équipes, calendriers et résultats.</p>
        </div>
        <div className="biz-page__head-actions">
          <Link to="/organizer/tournaments/create" className="biz-btn biz-btn--primary">
            <Plus size={15} /> Nouveau tournoi
          </Link>
        </div>
      </div>

      <div className="biz-kpis">
        {stats.map(({ label, value, Icon, accent, period }) => (
          <article key={label} className={`biz-kpi biz-kpi--${accent}`}>
            <div className="biz-kpi__top">
              <div className="biz-kpi__icon"><Icon size={18} /></div>
            </div>
            <div className="biz-kpi__value">{value}</div>
            <div className="biz-kpi__bottom">
              <span className="biz-kpi__label">{label}</span>
              <span className="biz-kpi__delta">{period}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="biz-grid biz-grid--2">
        <section className="biz-card">
          <div className="biz-card__head">
            <h2>Mes tournois</h2>
            <Link to="/organizer/tournaments" className="biz-link">Tout voir →</Link>
          </div>

          <div className="biz-list">
            {[
              { name: 'Moroccan Foot Cup', teams: 32, status: 'Inscriptions en cours', cls: 'status-pending' },
              { name: 'Casablanca Padel Open', teams: 16, status: 'Phase de poules', cls: 'status-confirmed' },
              { name: 'Summer Basket 3x3', teams: 24, status: 'Terminé', cls: 'status-completed' }
            ].map((t) => (
              <div key={t.name} className="biz-list__row">
                <div className="biz-list__icon" style={{ background: '#fef3c7', color: '#92400e' }}>
                  <Trophy size={14} />
                </div>
                <div className="biz-list__main">
                  <div className="biz-list__title">{t.name}</div>
                  <div className="biz-list__meta">{t.teams} équipes · {t.status}</div>
                </div>
                <div className="biz-list__right">
                  <span className={`status-badge ${t.cls}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="biz-card">
          <div className="biz-card__head">
            <h2>Prochaines étapes</h2>
            <span className="biz-chip biz-chip--orange">À faire</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { text: 'Valider 8 inscriptions — Foot Cup', icon: CheckCircle2, done: false },
              { text: 'Créer les poules pour Padel Open', icon: Users2, done: false },
              { text: 'Planifier les quarts de finale Basket', icon: Calendar, done: false },
              { text: 'Saisir les résultats Match 12', icon: LineChart, done: true }
            ].map((a) => (
              <div key={a.text} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                borderRadius: 12,
                background: a.done ? '#ecfdf5' : '#fffbeb',
                border: a.done ? '1px solid #bbf7d0' : '1px solid #fde68a'
              }}>
                <a.icon size={16} style={{ color: a.done ? '#059669' : '#d97706' }} />
                <span style={{
                  fontSize: 13, fontWeight: 600,
                  color: a.done ? '#047857' : '#92400e',
                  textDecoration: a.done ? 'line-through' : 'none'
                }}>
                  {a.text}
                </span>
                {a.done ? null : <Clock size={14} style={{ marginLeft: 'auto', color: '#92400e' }} />}
              </div>
            ))}
          </div>

          <div className="biz-actions">
            <Link to="/organizer/stats" className="biz-btn biz-btn--outline">
              Voir les statistiques →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
