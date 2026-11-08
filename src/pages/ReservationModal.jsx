import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationModal.css';
import { createSessionFromReservation } from '../utils/sessionStorage';

const ReservationModal = ({ isOpen, onClose, creneau, onReservationSuccess }) => {
  const navigate = useNavigate();
  const [clientInfo, setClientInfo] = useState({
    nomclient: '',
    prenom: '',
    email: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [lastReservation, setLastReservation] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();

        if (showPostModal) {
          showToast('Veuillez choisir une option ci-dessous pour continuer', 'info');
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, showPostModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non specifiee';
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
        console.log('Statut du creneau mis a jour');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur mise a jour creneau:', error);
      return false;
    }
  };

  // Fonction pour fermer complètement la modale après le choix utilisateur
  const handleCompleteClose = () => {
    setShowPostModal(false);
    setIsActionLoading(false);
    setActionMessage('');
    setTimeout(() => {
      onClose();
    }, 250);
  };

  // Fonction pour gérer la fermeture de PostReservationModal
  // Elle empêche la fermeture tant que l'utilisateur n'a pas fait un choix
  const handlePostModalClose = () => {
    console.log('Veuillez choisir une option pour continuer');
    showToast('Veuillez choisir une option ci-dessous pour continuer', 'info');
  };

  const handleOverlayClick = () => {
    if (showPostModal) {
      showToast('Veuillez choisir une option ci-dessous pour continuer', 'info');
      return;
    }
    onClose();
  };

  const createSessionForReservation = (reservationInfo) => {
    const sport = reservationInfo?.typeterrain || creneau?.typeTerrain || creneau?.typeterrain || 'football';

    try {
      if (typeof createSessionFromReservation === 'function') {
        createSessionFromReservation(reservationInfo, creneau);
      } else {
        const sessionData = {
          id: Date.now(),
          sport,
          date: reservationInfo?.datecreneaux || reservationInfo?.date || new Date().toISOString(),
          heure: reservationInfo?.heure || '00:00',
          terrain: reservationInfo?.numeroterrain || creneau?.numeroterrain || '1',
          participants: [],
          maxParticipants: 10,
          createdBy: 'user',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('currentSession', JSON.stringify(sessionData));
      }
      return sport;
    } catch (error) {
      console.error('Erreur création session:', error);
      return sport;
    }
  };

  const handleMatch = () => {
    if (isActionLoading) return;
    setIsActionLoading(true);
    setActionMessage('Création de la session...');

    const sport = createSessionForReservation(lastReservation || reservationData);
    setTimeout(() => {
      navigate('/sessions', { state: { highlightSession: Date.now(), sport } });
      handleCompleteClose();
    }, 800);
  };

  const handleCoach = () => {
    if (isActionLoading) return;
    setIsActionLoading(true);
    setActionMessage('Redirection vers les coachs...');

    const sport = createSessionForReservation(lastReservation || reservationData);
    setTimeout(() => {
      navigate('/coaches', { state: { recommendedSport: sport } });
      handleCompleteClose();
    }, 800);
  };

  const handleSkip = () => {
    if (isActionLoading) return;
    setIsActionLoading(true);
    setActionMessage('Redirection vers vos réservations...');

    setTimeout(() => {
      navigate('/consultation-reservation');
      handleCompleteClose();
    }, 600);
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

      if (!validateEmail(clientInfo.email)) {
        showToast('Veuillez saisir un email valide', 'error');
        setIsSubmitting(false);
        return;
      }

      if (!validatePhone(clientInfo.telephone)) {
        showToast('Veuillez saisir un numero de telephone valide', 'error');
        setIsSubmitting(false);
        return;
      }

      // Recuperation des donnees du creneau
      const typeterrain = creneau.typeTerrain || creneau.typeterrain || creneau.type || 'football';
      const surface = creneau.surface || creneau.SurfaceTerrains || '7X7';
      const tarif = creneau.tarif || 150;
      
      const ville = creneau.ville || 'Non specifie';
      const quartier = creneau.quartier || 'Non specifie';

      // Preparation des donnees pour l'API
      const reservationData = {
        datereservation: creneau.datecreneaux,
        heurereservation: creneau.heure,
        heurefin: creneau.heurefin,
        statut: 'en attente',
        nomclient: clientInfo.nomclient.trim(),
        prenom: clientInfo.prenom.trim(),
        email: clientInfo.email.trim(),
        telephone: clientInfo.telephone.trim(),
        typeterrain: typeterrain,
        tarif: parseFloat(tarif),
        surface: surface,
        nomterrain: creneau.nomterrain || 'Terrain Principal',
        ville: ville,
        quartier: quartier
      };

      console.log('Donnees envoyees a l\'API:', JSON.stringify(reservationData, null, 2));

      // Envoi de la requete POST a l'API
      const response = await fetch('https://backend-foot-omega.vercel.app/api/reservation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(reservationData),
      });

      const result = await response.json();
      console.log('Reponse de l\'API:', result);

      if (response.ok && result.success) {
        console.log('Reservation creee avec succes:', result.data);
        
        showToast('Reservation effectuee avec succes!', 'success');
        
        localStorage.setItem('clientEmail', clientInfo.email);
        localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
        localStorage.setItem('lastReservation', JSON.stringify(result.data));
        
        await updateCreneauStatus(creneau, 'reserve');
        
        // On prépare l'affichage du post-modal mais on ne ferme pas la modale principale
        setTimeout(() => {
          if (onReservationSuccess) {
            onReservationSuccess(result.data);
          }
          setLastReservation(result.data || reservationData);
          setShowPostModal(true);
          setIsSubmitting(false);
          setIsActionLoading(false);
          setActionMessage('');
        }, 1500);
      } else {
        const errorMessage = result.message || 'Erreur lors de la reservation';
        console.error('Erreur API:', result);
        showToast('Erreur: ' + errorMessage, 'error');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Erreur reseau ou serveur:', error);
      showToast('Une erreur est survenue lors de la reservation. Verifiez que le serveur est en cours d\'execution.', 'error');
      setIsSubmitting(false);
    }
  };

  // Si le modal est fermé ou sans créneau, on ne rend rien
  if (!isOpen || !creneau) return null;

  const typeterrain = creneau.typeTerrain || creneau.typeterrain || creneau.type || 'football';
  const ville = creneau.ville || 'Non specifie';
  const quartier = creneau.quartier || 'Non specifie';

  return (
    <>
      {/* Modal principal - reste ouvert */}
      <div className={`modal-overlay ${showPostModal ? 'post-modal-active' : ''}`} onClick={handleOverlayClick}>
        <div className={`modal-container ${showPostModal ? 'post-modal-visible' : ''}`} onClick={(e) => e.stopPropagation()}>
          {/* Le bouton de fermeture est masqué quand le post-modal est affiché */}
          {!showPostModal && (
            <button className="modal-close" onClick={onClose}>×</button>
          )}
          
          {!showPostModal ? (
            // Contenu du formulaire de réservation
            <>
              <div className="modal-header">
                <h2>Reserver un creneau</h2>
                <div className="header-decoration">
                  <span className="decoration-line"></span>
                </div>
              </div>

              <div className="modal-content">
                {/* Section recapitulative du creneau */}
                <div className="resume-section">
                  <h3 className="section-title">Recapitulatif du creneau</h3>
                  
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
                      <span className="item-value">{creneau.surfaceterrains}</span>
                    </div>
                    
                    <div className="resume-item">
                      <span className="item-label">Ville</span>
                      <span className="item-value">{ville}</span>
                    </div>
                    
                    <div className="resume-item">
                      <span className="item-label">Quartier</span>
                      <span className="item-value">{quartier}</span>
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
                  <h3 className="section-title">Vos informations</h3>
                  
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
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="prenom">
                        Prenom <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={clientInfo.prenom}
                        onChange={handleInputChange}
                        placeholder="Votre prenom"
                        disabled={isSubmitting}
                        required
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
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="telephone">
                        Telephone <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={clientInfo.telephone}
                        onChange={handleInputChange}
                        placeholder="06 12 34 56 78"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-footer">
                    <div className="total-section">
                      <span className="total-label">Total a payer</span>
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
                          'Confirmer la reservation'
                        )}
                      </button>
                    </div>
                    
                    <p className="form-note">
                      En confirmant, vous acceptez nos conditions generales de vente
                    </p>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="confirmation-wrapper">
              <div className="confirmation-message">
                <div className="confirmation-icon">✅</div>
                <h3>Réservation confirmée !</h3>
                <p className="confirmation-sub">
                  Choisissez une option ci-dessous pour continuer.
                </p>

                {isActionLoading ? (
                  <div className="confirmation-loading">{actionMessage}</div>
                ) : (
                  <div className="confirmation-actions">
                    <button className="choice-card" onClick={handleMatch}>
                      <span className="choice-title">Chercher un match</span>
                      <span className="choice-text">Créer une session avec d’autres joueurs</span>
                    </button>

                    <button className="choice-card choice-card--coach" onClick={handleCoach}>
                      <span className="choice-title">Prendre un coach</span>
                      <span className="choice-text">Trouver un coach adapté à votre sport</span>
                    </button>

                    <button className="choice-skip" onClick={handleSkip}>
                      Passer pour l'instant
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
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