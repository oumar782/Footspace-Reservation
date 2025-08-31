// ReservationView.js
import React, { useState, useEffect } from 'react';
import './ReservationList.css';


const ReservationView = ({ reservationData, onBack }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verificationForm, setVerificationForm] = useState({
    nom: '',
    prenom: '',
    email: ''
  });
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    if (reservationData) {
      setVerificationForm({
        nom: reservationData.nomclient || '',
        prenom: reservationData.prenom || '',
        email: reservationData.email || ''
      });
      handleVerification({ preventDefault: () => {} });
    }
  }, [reservationData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVerificationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationError('');

    try {
      if (!verificationForm.nom || !verificationForm.prenom || !verificationForm.email) {
        setVerificationError('Veuillez remplir tous les champs');
        setLoading(false);
        return;
      }

      const response = await fetch('https://backend-foot-omega.vercel.app/api/reservation/');
      const result = await response.json();
      
      if (result.success) {
        const clientReservations = result.data.filter(reservation => 
          reservation.nomclient.toLowerCase() === verificationForm.nom.toLowerCase() &&
          reservation.prenom.toLowerCase() === verificationForm.prenom.toLowerCase() &&
          reservation.email.toLowerCase() === verificationForm.email.toLowerCase()
        );
        
        if (clientReservations.length > 0) {
          setReservations(clientReservations);
          setIsVerified(true);
        } else {
          setVerificationError('Aucune réservation trouvée avec ces informations');
        }
      } else {
        setVerificationError('Erreur lors de la vérification');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setVerificationError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    if (timeString.length === 5) return timeString;
    if (timeString.length >= 8) return timeString.substring(0, 5);
    return timeString;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmée':
        return 'rv-status-badge rv-confirmed';
      case 'annulée':
        return 'rv-status-badge rv-cancelled';
      case 'en attente':
        return 'rv-status-badge rv-pending';
      case 'terminée':
        return 'rv-status-badge rv-completed';
      default:
        return 'rv-status-badge';
    }
  };

  if (loading) {
    return (
      <div className="rv-container">
        <div className="rv-loading-container">
          <div className="rv-loading-pulse"></div>
          <div className="rv-loading-orb"></div>
          <p className="rv-loading-text">Chargement de vos réservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rv-container">
      <div className="rv-background-pattern"></div>
      
      <header className="rv-header">
        <div className="rv-header-glow"></div>
        <h1 className="rv-title">
          <span className="rv-title-gradient">Mes Réservations</span>
        </h1>
        <div className="rv-title-decoration">
          <div className="rv-title-dot"></div>
          <div className="rv-title-line"></div>
          <div className="rv-title-dot"></div>
        </div>
      </header>

      {!isVerified ? (
        <div className="rv-verification-card">
          <div className="rv-card-glow"></div>
          
          <div className="rv-verification-header">
            <div className="rv-verification-icon-container">
              <div className="rv-icon-pulse"></div>
              <div className="rv-verification-icon">✓</div>
            </div>
            <h2 className="rv-verification-title">Vérification de votre identité</h2>
            <p className="rv-verification-subtitle">Pour consulter vos réservations, veuillez saisir vos informations personnelles:</p>
          </div>
          
          <form onSubmit={handleVerification} className="rv-form">
            <div className="rv-form-row">
              <div className="rv-form-group">
                <label htmlFor="nom" className="rv-label">Nom *</label>
                <div className="rv-input-wrapper">
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={verificationForm.nom}
                    onChange={handleInputChange}
                    required
                    className="rv-input"
                  />
                  <div className="rv-input-glow"></div>
                </div>
              </div>
              
              <div className="rv-form-group">
                <label htmlFor="prenom" className="rv-label">Prénom *</label>
                <div className="rv-input-wrapper">
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={verificationForm.prenom}
                    onChange={handleInputChange}
                    required
                    className="rv-input"
                  />
                  <div className="rv-input-glow"></div>
                </div>
              </div>
            </div>

            <div className="rv-form-group rv-full-width">
              <label htmlFor="email" className="rv-label">Email *</label>
              <div className="rv-input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={verificationForm.email}
                  onChange={handleInputChange}
                  required
                  className="rv-input"
                />
                <div className="rv-input-glow"></div>
              </div>
            </div>

            {verificationError && (
              <div className="rv-error-message">
                <div className="rv-error-pulse"></div>
                <span className="rv-error-icon">!</span>
                {verificationError}
              </div>
            )}

            <button 
              type="submit" 
              className="rv-verify-button"
              disabled={loading}
            >
              <div className="rv-button-bg"></div>
              <div className="rv-button-content">
                <span className="rv-button-text">{loading ? 'Vérification...' : 'Vérifier mes réservations'}</span>
                {loading ? (
                  <div className="rv-button-spinner"></div>
                ) : (
                  <span className="rv-button-arrow">→</span>
                )}
              </div>
            </button>
          </form>
        </div>
      ) : (
        <div className="rv-reservations-section">
          <div className="rv-dashboard-header">
            <div className="rv-dashboard-title">
              <h2 className="rv-dashboard-title-text">Vos Réservations</h2>
              <p className="rv-dashboard-subtitle">Historique de toutes vos réservations</p>
            </div>
            
            <div className="rv-stats-card">
              <h3 className="rv-stats-number">{reservations.length}</h3>
              <p className="rv-stats-label">Réservations</p>
            </div>
          </div>

          <div className="rv-reservations-list">
            {reservations.map((reservation, index) => (
              <div key={index} className="rv-reservation-card">
                <div className="rv-card-background"></div>
                <div className="rv-card-hover"></div>
                
                <div className="rv-card-header">
                  <div className="rv-card-title">
                    <div className="rv-card-number">
                      {index + 1}
                    </div>
                    <div className="rv-card-info">
                      <h3 className="rv-card-name">{reservation.nomterrain}</h3>
                      <p className="rv-card-date">{reservation.datereservation}</p>
                    </div>
                  </div>
                  
                  <span className={getStatusBadgeClass(reservation.statut)}>
                    <span className="rv-status-icon">●</span>
                    <span className="rv-status-text">{reservation.statut}</span>
                  </span>
                </div>
                
                <div className="rv-card-divider"></div>
                
                <div className="rv-card-content">
                  <div className="rv-section">
                    <div className="rv-section-header">
                      <span className="rv-section-icon">⏱</span>
                      <h4 className="rv-section-title">Informations du créneau</h4>
                    </div>
                    
                    <div className="rv-details-grid">
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Terrain</span>
                          <span className="rv-detail-value">{reservation.nomterrain}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Date</span>
                          <span className="rv-detail-value">{reservation.datereservation}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Heure début</span>
                          <span className="rv-detail-value">{formatTime(reservation.heurereservation)}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Heure fin</span>
                          <span className="rv-detail-value">{formatTime(reservation.heurefin)}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Type</span>
                          <span className="rv-detail-value">{reservation.typeterrain}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Surface</span>
                          <span className="rv-detail-value">{reservation.surface}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Tarif</span>
                          <span className="rv-detail-value rv-price-value">{reservation.tarif} DH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rv-section">
                    <div className="rv-section-header">
                      <h4 className="rv-section-title">Informations personnelles</h4>
                    </div>
                    
                    <div className="rv-client-info">
                      <div className="rv-client-avatar">
                        {reservation.prenom.charAt(0)}{reservation.nomclient.charAt(0)}
                      </div>
                      
                      <div className="rv-client-details">
                        <h4 className="rv-client-name">{reservation.prenom} {reservation.nomclient}</h4>
                        
                        <div className="rv-client-contact">
                          <div className="rv-contact-item">
                            <span>{reservation.email}</span>
                          </div>
                          
                          <div className="rv-contact-item">
                            <span>{reservation.telephone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rv-actions">
            <button className="rv-new-verification-button" onClick={() => setIsVerified(false)}>
              <span className="rv-button-icon">↻</span>
              Nouvelle vérification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationView;