import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, MapPin, Phone, Mail, Calendar, Clock, ChevronRight, 
  Target, ShoppingBag, User, Award, Home, Info, 
  Dumbbell, CalendarDays, Users, Trophy, FileText, PhoneCall
} from 'lucide-react';
import './Header2.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
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
    { name: 'Abonnement', href: '/abonnement', icon: FileText },
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

  return (
    <header className={`nav2-header ${scrolled ? 'nav2-scrolled' : ''}`}>
      <div className="nav2-container">
        <div className="nav2-top-bar">
          <div className="nav2-top-info">
            <div className="nav2-info-item">
              <MapPin className="nav2-info-icon" />
              <span>Casablanca, Maroc</span>
            </div>
            <div className="nav2-info-item">
              <Phone className="nav2-info-icon" />
              <span>+212 5 22 33 44 55</span>
            </div>
            <div className="nav2-info-item">
              <Mail className="nav2-info-icon" />
              <span>contact@playzone.ma</span>
            </div>
          </div>
          <div className="nav2-top-right">
            <div className="nav2-opening-hours">
              <Clock className="nav2-hours-icon" size={14} />
              <span>8h00 - 22h00</span>
            </div>
          </div>
        </div>

        <nav className="nav2-main-nav">
          <Link to="/homes" className="nav2-brand-link" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="nav2-brand-logo">
              <Target className="nav2-brand-icon" size={24} />
            </div>
            <div className="nav2-brand-text">
              <h1 className="nav2-brand-name">Play<span className="nav2-brand-highlight">Zone</span></h1>
              <p className="nav2-brand-tagline">Sport & Bien-être</p>
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
              <button className="nav2-cta-button nav2-abonnement-button" onClick={() => handleNavigation("/consultation-abonnement")}>
                <Calendar size={16} />
                <span>Mon abonnement</span>
                <ChevronRight size={16} className="nav2-cta-arrow" />
              </button>
              <button className="nav2-cta-button nav2-shop-button" onClick={() => handleNavigation("/boutique")}>
                <ShoppingBag size={16} />
                <span>Boutique</span>
                <ChevronRight size={16} className="nav2-cta-arrow" />
              </button>
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="nav2-mobile-menu-button" aria-label="Menu">
            {isOpen ? <X className="nav2-menu-icon" /> : <Menu className="nav2-menu-icon" />}
          </button>
        </nav>

        {isOpen && (
          <>
            <div className="nav2-mobile-nav">
              <div className="nav2-mobile-nav-header">
                <div className="nav2-mobile-brand">
                  <Target size={24} className="nav2-mobile-brand-icon" />
                  <span className="nav2-mobile-brand-name">PlayZone</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="nav2-mobile-close" aria-label="Fermer">
                  <X size={24} />
                </button>
              </div>

              <div className="nav2-mobile-nav-content">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`nav2-mobile-nav-link ${isActive(item.href) ? 'nav2-active' : ''}`}
                    >
                      <span className="nav2-mobile-link-text">
                        <Icon size={18} className="nav2-mobile-link-icon" />
                        {item.name}
                      </span>
                      <ChevronRight size={16} className="nav2-mobile-link-arrow" />
                    </Link>
                  );
                })}

                <div className="nav2-mobile-buttons">
                  <button className="nav2-cta-button nav2-mobile" onClick={() => handleNavigation("/consultation-reservation")}>
                    <Calendar size={16} />
                    <span>Mes réservations</span>
                  </button>
                  <button className="nav2-cta-button nav2-mobile nav2-abonnement-mobile" onClick={() => handleNavigation("/consultation-abonnement")}>
                    <Calendar size={16} />
                    <span>Mon abonnement</span>
                  </button>
                  <button className="nav2-cta-button nav2-mobile nav2-shop-mobile" onClick={() => handleNavigation("/boutique")}>
                    <ShoppingBag size={16} />
                    <span>Boutique</span>
                  </button>
                </div>

                <div className="nav2-mobile-info">
                  <div className="nav2-mobile-info-item"><MapPin size={16} /><span>Casablanca, Maroc</span></div>
                  <div className="nav2-mobile-info-item"><Phone size={16} /><span>+212 5 22 33 44 55</span></div>
                  <div className="nav2-mobile-info-item"><Mail size={16} /><span>contact@playzone.ma</span></div>
                  <div className="nav2-mobile-info-item"><Clock size={16} /><span>8h00 - 22h00</span></div>
                </div>
              </div>
            </div>
            <div className="nav2-mobile-overlay" onClick={() => setIsOpen(false)}></div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;