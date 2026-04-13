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

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    if (timeString.length === 5) return timeString;
    if (timeString.length >= 8) return timeString.substring(0, 5);
    return timeString;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9+\s]{10,}$/.test(phone.replace(/\s/g, ''));
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
      if (!validateEmail(clientInfo.email)) {
        showToast('Veuillez saisir un email valide', 'error');
        setIsSubmitting(false);
        return;
      }

      // Validation du téléphone
      if (!validatePhone(clientInfo.telephone)) {
        showToast('Veuillez saisir un numéro de téléphone valide', 'error');
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

      const response = await fetch('https://backend-foot-omega.vercel.app/api/reservation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      const result = await response.json();

      if (result.success) {
        showToast('Réservation effectuée avec succès! Redirection...');
        
        localStorage.setItem('clientEmail', clientInfo.email);
        localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
        
        await updateCreneauStatus(creneau, 'réservé');
        
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

  const typeterrain = creneau.typeTerrain || creneau.typeterrain || 'Normal';
  const surface = creneau.surface || '7X7';

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          
          <div className="modal-header">
            <h2>
              <span className="header-icon">⚽</span>
              Réserver un créneau
            </h2>
            <div className="header-decoration">
              <span className="decoration-line"></span>
            </div>
          </div>

          <div className="modal-content">
            {/* Section récapitulative du créneau */}
            <div className="resume-section">
              <h3 className="section-title">
                <span className="section-icon"></span>
                Récapitulatif du créneau
              </h3>
              
              <div className="resume-card">
                <div className="resume-item">
                  <span className="item-label">Terrain</span>
                  <span className="item-value highlight">{creneau.nomterrain}</span>
                </div>
                
                <div className="resume-item">
                  <span className="item-label">Date</span>
                  <span className="item-value">{formatDate(creneau.datecreneaux)}</span>
                </div>
                
                <div className="resume-item">
                  <span className="item-label">Horaire</span>
                  <span className="item-value time-range">
                    <span className="time-badge">{formatTime(creneau.heure)}</span>
                    <span className="time-separator">→</span>
                    <span className="time-badge">{formatTime(creneau.heurefin)}</span>
                  </span>
                </div>
                
                <div className="resume-item">
                  <span className="item-label">Type</span>
                  <span className="item-value type-badge">{typeterrain}</span>
                </div>
                
                <div className="resume-item">
                  <span className="item-label">Surface</span>
                  <span className="item-value">{surface}</span>
                </div>
                
                <div className="resume-item price-item">
                  <span className="item-label">Tarif</span>
                  <span className="item-value price">
                    {creneau.tarif || 150} DH
                    <small>TTC</small>
                  </span>
                </div>
              </div>
            </div>

            {/* Formulaire d'informations personnelles */}
            <form onSubmit={handleSubmit} className="form-section">
              <h3 className="section-title">
                <span className="section-icon"></span>
                Vos informations
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nomclient">
                    Nom <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="nomclient"
                    name="nomclient"
                    value={clientInfo.nomclient}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="prenom">
                    Prénom <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={clientInfo.prenom}
                    onChange={handleInputChange}
                    placeholder="Votre prénom"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={clientInfo.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="telephone">
                    Téléphone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={clientInfo.telephone}
                    onChange={handleInputChange}
                    placeholder="06 12 34 56 78"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-footer">
                <div className="total-section">
                  <span className="total-label">Total à payer</span>
                  <span className="total-amount">{creneau.tarif || 150} DH</span>
                </div>
                
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Traitement...
                      </>
                    ) : (
                      <>
                        <span>Confirmer la réservation</span>
                        <span className="btn-icon">✓</span>
                      </>
                    )}
                  </button>
                </div>
                
                <p className="form-note">
                  <span className="note-icon"></span>
                  En confirmant, vous acceptez nos conditions générales de vente
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
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