import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="brand-container">
                <div className="brand-logo">
                  <div className="logo-icon">
                    <div className="logo-inner"></div>
                  </div>
                </div>
                <div className="brand-text">
                  <h3 className="brand-name">PlayZone</h3>
                  <p className="brand-tagline">Sport & Bien-être</p>
                </div>
              </div>
              <p className="brand-description">
                Votre destination premium pour la location de terrains multisports.
                Matchs, coachs et tournois — tout en un seul endroit.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook"><Facebook className="social-icon" /></a>
                <a href="#" className="social-link" aria-label="Instagram"><Instagram className="social-icon" /></a>
                <a href="#" className="social-link" aria-label="Twitter"><Twitter className="social-icon" /></a>
                <a href="#" className="social-link" aria-label="Youtube"><Youtube className="social-icon" /></a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Navigation</h4>
              <div className="footer-links">
                <Link to="/homes" className="footer-link">Accueil</Link>
                <Link to="/terrains" className="footer-link">Terrains</Link>
                <Link to="/reservation" className="footer-link">Réservation</Link>
                <Link to="/sessions" className="footer-link">Sessions</Link>
                <Link to="/coaches" className="footer-link">Coachs</Link>
                <Link to="/tournois" className="footer-link">Tournois</Link>
                <Link to="/about" className="footer-link">À propos</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Services</h4>
              <div className="footer-services">
                <div className="service-item">Location de terrains</div>
                <div className="service-item">Sessions de match</div>
                <div className="service-item">Coachs certifiés</div>
                <div className="service-item">Tournois organisés</div>
                <div className="service-item">Abonnements premium</div>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Contact</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>Casablanca, Maroc</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>+212 5 22 33 44 55</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>contact@playzone.ma</span>
                </div>
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <span>8h00 - 22h00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2026 PlayZone. Tous droits réservés.
            </div>
            <div className="legal-links">
              <a href="#" className="legal-link">Mentions légales</a>
              <a href="#" className="legal-link">Politique de confidentialité</a>
              <a href="#" className="legal-link">CGU</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;