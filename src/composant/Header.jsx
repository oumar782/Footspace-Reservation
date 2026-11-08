import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, MapPin, Phone, Mail, Calendar, Clock, ChevronRight, 
  Target, ShoppingBag, User, Award, Home, Info, 
  Dumbbell, CalendarDays, Users, Trophy, FileText, PhoneCall, LogIn, UserPlus
} from 'lucide-react';
import './Header2.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const storedUser = localStorage.getItem('playforest_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/homes', icon: Home },
    { name: 'À propos', href: '/about', icon: Info },
    { name: 'Terrains', href: '/terrains', icon: Dumbbell },
    { name: 'Réservation', href: '/reservation', icon: CalendarDays },
    { name: 'Sessions', href: '/sessions', icon: Users },
    { name: 'Coachs', href: '/coaches', icon: Award },
    { name: 'Tournois', href: '/tournois', icon: Trophy },
    { name: 'Boutique', href: '/boutique', icon: ShoppingBag },
    { name: 'Contact', href: '/contact', icon: PhoneCall },
  ];

  const isActive = (href) => {
    if (href === '/homes' && (location.pathname === '/' || location.pathname === '/homes')) return true;
    return location.pathname === href;
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayName = user?.fullName || user?.full_name || user?.name || null;

  return (
    <header className={`nav2-header ${scrolled ? 'nav2-scrolled' : ''}`}>
      <div className="nav2-container">
        <div className="nav2-top-bar">
          <div className="nav2-top-info">
            <div className="nav2-info-item">
              <MapPin className="nav2-info-icon" />
              <span>{user?.city || 'Casablanca'}, Maroc</span>
            </div>
            <div className="nav2-info-item">
              <Phone className="nav2-info-icon" />
              <span>+212 5 22 33 44 55</span>
            </div>
            <div className="nav2-info-item">
              <Mail className="nav2-info-icon" />
              <span>contact@playforest.ma</span>
            </div>
          </div>

          <div className="nav2-top-right">
            {displayName ? (
              <Link to="/profile" className="nav2-info-item" style={{ color: '#10b981', fontWeight: '700', textDecoration: 'none' }}>
                <User className="nav2-info-icon" />
                <span>Bienvenue, {displayName.split(' ')[0]}</span>
              </Link>
            ) : (
              <div style={{ display: 'inline-flex', gap: '12px' }}>
                <Link to="/login" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>Se connecter</Link>
                <span style={{ color: '#64748b' }}>|</span>
                <Link to="/register" style={{ color: '#10b981', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>S'inscrire</Link>
              </div>
            )}
          </div>
        </div>

        <nav className="nav2-main-nav">
          <Link to="/homes" className="nav2-brand-link" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="nav2-brand-logo">
              <img src={logo} alt="Play Forest" className="nav2-brand-logo-img" />
            </div>
            <div className="nav2-brand-text">
              <h1 className="nav2-brand-name">Play <span className="nav2-brand-highlight">Forest</span></h1>
              <p className="nav2-brand-tagline"> L'avenir du Sport commence ici</p>
            </div>
          </Link>

          <div className="nav2-desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav2-nav-link ${isActive(item.href) ? 'nav2-active' : ''}`}
                onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                {item.name}
                {isActive(item.href) && <span className="nav2-active-indicator"></span>}
              </Link>
            ))}

            <div className="nav2-desktop-buttons">
              <button className="nav2-cta-button" onClick={() => handleNavigation("/consultation-reservation")}>
                <Calendar size={16} />
                <span>Mes réservations</span>
                <ChevronRight size={16} className="nav2-cta-arrow" />
              </button>
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="nav2-mobile-menu-button" aria-label="Menu">
            {isOpen ? <X className="nav2-menu-icon" /> : <Menu className="nav2-menu-icon" />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;