
import './Section.css';
import myImage from '../assets/Image/3 (2).png';
import myImages from '../assets/Image/1.png';
import myImagess from '../assets/Image/2.png';

const Section = () => {
  return (
    <section className="container py-5" id="skills">
      <div className="text-center mb-5">
        <h2>Réservez en Toute <span className="highlight">Simplicité</span> </h2>
        <h5>
          Accédez à une plateforme intuitive pour réserver votre terrain en quelques clics.
          Choisissez l'heure, la date et le terrain qui correspondent à vos besoins.
        </h5>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="cards text-center p-3">
            <img src={myImage} alt="Qualité des Installations" className="cards img " />
            <h3>Qualité des Installations</h3>
            <p className='p'>
              Des terrains parfaitement entretenus pour une expérience de jeu optimale.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="cards text-center p-3">
            <img src={myImages} alt="Accessibilité" className="cards img" />
            <h3>Accessibilité</h3>
            <p className='p'>
              Facilité de réservation en ligne, avec des options adaptées à tous les besoins.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="cards text-center p-3">
            <img src={myImagess} alt="Services Complémentaires" className="cards img" />
            <h3>Services Complémentaires</h3>
            <p className='p'>
              Des équipements et services supplémentaires pour enrichir votre expérience sportive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
