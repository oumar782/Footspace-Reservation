import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, Calendar, Clock, ChevronRight, Target } from 'lucide-react';
import './Header2.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items avec les bons chemins
  const navigation = [
    { name: 'Accueil', href: '/homes' },
    { name: 'À Propos', href: '/about' },

    { name: 'Nos Terrains', href: '/terrains' },
    { name: 'Réservations', href: '/reservation' },
    { name: 'Abonnement', href: '/abonnement' },
    { name: 'Contact', href: '/contact' },
  ];

  // Fonction pour vérifier si le lien est actif
  const isActive = (href) => {
    if (href === '/homes' && (location.pathname === '/' || location.pathname === '/homes')) return true;
    return location.pathname === href;
  };

  // Fonction pour gérer la navigation et fermer le menu mobile
  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
    // Remonter immédiatement en haut (sécurité supplémentaire)
    window.scrollTo(0, 0);
  };

  return (
    <header className={`nav2-header ${scrolled ? 'nav2-scrolled' : ''}`}>
      <div className="nav2-container">
        {/* Top Bar */}
        <div className="nav2-top-bar">
          <div className="nav2-top-info">
            <div className="nav2-info-item">
              <MapPin className="nav2-info-icon" />
              <span>123 Avenue du Stade, 75001 Paris</span>
            </div>
            <div className="nav2-info-item">
              <Phone className="nav2-info-icon" />
              <span>+212 0721976288</span>
            </div>
            <div className="nav2-info-item">
              <Mail className="nav2-info-icon" />
              <span>contact@footspace.fr</span>
            </div>
          </div>
          <div className="nav2-opening-hours">
            <Clock className="nav2-hours-icon" size={14} />
            <span>Ouvert 7j/7 • 6h-23h</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="nav2-main-nav">
          <Link to="/homes" className="nav2-brand-link" onClick={() => setIsOpen(false)}>
            <div className="nav2-brand-logo">
              <Target className="nav2-brand-icon" size={24} />
            </div>
            <div className="nav2-brand-text">
              <h1 className="nav2-brand-name">Foot<span className="nav2-brand-highlight">Space</span></h1>
              <p className="nav2-brand-tagline">La gestion simplifiée de vos terrains de foot</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav2-desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav2-nav-link ${isActive(item.href) ? 'nav2-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                {isActive(item.href) && <span className="nav2-active-indicator"></span>}
              </Link>
            ))}
            
            {/* Boutons desktop */}
            <div className="nav2-desktop-buttons">
              <button
                className="nav2-cta-button"
                onClick={() => handleNavigation("/consultation-reservation")}
              >
                <Calendar size={16} />
                <span>Ma réservation</span>
                <ChevronRight size={16} className="nav2-cta-arrow" />
              </button>
              
              <button
                className="nav2-cta-button nav2-abonnement-button"
                onClick={() => handleNavigation("/consultation-abonnement")}
              >
                <Calendar size={16} />
                <span>Mon abonnement</span>
                <ChevronRight size={16} className="nav2-cta-arrow" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav2-mobile-menu-button"
            aria-label="Menu"
          >
            {isOpen ? <X className="nav2-menu-icon" /> : <Menu className="nav2-menu-icon" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <>
            <div className="nav2-mobile-nav">
              <div className="nav2-mobile-nav-header">
                <div className="nav2-mobile-brand">
                  <Target size={24} className="nav2-mobile-brand-icon" />
                  <span className="nav2-mobile-brand-name">FootSpace</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="nav2-mobile-close"
                  aria-label="Fermer"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="nav2-mobile-nav-content">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`nav2-mobile-nav-link ${isActive(item.href) ? 'nav2-active' : ''}`}
                  >
                    {item.name}
                    <ChevronRight size={16} className="nav2-mobile-link-arrow" />
                  </Link>
                ))}
                
                {/* Boutons mobile */}
                <div className="nav2-mobile-buttons">
                  <button
                    className="nav2-cta-button nav2-mobile"
                    onClick={() => handleNavigation("/consultation-reservation")}
                  >
                    <Calendar size={16} />
                    <span>Ma réservation</span>
                  </button>
                  
                  <button
                    className="nav2-cta-button nav2-mobile nav2-abonnement-mobile"
                    onClick={() => handleNavigation("/consultation-abonnement")}
                  >
                    <Calendar size={16} />
                    <span>Mon abonnement</span>
                  </button>
                </div>

                <div className="nav2-mobile-info">
                  <div className="nav2-mobile-info-item">
                    <MapPin size={16} />
                    <span>123 Avenue du Stade, 75001 Paris</span>
                  </div>
                  <div className="nav2-mobile-info-item">
                    <Phone size={16} />
                    <span>+212 0721976288</span>
                  </div>
                  <div className="nav2-mobile-info-item">
                    <Mail size={16} />
                    <span>contact@footspace.fr</span>
                  </div>
                  <div className="nav2-mobile-info-item">
                    <Clock size={16} />
                    <span>Ouvert 7j/7 • 6h-23h</span>
                  </div>
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