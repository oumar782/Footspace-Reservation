import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../composant/Header';
import Footer from '../composant/Footer';
import '../css/creneaux.css';
const Creneaux = () => {
  const location = useLocation();
  const { creneaux } = location.state || { creneaux: [] };

  const handleReservation = (creneau) => {
    console.log('Réservation du créneau :', creneau);
    alert(`Réservation du créneau : ${creneau.heure} - ${creneau.typeTerrain}`);
  };

  return (
    <div className="creneaux-page">
      <Header />
      <div className="creneaux-container">
        <h1 className="creneaux-title"> Les Crénaux Disponibles</h1>
        <div className="creneaux-grid">
          {creneaux.length > 0 ? (
            creneaux.map((creneau, index) => (
              <div key={index} className="creneau-card">
                <div className="creneau-info">
                  <div className="info-row">
                    <span className="info-label">Heure début :</span>
                    <span className="info-value">{creneau.heure}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Heure fin :</span>
                    <span className="info-value">{creneau.heurefin}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Terrain :</span>
                    <span className="info-value">{creneau.typeTerrain}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Statut :</span>
                    <span className={`status-tag ${creneau.statut === 'disponible' ? 'available' : 'unavailable'}`}>
                      {creneau.statut}
                    </span>
                  </div>
                </div>
                {creneau.statut === 'disponible' ? (
                  <button
                    className="reserve-button"
                    onClick={() => handleReservation(creneau)}
                  >
                    <span className="button-text">Réserver</span>
                    <span className="button-icon">→</span>
                  </button>
                ) : (
                  <button className="not-available-button" disabled>
                    Non disponible
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="no-creneaux">
              <p>Aucun créneau disponible.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />

  
    </div>
  );
};

export default Creneaux;