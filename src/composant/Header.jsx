import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import './Header2.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Nos Terrains', href: '/terrains' },
    { name: 'Réservations', href: '/reservation' },
    { name: 'À Propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="nav2-header">
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
              <span>01 23 45 67 89</span>
            </div>
            <div className="nav2-info-item">
              <Mail className="nav2-info-icon" />
              <span>contact@terrainfoot.fr</span>
            </div>
          </div>
          <div className="nav2-opening-hours">
            Ouvert 7j/7 • 6h-23h
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="nav2-main-nav">
          <Link to="/" className="nav2-brand-link">
            <div className="nav2-brand-logo">
              <div className="nav2-logo-inner"></div>
            </div>
            <div className="nav2-brand-text">
              <h1 className="nav2-brand-name">FootField</h1>
              <p className="nav2-brand-tagline">Premium Terrains</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav2-desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav2-nav-link ${isActive(item.href) ? 'nav2-active' : ''}`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="nav2-active-indicator"></div>
                )}
              </Link>
            ))}
            <button className="nav2-cta-button">
              Réserver Maintenant
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav2-mobile-menu-button"
          >
            {isOpen ? <X className="nav2-menu-icon" /> : <Menu className="nav2-menu-icon" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="nav2-mobile-nav">
            <div className="nav2-mobile-nav-content">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`nav2-mobile-nav-link ${isActive(item.href) ? 'nav2-active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="nav2-mobile-cta">
                <button 
                  className="nav2-cta-button nav2-mobile"
                  onClick={() => setIsOpen(false)}
                >
                  Réserver Maintenant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;