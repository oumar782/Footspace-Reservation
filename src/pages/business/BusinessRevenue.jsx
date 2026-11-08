import { Banknote, Download, PieChart, TrendingUp, Filter } from 'lucide-react';
import './BusinessPages.css';

const breakdown = [
  { label: 'Terrains', value: 34820, percent: 72, color: '#10b981' },
  { label: 'Événements', value: 8420, percent: 17, color: '#f59e0b' },
  { label: 'Tournois', value: 3980, percent: 8, color: '#8b5cf6' },
  { label: 'Autres', value: 1400, percent: 3, color: '#0ea5e9' }
];

export default function BusinessRevenue() {
  return (
    <div className="biz-page">
      <div className="biz-page__head">
        <div>
          <h1>Revenus</h1>
          <p>Suivez l'ensemble de vos flux et sources de revenus.</p>
        </div>
        <div className="biz-page__head-actions">
          <button className="biz-btn biz-btn--ghost"><Filter size={15} /> Période : Ce mois</button>
          <button className="biz-btn biz-btn--ghost"><Download size={15} /> Exporter CSV</button>
        </div>
      </div>

      <div className="biz-kpis">
        <article className="biz-kpi biz-kpi--green">
          <div className="biz-kpi__top">
            <div className="biz-kpi__icon"><Banknote size={18} /></div>
            <TrendingUp size={18} style={{ color: '#059669' }} />
          </div>
          <div className="biz-kpi__value">48 620 Dhs</div>
          <div className="biz-kpi__bottom">
            <span className="biz-kpi__label">Revenus totaux</span>
            <span className="biz-kpi__delta">+12,4% vs mois dernier</span>
          </div>
        </article>

        <article className="biz-kpi biz-kpi--blue">
          <div className="biz-kpi__top">
            <div className="biz-kpi__icon"><Banknote size={18} /></div>
          </div>
          <div className="biz-kpi__value">38 410 Dhs</div>
          <div className="biz-kpi__bottom">
            <span className="biz-kpi__label">Revenus nets</span>
            <span className="biz-kpi__delta">Marge moyenne 79%</span>
          </div>
        </article>

        <article className="biz-kpi biz-kpi--orange">
          <div className="biz-kpi__top">
            <div className="biz-kpi__icon"><PieChart size={18} /></div>
          </div>
          <div className="biz-kpi__value">148</div>
          <div className="biz-kpi__bottom">
            <span className="biz-kpi__label">Transactions</span>
            <span className="biz-kpi__delta">Panier moyen 329 Dhs</span>
          </div>
        </article>

        <article className="biz-kpi biz-kpi--violet">
          <div className="biz-kpi__top">
            <div className="biz-kpi__icon"><TrendingUp size={18} /></div>
          </div>
          <div className="biz-kpi__value">+32%</div>
          <div className="biz-kpi__bottom">
            <span className="biz-kpi__label">Croissance</span>
            <span className="biz-kpi__delta">Sur 3 mois</span>
          </div>
        </article>
      </div>

      <section className="biz-card">
        <div className="biz-card__head">
          <h2>Répartition des revenus</h2>
          <span className="biz-chip biz-chip--green">Août 2026</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {breakdown.map(({ label, value, percent, color }) => (
            <div key={label} style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr auto',
              gap: 14,
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: color }} />
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{label}</span>
              </div>
              <div style={{ height: 10, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: 999 }} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: '#0b1220', fontSize: 14 }}>{value.toLocaleString()} Dhs</div>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{percent}%</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
