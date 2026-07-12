import React, { useCallback, useState, useEffect } from 'react';
import './ReservationList.css';
import { 
  Printer, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RotateCcw,
  Shield,
  FileText,
  CreditCard,
  Home,
  Map
} from 'lucide-react';

const ReservationView = ({ reservationData }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const [reactivatingId, setReactivatingId] = useState(null);
  const [printingId, setPrintingId] = useState(null);
  const [verificationForm, setVerificationForm] = useState({
    nom: '',
    prenom: '',
    email: ''
  });
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVerificationForm(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const runVerification = useCallback(async (formValues) => {
    setLoading(true);
    setVerificationError('');
    setActionMessage({ type: '', text: '' });

    try {
      if (!formValues.nom || !formValues.prenom || !formValues.email) {
        setVerificationError('Veuillez remplir tous les champs obligatoires');
        setLoading(false);
        return;
      }

      // ✅ Utilisation de l'URL locale
      const API_URL = 'http://localhost:5000/api/reservation';
      const response = await fetch(`${API_URL}/client/${formValues.email}`);
      
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const result = await response.json();
      
      console.log('🔍 RÉPONSE COMPLÈTE DE L\'API:', JSON.stringify(result, null, 2));
      
      if (result.success) {
        // Filtrer par nom et prénom
        const clientReservations = result.data.filter(reservation => 
          reservation.nomclient?.toLowerCase() === formValues.nom.toLowerCase() &&
          reservation.prenom?.toLowerCase() === formValues.prenom.toLowerCase()
        );
        
        console.log('📊 Réservations trouvées:', clientReservations.length);
        
        if (clientReservations.length > 0) {
          console.log('🏙️ Première réservation - Ville:', clientReservations[0]?.ville);
          console.log('🏠 Première réservation - Quartier:', clientReservations[0]?.quartier);
          
          const sortedReservations = clientReservations.sort((a, b) => 
            new Date(b.datereservation) - new Date(a.datereservation)
          );
          setReservations(sortedReservations);
          setIsVerified(true);
          setActionMessage({ 
            type: 'success', 
            text: `${sortedReservations.length} réservation(s) trouvée(s)` 
          });
        } else {
          setVerificationError('Aucune réservation trouvée avec ces informations');
        }
      } else {
        setVerificationError('Erreur lors de la récupération des données');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setVerificationError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (reservationData) {
      const initialForm = {
        nom: reservationData.nomclient || '',
        prenom: reservationData.prenom || '',
        email: reservationData.email || ''
      };
      setVerificationForm(initialForm);
      runVerification(initialForm);
    }
  }, [reservationData, runVerification]);

  const handleVerification = async (e) => {
    e.preventDefault();
    await runVerification(verificationForm);
  };

  const canReactivateReservation = (reservation) => {
    if (reservation.statut !== 'annulée') return false;
    
    const now = new Date();
    const cancellationDate = new Date(reservation.date_annulation || reservation.date_modification || now);
    const hoursDiff = (now - cancellationDate) / (1000 * 60 * 60);
    
    return hoursDiff <= 24;
  };

  const getReactivationTimeLeft = (reservation) => {
    const now = new Date();
    const cancellationDate = new Date(reservation.date_annulation || reservation.date_modification || now);
    const hoursDiff = (now - cancellationDate) / (1000 * 60 * 60);
    const hoursLeft = Math.max(0, 24 - hoursDiff);
    
    return Math.ceil(hoursLeft);
  };

  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ? Cette action est réversible pendant 24 heures.')) {
      return;
    }

    setCancellingId(reservationId);
    setActionMessage({ type: '', text: '' });

    try {
      const API_URL = 'http://localhost:5000/api/reservation';
      const response = await fetch(`${API_URL}/${reservationId}/statut`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          statut: 'annulée',
          date_annulation: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const result = await response.json();

      if (result.success) {
        setActionMessage({ 
          type: 'success', 
          text: 'Réservation annulée avec succès. Vous avez 24h pour la réactiver.' 
        });
        
        setReservations(prev => 
          prev.map(res => 
            res.id === reservationId 
              ? { 
                  ...res, 
                  statut: 'annulée',
                  date_annulation: new Date().toISOString()
                }
              : res
          )
        );
      } else {
        setActionMessage({ 
          type: 'error', 
          text: result.message || 'Erreur lors de l\'annulation' 
        });
      }
    } catch (error) {
      console.error('Erreur annulation:', error);
      setActionMessage({ 
        type: 'error', 
        text: 'Erreur de connexion lors de l\'annulation' 
      });
    } finally {
      setCancellingId(null);
    }
  };

  const handleReactivateReservation = async (reservationId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir réactiver cette réservation ?')) {
      return;
    }

    setReactivatingId(reservationId);
    setActionMessage({ type: '', text: '' });

    try {
      const API_URL = 'http://localhost:5000/api/reservation';
      const response = await fetch(`${API_URL}/${reservationId}/statut`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          statut: 'en attente',
          date_annulation: null
        })
      });

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const result = await response.json();

      if (result.success) {
        setActionMessage({ 
          type: 'success', 
          text: 'Réservation réactivée avec succès' 
        });
        
        setReservations(prev => 
          prev.map(res => 
            res.id === reservationId 
              ? { 
                  ...res, 
                  statut: 'en attente',
                  date_annulation: null
                }
              : res
          )
        );
      } else {
        setActionMessage({ 
          type: 'error', 
          text: result.message || 'Erreur lors de la réactivation' 
        });
      }
    } catch (error) {
      console.error('Erreur réactivation:', error);
      setActionMessage({ 
        type: 'error', 
        text: 'Erreur de connexion lors de la réactivation' 
      });
    } finally {
      setReactivatingId(null);
    }
  };

  const generateProfessionalPDF = async (reservation) => {
    setPrintingId(reservation.id);
    
    try {
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const primaryColor = [4, 98, 20];
      const lightColor = [248, 249, 250];
      const darkColor = [45, 52, 54];
      const textColor = [45, 52, 54];
      const lightText = [108, 117, 125];
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      let yPosition = margin;

      // En-tête
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text('FOOTBALL CLUB PREMIUM', margin, 15);
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Réservation de Terrain - Confirmation Officielle', margin, 20);
      
      doc.text(`DOC-${reservation.id}-${Date.now()}`, pageWidth - margin, 20, { align: 'right' });
      
      yPosition = 35;

      // Titre
      doc.setFontSize(20);
      doc.setTextColor(...primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text('CONFIRMATION DE RÉSERVATION', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // Détails de la réservation
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.setFont('helvetica', 'bold');
      doc.text('DÉTAILS DE LA RÉSERVATION', margin, yPosition);
      yPosition += 8;

      const reservationDetails = [
        { label: 'Numéro de Réservation', value: `#${reservation.id}` },
        { label: 'Date de Réservation', value: reservation.datereservation },
        { label: 'Statut', value: reservation.statut.toUpperCase()},
        { label: 'Émise le', value: new Date().toLocaleDateString('fr-FR') }
      ];

      reservationDetails.forEach((detail, index) => {
        const x = margin + (index % 2) * ((pageWidth - 2 * margin) / 2);
        const y = yPosition + Math.floor(index / 2) * 8;
        
        doc.setFontSize(8);
        doc.setTextColor(...lightText);
        doc.setFont('helvetica', 'normal');
        doc.text(detail.label, x + 6, y);
        
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        doc.setFont('helvetica', 'bold');
        doc.text(detail.value, x + 45, y);
      });
      
      yPosition += 20;

      // Informations du terrain
      doc.setFillColor(...lightColor);
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 10, 'F');
      
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMATIONS DU TERRAIN', margin, yPosition);
      yPosition += 12;

      const terrainInfo = [
        { label: 'Nom du Terrain', value: reservation.nomterrain || '' },
        { label: 'Type de Terrain', value: reservation.typeterrain || '' },
        { label: 'Surface', value: reservation.surface || '' },
        { label: 'Tarif Appliqué', value: `${reservation.tarif || 0} DH` }
      ];

      terrainInfo.forEach((info, index) => {
        const x = margin + (index % 2) * ((pageWidth - 2 * margin) / 2);
        const y = yPosition + Math.floor(index / 2) * 8;
        
        doc.setFontSize(8);
        doc.setTextColor(...lightText);
        doc.setFont('helvetica', 'normal');
        doc.text(info.label, x + 6, y);
        
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        doc.setFont('helvetica', 'bold');
        doc.text(info.value, x + 45, y);
      });
      
      yPosition += 20;

      // LOCALISATION - Avec les vraies données
      doc.setFillColor(...lightColor);
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 10, 'F');
      
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.setFont('helvetica', 'bold');
      doc.text('LOCALISATION', margin, yPosition);
      yPosition += 12;

      const locationInfo = [
        { label: 'Ville', value: reservation.ville || '' },
        { label: 'Quartier', value: reservation.quartier || '' }
      ];

      locationInfo.forEach((info, index) => {
        const x = margin + (index % 2) * ((pageWidth - 2 * margin) / 2);
        const y = yPosition + Math.floor(index / 2) * 8;
        
        doc.setFontSize(8);
        doc.setTextColor(...lightText);
        doc.setFont('helvetica', 'normal');
        doc.text(info.label, x + 6, y);
        
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        doc.setFont('helvetica', 'bold');
        doc.text(info.value || 'Non renseigné', x + 45, y);
      });
      
      yPosition += 20;

      // Créneau horaire
      doc.setFillColor(...lightColor);
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 10, 'F');
      
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.setFont('helvetica', 'bold');
      doc.text('CRÉNEAU HORAIRE RÉSERVÉ', margin, yPosition);
      yPosition += 12;

      const timeSlots = [
        { label: 'Date du Match', value: reservation.datereservation || '' },
        { label: 'Heure de Début', value: formatTime(reservation.heurereservation) },
        { label: 'Heure de Fin', value: formatTime(reservation.heurefin) },
        { label: 'Durée', value: calculateDuration(reservation.heurereservation, reservation.heurefin)}
      ];

      timeSlots.forEach((slot, index) => {
        const x = margin + (index % 2) * ((pageWidth - 2 * margin) / 2);
        const y = yPosition + Math.floor(index / 2) * 8;
        
        doc.setFontSize(8);
        doc.setTextColor(...lightText);
        doc.setFont('helvetica', 'normal');
        doc.text(slot.label, x + 6, y);
        
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        doc.setFont('helvetica', 'bold');
        doc.text(slot.value, x + 45, y);
      });
      
      yPosition += 20;

      // Informations client
      doc.setFillColor(...lightColor);
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 10, 'F');
      
      doc.setFontSize(12);
      doc.setTextColor(...darkColor);
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMATIONS CLIENT', margin, yPosition);
      yPosition += 12;

      const clientInfo = [
        { label: 'Nom Complet', value: `${reservation.prenom || ''} ${reservation.nomclient || ''}`},
        { label: 'Adresse Email', value: reservation.email || '' },
        { label: 'Téléphone', value: reservation.telephone || '' }
      ];

      clientInfo.forEach((info, index) => {
        const y = yPosition + index * 8;
        
        doc.setFontSize(8);
        doc.setTextColor(...lightText);
        doc.setFont('helvetica', 'normal');
        doc.text(info.label, margin + 6, y);
        
        doc.setFontSize(9);
        doc.setTextColor(...textColor);
        doc.setFont('helvetica', 'bold');
        doc.text(info.value || 'Non renseigné', margin + 45, y);
      });
      
      yPosition += 30;

      // Conditions
      doc.setFontSize(8);
      doc.setTextColor(...lightText);
      doc.setFont('helvetica', 'normal');
      
      const conditions = [
        '• Présentez cette confirmation à votre arrivée',
        '• Annulation possible jusqu\'à 24h avant le créneau',
        '• En cas de retard supérieur à 15min, la réservation peut être annulée',
        '• Le terrain doit être laissé dans l\'état dans lequel il a été trouvé'
      ];

      conditions.forEach((condition, index) => {
        doc.text(condition, margin, yPosition + (index * 4));
      });
      
      yPosition += 25;

      // Footer
      doc.setFillColor(...darkColor);
      doc.rect(0, doc.internal.pageSize.getHeight() - 20, pageWidth, 20, 'F');
      
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'normal');
      
      const footerText = [
        'Football Club Premium • Réservation de Terrain • Système Sécurisé',
        `Document généré le ${new Date().toLocaleString('fr-FR')} • Confidentiel`
      ];

      footerText.forEach((text, index) => {
        doc.text(text, pageWidth / 2, doc.internal.pageSize.getHeight() - 15 + (index * 3), { align: 'center' });
      });

      doc.save(`Reservation-${reservation.id}-${reservation.prenom || ''}-${reservation.nomclient || ''}.pdf`);
      
      setActionMessage({
        type: 'success',
        text: 'PDF généré et téléchargé avec succès'
      });
      
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      setActionMessage({
        type: 'error',
        text: 'Erreur lors de la génération du PDF'
      });
    } finally {
      setPrintingId(null);
    }
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return '';
    
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    const diff = (endTime - startTime) / (1000 * 60 * 60);
    
    return `${diff} heure${diff > 1 ? 's' : ''}`;
  };

  const canCancelReservation = (reservation) => {
    const canCancelStatus = ['confirmée', 'en attente'].includes(reservation.statut);
    const reservationDate = new Date(reservation.datereservation);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return canCancelStatus && reservationDate >= today;
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmée':
        return <CheckCircle size={14} />;
      case 'annulée':
        return <XCircle size={14} />;
      case 'en attente':
        return <Clock size={14} />;
      case 'terminée':
        return <CheckCircle size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="rv-container">
        <div className="rv-background-pattern"></div>
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

      {actionMessage.text && (
        <div className={`rv-message rv-message-${actionMessage.type}`}>
          <div className="rv-message-content">
            <span className="rv-message-icon">
              {actionMessage.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </span>
            {actionMessage.text}
          </div>
        </div>
      )}

      {!isVerified ? (
        <div className="rv-verification-card">
          <div className="rv-card-glow"></div>
          
          <div className="rv-verification-header">
            <div className="rv-verification-icon-container">
              <div className="rv-icon-pulse"></div>
              <div className="rv-verification-icon">
                <Shield size={32} />
              </div>
            </div>
            <h2 className="rv-verification-title">Vérification de votre identité</h2>
            <p className="rv-verification-subtitle">Pour consulter vos réservations, veuillez saisir vos informations personnelles:</p>
          </div>
          
          <form onSubmit={handleVerification} className="rv-form">
            <div className="rv-form-row">
              <div className="rv-form-group">
                <label htmlFor="nom" className="rv-label">
                  Prénom *
                </label>
                <div className="rv-input-wrapper">
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={verificationForm.nom}
                    onChange={handleInputChange}
                    required
                    className="rv-input"
                    placeholder="Votre nom"
                  />
                  <div className="rv-input-glow"></div>
                </div>
              </div>
              
              <div className="rv-form-group">
                <label htmlFor="prenom" className="rv-label">
                  Nom *
                </label>
                <div className="rv-input-wrapper">
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={verificationForm.prenom}
                    onChange={handleInputChange}
                    required
                    className="rv-input"
                    placeholder="Votre prénom"
                  />
                  <div className="rv-input-glow"></div>
                </div>
              </div>
            </div>

            <div className="rv-form-group rv-full-width">
              <label htmlFor="email" className="rv-label">
                Email *
              </label>
              <div className="rv-input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={verificationForm.email}
                  onChange={handleInputChange}
                  required
                  className="rv-input"
                  placeholder="votre@email.com"
                />
                <div className="rv-input-glow"></div>
              </div>
            </div>

            {verificationError && (
              <div className="rv-error-message">
                <div className="rv-error-pulse"></div>
                <span className="rv-error-icon">
                  <XCircle size={16} />
                </span>
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
                <span className="rv-button-text">
                  {loading ? 'Vérification...' : 'Vérifier mes réservations'}
                </span>
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
              <div className="rv-stats-glow"></div>
              <h3 className="rv-stats-number">{reservations.length}</h3>
              <p className="rv-stats-label">Réservations</p>
            </div>
          </div>

          <div className="rv-reservations-list">
            {reservations.map((reservation, index) => (
              <div key={reservation.id} className="rv-reservation-card">
                <div className="rv-card-background"></div>
                <div className="rv-card-hover"></div>
                
                <div className="rv-card-header">
                  <div className="rv-card-title">
                    <div className="rv-card-number">
                      <div className="rv-number-glow"></div>
                      {index + 1}
                    </div>
                    <div className="rv-card-info">
                      <h3 className="rv-card-name">{reservation.nomterrain || 'Terrain'}</h3>
                      <p className="rv-card-date">{reservation.datereservation || ''}</p>
                    </div>
                  </div>
                  
                  <div className="rv-card-header-right">
                    <span className={getStatusBadgeClass(reservation.statut)}>
                      <span className="rv-status-icon">
                        {getStatusIcon(reservation.statut)}
                      </span>
                      <span className="rv-status-text">{reservation.statut || ''}</span>
                    </span>
                    
                    <div className="rv-action-buttons">
                      {reservation.statut === 'confirmée' && (
                        <button 
                          className="rv-print-button"
                          onClick={() => generateProfessionalPDF(reservation)}
                          disabled={printingId === reservation.id}
                        >
                          {printingId === reservation.id ? (
                            <div className="rv-button-spinner"></div>
                          ) : (
                            <Printer size={16} />
                          )}
                          {printingId === reservation.id ? 'Génération...' : 'Imprimer'}
                        </button>
                      )}
                      
                      {canCancelReservation(reservation) && (
                        <button 
                          className="rv-cancel-button"
                          onClick={() => handleCancelReservation(reservation.id)}
                          disabled={cancellingId === reservation.id}
                        >
                          {cancellingId === reservation.id ? (
                            <>
                              <div className="rv-cancel-spinner"></div>
                              Annulation...
                            </>
                          ) : (
                            <>
                              <XCircle size={16} />
                              Annuler
                            </>
                          )}
                        </button>
                      )}
                      
                      {canReactivateReservation(reservation) && (
                        <button 
                          className="rv-reactivate-button"
                          onClick={() => handleReactivateReservation(reservation.id)}
                          disabled={reactivatingId === reservation.id}
                        >
                          {reactivatingId === reservation.id ? (
                            <>
                              <div className="rv-cancel-spinner"></div>
                              Réactivation...
                            </>
                          ) : (
                            <>
                              <RotateCcw size={16} />
                              Réactiver
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="rv-card-divider"></div>
                
                <div className="rv-card-content">
                  <div className="rv-section">
                    <div className="rv-section-header">
                      <span className="rv-section-icon">
                        <MapPin size={20} />
                      </span>
                      <h4 className="rv-section-title">Informations du créneau</h4>
                    </div>
                    
                    <div className="rv-details-grid">
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">
                            <MapPin size={14} />
                            Terrain
                          </span>
                          <span className="rv-detail-value">{reservation.nomterrain || ''}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">
                            <Calendar size={14} />
                            Date
                          </span>
                          <span className="rv-detail-value">{reservation.datereservation || ''}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">
                            <Clock size={14} />
                            Heure début
                          </span>
                          <span className="rv-detail-value">{formatTime(reservation.heurereservation)}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">
                            <Clock size={14} />
                            Heure fin
                          </span>
                          <span className="rv-detail-value">{formatTime(reservation.heurefin)}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Type de terrain</span>
                          <span className="rv-detail-value">{reservation.typeterrain || ''}</span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">Surface</span>
                          <span className="rv-detail-value">{reservation.surface || ''}</span>
                        </div>
                      </div>
                      
                      {/* ✅ VILLE - Affichage des vraies données */}
                      <div className="rv-detail-card rv-location-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label rv-location-label">
                            <Map size={14} /> Ville
                          </span>
                          <span className="rv-detail-value rv-location-value">
                            <span className="rv-location-badge rv-ville-badge">
                              {reservation.ville || ''}
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      {/* ✅ QUARTIER - Affichage des vraies données */}
                      <div className="rv-detail-card rv-location-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label rv-location-label">
                            <Home size={14} /> Quartier
                          </span>
                          <span className="rv-detail-value rv-location-value">
                            <span className="rv-location-badge rv-quartier-badge">
                              {reservation.quartier || ''}
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">
                            <CreditCard size={14} />
                            Tarif
                          </span>
                          <span className="rv-detail-value rv-price-value">{reservation.tarif || 0} DH</span>
                        </div>
                      </div>

                      <div className="rv-detail-card">
                        <div className="rv-detail-content">
                          <span className="rv-detail-label">
                            <FileText size={14} />
                            Numéro réservation
                          </span>
                          <span className="rv-detail-value">#{reservation.id || 'N/A'}</span>
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
                        {reservation.prenom?.charAt(0) || ''}{reservation.nomclient?.charAt(0) || ''}
                      </div>
                      
                      <div className="rv-client-details">
                        <h4 className="rv-client-name">
                          <User size={16} />
                          {reservation.prenom || ''} {reservation.nomclient || ''}
                        </h4>
                        
                        <div className="rv-client-contact">
                          <div className="rv-contact-item">
                            <Mail size={14} />
                            <span>{reservation.email || ''}</span>
                          </div>
                          
                          <div className="rv-contact-item">
                            <Phone size={14} />
                            <span>{reservation.telephone || ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {reservation.statut === 'annulée' && canReactivateReservation(reservation) && (
                  <div className="rv-reactivation-notice">
                    <Clock size={14} />
                    <span>
                      Délai de réactivation : {getReactivationTimeLeft(reservation)}h restante(s)
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rv-actions">
            <button className="rv-new-verification-button" onClick={() => setIsVerified(false)}>
              <RotateCcw size={16} />
              Nouvelle vérification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationView;
