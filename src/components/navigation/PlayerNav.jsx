import { createElement, useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, User, LogOut, Sparkles, LogIn, UserPlus, ChevronDown, Home, UsersRound, Play, Compass } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { enablePushNotifications } from '../../services/pushNotifications.js';
import logo from '../../assets/logo.png';
import './PlayerNav.css';

const primaryNav = [
  { to: '/home', label: 'Accueil', key: 'home', Icon: Home },
  { to: '/communities', label: 'Communautés', key: 'communities', Icon: UsersRound },
  { to: '/play', label: 'Jouer', key: 'play', cta: true, Icon: Play },
  { to: '/explore', label: 'Explorer', key: 'explore', Icon: Compass }
];

const getStoredUser = () => {
  try {
    const item = localStorage.getItem('playforest_user');
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export default function PlayerNav() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAcceptedPulse, setShowAcceptedPulse] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(() => localStorage.getItem('pf_push_enabled') === 'true');
  const [pushWorking, setPushWorking] = useState(false);
  const [localUser, setLocalUser] = useState(getStoredUser);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setLocalUser(stored);

    const handleStorageChange = () => {
      setLocalUser(getStoredUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  useEffect(() => {
    let timeoutId;
    const handleAcceptedRequest = () => {
      setShowAcceptedPulse(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setShowAcceptedPulse(false), 1400);
    };

    window.addEventListener('playforest:community-member-accepted', handleAcceptedRequest);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('playforest:community-member-accepted', handleAcceptedRequest);
    };
  }, []);

  const activeUser = user || localUser || getStoredUser();
  const displayName = activeUser?.fullName || activeUser?.full_name || activeUser?.name || 'Mon Profil';
  const firstName = displayName !== 'Mon Profil' ? displayName.split(' ')[0] : 'Profil';
  const isUserLoggedIn = isAuthenticated || !!activeUser || !!localStorage.getItem('playforest_token');

  const handleLogout = () => {
    logout();
    localStorage.removeItem('playforest_prefs');
    setShowDropdown(false);
    navigate('/login', { replace: true });
  };

  const openCommunityRequests = () => navigate('/communities?openRequests=1');

  const handleEnablePush = async () => {
    if (pushWorking) return;
    setPushWorking(true);
    try {
      await enablePushNotifications();
      setPushEnabled(true);
      toast.success('Notifications activées sur cet appareil.');
    } catch (error) {
      setPushEnabled(false);
      toast.error(error.message || 'Impossible d’activer les notifications.');
    } finally {
      setPushWorking(false);
    }
  };

  return (
    <header className="pf-player-nav" role="banner">
      <div className="pf-player-nav__inner">
        <Link to="/home" className="pf-player-nav__brand" aria-label="PlayForest — Accueil">
          <img src={logo} alt="Logo PlayForest" className="pf-player-nav__logo" />
          <span className="pf-player-nav__name">
            Play<span>Forest</span>
          </span>
        </Link>

        <nav className="pf-player-nav__menu" role="navigation" aria-label="Navigation principale desktop">
          <ul className="pf-player-nav__list">
            {primaryNav.map(({ to, label, key, cta, Icon }) => (
              <li key={key}>
                <NavLink
                  to={to}
                  end={to === '/home'}
                  className={({ isActive }) =>
                    `pf-player-nav__link ${isActive ? 'is-active' : ''} ${cta ? 'is-cta' : ''}`
                  }
                >
                  {createElement(Icon, { size: 18, strokeWidth: 2, 'aria-hidden': true })}
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pf-player-nav__actions">
          {isUserLoggedIn ? (
            <>
              <button
                type="button"
                className={`pf-player-nav__icon-btn ${showAcceptedPulse ? 'is-accepted' : ''} ${pushEnabled ? 'is-push-enabled' : ''}`}
                onClick={handleEnablePush}
                aria-label={pushEnabled ? 'Notifications Push activées' : 'Activer les notifications Push'}
                title={pushEnabled ? 'Notifications activées sur cet appareil' : 'Activer les notifications sur cet appareil'}
                disabled={pushWorking}
              >
                <Bell size={18} />
                {pushEnabled && <span className="pf-player-nav__dot" aria-hidden="true" />}
              </button>

              <button
                type="button"
                className={`pf-player-nav__icon-btn ${showAcceptedPulse ? 'is-accepted' : ''}`}
                onClick={openCommunityRequests}
                aria-label="Notifications des communautés"
                title="Notifications des communautés"
              >
                <MessageSquare size={18} />
              </button>

              {/* BOUTON PROFIL AVEC NOM DE L'UTILISATEUR SANS ERREUR DE SYNTAXE */}
              <div className="pf-player-nav__profile-wrap" style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="pf-player-nav__profile"
                  onClick={() => setShowDropdown(!showDropdown)}
                  title={displayName}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 14px 6px 6px',
                    borderRadius: '999px',
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
                  }}
                >
                  <span className="pf-player-nav__avatar" style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {displayName.charAt(0).toUpperCase()}
                  </span>

                  <span className="pf-player-nav__user-name" style={{
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#0f172a',
                    maxWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {firstName}
                  </span>

                  <ChevronDown size={14} style={{ color: '#94a3b8' }} />
                </button>

                {showDropdown && (
                  <div className="pf-player-nav__dropdown pf-glass" style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '220px',
                    borderRadius: '16px',
                    padding: '10px',
                    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.15)',
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    zIndex: 100
                  }}>
                    <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>{displayName}</strong>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{activeUser?.email || 'Membre PlayForest'}</span>
                    </div>

                    <Link
                      to="/profile"
                      className="pf-player-nav__drop-item"
                      onClick={() => setShowDropdown(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', textDecoration: 'none', color: '#0f172a', fontWeight: '600', fontSize: '13.5px' }}
                    >
                      <User size={16} /> Mon Profil Sportif
                    </Link>
                    <Link
                      to="/onboarding"
                      className="pf-player-nav__drop-item"
                      onClick={() => setShowDropdown(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', textDecoration: 'none', color: '#0f172a', fontWeight: '600', fontSize: '13.5px' }}
                    >
                      <Sparkles size={16} /> Modifier mes Préférences
                    </Link>

                    <div style={{ height: '1px', background: '#e2e8f0', margin: '6px 0' }} />
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', background: '#fef2f2', color: '#ef4444', fontWeight: '700', fontSize: '13.5px', width: '100%', cursor: 'pointer' }}
                    >
                      <LogOut size={16} /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'inline-flex', gap: '10px' }}>
              <Link to="/login" className="pf-btn pf-btn--ghost pf-btn--sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <LogIn size={15} /> Se connecter
              </Link>
              <Link to="/register" className="pf-btn pf-btn--primary pf-btn--sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <UserPlus size={15} /> S'inscrire
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
