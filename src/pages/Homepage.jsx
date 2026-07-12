import React from 'react';
import '../composant/homepage.css';

import { 
  Calendar, 
  Trophy, 
  Users, 
  Star, 
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
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
  Shield,
  Sparkles,
  Gem,
  Flame,
  Crown,
  Footprints,
  Dumbbell,
  Activity,
  ShoppingBag,
  Medal,
  Compass,
  TrendingUp,
  Briefcase,
  Globe,
  Headphones,
  CreditCard,
  BarChart3,
  PieChart,
  LineChart,
  Settings2,
  ClipboardList,
  Users2,
  LayoutDashboard,
  Wifi,
  Thermometer,
  Droplets,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Monitor,
  Cpu,
  HardDrive,
  Server,
  Cloud,
  Database,
  Network,
  Radio,
  Signal,
  Gauge,
  Timer,
  Settings,
  Plus,
  Minus,
  XCircle,
  CheckCircle,
  Info,
  AlertCircle
} from 'lucide-react';

const Homepage = () => {
  const services = [
    {
      icon: <Calendar size={28} />,
      title: "Réservation de Terrains",
      description: "Réservez instantanément votre terrain parmi 8 installations premium. Disponibilité en temps réel 24h/24.",
      color: "#0a750d",
      link: "/reservation"
    },
    {
      icon: <Trophy size={28} />,
      title: "Gestion de Tournoi",
      description: "Plateforme complète pour créer, gérer et suivre vos tournois. Tableaux, scores, statistiques et classements en temps réel.",
      color: "#ffd700",
      link: "/tournois"
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Analyse d'Infrastructure",
      description: "Dashboard intelligent pour surveiller et analyser vos installations sportives. Données en temps réel, maintenance prédictive.",
      color: "#3498db",
      link: "/infrastructure"
    },
    {
      icon: <Users size={28} />,
      title: "Coaching Personnalisé",
      description: "Bénéficiez de séances avec nos coachs certifiés. Progressez rapidement grâce à des programmes sur mesure.",
      color: "#e67e22",
      link: "/coaches"
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Marketplace Sportive",
      description: "Découvrez notre boutique d'équipements premium. Maillots, chaussures et accessoires pour tous les sports.",
      color: "#3498db",
      link: "/boutique"
    },
    {
      icon: <Medal size={28} />,
      title: "Matchs Organisés",
      description: "Organisez vos matchs entre amis ou en équipe. Service d'arbitrage et statistiques inclus.",
      color: "#e74c3c",
      link: "/sessions"
    }
  ];

  const infrastructureMetrics = [
    { label: "Terrains Actifs", value: "8/8", status: "green", icon: <CheckCircle2 size={16} /> },
    { label: "Taux d'Occupation", value: "87%", status: "green", icon: <TrendingUp size={16} /> },
    { label: "Maintenance", value: "2 interventions", status: "warning", icon: <AlertTriangle size={16} /> },
    { label: "Température", value: "22°C", status: "green", icon: <Thermometer size={16} /> },
    { label: "Qualité de l'Air", value: "Excellent", status: "green", icon: <CheckCircle size={16} /> },
    { label: "Éclairage", value: "Optimal", status: "green", icon: <Lightbulb size={16} /> }
  ];

  const tournamentStats = [
    { label: "Tournois Actifs", value: "12", icon: <Trophy size={20} /> },
    { label: "Équipes Inscrites", value: "48", icon: <Users2 size={20} /> },
    { label: "Matchs Disputés", value: "156", icon: <Activity size={20} /> },
    { label: "Prochains Tournois", value: "8", icon: <Calendar size={20} /> }
  ];

  const features = [
    {
      icon: <Zap size={24} />,
      title: "Réservation Flash",
      description: "Confirmation immédiate et paiement sécurisé pour vos réservations"
    },
    {
      icon: <LayoutDashboard size={24} />,
      title: "Dashboard Infrastructure",
      description: "Visualisez en temps réel l'état de vos installations et anticipez les maintenances"
    },
    {
      icon: <ClipboardList size={24} />,
      title: "Gestion de Tournoi",
      description: "Créez des tournois, gérez les équipes, suivez les scores et publiez les classements"
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Boutique Intégrée",
      description: "Matériel sportif de marques reconnues à prix compétitifs"
    }
  ];

  const stats = [
    { number: "8", label: "Terrains Premium", icon: <MapPin size={28} /> },
    { number: "500+", label: "Matchs par Mois", icon: <Activity size={28} /> },
    { number: "150+", label: "Tournois Organisés", icon: <Trophy size={28} /> },
    { number: "12k+", label: "Athlètes Accompagnés", icon: <Users size={28} /> },
    { number: "24/7", label: "Service Disponible", icon: <Clock size={28} /> },
    { number: "98%", label: "Satisfaction Globale", icon: <Star size={28} /> }
  ];

  const testimonials = [
    {
      name: "Marc Dubois",
      role: "Capitaine FC Parisien",
      content: "PlayZone a révolutionné notre façon de jouer. Des terrains exceptionnels, un service impeccable et une ambiance unique.",
      rating: 5
    },
    {
      name: "Sophie Martin",
      role: "Entraîneuse Nationale",
      content: "Le meilleur complexe sportif du Maroc. Les installations sont de classe mondiale et l'équipe est d'un professionnalisme remarquable.",
      rating: 5
    },
    {
      name: "Karim El Fassi",
      role: "Organisateur Tournois",
      content: "Organiser des tournois ici est un véritable plaisir. Tout est pensé pour offrir une expérience exceptionnelle aux participants.",
      rating: 5
    }
  ];

  return (
    <div className="sp-homepage">
      {/* Hero Section */}
      <section className="sp-hero">
        <div className="sp-hero-backdrop"></div>
        <div className="sp-hero-overlay"></div>
        <div className="sp-hero-pattern"></div>
        
        <div className="sp-hero-container">
          <div className="sp-hero-content">
            <div className="sp-hero-badge">
              <span className="sp-hero-badge-dot"></span>
              <span className="sp-hero-badge-text">Écosystème Sportif Complet</span>
            </div>
            
            <h1 className="sp-hero-title">
              <span className="sp-hero-title-line">Votre Univers</span>
              <span className="sp-hero-title-line sp-hero-title-gold">Sportif</span>
              <span className="sp-hero-title-line">Intelligent</span>
            </h1>
            
            <p className="sp-hero-subtitle">
              Réservez, jouez, organisez et gérez votre infrastructure sportive sur une plateforme unique. 
              PlayZone réunit tout l'écosystème pour une expérience sans précédent.
            </p>
            
            <div className="sp-hero-actions">
              <a href="/reservation" className="sp-btn-primary">
                <Calendar size={20} />
                <span>Réserver un Terrain</span>
                <ArrowRight size={20} className="sp-btn-arrow" />
              </a>
              <a href="/tournois" className="sp-btn-secondary">
                <Trophy size={20} />
                <span>Gérer un Tournoi</span>
              </a>
            </div>
            
            <div className="sp-hero-stats">
              <div className="sp-hero-stat">
                <span className="sp-hero-stat-number">8</span>
                <span className="sp-hero-stat-label">Terrains Premium</span>
              </div>
              <div className="sp-hero-stat">
                <span className="sp-hero-stat-number">500+</span>
                <span className="sp-hero-stat-label">Matchs par Mois</span>
              </div>
              <div className="sp-hero-stat">
                <span className="sp-hero-stat-number">150+</span>
                <span className="sp-hero-stat-label">Tournois Organisés</span>
              </div>
              <div className="sp-hero-stat">
                <span className="sp-hero-stat-number">12k+</span>
                <span className="sp-hero-stat-label">Athlètes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="sp-services">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-subtitle">Nos Services</span>
            <h2 className="sp-section-title">
              Tout pour le <span className="sp-gradient-text">Sportif</span> Moderne
            </h2>
            <p className="sp-section-desc">
              Une gamme complète de services pour répondre à tous vos besoins sportifs
            </p>
          </div>
          
          <div className="sp-services-grid">
            {services.map((service, index) => (
              <div key={index} className="sp-service-card">
                <div className="sp-service-icon" style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)` }}>
                  {service.icon}
                </div>
                <h3 className="sp-service-title">{service.title}</h3>
                <p className="sp-service-desc">{service.description}</p>
                <a href={service.link} className="sp-service-link">
                  Explorer <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Analytics Section */}
      <section className="sp-infrastructure">
        <div className="sp-container">
          <div className="sp-section-header sp-section-header-light">
            <span className="sp-section-subtitle">Analyse d'Infrastructure</span>
            <h2 className="sp-section-title sp-title-light">
              Dashboard <span className="sp-gradient-gold">Intelligent</span>
            </h2>
            <p className="sp-section-desc sp-desc-light">
              Surveillez et analysez vos installations sportives en temps réel
            </p>
          </div>
          
          <div className="sp-infrastructure-grid">
            <div className="sp-infrastructure-main">
              <div className="sp-infrastructure-header">
                <div className="sp-infrastructure-title">
                  <BarChart3 size={20} />
                  <h3>État des Installations</h3>
                </div>
                <span className="sp-infrastructure-status">
                  <span className="sp-status-dot"></span>
                  Système Opérationnel
                </span>
              </div>
              <div className="sp-infrastructure-metrics">
                {infrastructureMetrics.map((metric, index) => (
                  <div key={index} className="sp-infrastructure-metric">
                    <div className="sp-metric-icon" style={{ 
                      background: metric.status === 'green' ? 'rgba(10, 117, 13, 0.1)' : 'rgba(255, 215, 0, 0.1)',
                      color: metric.status === 'green' ? '#0a750d' : '#ffd700'
                    }}>
                      {metric.icon}
                    </div>
                    <div className="sp-metric-info">
                      <span className="sp-metric-label">{metric.label}</span>
                      <span className="sp-metric-value">{metric.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="sp-infrastructure-side">
              <div className="sp-infrastructure-chart">
                <div className="sp-chart-header">
                  <Signal size={18} />
                  <span>Performance des Terrains</span>
                </div>
                <div className="sp-chart-bars">
                  <div className="sp-chart-bar" style={{ height: '95%' }}><span>T1</span></div>
                  <div className="sp-chart-bar" style={{ height: '85%' }}><span>T2</span></div>
                  <div className="sp-chart-bar" style={{ height: '70%' }}><span>T3</span></div>
                  <div className="sp-chart-bar" style={{ height: '90%' }}><span>T4</span></div>
                  <div className="sp-chart-bar" style={{ height: '60%' }}><span>T5</span></div>
                  <div className="sp-chart-bar" style={{ height: '80%' }}><span>T6</span></div>
                  <div className="sp-chart-bar" style={{ height: '75%' }}><span>T7</span></div>
                  <div className="sp-chart-bar" style={{ height: '92%' }}><span>T8</span></div>
                </div>
                <div className="sp-chart-labels">
                  <span>Taux d'occupation moyen: 81%</span>
                  <span><CheckCircle2 size={14} /> 6 terrains actifs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Management Section */}
      <section className="sp-tournament">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-subtitle">Gestion de Tournoi</span>
            <h2 className="sp-section-title">
              Plateforme <span className="sp-gradient-text">Tournoi</span> Complete
            </h2>
            <p className="sp-section-desc">
              Créez, gérez et suivez vos tournois en temps réel
            </p>
          </div>
          
          <div className="sp-tournament-grid">
            <div className="sp-tournament-stats">
              {tournamentStats.map((stat, index) => (
                <div key={index} className="sp-tournament-stat">
                  <div className="sp-tournament-stat-icon" style={{ 
                    background: index === 0 ? 'rgba(255, 215, 0, 0.15)' :
                               index === 1 ? 'rgba(10, 117, 13, 0.15)' :
                               index === 2 ? 'rgba(52, 152, 219, 0.15)' :
                               'rgba(231, 76, 60, 0.15)',
                    color: index === 0 ? '#ffd700' :
                           index === 1 ? '#0a750d' :
                           index === 2 ? '#3498db' :
                           '#e74c3c'
                  }}>
                    {stat.icon}
                  </div>
                  <div className="sp-tournament-stat-info">
                    <span className="sp-tournament-stat-number">{stat.value}</span>
                    <span className="sp-tournament-stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="sp-tournament-features">
              <div className="sp-tournament-feature-item">
                <div className="sp-tournament-feature-icon" style={{ background: '#ffd700', color: '#1a2418' }}>
                  <Plus size={18} />
                </div>
                <div>
                  <h4>Création Rapide</h4>
                  <p>Créez des tournois en quelques clics</p>
                </div>
              </div>
              <div className="sp-tournament-feature-item">
                <div className="sp-tournament-feature-icon" style={{ background: '#0a750d', color: 'white' }}>
                  <Users2 size={18} />
                </div>
                <div>
                  <h4>Gestion des Équipes</h4>
                  <p>Inscrivez et gérez les équipes participantes</p>
                </div>
              </div>
              <div className="sp-tournament-feature-item">
                <div className="sp-tournament-feature-icon" style={{ background: '#3498db', color: 'white' }}>
                  <ClipboardList size={18} />
                </div>
                <div>
                  <h4>Suivi des Scores</h4>
                  <p>Scores en direct et classements automatiques</p>
                </div>
              </div>
              <div className="sp-tournament-feature-item">
                <div className="sp-tournament-feature-icon" style={{ background: '#e67e22', color: 'white' }}>
                  <Trophy size={18} />
                </div>
                <div>
                  <h4>Récompenses</h4>
                  <p>Gestion des prix et récompenses des vainqueurs</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sp-tournament-cta">
            <a href="/tournois" className="sp-btn-primary">
              <Trophy size={20} />
              <span>Créer un Tournoi</span>
              <ArrowRight size={20} />
            </a>
            <a href="/infrastructure" className="sp-btn-outline">
              <BarChart3 size={20} />
              <span>Voir le Dashboard</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="sp-features">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-subtitle">Pourquoi PlayZone</span>
            <h2 className="sp-section-title">
              Une <span className="sp-gradient-text">Excellence</span> à Tous les Niveaux
            </h2>
            <p className="sp-section-desc">
              Des services premium pensés pour les sportifs exigeants
            </p>
          </div>
          
          <div className="sp-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="sp-feature-card">
                <div className="sp-feature-icon">
                  {feature.icon}
                </div>
                <h3 className="sp-feature-title">{feature.title}</h3>
                <p className="sp-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="sp-stats">
        <div className="sp-container">
          <div className="sp-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="sp-stat-card">
                <div className="sp-stat-icon">{stat.icon}</div>
                <div className="sp-stat-number">{stat.number}</div>
                <div className="sp-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="sp-testimonials">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-subtitle">Témoignages</span>
            <h2 className="sp-section-title">
              La Voix de Notre <span className="sp-gradient-text">Communauté</span>
            </h2>
          </div>
          
          <div className="sp-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="sp-testimonial-card">
                <div className="sp-testimonial-quote">"</div>
                <div className="sp-testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="sp-testimonial-text">"{testimonial.content}"</p>
                <div className="sp-testimonial-author">
                  <div className="sp-testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="sp-testimonial-info">
                    <div className="sp-testimonial-name">{testimonial.name}</div>
                    <div className="sp-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="sp-cta">
        <div className="sp-cta-overlay"></div>
        <div className="sp-cta-container">
          <div className="sp-cta-content">
            <h2 className="sp-cta-title">
              <span className="sp-cta-title-text">Rejoignez l'</span>
              <span className="sp-cta-title-gold">Excellence</span>
              <span className="sp-cta-title-text"> Sportive</span>
            </h2>
            <p className="sp-cta-subtitle">
              Plus qu'un complexe sportif, une plateforme intelligente où la performance, 
              la gestion et le plaisir se rencontrent. Réservez, organisez, analysez et équipez-vous.
            </p>
            
            <div className="sp-cta-buttons">
              <a href="/reservation" className="sp-cta-btn-primary">
                <span className="sp-cta-btn-icon"><Calendar size={20} /></span>
                <span>Réserver un Terrain</span>
                <span className="sp-cta-btn-arrow">→</span>
              </a>
              <a href="/tournois" className="sp-cta-btn-secondary">
                <Trophy size={20} />
                <span>Organiser un Tournoi</span>
              </a>
            </div>
            
            <div className="sp-cta-features">
              <div className="sp-cta-feature">
                <div className="sp-cta-feature-icon"><Check size={12} /></div>
                <span>Réservation Instantanée</span>
              </div>
              <div className="sp-cta-feature">
                <div className="sp-cta-feature-icon"><Check size={12} /></div>
                <span>Gestion de Tournoi</span>
              </div>
              <div className="sp-cta-feature">
                <div className="sp-cta-feature-icon"><Check size={12} /></div>
                <span>Analyse Infrastructure</span>
              </div>
              <div className="sp-cta-feature">
                <div className="sp-cta-feature-icon"><Check size={12} /></div>
                <span>Marketplace Intégrée</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;