
import "./terrain.css";
import Header from "../composant/Header.jsx";
import Footer from "../composant/Footer.jsx";

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
    icon: "📅"
  },
  {
    titre: "Vestiaires Premium",
    description: "Accès à des vestiaires modernes avec douches et casiers sécurisés.",
    icon: "🛁"
  },
  {
    titre: "Équipement Pro",
    description: "Matériel professionnel disponible sur demande.",
    icon: "🏆"
  }
];

function App() {
  return (
    <div>
     <Header/>
     <div className="banner">
  <div className="banners">
    <h2 className="text-animations">
      Terrains de Football Professionnels pour vos <span></span>
    </h2>
  </div>
  <p className="description">
    Des installations haut de gamme pour vos matchs et entraînements
  </p>
</div>


   

      <main>
      <h2 className="textp">
      Nos Terrains de Football de <span> qualite </span>
    </h2>
        <div className="terrain-list">
          {Terrains.map((terrain) => (
            <div key={terrain.id} className="card">
              <div style={{ position: "relative" }}>
                <img src={terrain.image} alt={terrain.titre} />
                <span className="tarif">{terrain.tarif}</span>
              </div>
              <div className="details">
                <h2>{terrain.titre}</h2>
                <div className="info">
                  <span>{terrain.surface}</span>
                  <span>{terrain.localisation}</span>
                  <span>11 vs 11</span>
                </div>
                <div className="features">
                  {terrain.caracteristiques.map((carac, idx) => (
                    <p key={idx}>• {carac}</p>
                  ))}
                </div>
                <div>
                  <button className="reserve">Réserver maintenant</button>
                  <button className="info-btn">Plus d'informations</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section des Services Premium */}
        <section className="services">
          <h2>Nos Services <span>Premium</span></h2>
          <div className="terrain-list">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="icon">{service.icon}</div>
                <h3>{service.titre}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

     <Footer/>
    </div>
  );
}

export default App;
