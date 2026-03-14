import React from 'react';
import '../composant/homepage.css';

// Import des icônes Lucide React
import { 
  MapPin, 
  Calendar, 
  Trophy, 
  Users, 
  Star, 
  ArrowRight,
  Play,
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
  Zap
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <MapPin size={32} />,
      title: "Terrains Premium",
      description: "Des installations modernes avec pelouse synthétique de qualité professionnelle"
    },
    {
      icon: <Calendar size={32} />,
      title: "Réservation Simple", 
      description: "Système de réservation en ligne 24h/24, 7j/7 avec confirmation immédiate"
    },
    {
      icon: <Trophy size={32} />,
      title: "Événements Sportifs",
      description: "Organisation de tournois et championnats pour tous niveaux"
    },
    {
      icon: <Users size={32} />,
      title: "Équipes & Clubs",
      description: "Tarifs préférentiels pour les clubs et réservations récurrentes"
    }
  ];

  const testimonials = [
    {
      name: "Marc Dubois",
      role: "Capitaine FC Parisien", 
      content: "Des terrains exceptionnels ! La qualité de la pelouse et des équipements fait vraiment la différence.",
      rating: 5
    },
    {
      name: "Sophie Martin",
      role: "Entraîneur jeunes",
      content: "Parfait pour nos entraînements. L'équipe est professionnelle et les créneaux très flexibles.",
      rating: 5
    },
    {
      name: "Ahmed Benzema",
      role: "Joueur amateur",
      content: "Le meilleur complexe de la région ! Vestiaires propres, terrain impeccable, je recommande à 100%.",
      rating: 5
    }
  ];

  const fields = [
    { 
      img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      title: "Terrain Synthétique A", 
      type: "11 vs 11",
      price: "50€/h",
      features: ["Éclairage LED", "Vestiaires", "Parking"]
    },
    { 
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop", 
      title: "Terrain Indoor", 
      type: "5 vs 5",
      price: "45€/h",
      features: ["Climatisé", "Tribunes", "Bar"]
    },
    { 
      img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop", 
      title: "Terrain Premium", 
      type: "7 vs 7",
      price: "60€/h",
      features: ["Pelouse pro", "Vidéo", "Spa"]
    }
  ];

  return (
    <div className="index-page">
    

      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span className="hero-badge-text">FOOTFIELD PREMIUM</span>
            </div>
            
            <h1 className="hero-title">
              <span className="hero-title-line">VOTRE</span>
              <span className="hero-title-line hero-title-highlight">TERRAIN DE FOOT</span>
              <span className="hero-title-line">D'EXCEPTION</span>
            </h1>
            
            <p className="hero-subtitle">
              Découvrez nos installations sportives de haute qualité. 
              Réservez votre terrain et vivez votre passion du football dans des conditions professionnelles.
            </p>
            
            <div className="hero-actions">
              <a href="/reservation" className="hero-btn-primary">
                <Calendar size={20} />
                <span>Réserver Maintenant</span>
                <ArrowRight size={20} className="hero-btn-icon" />
              </a>
              <a href="/terrains" className="hero-btn-secondary">
                <Play size={20} />
                <span>Découvrir nos terrains</span>
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="hero-stat-item">
                <span className="hero-stat-number">24/7</span>
                <span className="hero-stat-label">Ouvert tous les jours</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">8</span>
                <span className="hero-stat-label">Terrains disponibles</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">5★</span>
                <span className="hero-stat-label">Note moyenne</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">10k+</span>
                <span className="hero-stat-label">Joueurs satisfaits</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-modern">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle-modern">POURQUOI NOUS CHOISIR</span>
            <h2 className="section-title-modern">
              Une expérience <span className="gradient-text">football</span> unique
            </h2>
            <p className="section-description-modern">
              Des installations modernes, un service professionnel et une passion partagée pour le football
            </p>
          </div>
          
          <div className="features-grid-modern">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-modern">
                <div className="feature-icon-modern">
                  {feature.icon}
                </div>
                <h3 className="feature-title-modern">{feature.title}</h3>
                <p className="feature-description-modern">{feature.description}</p>
                <a href="/en-savoir-plus" className="feature-link-modern">
                  En savoir plus <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terrains Section */}
      <section className="terrains-modern">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle-modern">NOS TERRAINS</span>
            <h2 className="section-title-modern">
              Des <span className="gradient-text-gold">installations</span> d'exception
            </h2>
            <p className="section-description-modern">
              Découvrez nos terrains de qualité professionnelle
            </p>
          </div>
          
          <div className="terrains-grid-modern">
            {fields.map((field, index) => (
              <div key={index} className="terrain-card-modern">
                <div className="terrain-image-modern">
                  <img src={field.img} alt={field.title} />
                  <div className="terrain-overlay-modern"></div>
                  <div className="terrain-badge-modern">POPULAIRE</div>
                </div>
                
                <div className="terrain-content-modern">
                  <h3 className="terrain-title-modern">{field.title}</h3>
                  <p className="terrain-type">{field.type}</p>
                  <p className="terrain-desc-modern">
                    Terrain aux normes professionnelles avec éclairage LED et vestiaires modernes.
                  </p>
                  
                  <div className="terrain-features-modern">
                    {field.features.map((feature, i) => (
                      <span key={i} className="terrain-feature-modern">
                        <Check size={14} /> {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="terrain-footer-modern">
                    <div className="terrain-price-modern">
                      <span className="price-number-modern">{field.price}</span>
                      <span className="price-unit-modern">/heure</span>
                    </div>
                    <a href={`/terrains/${index}`} className="terrain-btn-modern">
                      Réserver <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-ctas">
            <a href="/terrains" className="hero-btn-primary">
              <span>Voir Tous les Terrains</span>
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-modern">
        <div className="container">
          <div className="stats-grid-modern">
            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <Award size={32} />
              </div>
              <div className="stat-number-modern">2018</div>
              <div className="stat-label-modern">Année de création</div>
            </div>
            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <MapPin size={32} />
              </div>
              <div className="stat-number-modern">8</div>
              <div className="stat-label-modern">Terrains disponibles</div>
            </div>
            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <UserCheck size={32} />
              </div>
              <div className="stat-number-modern">10k+</div>
              <div className="stat-label-modern">Clients satisfaits</div>
            </div>
            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <Trophy size={32} />
              </div>
              <div className="stat-number-modern">500+</div>
              <div className="stat-label-modern">Matchs par mois</div>
            </div>
            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <Clock size={32} />
              </div>
              <div className="stat-number-modern">24/7</div>
              <div className="stat-label-modern">Service client</div>
            </div>
            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <Star size={32} fill="currentColor" />
              </div>
              <div className="stat-number-modern">5★</div>
              <div className="stat-label-modern">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-modern">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle-modern">TÉMOIGNAGES</span>
            <h2 className="section-title-modern">
              Ce que disent nos <span className="gradient-text">clients</span>
            </h2>
          </div>
          
          <div className="testimonials-grid-modern">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card-modern">
                <div className="testimonial-quote-modern">"</div>
                <div className="testimonial-stars-modern">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text-modern">"{testimonial.content}"</p>
                <div className="testimonial-author-modern">
                  <div className="testimonial-avatar-modern">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="testimonial-info-modern">
                    <div className="testimonial-name-modern">{testimonial.name}</div>
                    <div className="testimonial-role-modern">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-sectionss">
        <div className="cta-overlayss"></div>
        <div className="cta-containerss">
          <div className="cta-contentss">
            <h2 className="cta-titless">
              <span className="cta-title-textss">Prêt à </span>
              <span className="cta-title-highlightss">Jouer</span>
              <span className="cta-title-textss"> ?</span>
            </h2>
            <p className="cta-subtitless">
              Réservez votre terrain dès maintenant et profitez de nos installations premium. 
              Premier match offert pour toute nouvelle inscription !
            </p>
            
            <div className="cta-buttonss">
              <a href="/reservation" className="cta-btnss cta-btnss-primaryss">
                <span className="cta-btnss-icon">
                  <Calendar size={20} />
                </span>
                <span className="cta-btnss-text">Réserver un Terrain</span>
                <span className="cta-btnss-arrow">→</span>
              </a>
              <a href="/contact" className="cta-btn cta-btn-secondary">
                <span className="cta-btnss-text">Nous Contacter</span>
              </a>
            </div>
            
            <div className="cta-featuress">
              <div className="cta-features">
                <div className="cta-features-icon">
                  <Check size={12} />
                </div>
                <span>Réservation instantanée</span>
              </div>
              <div className="cta-features">
                <div className="cta-features-icon">
                  <Check size={12} />
                </div>
                <span>Annulation gratuite 24h avant</span>
              </div>
              <div className="cta-features">
                <div className="cta-features-icon">
                  <Check size={12} />
                </div>
                <span>Support 7j/7</span>
              </div>
              <div className="cta-features">
                <div className="cta-features-icon">
                  <Check size={12} />
                </div>
                <span>Équipements inclus</span>
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
              <ul className="footer-links-modern">
                <li><a href="/">Accueil</a></li>
                <li><a href="/terrains">Nos Terrains</a></li>
                <li><a href="/tarifs">Tarifs</a></li>
                <li><a href="/about">À propos</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-links-modern">
              <h3 className="footer-title-modern">Informations</h3>
              <ul className="footer-links-modern">
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/conditions">Conditions</a></li>
                <li><a href="/confidentialité">Confidentialité</a></li>
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
              <a href="/confidentialité">Politique de confidentialité</a>
              <a href="/cookies">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;