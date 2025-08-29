import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../composant/Header";
import Footer from "../composant/Footer";

const Reservation = () => {
  const [date, setDate] = useState('');
  const [terrainType, setTerrainType] = useState('');
  const [surface, setSurface] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('🔍 Données envoyées:', { date, terrainType, surface });

    try {
      const response = await axios.get('http://localhost:8000/api/creneaux/creneaux', {
        params: { date, terrainType, surface },
      });

      console.log('✅ Réponse du serveur:', response.data);

      if (response.data.length > 0) {
        toast.success('Créneaux disponibles trouvés!');
  
        // Introduire un délai avant de rediriger
        setTimeout(() => {
          navigate('/creneaux', { state: { creneaux: response.data } });
        }, 1500); // Délai de 1.5 seconde pour afficher la notification
      } else {
        toast.error('Aucun créneau disponible pour cette date et ce terrain.');
      }
    
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des créneaux:', err);
      if (err.response) {
        toast.error(`Erreur serveur: ${err.response.data.message || 'Erreur inconnue'}`);
      } else if (err.request) {
        toast.error('Aucune réponse du serveur. Vérifiez votre connexion.');
      } else {
        toast.error(`Erreur inconnue: ${err.message}`);
      }
    }
  };

  return (
    <div className="reservation-premium">
      <Header />
      <ToastContainer />
      <div className="reservation-premium__hero">
        <div className="reservation-premium__overlay">
          <h1 className="reservation-premium__title">Réservez votre espace de football en quelques clics</h1>
          <div className="reservation-premium__container">
            <h2 className="reservation-premium__subtitle">Faites-vous plaisir ! Réservez Votre Terrain.</h2>
            <form onSubmit={handleSubmit} className="reservation-premium__form">
              <div className="reservation-premium__form-group">
                <label className="reservation-premium__label">
                  Date
                </label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="reservation-premium__input"
                  required 
                />
              </div>
              
              <div className="reservation-premium__form-group">
                <label className="reservation-premium__label">
                  Type de terrain
                </label>
                <select 
                  value={terrainType} 
                  onChange={(e) => setTerrainType(e.target.value)} 
                  className="reservation-premium__select"
                  required
                >
                  <option value="">Sélectionnez le type</option>
                  <option value="normal">Normal</option>
                  <option value="synthetique">Synthétique</option>
                </select>
              </div>
              
              <div className="reservation-premium__form-group">
                <label className="reservation-premium__label">
                  Surface du terrain
                </label>
                <select 
                  value={surface} 
                  onChange={(e) => setSurface(e.target.value)} 
                  className="reservation-premium__select"
                  required
                >
                  <option value="">Sélectionnez la surface</option>
                  <option value="7X7">7X7</option>
                  <option value="9X9">9X9</option>
                  <option value="11X11">11X11</option>
                </select>
              </div>
              
              <button type="submit" className="reservation-premium__button">Voir les créneaux</button>
            </form>
            <div className="reservation-premium__info">
              <p>
                <span className="reservation-premium__highlight">Note:</span>
                Pour toute question, merci de consulter le chatbot pour plus de détails.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Reservation;