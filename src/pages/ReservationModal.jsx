import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationModal.css';

const ReservationModal = ({ isOpen, onClose, creneau, onReservationSuccess }) => {
  const [clientInfo, setClientInfo] = useState({
    nom: '',
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

// Dans ReservationModal.js
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      if (!clientInfo.nom || !clientInfo.prenom || !clientInfo.email || !clientInfo.telephone) {
        showToast('Veuillez remplir tous les champs obligatoires', 'error');
        setIsSubmitting(false);
        return;
      }
  
      // Générer un ID client unique basé sur l'email (plus sécurisé que Math.random())
      const clientId = generateClientId(clientInfo.email);
      
      const reservationData = {
        datereservation: creneau.datecreneaux,
        heurereservation: creneau.heure,
        statut: 'En attente',
        idclient: clientId, // Utiliser l'ID généré
        numeroterrain: creneau.numeroterrain || 1,
        nomclient: clientInfo.nom,
        prenom: clientInfo.prenom,
        email: clientInfo.email,
        telephone: clientInfo.telephone,
        typeTerrain: creneau.typeTerrain,
        tarif: creneau.tarif,
        surface: creneau.surface,
        heurefin: creneau.heurefin,
        nomterrain: creneau.nomterrain
      };
  
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
        
        // Stocker l'ID client pour les futures requêtes
        localStorage.setItem('clientId', clientId);
        localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
        
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
  
  // Fonction pour générer un ID client unique à partir de l'email
  const generateClientId = (email) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir en entier 32 bits
    }
    return Math.abs(hash);
  };

  if (!creneau || !isOpen) return null;

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
                  <label>Type:</label>
                  <div className="readonly-field">{creneau.typeTerrain}</div>
                </div>
                <div className="info-item">
                  <label>Surface:</label>
                  <div className="readonly-field">{creneau.surface}</div>
                </div>
                <div className="info-item">
                  <label>Tarif:</label>
                  <div className="readonly-field price">{creneau.tarif} DH</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="client-form">
              <h3 className="section-title">
                <span>Informations personnelles</span>
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={clientInfo.nom}
                    onChange={handleInputChange}
                    required
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
                  />
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