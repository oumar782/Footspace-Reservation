import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Creneaux.css'; // Assurez-vous de créer ce fichier CSS pour le style
import Header from '../composant/Header';
import Footer from '../composant/Footer';

const Creneaux = () => {
  const location = useLocation();
  const { creneaux } = location.state || { creneaux: [] };

  const handleReservation = (creneau) => {
    // Logique pour gérer la réservation
    console.log('Réservation du créneau :', creneau);
    alert(`Réservation du créneau : ${creneau.heure} - ${creneau.typeTerrain}`);
  };

  return (
    <div className='head'>
      <Header/>
    <div className="creneaux-container">
      <h1> Les Créneaux disponibles</h1>
      {creneaux.length > 0 ? (
        creneaux.map((creneau, index) => (
          <div key={index} className="creneau-card">
            <div className="creneau-info">
              <p>
                <strong>Heure début :</strong> {creneau.heure}
              </p>
              <p>
                <strong>Heure fin :</strong> {creneau.heurefin}
              </p>
              <p>
                <strong>Terrain :</strong> {creneau.typeTerrain}
              </p>
              <p>
                <strong>Statut :</strong> {creneau.statut}
              </p>
            </div>
            {creneau.statut === 'Disponible' ? (
              <button
                className="reserve-button"
                onClick={() => handleReservation(creneau)}
              >
                Réserver
              </button>
            ) : (
              <button className="not-available-button" disabled>
                Non disponible
              </button>
            )}
          </div>
        ))
      ) : (
        <p>Aucun créneau disponible.</p>
      )}
    </div>
    <Footer/>

    </div>
  );
};

export default Creneaux;