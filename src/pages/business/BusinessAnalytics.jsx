import { BarChart3, Download, TrendingUp } from 'lucide-react';
import './BusinessPages.css';

const stats = [
  { label: "Taux d'occupation", value: '82%', info: '+6 pts vs semaine dernière', accent: 'green' },
  { label: 'Heure populaire', value: '19h - 21h', info: '38% des réservations', accent: 'blue' },
  { label: 'Terrain le plus réservé', value: 'Padel 1', info: '128 réservations · 4.9/5', accent: 'orange' },
  { label: 'Clients actifs (30j)', value: '342', info: '+18 nouveaux inscrits', accent: 'violet' }
];

export default function BusinessAnalytics() {
  return (
    <div className="biz-page">
      <div className="biz-page__head">
        <div>
          <h1>Statistiques</h1>
          <p>Analysez votre activité et prenez les bonnes décisions.</p>
        </div>
        <div className="biz-page__head-actions">
          <button className="biz-btn biz-btn--ghost">
            <Download size={15} /> Exporter
          </button>
          <select style={{
            padding: '10px 14px',
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            fontWeight: 700,
            fontSize: 13,
            color: '#0f172a',
            fontFamily: 'inherit',
            cursor: 'pointer'
          }}>
            <option>Les 30 derniers jours</option>
            <option>7 derniers jours</option>
            <option>Ce mois</option>
            <option>Cette année</option>
          </select>
        </div>
      </div>

      <div className="biz-kpis">
        {stats.map(({ label, value, info, accent }) => (
          <article key={label} className={`biz-kpi biz-kpi--${accent}`}>
            <div className="biz-kpi__top">
              <div className="biz-kpi__icon"><BarChart3 size={18} /></div>
              <TrendingUp size={18} style={{ color: '#059669' }} />
            </div>
            <div className="biz-kpi__value">{value}</div>
            <div className="biz-kpi__bottom">
              <span className="biz-kpi__label">{label}</span>
              <span className="biz-kpi__delta">{info}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="biz-card">
        <div className="biz-card__head">
          <h2>Évolution des réservations &amp; revenus</h2>
          <span className="biz-chip biz-chip--green">Données 12 mois</span>
        </div>
        <div className="biz-chart" style={{ marginTop: 10 }}>
          <div className="biz-chart__legend">
            <span className="biz-chart__legend-item"><span className="dot dot--green" /> Réservations</span>
            <span className="biz-chart__legend-item"><span className="dot dot--orange" /> Revenus (x100 Dhs)</span>
          </div>
          <div className="biz-chart__bars" style={{ height: 200 }}>
            {[32, 38, 42, 48, 54, 60, 58, 62, 68, 74, 80, 86].map((v, i) => (
              <div key={i} className="biz-chart__col">
                <div
                  className="biz-chart__bar biz-chart__bar--green"
                  style={{ height: `${v}%` }}
                />
              </div>
            ))}
          </div>
          <div className="biz-chart__labels">
            {['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
