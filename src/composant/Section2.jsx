
import "../css/Section2.css";

const Section2 = () => {
  return (
    <section className="section-container">
      <div className="section-header">
        <h2>Créez des expériences <span className="highlight">inoubliables</span></h2>
        <p>Explorez un monde de possibilités infinies où chaque détail est pensé pour vous offrir une expérience unique et mémorable.</p>
      </div>
      <div className="cardsss-container">
        <div className="cardsss">
          <div className="card-icon">❤️</div>
          <h3 className="cardsss-title">Design Captivant</h3>
          <p className="cardsss-description">Une expérience visuelle unique qui captive et inspire.</p>
        </div>
        <div className="cardsss">
          <div className="cardsss-icon">⭐</div>
          <h3 className="cardsss-title">Qualité Premium</h3>
          <p className="cardsss-description">Une attention aux détails qui fait toute la différence.</p>
        </div>
      </div>
      <button className="cta-button">Reserver maintenant</button>
    </section>
  );
};

export default Section2;