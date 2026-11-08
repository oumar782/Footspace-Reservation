import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Trophy,
  Users2,
  Calendar,
  LineChart,
  LogOut,
  Settings,
  Building2
} from 'lucide-react';
import logo from '../assets/logo.png';
import './layouts.css';

const organizerNav = [
  { to: '/organizer/dashboard', label: 'Dashboard', Icon: LayoutDashboard, key: 'dash' },
  { to: '/organizer/tournaments', label: 'Mes tournois', Icon: Trophy, key: 'tournaments', badge: '3' },
  { to: '/organizer/teams', label: 'Équipes & joueurs', Icon: Users2, key: 'teams' },
  { to: '/organizer/scheduling', label: 'Calendrier', Icon: Calendar, key: 'scheduling' },
  { to: '/organizer/stats', label: 'Statistiques', Icon: LineChart, key: 'stats' }
];

export default function OrganizerLayout() {
  return (
    <div className="pf-layout pf-layout--business pf-layout--organizer">
      <aside className="pf-business-sidebar" aria-label="Navigation Organisateur">
        <div className="pf-business-sidebar__head">
          <Link to="/organizer/dashboard" className="pf-business-sidebar__brand">
            <img src={logo} alt="PlayForest" />
            <div>
              <div className="pf-business-sidebar__name">PlayForest</div>
              <div className="pf-business-sidebar__tag pf-business-sidebar__tag--orange">
                Organizer
              </div>
            </div>
          </Link>
        </div>

        <nav className="pf-business-sidebar__nav">
          <ul className="pf-business-sidebar__list">
            {organizerNav.map(({ to, label, Icon, key, badge }) => (
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
                    <span className="pf-business-sidebar__badge pf-business-sidebar__badge--orange">
                      {badge}
                    </span>
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
            <span className="pf-business__crumb-label">Moroccan Foot Cup</span>
            <span className="pf-business__crumb-dot" />
            <span className="pf-business__crumb-sub">Organisateur</span>
          </div>
          <div className="pf-business__top-actions">
            <Link
              to="/organizer/tournaments/create"
              className="pf-business__primary-btn"
            >
              <Trophy size={14} /> Nouveau tournoi
            </Link>
            <div className="pf-business__avatar pf-business__avatar--orange" aria-label="Profil">
              O
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
