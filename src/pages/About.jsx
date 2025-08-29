import React from 'react';
import Header from "../composant/Header";
import Footer from "../composant/Footer";
import './About.css';
<Header />

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
    <div className="about-pagess">
      <Header />

      {/* Hero Section */}
      <section className="about-heross">
        <div className="about-containerss">
          <div className="hero-contentss">
            <h1 className="hero-titless">À Propos de <span className="golden-text">FootField</span></h1>
            <p className="hero-subtitless">
              Votre partenaire privilégié pour des expériences footballistiques d'exception depuis 2018
            </p>
            <a href="#values" className="hero-ctass">Découvrir notre histoire</a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-sectionss section-lightss">
        <div className="about-containessr">
          <div className="section-headerss">
            <h2 className="section-titless">Notre <span className="gradient-textss">Mission</span></h2>
            <p className="section-subtitless">Ce qui nous motive et nous guide au quotidien</p>
          </div>
          <p className="mission-descriptionss">
            Chez FootField, nous nous sommes donné pour mission de démocratiser l'accès à des installations 
            footballistiques de qualité professionnelle. Nous croyons que chaque joueur, qu'il soit amateur 
            ou professionnel, mérite de jouer dans les meilleures conditions possibles.
          </p>
          <div className="mission-gridss">
            <div className="mission-cardss">
              <div className="mission-iconss">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3 className="mission-cardss-titless">Accessibilité</h3>
              <p className="mission-cardss-descss">
                Des installations modernes accessibles à tous les niveaux et tous les budgets
              </p>
            </div>
            <div className="mission-cardss">
              <div className="mission-iconss">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="mission-cardss-titless">Qualité</h3>
              <p className="mission-cardss-descss">
                Des standards professionnels pour une expérience de jeu optimale
              </p>
            </div>
            <div className="mission-cardss">
              <div className="mission-iconss">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="mission-cardss-titless">Communauté</h3>
              <p className="mission-cardss-descss">
                Un lieu de rencontre et d'échange pour tous les passionnés de football
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="about-sectionss section-grayss">
        <div className="about-containerss">
          <div className="section-headerss">
            <h2 className="section-titless">Nos <span className="gradient-textss">Valeurs</span></h2>
            <p className="section-subtitle">Les principes qui guident notre action quotidienne</p>
          </div>

          <div className="values-gridss">
            {values.map((value, index) => (
              <div key={index} className="value-cardss">
                <div className="value-iconss">
                  <i className={value.icon}></i>
                </div>
                <h3 className="value-titless">{value.title}</h3>
                <p className="value-descss">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-sectionss section-lightss">
        <div className="about-containerss">
          <div className="section-headerss">
            <h2 className="section-titless">FootField en <span className="gradient-text">Chiffres</span></h2>
          </div>

          <div className="stats-gridss">
            {stats.map((stat, index) => (
              <div key={index} className="stat-itemss">
                <div className="stat-numberss">{stat.number}</div>
                <div className="stat-labelss">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-sectionss section-grayss">
        <div className="about-containerss">
          <div className="section-headerss">
            <h2 className="section-titless">Notre <span className="gradient-textss">Histoire</span></h2>
            <p className="section-subtitless">Un parcours d'innovation et de croissance continue</p>
          </div>

          <div className="timeline-containerss">
            <div className="timeliness">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-itemss">
                  <div className="timeline-yearss">
                    {item.year}
                  </div>
                  <div className="timeline-contentss">
                    <h3 className="timeline-titless">{item.title}</h3>
                    <p className="timeline-descss">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-sectionss section-lightss">
        <div className="about-containerss">
          <div className="section-headerss">
            <h2 className="section-titless">Notre <span className="gradient-textss">Équipe</span></h2>
            <p className="section-subtitless">Des professionnels passionnés au service de votre expérience</p>
          </div>

          <div className="team-gridss">
            {team.map((member, index) => (
              <div key={index} className="team-cardss">
                <div className="team-imgss">
                  <i className="fas fa-user"></i>
                </div>
                <div className="team-infoss">
                  <h3 className="team-namess">{member.name}</h3>
                  <p className="team-roless">{member.role}</p>
                  <p className="team-descss">{member.description}</p>
                  <div className="team-expss">
                    {member.experience}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="about-sectionss section-grayss">
        <div className="about-containerss">
          <div className="section-headerss">
            <h2 className="section-titless">Certifications & <span className="gradient-textss">Partenaires</span></h2>
          </div>
          <div className="certs-gridss">
            <div className="cert-cardss">
              <div className="cert-iconss">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="cert-titless">Label Qualité</h3>
              <p className="cert-descss">Centre d'Excellence Sportive certifié par la Fédération</p>
            </div>
            <div className="cert-cardss">
              <div className="cert-iconss">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="cert-titless">Partenaires Clubs</h3>
              <p className="cert-descss">Convention avec 15+ clubs locaux et académies de formation</p>
            </div>
            <div className="cert-cardss">
              <div className="cert-iconss">
                <i className="fas fa-clock"></i>
              </div>
              <h3 className="cert-titless">Norme ISO</h3>
              <p className="cert-descss">Certification ISO 9001 pour la qualité de service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-sectionss">
        <div className="about-containerss">
          <div className="cta-contentss">
            <h2 className="cta-titless">Rejoignez la Communauté FootField</h2>
            <p className="cta-subtitless">Découvrez pourquoi plus de 10,000 joueurs nous font confiance</p>
            <div className="cta-buttonss">
              <a href="/reservations" className="cta-btn cta-btn-primary">Réserver Maintenant</a>
              <a href="/contact" className="cta-btn cta-btn-secondary">Nous Contacter</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default About;