import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Reservation.css';

const Reservation = () => {
  const [date, setDate] = useState('');
  const [sport, setSport] = useState('');
  const [surface, setSurface] = useState('');
  const [ville, setVille] = useState('');
  const [quartier, setQuartier] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Configuration des sports avec leurs surfaces correspondantes
  const sportConfigs = {
    'football': {
      label: 'Football',
      surfaces: [
        { value: '7X7', label: '7X7 - 7 joueurs' },
        { value: '9X9', label: '9X9 - 9 joueurs' },
        { value: '11X11', label: '11X11 - 11 joueurs' }
      ]
    },
    'tennis': {
      label: 'Tennis',
      surfaces: [
        { value: 'simple', label: 'Simple - 2 joueurs' },
        { value: 'double', label: 'Double - 4 joueurs' }
      ]
    },
    'basketball': {
      label: 'Basketball',
      surfaces: [
        { value: '3X3', label: '3X3 - 3 joueurs' },
        { value: '5X5', label: '5X5 - 5 joueurs' }
      ]
    },
    'volleyball': {
      label: 'Volleyball',
      surfaces: [
        { value: '4X4', label: '4X4 - 4 joueurs' },
        { value: '6X6', label: '6X6 - 6 joueurs' }
      ]
    },
    'handball': {
      label: 'Handball',
      surfaces: [
        { value: '7X7', label: '7X7 - 7 joueurs' }
      ]
    },
    'rugby': {
      label: 'Rugby',
      surfaces: [
        { value: '7X7', label: '7X7 - 7 joueurs' },
        { value: '15X15', label: '15X15 - 15 joueurs' }
      ]
    },
    'padel': {
      label: 'Padel',
      surfaces: [
        { value: 'double', label: 'Double - 4 joueurs' }
      ]
    },
    'badminton': {
      label: 'Badminton',
      surfaces: [
        { value: 'simple', label: 'Simple - 2 joueurs' },
        { value: 'double', label: 'Double - 4 joueurs' }
      ]
    },
    'pingpong': {
      label: 'Ping-Pong',
      surfaces: [
        { value: 'simple', label: 'Simple - 2 joueurs' },
        { value: 'double', label: 'Double - 4 joueurs' }
      ]
    },
    'futsal': {
      label: 'Futsal',
      surfaces: [
        { value: '5X5', label: '5X5 - 5 joueurs' }
      ]
    },
    'beachvolley': {
      label: 'Beach Volley',
      surfaces: [
        { value: '4X4', label: '4X4 - 4 joueurs' }
      ]
    }
  };

  // Villes marocaines
  const villesMaroc = [
    'Casablanca',
    'Rabat',
    'Tanger',
    'Marrakech',
    'Fès',
    'Agadir',
    'Meknès',
    'Oujda',
    'Kenitra',
    'Tétouan',
    'Safi',
    'Mohammedia'
  ];

  // Quartiers par ville
  const quartiersParVille = {
    'Casablanca': ['Maarif', 'Sidi Moumen', 'Ain Sebaa', 'Anfa', 'Hay Hassani', 'Derb Sultan', 'Mers Sultan', 'Roches Noires'],
    'Rabat': ['Agdal', 'Hay Riad', 'Souissi', 'Yacoub El Mansour', 'Temara', 'Hassan', 'Oudayas'],
    'Tanger': ['Mellah', 'Ain El Kasbah', 'Boukhalef', 'Marshan', 'Charf', 'Gzenaya'],
    'Marrakech': ['Guéliz', 'Hivernage', 'Médina', 'Sidi Youssef', 'Daoudiate', 'Massira'],
    'Fès': ['Ville Nouvelle', 'Médina', 'Sais', 'Ziat', 'Ain Kadous'],
    'Agadir': ['Ville Nouvelle', 'Taddart', 'Founty', 'Ouled Dahhou'],
    'Meknès': ['Ville Nouvelle', 'Médina', 'Sidi Bouzekri', 'El Bassatine'],
    'Oujda': ['Ville Nouvelle', 'Médina', 'El Farch', 'El Gharbi'],
    'Kenitra': ['Ville Nouvelle', 'Médina', 'Briech', 'El Moustakbal'],
    'Tétouan': ['Ville Nouvelle', 'Médina', 'Tamda', 'Wilaya'],
    'Safi': ['Ville Nouvelle', 'Médina', 'Chaâba', 'Hajri'],
    'Mohammedia': ['Ville Nouvelle', 'Médina', 'Coopérative', 'Roches Noires']
  };

  const handleVilleChange = (e) => {
    const selectedVille = e.target.value;
    setVille(selectedVille);
    setQuartier('');
  };

  const handleSportChange = (e) => {
    const selectedSport = e.target.value;
    setSport(selectedSport);
    setSurface(''); // Réinitialiser la surface quand le sport change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Données envoyées:', { date, sport, surface, ville, quartier });

    // Validation - seule la date est obligatoire
    if (!date) {
      toast.error('Veuillez sélectionner une date');
      setLoading(false);
      return;
    }

    try {
      const params = { date };

      // Ajouter les filtres uniquement s'ils sont sélectionnés
      if (sport) params.terrainType = sport;
      if (surface) params.surface = surface;
      if (ville) params.ville = ville;
      if (quartier) params.quartier = quartier;

      const response = await axios.get('http://localhost:5000/api/creneaux/creneaux', {
        params: params
      });

      console.log('Réponse du serveur:', response.data);

      if (response.data && response.data.success) {
        if (response.data.data && response.data.data.length > 0) {
          toast.success(response.data.data.length + ' créneau(x) trouvé(s) !');
          
          setTimeout(() => {
            navigate('/creneaux', { 
              state: { 
                creneaux: response.data.data,
                filters: { date, sport, surface, ville, quartier }
              } 
            });
            setLoading(false);
          }, 1500);
        } else {
          toast.error('Aucun créneau disponible pour ces critères.');
          setLoading(false);
        }
      } else {
        toast.error(response.data.message || 'Aucun créneau disponible');
        setLoading(false);
      }
      
    } catch (err) {
      console.error('Erreur lors de la récupération des créneaux:', err);
      setLoading(false);
      
      if (err.response) {
        if (err.response.status === 404) {
          toast.error('Aucun créneau trouvé pour ces critères');
        } else {
          toast.error('Erreur serveur: ' + (err.response.data.message || 'Erreur inconnue'));
        }
      } else if (err.request) {
        toast.error('Aucune réponse du serveur. Vérifiez votre connexion.');
      } else {
        toast.error('Erreur: ' + err.message);
      }
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getAvailableSurfaces = () => {
    if (!sport) return [];
    return sportConfigs[sport]?.surfaces || [];
  };

  const getAvailableQuartiers = () => {
    if (!ville) return [];
    return quartiersParVille[ville] || [];
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
      {/* Section des fonctionnalités - version horizontale */}
<div className="reservation-sidebar-section">
  <div className="reservation-quick-info">
    <h2 className="reservation-after-title">Après votre réservation</h2>
    <div className="reservation-features">
      <div className="reservation-feature-card">
        <h3>Créer une session</h3>
        <p>Trouvez des joueurs pour votre match</p>
      </div>
      <div className="reservation-feature-card">
        <h3>Chercher un coach</h3>
        <p>Des coachs certifiés adaptés à votre discipline</p>
      </div>
    </div>
  </div>
</div>
      <div className="reservation-premium__hero">
        <div className="reservation-premium__overlay">
          <h1 className="reservation-premium__title">Réservez votre espace sportif en quelques clics</h1>
          <div className="reservation-premium__container">
            <h2 className="reservation-premium__subtitle">Faites-vous plaisir ! Réservez Votre Terrain.</h2>
            
            <form onSubmit={handleSubmit} className="reservation-premium__form">
              <div className="reservation-premium__form-group">
                <label className="reservation-premium__label">
                  Date <span className="required">*</span>
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
                  Sport / Discipline
                </label>
                <select 
                  value={sport} 
                  onChange={handleSportChange} 
                  className="reservation-premium__select"
                >
                  <option value="">Tous les sports</option>
                  {Object.entries(sportConfigs).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="reservation-premium__form-group">
                <label className="reservation-premium__label">
                  Surface / Format
                </label>
                <select 
                  value={surface} 
                  onChange={(e) => setSurface(e.target.value)} 
                  className="reservation-premium__select"
                  disabled={!sport}
                >
                  <option value="">
                    {sport ? 'Tous les formats' : 'Choisissez d\'abord un sport'}
                  </option>
                  {getAvailableSurfaces().map((surf) => (
                    <option key={surf.value} value={surf.value}>
                      {surf.label}
                    </option>
                  ))}
                </select>
                {sport && (
                  <small className="reservation-premium__hint">
                    Choisissez le format de jeu correspondant à votre équipe
                  </small>
                )}
              </div>

              <div className="reservation-premium__form-group">
                <label className="reservation-premium__label">
                  Ville
                </label>
                <select 
                  value={ville} 
                  onChange={handleVilleChange} 
                  className="reservation-premium__select"
                >
                  <option value="">Toutes les villes</option>
                  {villesMaroc.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div className="reservation-premium__form-group">
                <label className="reservation-premium__label">
                  Quartier
                </label>
                <select 
                  value={quartier} 
                  onChange={(e) => setQuartier(e.target.value)} 
                  className="reservation-premium__select"
                  disabled={!ville}
                >
                  <option value="">
                    {ville ? 'Tous les quartiers' : 'Sélectionnez d\'abord une ville'}
                  </option>
                  {getAvailableQuartiers().map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
              
              <button 
                type="submit" 
                className="reservation-premium__button"
                disabled={loading}
              >
                {loading ? 'Recherche en cours...' : 'Voir les créneaux disponibles'}
              </button>
            </form>
            
            <div className="reservation-premium__info">
              <p>
                <span className="reservation-premium__highlight">Note:</span>
                Pour toute question, merci de consulter le chatbot pour plus de détails.
              </p>
              <p className="reservation-premium__info-small">
                Les créneaux sont disponibles de 08:00 à 22:00
              </p>
            </div>
          </div>
        </div>
      </div>

    
      
    </div>
  );
};

export default Reservation;