// ReservationDetails.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  if (!state || !state.reservation) {
    return (
      <div className="error-container">
        <h2>Réservation non trouvée</h2>
        <button onClick={() => navigate('/details-reservation')}>
          Retour à mes réservations
        </button>
      </div>
    );
  }

  const reservation = state.reservation;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusClass = (statut) => {
    switch (statut) {
      case 'confirmée': return 'status-confirmed';
      case 'annulée': return 'status-cancelled';
      case 'en attente': return 'status-pending';
      case 'terminée': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="reservation-details-container">
      <div className="details-header">
        <button className="back-button" onClick={() => navigate('/mes-reservations')}>
          &larr; Retour
        </button>
        <h1>Détails de la réservation</h1>
        <span className={`status-badge ${getStatusClass(reservation.statut)}`}>
          {reservation.statut}
        </span>
      </div>

      <div className="details-content">
        <div className="details-section">
          <h2>Informations du terrain</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Terrain:</span>
              <span className="value">{reservation.nomterrain}</span>
            </div>
            <div className="detail-item">
              <span className="label">Type:</span>
              <span className="value">{reservation.typeTerrain}</span>
            </div>
            <div className="detail-item">
              <span className="label">Surface:</span>
              <span className="value">{reservation.surface}</span>
            </div>
            <div className="detail-item">
              <span className="label">Numéro:</span>
              <span className="value">{reservation.numeroterrain}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Détails de la réservation</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Date:</span>
              <span className="value">{formatDate(reservation.datereservation)}</span>
            </div>
            <div className="detail-item">
              <span className="label">Heure:</span>
              <span className="value">{reservation.heurereservation} - {reservation.heurefin}</span>
            </div>
            <div className="detail-item">
              <span className="label">Tarif:</span>
              <span className="value price">{reservation.tarif} DH</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Informations personnelles</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Nom:</span>
              <span className="value">{reservation.nomclient}</span>
            </div>
            <div className="detail-item">
              <span className="label">Prénom:</span>
              <span className="value">{reservation.prenom}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{reservation.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Téléphone:</span>
              <span className="value">{reservation.telephone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="details-actions">
        <button className="print-button" onClick={() => window.print()}>
          Imprimer
        </button>
      </div>
    </div>
  );
};

export default ReservationDetails;