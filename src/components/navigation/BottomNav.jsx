import { NavLink } from 'react-router-dom';
import { Home, Users, Play, Compass, User } from 'lucide-react';
import './BottomNav.css';

const navItems = [
  { to: '/home', label: 'Accueil', Icon: Home, key: 'home' },
  { to: '/communities', label: 'Communautés', Icon: Users, key: 'communities' },
  { to: '/play', label: 'Jouer', Icon: Play, key: 'play', feature: true },
  { to: '/explore', label: 'Explorer', Icon: Compass, key: 'explore' },
  { to: '/profile', label: 'Profil', Icon: User, key: 'profile' }
];

export default function BottomNav() {
  return (
    <nav
      className="pf-bottom-nav"
      role="navigation"
      aria-label="Navigation principale mobile"
    >
      <ul className="pf-bottom-nav__list">
        {navItems.map(({ to, label, Icon, key, feature }) => (
          <li key={key} className={`pf-bottom-nav__item ${feature ? 'pf-bottom-nav__item--feature' : ''}`}>
            <NavLink
              to={to}
              end={to === '/home'}
              className={({ isActive }) =>
                `pf-bottom-nav__link ${isActive ? 'pf-bottom-nav__link--active' : ''}`
              }
              aria-label={label}
            >
              {feature ? (
                <span className="pf-bottom-nav__play-fab" aria-hidden="true">
                  <Icon strokeWidth={2.5} size={26} />
                </span>
              ) : (
                <Icon size={22} strokeWidth={2} />
              )}
              <span className="pf-bottom-nav__label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
