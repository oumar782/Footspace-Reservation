import React from 'react';
import '../composant/homepage.css';
import Header from "../composant/Header";
import Footer from "../composant/Footer";
// Icônes SVG en tant que composants
const MapPin = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const Calendar = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const Trophy = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 14 20.24 14 22"/>
    <path d="M14 14.66V17c0 .55-.53.98-1.03 1.21C11.96 18.75 10 20.24 10 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const Users = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Star = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const Play = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);

const Index = () => {
  const features = [
    {
      icon: <MapPin />,
      title: "Terrains Premium",
      description: "Des installations modernes avec pelouse synthétique de qualité professionnelle"
    },
    {
      icon: <Calendar />,
      title: "Réservation Simple", 
      description: "Système de réservation en ligne 24h/24, 7j/7 avec confirmation immédiate"
    },
    {
      icon: <Trophy />,
      title: "Événements Sportifs",
      description: "Organisation de tournois et championnats pour tous niveaux"
    },
    {
      icon: <Users />,
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
      type: "11 vs 11" 
    },
    { 
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop", 
      title: "Terrain Indoor", 
      type: "5 vs 5" 
    },
    { 
      img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop", 
      title: "Terrain Premium", 
      type: "7 vs 7" 
    }
  ];

  return (
    <div className="index-page">
      <Header />
     

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="text-gradient">TERRAIN</span>
              <br />
              <span className="text-white">DE FOOT</span>
              <br />
              <span className="text-golden">PREMIUM</span>
            </h1>
            <p className="hero-subtitle">
              Découvrez nos installations sportives de haute qualité. 
              Réservez votre terrain et vivez votre passion du football.
            </p>
          </div>
          
          <div className="hero-buttons">
            <a href="/reservation" className="btn-primary">
              <Calendar />
              <span>Réserver Maintenant</span>
            </a>
            <a href="/terrains" className="btn-primary">
              <span>Voir nos terrains.</span>
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Ouvert tous les jours</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">8</div>
              <div className="stat-label">Terrains disponibles</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5★</div>
              <div className="stat-label">Note clients</div>
            </div>
          </div>
        </div>
        
       
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-titles">
              Pourquoi Choisir <span className="text-gradient">FootField</span> ?
            </h2>
            <p className="section-subtitle">
              Des installations modernes, un service professionnel et une passion partagée pour le football
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terrains Preview */}
      <section className="terrains-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-titles">
              Nos <span className="text-gradient">Terrains</span>
            </h2>
            <p className="section-subtitle">
              Découvrez nos installations de qualité professionnelle
            </p>
          </div>
          
          <div className="terrains-grid">
            {fields.map((field, index) => (
              <div key={index} className="terrain-card">
                <div className="terrain-image">
                  <img src={field.img} alt={field.title} />
                  <div className="terrain-overlay"></div>
                </div>
                <div className="terrain-content">
                  <h3 className="terrain-title">{field.title}</h3>
                  <p className="terrain-type">{field.type}</p>
                  <div className="terrain-footer">
                    <span className="terrain-price">À partir de 50€/h</span>
                    <a href="/terrains" className="terrain-link">Voir détails →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-ctas">
            <a href="/terrains" className="btn-primary">
              <span>Voir Tous les Terrains</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-titles">
              Ce Que Disent Nos <span className="text-gradient">Clients</span>
            </h2>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
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
      </h2>
      <p className="cta-subtitless">
        Réservez votre terrain dès maintenant et profitez de nos installations premium
      </p>
      <div className="cta-buttonss">
        <a href="/reservation" className="cta-btnss cta-btnss-primaryss">
          <span className="cta-btnss-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <a href="/reservation" className="cta-btnss-text">Réserver un Terrain</a>
          <span className="cta-btnss-arrow">→</span>
        </a>
        <a href="/contact" className="cta-btn cta-btn-secondary">
          <span className="cta-btnss-text">Nous Contacter</span>
        </a>
      </div>
      <div className="cta-featuress">
        <div className="cta-features">
          <div className="cta-features-icon">✓</div>
          <span>Réservation instantanée</span>
        </div>
        <div className="cta-features">
          <div className="cta-features-icon">✓</div>
          <span>Annulation gratuite 24h avant</span>
        </div>
        <div className="cta-features">
          <div className="cta-features-icon">✓</div>
          <span>Support 7j/7</span>
        </div>
      </div>
    </div>
  </div>
</section>

     
     
<Footer/>

    </div>
  );
};


export default Index;