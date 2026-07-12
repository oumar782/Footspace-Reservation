import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, GraduationCap, Trophy, Lightbulb, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';
import { getOpenSessionsCount } from '../utils/sessionStorage';
import './ReservationSidebar.css';

const ReservationSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const openCount = getOpenSessionsCount();
  const tipIndex = new Date().getDate() % t.sidebar.tips.length;

  const links = [
    { href: '/reservation', icon: Calendar, label: t.nav.reservation, badge: null },
    { href: '/sessions', icon: Users, label: t.sidebar.sessions, badge: openCount || null },
    { href: '/coaches', icon: GraduationCap, label: t.sidebar.coaches, badge: null },
    { href: '/tournois', icon: Trophy, label: t.sidebar.tournaments, badge: null },
  ];

  return (
    <aside className="res-sidebar">
      <div className="res-sidebar-header">
        <h3>{t.sidebar.title}</h3>
      </div>

      <nav className="res-sidebar-nav">
        {links.map(({ href, icon, label, badge }) => (
          <Link
            key={href}
            to={href}
            className={`res-sidebar-link ${location.pathname === href ? 'active' : ''}`}
          >
            {React.createElement(icon, { size: 18 })}
            <span>{label}</span>
            {badge > 0 && <span className="res-sidebar-badge">{badge}</span>}
          </Link>
        ))}
      </nav>

      <div className="res-sidebar-tip">
        <div className="res-sidebar-tip-header">
          <Lightbulb size={16} />
          <span>{t.sidebar.tip}</span>
        </div>
        <p>{t.sidebar.tips[tipIndex]}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
