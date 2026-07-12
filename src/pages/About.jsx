import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Heart, 
  Users, 
  Lightbulb, 
  Award, 
  MapPin, 
  Shield, 
  Clock,
  ArrowRight,
  Check,
  Trophy,
  Calendar,
  Star,
  TrendingUp,
  Crown,
  Sparkles,
  Gem,
  Flame,
  Zap,
  Medal,
  Building2,
  UserCheck,
  Globe,
  Handshake,
  Rocket,
  Compass,
  Briefcase,
  Activity,
  ChevronRight
} from 'lucide-react';
import './About.css';

const About = () => {
  // Valeurs - CORRECTION : les icônes sont maintenant des composants React
  const values = [
    { 
      icon: Target, 
      title: 'Excellence', 
      desc: "Des installations de haute qualité et un service irréprochable pour une expérience sportive d'élite.",
      color: '#0a750d'
    },
    { 
      icon: Heart, 
      title: 'Passion', 
      desc: "L'amour du sport guide chacune de nos décisions et anime notre équipe au quotidien.",
      color: '#e74c3c'
    },
    { 
      icon: Users, 
      title: 'Communauté', 
      desc: "Un lieu de rencontre et d'échange pour tous les passionnés de sport, quel que soit leur niveau.",
      color: '#3498db'
    },
    { 
      icon: Lightbulb, 
      title: 'Innovation', 
      desc: "Des technologies modernes constamment améliorées pour enrichir votre expérience sportive.",
      color: '#f1c40f'
    }
  ];

  // Statistiques - CORRECTION : les icônes sont maintenant des composants React
  const stats = [
    { number: '2018', label: 'Année de Création', icon: Building2 },
    { number: '8', label: 'Terrains Premium', icon: MapPin },
    { number: '12k+', label: 'Athlètes Accompagnés', icon: Users },
    { number: '500+', label: 'Matchs par Mois', icon: Activity },
    { number: '24/7', label: 'Service Disponible', icon: Clock },
    { number: '4.9★', label: 'Satisfaction Globale', icon: Star }
  ];

  const timeline = [
    { year: '2018', title: 'Création de PlayZone', desc: 'Ouverture du premier centre à Casablanca avec 3 terrains.' },
    { year: '2019', title: 'Expansion Majeure', desc: 'Ajout de terrains indoor et modernisation complète des vestiaires.' },
    { year: '2020', title: 'Résilience & Innovation', desc: 'Lancement de la plateforme de réservation en ligne.' },
    { year: '2021', title: 'Certification Qualité', desc: 'Obtention du label qualité et partenariats avec clubs locaux.' },
    { year: '2023', title: 'Écosystème Complet', desc: 'Intégration des sessions, coachs, tournois et boutique.' },
    { year: '2025', title: 'Excellence Continue', desc: '8 terrains premium et 12 000+ athlètes accompagnés.' }
  ];

  const team = [
    { 
      name: 'Karim El Amrani', 
      role: 'Directeur Général', 
      exp: '20+ ans d\'expérience',
      color: '#0a750d'
    },
    { 
      name: 'Sophie Martin', 
      role: 'Responsable Opérations', 
      exp: '15+ ans d\'expérience',
      color: '#3498db'
    },
    { 
      name: 'Ahmed Benzema', 
      role: 'Chef Technique', 
      exp: '12+ ans d\'expérience',
      color: '#e67e22'
    },
    { 
      name: 'Julie Leroy', 
      role: 'Responsable Clientèle', 
      exp: '8+ ans d\'expérience',
      color: '#e74c3c'
    }
  ];

  // Certifications - CORRECTION : les icônes sont maintenant des composants React
  const certifications = [
    { icon: Shield, title: 'Label Qualité', desc: 'Centre certifié par la Fédération Royale Marocaine de Football', color: '#0a750d' },
    { icon: Handshake, title: 'Partenaires Clubs', desc: '15+ clubs et académies partenaires à travers le Maroc', color: '#3498db' },
    { icon: Award, title: 'Norme ISO', desc: 'Certification ISO 9001 pour la qualité de service', color: '#f1c40f' }
  ];

  // Missions - CORRECTION : les icônes sont maintenant des composants React
  const missions = [
    { icon: MapPin, title: 'Accessibilité', desc: 'Des installations modernes pour tous les niveaux et budgets.' },
    { icon: Award, title: 'Qualité', desc: 'Des standards professionnels pour une expérience optimale.' },
    { icon: Users, title: 'Communauté', desc: 'Un espace de rencontre pour tous les sportifs.' }
  ];

  return (
    <div className="ab-about-page">
      {/* Hero Section */}
      <section className="ab-hero">
        <div className="ab-hero-backdrop"></div>
        <div className="ab-hero-overlay"></div>
        <div className="ab-hero-pattern"></div>
        
        <div className="ab-hero-container">
          <div className="ab-hero-content">
            <div className="ab-hero-badge">
              <span className="ab-hero-badge-dot"></span>
              <span className="ab-hero-badge-text">Notre Histoire</span>
            </div>
            
            <h1 className="ab-hero-title">
              <span className="ab-hero-title-line">L'Excellence</span>
              <span className="ab-hero-title-line ab-hero-title-gold">Sportive</span>
              <span className="ab-hero-title-line">Depuis 2018</span>
            </h1>
            
            <p className="ab-hero-subtitle">
              PlayZone incarne l'excellence sportive au Maroc. Découvrez notre parcours, 
              nos valeurs et notre engagement envers la communauté sportive.
            </p>
            
            <div className="ab-hero-actions">
              <a href="#history" className="ab-btn-primary">
                <span>Notre Parcours</span>
                <ArrowRight size={20} className="ab-btn-arrow" />
              </a>
              <a href="/reservation" className="ab-btn-secondary">
                <Calendar size={20} />
                <span>Réserver un Terrain</span>
              </a>
            </div>
            
            <div className="ab-hero-stats">
              <div className="ab-hero-stat">
                <span className="ab-hero-stat-number">2018</span>
                <span className="ab-hero-stat-label">Année de Création</span>
              </div>
              <div className="ab-hero-stat">
                <span className="ab-hero-stat-number">8</span>
                <span className="ab-hero-stat-label">Terrains Premium</span>
              </div>
              <div className="ab-hero-stat">
                <span className="ab-hero-stat-number">12k+</span>
                <span className="ab-hero-stat-label">Athlètes Accompagnés</span>
              </div>
              <div className="ab-hero-stat">
                <span className="ab-hero-stat-number">4.9★</span>
                <span className="ab-hero-stat-label">Satisfaction Globale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="ab-mission">
        <div className="ab-container">
          <div className="ab-section-header">
            <span className="ab-section-subtitle">Notre Mission</span>
            <h2 className="ab-section-title">
              <span className="ab-gradient-text">Révéler</span> le Sportif en Chacun
            </h2>
            <p className="ab-section-desc">
              Offrir une expérience sportive exceptionnelle à travers des infrastructures premium et un service d'excellence
            </p>
          </div>
          
          <div className="ab-mission-grid">
            {missions.map((mission, index) => {
              const Icon = mission.icon;
              return (
                <div key={index} className="ab-mission-card">
                  <div className="ab-mission-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="ab-mission-title">{mission.title}</h3>
                  <p className="ab-mission-desc">{mission.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="ab-values">
        <div className="ab-container">
          <div className="ab-section-header ab-section-header-light">
            <span className="ab-section-subtitle">Nos Valeurs</span>
            <h2 className="ab-section-title ab-title-light">
              Ce qui nous <span className="ab-gradient-gold">Anime</span>
            </h2>
            <p className="ab-section-desc ab-desc-light">
              Des principes fondamentaux qui guident notre action au quotidien
            </p>
          </div>
          
          <div className="ab-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="ab-value-card">
                  <div className="ab-value-icon" style={{ background: `linear-gradient(135deg, ${value.color}, ${value.color}dd)` }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="ab-value-title">{value.title}</h3>
                  <p className="ab-value-desc">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ab-stats">
        <div className="ab-container">
          <div className="ab-stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="ab-stat-card">
                  <div className="ab-stat-icon"><Icon size={24} /></div>
                  <div className="ab-stat-number">{stat.number}</div>
                  <div className="ab-stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="history" className="ab-timeline-section">
        <div className="ab-container">
          <div className="ab-section-header">
            <span className="ab-section-subtitle">Notre Parcours</span>
            <h2 className="ab-section-title">
              Une Histoire de <span className="ab-gradient-text">Passion</span>
            </h2>
            <p className="ab-section-desc">
              De la création à l'excellence, découvrez les étapes clés de notre développement
            </p>
          </div>
          
          <div className="ab-timeline">
            {timeline.map((item, index) => (
              <div key={index} className="ab-timeline-item">
                <div className="ab-timeline-marker">
                  <span className="ab-timeline-year">{item.year}</span>
                </div>
                <div className="ab-timeline-content">
                  <h3 className="ab-timeline-title">{item.title}</h3>
                  <p className="ab-timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="ab-team">
        <div className="ab-container">
          <div className="ab-section-header ab-section-header-light">
            <span className="ab-section-subtitle">L'Équipe</span>
            <h2 className="ab-section-title ab-title-light">
              Des <span className="ab-gradient-gold">Professionnels</span> Passionnés
            </h2>
            <p className="ab-section-desc ab-desc-light">
              Une équipe d'experts dédiés à votre expérience sportive
            </p>
          </div>
          
          <div className="ab-team-grid">
            {team.map((member, index) => (
              <div key={index} className="ab-team-card">
                <div className="ab-team-avatar" style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}dd)` }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="ab-team-name">{member.name}</h3>
                <span className="ab-team-role">{member.role}</span>
                <span className="ab-team-exp">{member.exp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="ab-certifications">
        <div className="ab-container">
          <div className="ab-section-header">
            <span className="ab-section-subtitle">Certifications</span>
            <h2 className="ab-section-title">
              Une <span className="ab-gradient-text">Excellence</span> Reconnue
            </h2>
            <p className="ab-section-desc">
              Des labels et certifications qui témoignent de notre engagement qualité
            </p>
          </div>
          
          <div className="ab-certs-grid">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="ab-cert-card">
                  <div className="ab-cert-icon" style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}dd)` }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="ab-cert-title">{cert.title}</h3>
                  <p className="ab-cert-desc">{cert.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ab-cta">
        <div className="ab-cta-overlay"></div>
        <div className="ab-cta-container">
          <div className="ab-cta-content">
            <h2 className="ab-cta-title">
              <span className="ab-cta-title-text">Rejoignez l'</span>
              <span className="ab-cta-title-gold">Aventure</span>
              <span className="ab-cta-title-text"> PlayZone</span>
            </h2>
            <p className="ab-cta-subtitle">
              Faites partie de la communauté sportive qui repousse ses limites. 
              Réservez votre terrain et vivez l'expérience PlayZone.
            </p>
            
            <div className="ab-cta-buttons">
              <a href="/reservation" className="ab-cta-btn-primary">
                <span className="ab-cta-btn-icon"><Calendar size={20} /></span>
                <span>Réserver un Terrain</span>
                <span className="ab-cta-btn-arrow">→</span>
              </a>
              <a href="/contact" className="ab-cta-btn-secondary">
                <span>Nous Contacter</span>
              </a>
            </div>
            
            <div className="ab-cta-features">
              <div className="ab-cta-feature">
                <div className="ab-cta-feature-icon"><Check size={12} /></div>
                <span>Réservation Instantanée</span>
              </div>
              <div className="ab-cta-feature">
                <div className="ab-cta-feature-icon"><Check size={12} /></div>
                <span>Service Premium 24/7</span>
              </div>
              <div className="ab-cta-feature">
                <div className="ab-cta-feature-icon"><Check size={12} /></div>
                <span>Équipements de Qualité</span>
              </div>
              <div className="ab-cta-feature">
                <div className="ab-cta-feature-icon"><Check size={12} /></div>
                <span>Accès à la Communauté</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;