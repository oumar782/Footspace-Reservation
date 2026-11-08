import { Link } from 'react-router-dom';
import { Building2, Trophy, MapPin, Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';
import logo from '../../assets/logo.png';
import './PlayerFooter.css';

export default function PlayerFooter() {
  return (
    <footer className="pf-player-footer" role="contentinfo">
      <div className="pf-player-footer__container">
        <div className="pf-player-footer__top">
          <div className="pf-player-footer__brand-col">
            <div className="pf-player-footer__brand">
              <img src={logo} alt="PlayForest" className="pf-player-footer__logo" />
              <div>
                <div className="pf-player-footer__brand-name">
                  Play<span>Forest</span>
                </div>
                <p className="pf-player-footer__tagline">
                  Ton sport. Ta communauté. Ton terrain.
                </p>
              </div>
            </div>
            <div className="pf-player-footer__socials">
              <a href="#" aria-label="Facebook" className="pf-player-footer__social">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="Instagram" className="pf-player-footer__social">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="LinkedIn" className="pf-player-footer__social">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div className="pf-player-footer__col">
            <h4>Explorer</h4>
            <ul>
              <li><Link to="/communities">Communautés</Link></li>
              <li><Link to="/play">Jouer &amp; Réserver</Link></li>
              <li><Link to="/explore/fields">Terrains</Link></li>
              <li><Link to="/explore/events">Événements</Link></li>
              <li><Link to="/explore/tournaments">Tournois</Link></li>
              <li><Link to="/explore/coaches">Coachs</Link></li>
            </ul>
          </div>

          <div className="pf-player-footer__col">
            <h4>Mon compte</h4>
            <ul>
              <li><Link to="/profile">Profil sportif</Link></li>
              <li><Link to="/explore/equipment">Équipements</Link></li>
              <li><Link to="/abonnement">Abonnements</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">À propos</Link></li>
            </ul>
          </div>

          <div className="pf-player-footer__col">
            <h4>Contact</h4>
            <ul className="pf-player-footer__contact-list">
              <li>
                <MapPin size={16} /> Casablanca, Maroc
              </li>
              <li>
                <Mail size={16} /> contact@playforest.ma
              </li>
              <li>
                <Phone size={16} /> +212 5 22 00 00 00
              </li>
            </ul>
          </div>
        </div>

        <section className="pf-player-footer__pro" aria-labelledby="pf-pro-title">
          <div className="pf-player-footer__pro-left">
            <h2 id="pf-pro-title">
              Vous êtes un professionnel ?
            </h2>
            <p>
              Gérez votre terrain, vos réservations ou vos compétitions avec{' '}
              <strong>PlayForest Business</strong>.
            </p>
          </div>

          <div className="pf-player-footer__pro-cards">
            <Link to="/business/dashboard" className="pf-pro-card">
              <div className="pf-pro-card__icon">
                <Building2 size={22} />
              </div>
              <div>
                <h3>Je gère un terrain</h3>
                <p>Disponibilités, réservations, revenus &amp; statistiques.</p>
                <span className="pf-pro-card__cta">Gérer mon établissement →</span>
              </div>
            </Link>

            <Link to="/organizer/dashboard" className="pf-pro-card">
              <div className="pf-pro-card__icon">
                <Trophy size={22} />
              </div>
              <div>
                <h3>J'organise des tournois</h3>
                <p>Inscriptions, équipes, calendriers &amp; résultats.</p>
                <span className="pf-pro-card__cta">Organiser un tournoi →</span>
              </div>
            </Link>
          </div>
        </section>

        <div className="pf-player-footer__bottom">
          <div className="pf-player-footer__legal">
            © {new Date().getFullYear()} PlayForest. Tous droits réservés.
          </div>
          <div className="pf-player-footer__links">
            <a href="#">Confidentialité</a>
            <a href="#">Conditions</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
