
import React from 'react';
import './homepage.css';

const About = () => {
  const values = [
    {
      icon: 'fas fa-bullseye',
      title: "Excellence",
      description: "Nous nous engageons à fournir des installations de la plus haute qualité avec un service irréprochable."
    },
    {
      icon: 'fas fa-heart',
      title: "Passion",
      description: "Notre amour du football guide chacune de nos décisions et nous motive à créer des expériences mémorables."
    },
    {
      icon: 'fas fa-users',
      title: "Communauté",
      description: "Nous croyons au pouvoir rassembleur du sport et œuvrons pour créer un lieu de rencontre convivial."
    },
    {
      icon: 'fas fa-lightbulb',
      title: "Innovation",
      description: "Nous investissons constamment dans les dernières technologies pour améliorer votre expérience."
    }
  ];

  const team = [
    {
      name: "Marc Dubois",
      role: "Directeur Général",
      description: "Ancien joueur professionnel, Marc apporte plus de 20 ans d'expérience dans le football.",
      experience: "20+ ans d'expérience"
    },
    {
      name: "Sophie Martin",
      role: "Responsable Opérations",
      description: "Experte en gestion d'installations sportives, Sophie assure le bon fonctionnement quotidien.",
      experience: "15+ ans d'expérience"
    },
    {
      name: "Ahmed Benzema",
      role: "Chef d'Équipe Technique",
      description: "Spécialiste de l'entretien des terrains, Ahmed garantit la qualité de nos installations.",
      experience: "12+ ans d'expérience"
    },
    {
      name: "Julie Leroy",
      role: "Responsable Clientèle",
      description: "Julie s'assure que chaque client vit une expérience exceptionnelle chez FootField.",
      experience: "8+ ans d'expérience"
    }
  ];

  const stats = [
    { number: "2018", label: "Année de création" },
    { number: "8", label: "Terrains disponibles" },
    { number: "10,000+", label: "Clients satisfaits" },
    { number: "500+", label: "Matchs par mois" },
    { number: "24/7", label: "Service client" },
    { number: "5★", label: "Note moyenne" }
  ];

  const timeline = [
    {
      year: "2018",
      title: "Création de FootField",
      description: "Ouverture du premier centre avec 3 terrains synthétiques modernes."
    },
    {
      year: "2019",
      title: "Expansion Premium",
      description: "Ajout de 2 terrains indoor climatisés et modernisation des vestiaires."
    },
    {
      year: "2021",
      title: "Innovation Technologique",
      description: "Lancement de la plateforme de réservation en ligne et installation LED."
    },
    {
      year: "2023",
      title: "Excellence Reconnue",
      description: "Obtention du label 'Centre d'Excellence Sportive' et partenariats clubs locaux."
    },
    {
      year: "2024",
      title: "Vers l'Avenir",
      description: "Projet d'extension avec 3 nouveaux terrains et centre de formation."
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <h1 className="about-hero-title">
            À Propos de <span className="golden-text">FootField</span>
          </h1>
          <p className="about-hero-subtitle">
            Votre partenaire privilégié pour des expériences footballistiques d'exception depuis 2018
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">
              Notre <span className="gradient-text">Mission</span>
            </h2>
          </div>
          <p className="mission-description">
            Chez FootField, nous nous sommes donné pour mission de démocratiser l'accès à des installations 
            footballistiques de qualité professionnelle. Nous croyons que chaque joueur, qu'il soit amateur 
            ou professionnel, mérite de jouer dans les meilleures conditions possibles.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-container">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3 className="feature-title">Accessibilité</h3>
              <p className="feature-description">
                Des installations modernes accessibles à tous les niveaux et tous les budgets
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-container">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="feature-title">Qualité</h3>
              <p className="feature-description">
                Des standards professionnels pour une expérience de jeu optimale
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-container">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="feature-title">Communauté</h3>
              <p className="feature-description">
                Un lieu de rencontre et d'échange pour tous les passionnés de football
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section values-section">
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">
              Nos <span className="gradient-text">Valeurs</span>
            </h2>
            <p className="section-subtitle">
              Les principes qui guident notre action quotidienne
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-container">
                  <i className={value.icon}></i>
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">
              FootField en <span className="gradient-text">Chiffres</span>
            </h2>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-section timeline-section">
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">
              Notre <span className="gradient-text">Histoire</span>
            </h2>
            <p className="section-subtitle">
              Un parcours d'innovation et de croissance continue
            </p>
          </div>

          <div className="timeline-container">
            <div className="timeline">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-year">
                    {item.year}
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">
              Notre <span className="gradient-text">Équipe</span>
            </h2>
            <p className="section-subtitle">
              Des professionnels passionnés au service de votre expérience
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
                <div className="team-experience">
                  {member.experience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="about-section certifications-section">
        <div className="about-container">
          <div className="section-header">
            <h2 className="section-title">
              Certifications & <span className="gradient-text">Partenaires</span>
            </h2>
          </div>
          <div className="certifications-grid">
            <div className="certification-card">
              <div className="certification-icon-container">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="certification-title">Label Qualité</h3>
              <p className="certification-description">Centre d'Excellence Sportive certifié par la Fédération</p>
            </div>
            <div className="certification-card">
              <div className="certification-icon-container">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="certification-title">Partenaires Clubs</h3>
              <p className="certification-description">Convention avec 15+ clubs locaux et académies de formation</p>
            </div>
            <div className="certification-card">
              <div className="certification-icon-container">
                <i className="fas fa-clock"></i>
              </div>
              <h3 className="certification-title">Norme ISO</h3>
              <p className="certification-description">Certification ISO 9001 pour la qualité de service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Rejoignez la Communauté FootField
            </h2>
            <p className="cta-subtitle">
              Découvrez pourquoi plus de 10,000 joueurs nous font confiance
            </p>
            <div className="cta-buttons">
              <a href="/reservations" className="cta-button primary">
                Réserver Maintenant
              </a>
              <a href="/contact" className="cta-button secondary">
                Nous Contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;