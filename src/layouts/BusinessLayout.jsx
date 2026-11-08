import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  CalendarClock,
  Users,
  CalendarDays,
  Trophy,
  TrendingUp,
  BarChart3,
  LogOut,
  Settings,
  Building2
} from 'lucide-react';
import logo from '../assets/logo.png';
import './layouts.css';

const businessNav = [
  { to: '/business/dashboard', label: 'Dashboard', Icon: LayoutDashboard, key: 'dash' },
  { to: '/business/bookings', label: 'Réservations', Icon: CalendarClock, key: 'bookings', badge: '12' },
  { to: '/business/facilities', label: 'Terrains', Icon: MapPin, key: 'facilities' },
  { to: '/business/clients', label: 'Clients', Icon: Users, key: 'clients' },
  { to: '/business/events', label: 'Événements', Icon: CalendarDays, key: 'events' },
  { to: '/business/tournaments', label: 'Tournois', Icon: Trophy, key: 'tournaments' },
  { to: '/business/revenue', label: 'Revenus', Icon: TrendingUp, key: 'revenue' },
  { to: '/business/analytics', label: 'Statistiques', Icon: BarChart3, key: 'analytics' }
];

export default function BusinessLayout() {
  return (
    <div className="pf-layout pf-layout--business">
      <aside className="pf-business-sidebar" aria-label="Navigation Business">
        <div className="pf-business-sidebar__head">
          <Link to="/business/dashboard" className="pf-business-sidebar__brand">
            <img src={logo} alt="PlayForest" />
            <div>
              <div className="pf-business-sidebar__name">PlayForest</div>
              <div className="pf-business-sidebar__tag">Business</div>
            </div>
          </Link>
        </div>

        <nav className="pf-business-sidebar__nav">
          <ul className="pf-business-sidebar__list">
            {businessNav.map(({ to, label, Icon, key, badge }) => (
              <li key={key}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `pf-business-sidebar__link ${isActive ? 'is-active' : ''}`
                  }
                >
                  <span className="pf-business-sidebar__icon">
                    <Icon size={18} />
                  </span>
                  <span className="pf-business-sidebar__label">{label}</span>
                  {badge ? (
                    <span className="pf-business-sidebar__badge">{badge}</span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pf-business-sidebar__foot">
          <Link to="/home" className="pf-business-sidebar__back">
            <Building2 size={16} />
            <span>Retour à PlayForest</span>
          </Link>
          <div className="pf-business-sidebar__row">
            <button className="pf-business-sidebar__icon-btn" aria-label="Paramètres">
              <Settings size={16} />
            </button>
            <button className="pf-business-sidebar__icon-btn" aria-label="Déconnexion">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <div className="pf-business__stage">
        <header className="pf-business__topbar">
          <Link to="/home" className="pf-business__mobile-home" aria-label="Retour à PlayForest">
            <Building2 size={17} />
          </Link>
          <div className="pf-business__crumb">
            <span className="pf-business__crumb-label">Complexe Al Qods</span>
            <span className="pf-business__crumb-dot" />
            <span className="pf-business__crumb-sub">Administrateur</span>
          </div>
          <div className="pf-business__top-actions">
            <div className="pf-business__kpi-chip">
              <span className="pf-business__kpi-label">CA du jour</span>
              <span className="pf-business__kpi-value">2 460 Dhs</span>
            </div>
            <div className="pf-business__avatar" aria-label="Pro">
              G
            </div>
          </div>
        </header>

        <main className="pf-business__content" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
