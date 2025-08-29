import "./terrain.css";
import Header from "../composant/Header.jsx";
import Footer from "../composant/Footer.jsx";
import { Link } from 'react-router-dom';
const Terrains = [
  {
    id: 1,
    titre: "Stade Municipal Elite",
    surface: "105 x 68 m",
    localisation: "Ain sebaa",
    tarif: "180 dh/h",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200",
    caracteristiques: [
      "Pelouse naturelle",
      "Éclairage LED",
      "Vestiaires premium",
      "Tribune 500 places"
    ]
  },
  {
    id: 2,
    titre: "Complex Sportif Modern",
    surface: "100 x 65 m",
    localisation: "Belvedere",
    tarif: "150 dh/h",
    image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&q=80&w=1200",
    caracteristiques: [
      "Gazon synthétique dernière génération",
      "Système d'arrosage automatique",
      "Parking sécurisé",
      "Équipements professionnels"
    ]
  }
];

const services = [
  {
    titre: "Réservation Flexible",
    description: "Réservez votre créneau en ligne 24/7 avec confirmation instantanée.",
    icon: ""
  },
  {
    titre: "Vestiaires Premium",
    description: "Accès à des vestiaires modernes avec douches et casiers sécurisés.",
    icon: ""
  },
  {
    titre: "Équipement Pro",
    description: "Matériel professionnel disponible sur demande.",
    icon: ""
  }
];

function App() {
  return (
    <div className="luxury-app">
      <Header />
      
      {/* Hero Section */}
      <section className="luxury-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Terrains de Football <span className="accent-text">Premium</span>
            </h1>
            <p className="hero-subtitle">
              Des installations d'exception pour des performances d'élite
            </p>
            <button className="cta-button">Découvrir nos installations</button>
          </div>
        </div>
      </section>

      {/* Terrains Section */}
      <section className="luxury-section">
        <div className="container">
          <div className="section-header">
            <h2>Nos Terrains <span className="accent-text">d'Exception</span></h2>
            <p>Des infrastructures professionnelles pour des expériences uniques</p>
          </div>
          
          <div className="terrains-grid">
            {Terrains.map((terrain) => (
              <div key={terrain.id} className="luxury-card">
                <div className="card-image">
                  <img src={terrain.image} alt={terrain.titre} />
                  <div className="card-overlay">
                    <span className="price-tag">{terrain.tarif}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{terrain.titre}</h3>
                  <div className="card-meta">
                    <span className="meta-item">{terrain.surface}</span>
                    <span className="meta-item">{terrain.localisation}</span>
                    <span className="meta-item">11 vs 11</span>
                  </div>
                  
                  <ul className="features-list">
                    {terrain.caracteristiques.map((carac, idx) => (
                      <li key={idx}>{carac}</li>
                    ))}
                  </ul>
                  
                  <div className="card-actions">
  <Link to="/reservation" className="primary-btn">
    Réserver maintenant
  </Link>
  <Link to="/contact" className="secondary-btn">
    Plus d'informations
  </Link>
</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="luxury-section services-section">
        <div className="container">
          <div className="section-header">
            <h2>Services <span className="accent-text">Exclusifs</span></h2>
            <p>Une expérience complète pour des performances optimales</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.titre}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;