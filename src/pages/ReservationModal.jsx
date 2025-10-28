import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationModal.css';

const ReservationModal = ({ isOpen, onClose, creneau, onReservationSuccess }) => {
  const [clientInfo, setClientInfo] = useState({
    nomclient: '',
    prenom: '',
    email: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    if (timeString.length === 5) return timeString;
    if (timeString.length >= 8) return timeString.substring(0, 5);
    return timeString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation des champs obligatoires
      if (!clientInfo.nomclient || !clientInfo.prenom || !clientInfo.email || !clientInfo.telephone) {
        showToast('Veuillez remplir tous les champs obligatoires', 'error');
        setIsSubmitting(false);
        return;
      }

      // Validation de l'email
      if (!clientInfo.email.includes('@')) {
        showToast('Veuillez saisir un email valide', 'error');
        setIsSubmitting(false);
        return;
      }

      // Validation du type de terrain
      const typeterrain = creneau.typeTerrain || creneau.typeterrain;
      if (!typeterrain || !['Normal', 'Synthétique'].includes(typeterrain)) {
        showToast('Type de terrain invalide', 'error');
        setIsSubmitting(false);
        return;
      }

      // Validation de la surface
      const surface = creneau.surface;
      if (!surface || !['7X7', '9X9', '11X11'].includes(surface)) {
        showToast('Surface invalide', 'error');
        setIsSubmitting(false);
        return;
      }

      // Préparation des données pour l'API
      const reservationData = {
        datereservation: creneau.datecreneaux,
        heurereservation: creneau.heure,
        heurefin: creneau.heurefin,
        statut: 'en attente',
        nomclient: clientInfo.nomclient,
        prenom: clientInfo.prenom,
        email: clientInfo.email,
        telephone: clientInfo.telephone,
        typeterrain: typeterrain,
        tarif: creneau.tarif || 150,
        surface: surface,
        nomterrain: creneau.nomterrain || 'Terrain Principal'
      };

      console.log('📤 Envoi des données de réservation:', reservationData);

      const response = await fetch('https://backend-foot-omega.vercel.app/api/reservation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      const result = await response.json();

      if (result.success) {
        showToast('Réservation effectuée avec succès! Redirection vers vos réservations...');
        
        // Stocker les infos client pour les futures requêtes
        localStorage.setItem('clientEmail', clientInfo.email);
        localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
        
        // Mettre à jour le statut du créneau
        await updateCreneauStatus(creneau, 'réservé');
        
        // Redirection après un court délai pour voir le toast
        setTimeout(() => {
          navigate('/Consultation-reservation');
          
          if (onReservationSuccess) {
            onReservationSuccess(result.data);
          }
          onClose();
        }, 2000);
      } else {
        showToast(`Erreur lors de la réservation: ${result.message}`, 'error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showToast('Une erreur est survenue lors de la réservation', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateCreneauStatus = async (creneau, newStatus) => {
    try {
      const updateResponse = await fetch(`https://backend-foot-omega.vercel.app/api/gestioncreneaux/${creneau.idcreneaux}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...creneau,
          statut: newStatus
        })
      });
      
      const updateResult = await updateResponse.json();
      if (updateResult.success) {
        console.log('✅ Statut du créneau mis à jour');
      }
    } catch (error) {
      console.error('❌ Erreur mise à jour créneau:', error);
    }
  };

  if (!creneau || !isOpen) return null;

  // Déterminer le type de terrain et la surface pour l'affichage
  const typeterrain = creneau.typeTerrain || creneau.typeterrain || 'Normal';
  const surface = creneau.surface || '7X7';

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Réserver un créneau</h2>
            <button className="close-button" onClick={onClose}>
              <span>×</span>
            </button>
          </div>

          <div className="modal-content">
            <div className="creneau-info-section">
              <h3 className="section-title">
                <span>Informations du créneau</span>
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Terrain:</label>
                  <div className="readonly-field">{creneau.nomterrain}</div>
                </div>
                <div className="info-item">
                  <label>Date:</label>
                  <div className="readonly-field">{creneau.datecreneaux}</div>
                </div>
                <div className="info-item">
                  <label>Heure début:</label>
                  <div className="readonly-field">{formatTime(creneau.heure)}</div>
                </div>
                <div className="info-item">
                  <label>Heure fin:</label>
                  <div className="readonly-field">{formatTime(creneau.heurefin)}</div>
                </div>
                <div className="info-item">
                  <label>Type de terrain:</label>
                  <div className="readonly-field">{typeterrain}</div>
                </div>
                <div className="info-item">
                  <label>Surface:</label>
                  <div className="readonly-field">{surface}</div>
                </div>
                <div className="info-item">
                  <label>Tarif:</label>
                  <div className="readonly-field price">{creneau.tarif || 150} DH</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="client-form">
              <h3 className="section-title">
                <span>Informations personnelles</span>
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nomclient">Nom *</label>
                  <input
                    type="text"
                    id="nomclient"
                    name="nomclient"
                    value={clientInfo.nomclient}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="prenom">Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={clientInfo.prenom}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre prénom"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={clientInfo.email}
                    onChange={handleInputChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="telephone">Téléphone *</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={clientInfo.telephone}
                    onChange={handleInputChange}
                    required
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div className="reservation-summary">
                <h4>Récapitulatif de votre réservation</h4>
                <div className="summary-details">
                  <p><strong>Terrain:</strong> {creneau.nomterrain}</p>
                  <p><strong>Date:</strong> {creneau.datecreneaux}</p>
                  <p><strong>Horaire:</strong> {formatTime(creneau.heure)} - {formatTime(creneau.heurefin)}</p>
                  <p><strong>Type:</strong> {typeterrain}</p>
                  <p><strong>Surface:</strong> {surface}</p>
                  <p className="total-price"><strong>Total:</strong> {creneau.tarif || 150} DH</p>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="button-loading">
                      <span className="spinner"></span>
                      Traitement...
                    </span>
                  ) : (
                    'Confirmer la réservation'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <div className="toast-content">
              <span className="toast-message">{toast.message}</span>
              <button 
                className="toast-close" 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              >
                ×
              </button>
            </div>
            <div className="toast-progress"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReservationModal;