import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, X, Clock } from 'lucide-react';
import ReservationModal from './ReservationModal';
import '../css/creneaux.css';

// ✅ Fonction utilitaire corrigée - Garde la ville et le quartier
const normalizeCreneauData = (creneau) => {
  // Si le créneau a déjà les bonnes propriétés, on les garde
  if (creneau.ville && creneau.quartier) {
    return {
      ...creneau,
      nomterrain: creneau.nomterrain || creneau.nomterrain || 'Non spécifié',
      heure: creneau.heure,
      heurefin: creneau.heurefin,
      typeTerrain: creneau.typeTerrain || creneau.typeterrain || 'Non spécifié',
      surface: creneau.surface || creneau.SurfaceTerrains || 'Non spécifié',
      tarif: creneau.tarif || 0,
      statut: creneau.statut || 'Non spécifié',
      datecreneaux: creneau.datecreneaux || '',
      numeroterrain: creneau.numeroterrain || 0,
      idcreneaux: creneau.idcreneaux || null,
      ville: creneau.ville || 'Non spécifié',
      quartier: creneau.quartier || 'Non spécifié'
    };
  }

  // Sinon, on normalise les noms de propriétés
  const lowerCaseCreneau = {};
  for (const key in creneau) {
    lowerCaseCreneau[key.toLowerCase()] = creneau[key];
  }

  return {
    nomterrain: lowerCaseCreneau.nomterrain || 'Non spécifié',
    heure: lowerCaseCreneau.heure,
    heurefin: lowerCaseCreneau.heurefin,
    typeTerrain: lowerCaseCreneau.typeterrain || lowerCaseCreneau.type || 'Non spécifié',
    surface: lowerCaseCreneau.surfaceterrains || lowerCaseCreneau.surface || 'Non spécifié',
    tarif: lowerCaseCreneau.tarif || 0,
    statut: lowerCaseCreneau.statut || 'Non spécifié',
    datecreneaux: lowerCaseCreneau.datecreneaux || '',
    numeroterrain: lowerCaseCreneau.numeroterrain || 0,
    idcreneaux: lowerCaseCreneau.idcreneaux || null,
    ville: lowerCaseCreneau.ville || 'Non spécifié',
    quartier: lowerCaseCreneau.quartier || 'Non spécifié'
  };
};

const Creneaux = () => {
  const location = useLocation();
  const { creneaux } = location.state || { creneaux: [] };
  
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHour, setSelectedHour] = useState(''); // ✅ État pour le filtre d'heure

  const normalizedCreneaux = creneaux.map(normalizeCreneauData);
  
  console.log('✅ Créneaux normalisés:', normalizedCreneaux);

  // ✅ Fonction pour extraire l'heure au format HH:MM
  const extractHour = (timeString) => {
    if (!timeString) return '';
    if (timeString.length === 5) return timeString;
    if (timeString.length >= 8) return timeString.substring(0, 5);
    return timeString;
  };

  // ✅ Filtrer les créneaux par nom de terrain ET par heure
  const filteredCreneaux = normalizedCreneaux.filter(creneau => {
    const matchName = creneau.nomterrain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchHour = selectedHour === '' || extractHour(creneau.heure) === selectedHour;
    return matchName && matchHour;
  });

  // ✅ Obtenir toutes les heures uniques pour le filtre
  const uniqueHours = [...new Set(normalizedCreneaux.map(c => extractHour(c.heure)))].sort();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    if (timeString.length === 5) return timeString;
    if (timeString.length >= 8) return timeString.substring(0, 5);
    return timeString;
  };

  const updateCreneauStatus = async (creneauId, newStatus) => {
    try {
      const creneauResponse = await fetch(`http://localhost:5000/api/gestioncreneaux/${creneauId}`);
      const creneauData = await creneauResponse.json();
      
      if (creneauData.success) {
        const creneau = creneauData.data;
        
        const updateResponse = await fetch(`http://localhost:5000/api/gestioncreneaux/${creneauId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...creneau,
            statut: newStatus
          })
        });
        
        const updateData = await updateResponse.json();
        return updateData.success;
      }
      return false;
    } catch (error) {
      console.error('Erreur mise à jour créneau:', error);
      return false;
    }
  };

  const handleOpenReservationModal = (creneau) => {
    setSelectedCreneau(creneau);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCreneau(null);
  };

  const handleReservationSuccess = async (reservationData) => {
    console.log('Réservation créée avec succès:', reservationData);
    
    if (selectedCreneau && selectedCreneau.idcreneaux) {
      const updated = await updateCreneauStatus(selectedCreneau.idcreneaux, 'réservé');
      if (updated) {
        showToast('Créneau réservé avec succès !', 'success');
      } else {
        showToast('Erreur lors de la mise à jour du statut', 'error');
      }
    }
    
    handleCloseModal();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearHourFilter = () => {
    setSelectedHour('');
  };

  return (
    <div className="res-layout">
      <div className="res-layout-main creneaux-page">
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
      
      <div className="creneaux-container">
        <h1 className="creneaux-title">Les Créneaux Disponibles</h1>
        
        {/* ✅ Barre de recherche et filtres */}
        <div className="filters-container">
          {/* Recherche par nom de terrain */}
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un terrain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={handleClearSearch}>
                <X size={18} />
              </button>
            )}
          </div>

          {/* ✅ Filtre par heure */}
          <div className="filter-hour-wrapper">
            <Clock className="filter-icon" size={20} />
            <select
              className="filter-hour-select"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
            >
              <option value="">Toutes les heures</option>
              {uniqueHours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            {selectedHour && (
              <button className="clear-filter-btn" onClick={handleClearHourFilter}>
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Statistiques des filtres */}
        <div className="search-stats">
          {filteredCreneaux.length} créneau{filteredCreneaux.length > 1 ? 'x' : ''} trouvé{filteredCreneaux.length > 1 ? 's' : ''}
          {searchTerm && (
            <span className="filter-tag">
              Terrain: "{searchTerm}"
              <button className="remove-filter-tag" onClick={handleClearSearch}>×</button>
            </span>
          )}
          {selectedHour && (
            <span className="filter-tag">
              Heure: {selectedHour}
              <button className="remove-filter-tag" onClick={handleClearHourFilter}>×</button>
            </span>
          )}
        </div>

        <div className="creneaux-grid">
          {filteredCreneaux.length > 0 ? (
            filteredCreneaux.map((creneau, index) => (
              <div key={index} className="creneau-card">
                <div className="creneau-info">
                  <div className="info-row">
                    <span className="info-label">Nom du terrain :</span>
                    <span className="info-value">{creneau.nomterrain}</span>
                  </div>
                  <hr />

                  <div className="info-row">
                    <span className="info-label">Heure début :</span>
                    <span className="info-value">{formatTime(creneau.heure)}</span>
                  </div>
                  <hr />

                  <div className="info-row">
                    <span className="info-label">Heure fin :</span>
                    <span className="info-value">{formatTime(creneau.heurefin)}</span>
                  </div>
                  <hr />
                  
                  <div className="info-row">
                    <span className="info-label">Type :</span>
                    <span className="info-value">{creneau.typeTerrain}</span>
                  </div>
                  <hr />

                  <div className="info-row">
                    <span className="info-label">Surface :</span>
                    <span className="info-value">{creneau.surfaceterrains}</span>
                  </div>
                  <hr />

                  <div className="info-row">
                    <span className="info-label">Ville :</span>
                    <span className="info-value" style={{ color: '#2e7d32', fontWeight: '600' }}>
                      {creneau.ville || 'Non spécifiée'}
                    </span>
                  </div>
                  <hr />

                  <div className="info-row">
                    <span className="info-label">Quartier :</span>
                    <span className="info-value" style={{ color: '#2e7d32', fontWeight: '600' }}>
                      {creneau.quartier || 'Non spécifié'}
                    </span>
                  </div>
                  <hr />

                  <div className="info-row">
                    <span className="info-label">Tarif :</span>
                    <span className="info-value tarif">{creneau.tarif} DH</span>
                  </div>
                  <hr />

                  <div className="info-row">
                    <span className="info-label">Statut :</span>
                    <span className={`status-tag ${creneau.statut === 'disponible' ? 'available' : 'unavailable'}`}>
                      {creneau.statut}
                    </span>
                  </div>
                  <hr />
                </div>
                
                {creneau.statut === 'disponible' ? (
                  <button
                    className="reserve-button"
                    onClick={() => handleOpenReservationModal(creneau)}
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
              <p>
                {searchTerm || selectedHour 
                  ? `Aucun créneau trouvé pour ces critères` 
                  : 'Aucun créneau disponible.'
                }
              </p>
              {(searchTerm || selectedHour) && (
                <button className="clear-search-btn-large" onClick={() => {
                  handleClearSearch();
                  handleClearHourFilter();
                }}>
                  Voir tous les créneaux
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        creneau={selectedCreneau}
        onReservationSuccess={handleReservationSuccess}
      />
      </div>
    </div>
  );
};

export default Creneaux;
