import React from 'react';
import './terrain.css';
import { Link } from 'react-router-dom';

// Import des icônes Lucide React
import { 
  MapPin, 
  Calendar, 
  Trophy, 
  Users, 
  Star, 
  ArrowRight,
  Mail,
  Phone,
  MapPin as MapPinIcon,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  Check,
  Clock,
  Award,
  UserCheck,
  Target,
  Heart,
  Zap,
  Sun,
  Moon,
  Cloud,
  Wind,
  Droplets,
  Shield,
  Wifi,
  Coffee,
  Car,
  ShowerHead,
  Lock,
  Camera,
  Speaker,
  Thermometer
} from 'lucide-react';

const Terrains = [
  {
    id: 1,
    titre: "Stade Municipal Elite",
    surface: "105 x 68 m",
    localisation: "Ain sebaa",
    tarif: "180",
    devise: "dh/h",
    image: "/terrain.jpg",
    type: "11 vs 11",
    note: 4.9,
    avis: 128,
    badge: "PREMIUM",
    caracteristiques: [
      { icon: <Sun size={16} />, text: "Pelouse naturelle" },
      { icon: <Zap size={16} />, text: "Éclairage LED" },
      { icon: <ShowerHead size={16} />, text: "Vestiaires premium" },
      { icon: <Users size={16} />, text: "Tribune 500 places" }
    ],
    equipements: [
      "Éclairage professionnel",
      "Vestiaires avec douches",
      "Parking sécurisé",
      "Infirmerie",
      "Bufet",
      "Wifi gratuit"
    ]
  },
  {
    id: 2,
    titre: "Complex Sportif Modern",
    surface: "100 x 65 m",
    localisation: "Belvedere",
    tarif: "150",
    devise: "dh/h",
    image: "/terrain.jpg",
    type: "11 vs 11",
    note: 4.8,
    avis: 96,
    badge: "POPULAIRE",
    caracteristiques: [
      { icon: <Wind size={16} />, text: "Gazon synthétique dernière génération" },
      { icon: <Droplets size={16} />, text: "Système d'arrosage automatique" },
      { icon: <Car size={16} />, text: "Parking sécurisé" },
      { icon: <Trophy size={16} />, text: "Équipements professionnels" }
    ],
    equipements: [
      "Gazon dernière génération",
      "Éclairage haute intensité",
      "Vestiaires modernes",
      "Parking surveillé",
      "Terrasse panoramique",
      "Club house"
    ]
  },
  {
    id: 3,
    titre: "Arena Sport Center",
    surface: "95 x 60 m",
    localisation: "Maarif",
    tarif: "200",
    devise: "dh/h",
    image: "/terrain.jpg",
    type: "11 vs 11",
    note: 4.95,
    avis: 215,
    badge: "VIP",
    caracteristiques: [
      { icon: <Award size={16} />, text: "Pelouse hybride FIFA Pro" },
      { icon: <Camera size={16} />, text: "Vidéo-surveillance" },
      { icon: <Coffee size={16} />, text: "Espace VIP avec salon" },
      { icon: <Speaker size={16} />, text: "Sonorisation immersive" }
    ],
    equipements: [
      "Pelouse certifiée FIFA",
      "Éclairage 4K",
      "Vestiaires luxe",
      "Salon VIP",
      "Spa & massage",
      "Restaurant gastronomique"
    ]
  }
];

const services = [
  {
    titre: "Réservation Flexible",
    description: "Réservez votre créneau en ligne 24/7 avec confirmation instantanée et modification gratuite jusqu'à 4h avant.",
    icon: <Calendar size={40} />,
    features: ["24h/24", "7j/7", "Instantané"]
  },
  {
    titre: "Vestiaires Premium",
    description: "Accès à des vestiaires modernes avec douches, casiers sécurisés, serviettes et produits de soin inclus.",
    icon: <ShowerHead size={40} />,
    features: ["Douches chaudes", "Casiers", "Serviettes"]
  },
  {
    titre: "Équipement Pro",
    description: "Matériel professionnel disponible sur demande : ballons, chasubles, plots, et équipement d'entraînement.",
    icon: <Trophy size={40} />,
    features: ["Ballons", "Chasubles", "Plots"]
  },
  {
    titre: "Éclairage LED",
    description: "Système d'éclairage dernière génération pour des matchs en soirée dans des conditions optimales.",
    icon: <Sun size={40} />,
    features: ["Haute intensité", "Éco-énergie", "Sans ombre"]
  },
  {
    titre: "Parking Sécurisé",
    description: "Parking gratuit et surveillé pour tous les joueurs avec places réservées et vidéo-surveillance 24h/24.",
    icon: <Car size={40} />,
    features: ["Gratuit", "Surveillé", "Gratuit"]
  },
  {
    titre: "Wifi & Streaming",
    description: "Connexion wifi haut débit et possibilité de streaming pour diffuser vos matchs en direct.",
    icon: <Wifi size={40} />,
    features: ["Haut débit", "Streaming", "Live"]
  }
];

const stats = [
  { number: "8", label: "Terrains", icon: <MapPin size={24} /> },
  { number: "10k+", label: "Joueurs", icon: <Users size={24} /> },
  { number: "500+", label: "Matchs/mois", icon: <Trophy size={24} /> },
  { number: "4.9★", label: "Note moyenne", icon: <Star size={24} fill="currentColor" /> }
];

function App() {
  return (
    <div className="terrains-page">
      {/* Navbar (Header est déjà inclus dans le composant) */}
      
      {/* Hero Section */}
      <section className="terrains-hero">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span className="hero-badge-text">⚽ TERRAINS D'EXCEPTION ⚽</span>
            </div>
            
            <h1 className="hero-title">
              <span className="hero-title-line">Terrains de Football</span>
              <span className="hero-title-line hero-title-highlight">Premium</span>
            </h1>
            
            <p className="hero-subtitle">
              Des installations d'exception pour des performances d'élite. 
              Découvrez nos terrains aux normes professionnelles.
            </p>
            
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="hero-stat-item">
                  <div className="hero-stat-icon">{stat.icon}</div>
                  <div className="hero-stat-number">{stat.number}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>Découvrir</span>
          <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* Terrains Section */}
      <section className="terrains-section">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle-modern">NOS TERRAINS</span>
            <h2 className="section-title-modern">
              Des <span className="gradient-text-gold">installations</span> d'exception
            </h2>
            <p className="section-description-modern">
              Des infrastructures professionnelles pour des expériences uniques
            </p>
          </div>
          
          <div className="terrains-grid-modern">
            {Terrains.map((terrain) => (
              <div key={terrain.id} className="terrain-card-modern">
                <div className="terrain-image-modern">
                  <img src={terrain.image} alt={terrain.titre} />
                  <div className="terrain-overlay-modern"></div>
                  <div className="terrain-badge-modern">{terrain.badge}</div>
                  
                  <div className="terrain-rating-modern">
                    <Star size={14} fill="currentColor" />
                    <span>{terrain.note}</span>
                    <span className="rating-count">({terrain.avis})</span>
                  </div>
                </div>
                
                <div className="terrain-content-modern">
                  <h3 className="terrain-title-modern">{terrain.titre}</h3>
                  
                  <div className="terrain-meta-modern">
                    <div className="terrain-meta-item">
                      <MapPin size={14} />
                      <span>{terrain.localisation}</span>
                    </div>
                    <div className="terrain-meta-item">
                      <span className="terrain-type">{terrain.type}</span>
                    </div>
                    <div className="terrain-meta-item">
                      <span className="terrain-surface">{terrain.surface}</span>
                    </div>
                  </div>
                  
                  <div className="terrain-features-modern">
                    {terrain.caracteristiques.map((carac, idx) => (
                      <span key={idx} className="terrain-feature-modern">
                        {carac.icon} {carac.text}
                      </span>
                    ))}
                  </div>
                  
                  <div className="terrain-equipements-modern">
                    <h4>Équipements inclus :</h4>
                    <div className="equipements-grid">
                      {terrain.equipements.map((equip, idx) => (
                        <span key={idx} className="equipement-item">
                          <Check size={12} /> {equip}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="terrain-footer-modern">
                    <div className="terrain-price-modern">
                      <span className="price-number-modern">{terrain.tarif}</span>
                      <span className="price-unit-modern"> {terrain.devise}</span>
                    </div>
                    
                    <div className="terrain-actions-modern">
                      <Link to="/reservation" className="terrain-btn-primary">
                        <Calendar size={16} />
                        Réserver
                      </Link>
                      <Link to={`/terrains/${terrain.id}`} className="terrain-btn-secondary">
                        Détails
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-modern">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle-modern">SERVICES EXCLUSIFS</span>
            <h2 className="section-title-modern">
              Services <span className="gradient-text">Premium</span>
            </h2>
            <p className="section-description-modern">
              Une expérience complète pour des performances optimales
            </p>
          </div>
          
          <div className="services-grid-modern">
            {services.map((service, index) => (
              <div key={index} className="service-card-modern">
                <div className="service-icon-modern">
                  {service.icon}
                </div>
                <h3 className="service-title-modern">{service.titre}</h3>
                <p className="service-description-modern">{service.description}</p>
                <div className="service-features-modern">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="service-feature">
                      <Check size={12} /> {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="cta-overlay"></div>
        
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Prêt à <span className="gradient-text-gold">dominer</span> le terrain ?
            </h2>
            <p className="cta-subtitle">
              Réservez dès maintenant et bénéficiez de -20% sur votre première réservation
            </p>
            
            <div className="cta-buttons">
              <Link to="/reservation" className="cta-btn-primary">
                <Calendar size={20} />
                Réserver un terrain
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="cta-btn-secondary">
                Nous contacter
              </Link>
            </div>
            
            <div className="cta-features">
              <div className="cta-feature">
                <Check size={16} />
                <span>Réservation instantanée</span>
              </div>
              <div className="cta-feature">
                <Check size={16} />
                <span>Annulation gratuite</span>
              </div>
              <div className="cta-feature">
                <Check size={16} />
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-modern">
        <div className="container">
          <div className="footer-grid-modern">
            <div className="footer-brand-modern">
              <div className="footer-logo-modern">
                <div className="footer-logo-icon-modern">
                  <Target size={24} />
                </div>
                <span className="footer-logo-text-modern">FootField</span>
              </div>
              <p className="footer-description-modern">
                Le premier complexe de football premium en région parisienne. 
                Des installations de qualité professionnelle pour tous les passionnés.
              </p>
              <div className="footer-social-modern">
                <a href="#" className="footer-social-link-modern">
                  <Facebook size={18} />
                </a>
                <a href="#" className="footer-social-link-modern">
                  <Instagram size={18} />
                </a>
                <a href="#" className="footer-social-link-modern">
                  <Twitter size={18} />
                </a>
                <a href="#" className="footer-social-link-modern">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            
            <div className="footer-links-modern">
              <h3 className="footer-title-modern">Liens Rapides</h3>
              <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/terrains">Nos Terrains</a></li>
                <li><a href="/tarifs">Tarifs</a></li>
                <li><a href="/about">À propos</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-links-modern">
              <h3 className="footer-title-modern">Informations</h3>
              <ul>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/conditions">Conditions</a></li>
                <li><a href="/confidentialite">Confidentialité</a></li>
                <li><a href="/mentions">Mentions légales</a></li>
                <li><a href="/carriere">Carrière</a></li>
              </ul>
            </div>
            
            <div className="footer-contact-modern">
              <h3 className="footer-title-modern">Contact</h3>
              <div className="footer-contact-item-modern">
                <MapPinIcon size={16} />
                <span>123 Avenue du Sport, 75000 Paris</span>
              </div>
              <div className="footer-contact-item-modern">
                <Phone size={16} />
                <span>01 23 45 67 89</span>
              </div>
              <div className="footer-contact-item-modern">
                <Mail size={16} />
                <span>contact@footfield.fr</span>
              </div>
              
              <h3 className="footer-title-modern" style={{ marginTop: '30px' }}>Newsletter</h3>
              <div className="footer-newsletter-modern">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="footer-newsletter-input-modern"
                />
                <button className="footer-newsletter-btn-modern">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom-modern">
            <div className="footer-copyright-modern">
              © 2024 FootField. Tous droits réservés.
            </div>
            <div className="footer-bottom-links-modern">
              <a href="/conditions">Conditions d'utilisation</a>
              <a href="/confidentialite">Politique de confidentialité</a>
              <a href="/cookies">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;