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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('🔍 Données envoyées:', { date, terrainType, surface });

    // Validation des champs
    if (!date || !terrainType || !surface) {
      toast.error('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    try {
      // ✅ Maintenant l'API accepte le paramètre surface
      const response = await axios.get('https://backend-foot-omega.vercel.app/api/creneaux/creneaux', {
        params: { 
          date, 
          terrainType,
          surface // ← Paramètre surface ajouté
        },
      });

      console.log('✅ Réponse du serveur:', response.data);

      // Vérifier si la réponse contient des données
      if (response.data && response.data.success) {
        if (response.data.data && response.data.data.length > 0) {
          toast.success('Chargement des Creneaux!');
          
          setTimeout(() => {
            navigate('/creneaux', { 
              state: { 
                creneaux: response.data.data,
                filters: { date, terrainType, surface }
              } 
            });
            setLoading(false);
          }, 1500);
        } else {
          toast.error('Aucun créneau disponible pour ces critères.');
          setLoading(false);
        }
      } else {
        // Gérer les réponses d'erreur de l'API
        toast.error(response.data.message || 'Aucun créneau disponible');
        setLoading(false);
      }
      
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des créneaux:', err);
      setLoading(false);
      
      if (err.response) {
        // Erreur avec réponse du serveur
        if (err.response.status === 404) {
          toast.error('Aucun créneau trouvé pour ces critères');
        } else {
          toast.error(`Erreur serveur: ${err.response.data.message || 'Erreur inconnue'}`);
        }
      } else if (err.request) {
        toast.error('Aucune réponse du serveur. Vérifiez votre connexion.');
      } else {
        toast.error(`Erreur inconnue: ${err.message}`);
      }
    }
  };

  // Fonction pour obtenir la date minimale (aujourd'hui)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="reservation-premium">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
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
                  min={getMinDate()}
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
                  <option value="Normal">Normal</option>
                  <option value="Synthétique">Synthétique</option>
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
              
              <button 
                type="submit" 
                className="reservation-premium__button"
                disabled={loading}
              >
                {loading ? 'Recherche en cours...' : 'Voir les créneaux'}
              </button>
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
      
    </div>
  );
};

export default Reservation;