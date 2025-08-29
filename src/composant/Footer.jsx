import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-section">
              <div className="brand-container">
                <div className="brand-logo">
                  <div className="logo-icon">
                    <div className="logo-inner"></div>
                  </div>
                </div>
                <div className="brand-text">
                  <h3 className="brand-name">FootField</h3>
                  <p className="brand-tagline">Premium Terrains</p>
                </div>
              </div>
              <p className="brand-description">
                Votre destination premium pour la location de terrains de football. 
                Des installations modernes pour tous vos matchs et entraînements.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Facebook className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Instagram className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Twitter className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Youtube className="social-icon" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="footer-section">
              <h4 className="footer-title">Navigation</h4>
              <div className="footer-links">
                <Link to="/" className="footer-link">
                  Accueil
                </Link>
                <Link to="/terrains" className="footer-link">
                  Nos Terrains
                </Link>
                <Link to="/reservations" className="footer-link">
                  Réservations
                </Link>
                <Link to="/tarifs" className="footer-link">
                  Tarifs
                </Link>
                <Link to="/about" className="footer-link">
                  À Propos
                </Link>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4 className="footer-title">Services</h4>
              <div className="footer-services">
                <div className="service-item">Location de terrains</div>
                <div className="service-item">Tournois organisés</div>
                <div className="service-item">Entraînements privés</div>
                <div className="service-item">Événements sportifs</div>
                <div className="service-item">Équipements inclus</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-title">Contact</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>123 Avenue du Stade<br />75001 Paris, France</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>contact@terrainfoot.fr</span>
                </div>
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <span>Ouvert 7j/7<br />6h00 - 23h00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2024 FootField. Tous droits réservés.
            </div>
            <div className="legal-links">
              <a href="#" className="legal-link">
                Mentions légales
              </a>
              <a href="#" className="legal-link">
                Politique de confidentialité
              </a>
              <a href="#" className="legal-link">
                CGU
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;