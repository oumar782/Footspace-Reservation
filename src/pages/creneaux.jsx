import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../composant/Header';
import Footer from '../composant/Footer';
import ReservationModal from './ReservationModal';
import '../css/creneaux.css';

// Fonction utilitaire pour normaliser les noms de propriétés
const normalizeCreneauData = (creneau) => {
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
    idcreneaux: lowerCaseCreneau.idcreneaux || null
  };
};

const Creneaux = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { creneaux } = location.state || { creneaux: [] };
  
  // États pour le modal
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Normaliser les données de tous les créneaux
  const normalizedCreneaux = creneaux.map(normalizeCreneauData);
  
  console.log('Créneaux normalisés:', normalizedCreneaux);

  // Afficher un toast
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  // Fonction pour formater l'heure (hh:mm:ss → hh:mm)
  const formatTime = (timeString) => {
    if (!timeString) return '';
    if (timeString.length === 5) return timeString;
    if (timeString.length >= 8) return timeString.substring(0, 5);
    return timeString;
  };

  // Fonction pour mettre à jour le statut du créneau
  const updateCreneauStatus = async (creneauId, newStatus) => {
    try {
      // D'abord, récupérer le créneau actuel
      const creneauResponse = await fetch(`https://backend-foot-omega.vercel.app/api/gestioncreneaux/${creneauId}`);
      const creneauData = await creneauResponse.json();
      
      if (creneauData.success) {
        const creneau = creneauData.data;
        
        // Mettre à jour le statut
        const updateResponse = await fetch(`https://backend-foot-omega.vercel.app/api/gestioncreneaux/${creneauId}`, {
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
      console.error('Erreur lors de la mise à jour du créneau:', error);
      return false;
    }
  };

  // Fonction pour ouvrir le modal de réservation
  const handleOpenReservationModal = (creneau) => {
    setSelectedCreneau(creneau);
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCreneau(null);
  };

  // Fonction appelée après une réservation réussie
  const handleReservationSuccess = async (reservationData) => {
    console.log('Réservation créée avec succès:', reservationData);
    
    // Mettre à jour le statut du créneau en "réservé"
    if (selectedCreneau && selectedCreneau.idcreneaux) {
      const updated = await updateCreneauStatus(selectedCreneau.idcreneaux, 'réservé');
      if (updated) {
        showToast('Créneau réservé avec succès !', 'success');
        
        // Mettre à jour l'affichage local
        const updatedCreneaux = normalizedCreneaux.map(creneau => 
          creneau.idcreneaux === selectedCreneau.idcreneaux 
            ? { ...creneau, statut: 'réservé' }
            : creneau
        );
        
        // Note: Dans une vraie application, vous voudriez peut-être recharger les données
        // ou utiliser un state global pour gérer cela
      } else {
        showToast('Erreur lors de la mise à jour du statut du créneau', 'error');
      }
    }
    
    handleCloseModal();
  };

  return (
    <div className="creneaux-page">
      <Header />
      
      {/* Toast notifications */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
      
      <div className="creneaux-container">
        <h1 className="creneaux-title">Les Créneaux Disponibles</h1>
        <div className="creneaux-grid">
          {normalizedCreneaux.length > 0 ? (
            normalizedCreneaux.map((creneau, index) => (
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
                    <span className="info-value">{creneau.surface}</span>
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
              <p>Aucun créneau disponible.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de réservation */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        creneau={selectedCreneau}
        onReservationSuccess={handleReservationSuccess}
      />

      <Footer />
    </div>
  );
};

export default Creneaux;