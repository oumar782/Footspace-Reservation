import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './consultationAbonnement.css';

import { 
  Printer, 
  Clock, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RotateCcw,
  Shield,
  CreditCard,
  Award,
  CalendarCheck,
  Clock3
} from 'lucide-react';

const ConsultationAbonnement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [abonnements, setAbonnements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verificationForm, setVerificationForm] = useState({
    nom: '',
    prenom: '',
    email: ''
  });
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
  const [debugInfo, setDebugInfo] = useState(null);

  // Récupérer l'ID depuis l'URL si présent
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    
    if (id) {
      fetchAbonnementById(id);
    }
  }, [location]);

  const fetchAbonnementById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://backend-foot-omega.vercel.app/api/clients/${id}`);
      const result = await response.json();
      
      if (response.ok && result.success) {
        setAbonnements([result.data]);
        setVerificationForm({
          nom: result.data.nom || '',
          prenom: result.data.prenom || '',
          email: result.data.email || ''
        });
        setIsVerified(true);
        setActionMessage({ 
          type: 'success', 
          text: 'Abonnement trouvé !' 
        });
      } else {
        setVerificationError('Abonnement non trouvé');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setVerificationError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

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
    setActionMessage({ type: '', text: '' });
    setDebugInfo(null);

    try {
      if (!verificationForm.nom || !verificationForm.prenom || !verificationForm.email) {
        setVerificationError('Veuillez remplir tous les champs obligatoires');
        setLoading(false);
        return;
      }

      console.log('🔍 RECHERCHE AVEC:', {
        nom: `"${verificationForm.nom}"`,
        prenom: `"${verificationForm.prenom}"`,
        email: `"${verificationForm.email}"`
      });

      // Appel à l'API pour récupérer tous les clients
      const response = await fetch('https://backend-foot-omega.vercel.app/api/clients/');
      
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const result = await response.json();
      console.log('📦 NOMBRE TOTAL DE CLIENTS:', result.data?.length || 0);
      
      if (result.success && result.data) {
        
        // Afficher tous les clients pour déboguer
        console.log('📋 LISTE DE TOUS LES CLIENTS:');
        result.data.forEach((client, index) => {
          console.log(`Client ${index + 1}:`, {
            id: client.idclient,
            nom: `"${client.nom}"`,
            prenom: `"${client.prenom}"`,
            email: `"${client.email}"`,
            type: client.type_abonnement,
            statut: client.statut
          });
        });

        // Préparer les données de débogage
        const debug = {
          recherche: {
            nom: verificationForm.nom,
            prenom: verificationForm.prenom,
            email: verificationForm.email
          },
          clients: result.data.map(c => ({
            id: c.idclient,
            nom: c.nom,
            prenom: c.prenom,
            email: c.email,
            correspondance: {
              nom: c.nom?.toLowerCase().trim() === verificationForm.nom.toLowerCase().trim(),
              prenom: c.prenom?.toLowerCase().trim() === verificationForm.prenom.toLowerCase().trim(),
              email: c.email?.toLowerCase().trim() === verificationForm.email.toLowerCase().trim()
            }
          }))
        };
        setDebugInfo(debug);

        // Recherche des clients correspondants
        const clientsTrouves = [];
        
        for (let i = 0; i < result.data.length; i++) {
          const client = result.data[i];
          
          // Nettoyer les données pour la comparaison
          const nomClient = client.nom ? client.nom.trim().toLowerCase() : '';
          const prenomClient = client.prenom ? client.prenom.trim().toLowerCase() : '';
          const emailClient = client.email ? client.email.trim().toLowerCase() : '';
          
          const nomForm = verificationForm.nom.trim().toLowerCase();
          const prenomForm = verificationForm.prenom.trim().toLowerCase();
          const emailForm = verificationForm.email.trim().toLowerCase();
          
          // Vérifier si TOUS les champs correspondent
          const nomMatch = nomClient === nomForm;
          const prenomMatch = prenomClient === prenomForm;
          const emailMatch = emailClient === emailForm;
          
          if (nomMatch && prenomMatch && emailMatch) {
            console.log('✅ CORRESPONDANCE TROUVÉE:', client);
            clientsTrouves.push(client);
          } else if (nomMatch || prenomMatch || emailMatch) {
            // Log des correspondances partielles pour aider au débogage
            console.log('⚠️ CORRESPONDANCE PARTIELLE:', {
              client: { nom: client.nom, prenom: client.prenom, email: client.email },
              correspondances: { nomMatch, prenomMatch, emailMatch }
            });
          }
        }
        
        console.log('📊 RÉSULTAT FINAL:', clientsTrouves.length, 'abonnement(s) trouvé(s)');
        
        if (clientsTrouves.length > 0) {
          setAbonnements(clientsTrouves);
          setIsVerified(true);
          setActionMessage({ 
            type: 'success', 
            text: `${clientsTrouves.length} abonnement(s) trouvé(s)` 
          });
        } else {
          setVerificationError('Aucun abonnement trouvé avec ces informations');
        }
      } else {
        setVerificationError('Erreur lors de la récupération des données');
      }
    } catch (error) {
      console.error('❌ ERREUR:', error);
      setVerificationError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
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

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'actif':
        return 'ca-status-badge ca-confirmed';
      case 'inactif':
        return 'ca-status-badge ca-cancelled';
      case 'en attente':
        return 'ca-status-badge ca-pending';
      default:
        return 'ca-status-badge';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'actif':
        return <CheckCircle size={14} />;
      case 'inactif':
        return <XCircle size={14} />;
      case 'en attente':
        return <Clock size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  if (loading) {
    return (
      <>
        <div className="ca-container">
          <div className="ca-background-pattern"></div>
          <div className="ca-loading-container">
            <div className="ca-loading-pulse"></div>
            <div className="ca-loading-orb"></div>
            <p className="ca-loading-text">Chargement de vos abonnements...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="ca-container">
        <div className="ca-background-pattern"></div>
        
        <header className="ca-header">
          <div className="ca-header-glow"></div>
          <h1 className="ca-title">
            <span className="ca-title-gradient">Mes Abonnements</span>
          </h1>
          <div className="ca-title-decoration">
            <div className="ca-title-dot"></div>
            <div className="ca-title-line"></div>
            <div className="ca-title-dot"></div>
          </div>
        </header>

        {actionMessage.text && (
          <div className={`ca-message ca-message-${actionMessage.type}`}>
            <div className="ca-message-content">
              <span className="ca-message-icon">
                {actionMessage.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
              </span>
              {actionMessage.text}
            </div>
          </div>
        )}

        {!isVerified ? (
          <div className="ca-verification-card">
            <div className="ca-card-glow"></div>
            
            <div className="ca-verification-header">
              <div className="ca-verification-icon-container">
                <div className="ca-icon-pulse"></div>
                <div className="ca-verification-icon">
                  <Shield size={32} />
                </div>
              </div>
              <h2 className="ca-verification-title">Vérification de votre identité</h2>
              <p className="ca-verification-subtitle">Pour consulter vos abonnements, veuillez saisir vos informations personnelles:</p>
            </div>
            
            <form onSubmit={handleVerification} className="ca-form">
              <div className="ca-form-row">
                <div className="ca-form-group">
                  <label htmlFor="nom" className="ca-label">
                    Nom *
                  </label>
                  <div className="ca-input-wrapper">
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={verificationForm.nom}
                      onChange={handleInputChange}
                      required
                      className="ca-input"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                
                <div className="ca-form-group">
                  <label htmlFor="prenom" className="ca-label">
                    Prénom *
                  </label>
                  <div className="ca-input-wrapper">
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={verificationForm.prenom}
                      onChange={handleInputChange}
                      required
                      className="ca-input"
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>
              </div>

              <div className="ca-form-group ca-full-width">
                <label htmlFor="email" className="ca-label">
                  Email *
                </label>
                <div className="ca-input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={verificationForm.email}
                    onChange={handleInputChange}
                    required
                    className="ca-input"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {verificationError && (
                <div className="ca-error-message">
                  <span className="ca-error-icon">
                    <XCircle size={16} />
                  </span>
                  {verificationError}
                </div>
              )}

              <button 
                type="submit" 
                className="ca-verify-button"
                disabled={loading}
              >
                <div className="ca-button-bg"></div>
                <div className="ca-button-content">
                  <span className="ca-button-text">
                    {loading ? 'Vérification...' : 'Vérifier mes abonnements'}
                  </span>
                  {loading && <div className="ca-button-spinner"></div>}
                </div>
              </button>
            </form>

            {/* Section de débogage - visible uniquement en développement */}
            {debugInfo && process.env.NODE_ENV === 'development' && (
              <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px', fontSize: '12px' }}>
                <h4 style={{ marginBottom: '10px' }}>🔧 Informations de débogage :</h4>
                <p><strong>Recherche :</strong> {debugInfo.recherche.nom} {debugInfo.recherche.prenom} ({debugInfo.recherche.email})</p>
                <p><strong>Clients dans la base :</strong> {debugInfo.clients.length}</p>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {debugInfo.clients.map((c, i) => (
                    <div key={i} style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>
                      <div><strong>#{c.id}</strong> - {c.nom} {c.prenom} ({c.email})</div>
                      <div style={{ fontSize: '10px', color: c.correspondance.nom && c.correspondance.prenom && c.correspondance.email ? 'green' : 'red' }}>
                        Match: N:{c.correspondance.nom ? '✅' : '❌'} P:{c.correspondance.prenom ? '✅' : '❌'} E:{c.correspondance.email ? '✅' : '❌'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="ca-abonnements-section">
            <div className="ca-dashboard-header">
              <div className="ca-dashboard-title">
                <h2 className="ca-dashboard-title-text">Vos Abonnements</h2>
                <p className="ca-dashboard-subtitle">
                  {abonnements.length} abonnement(s) trouvé(s)
                </p>
              </div>
            </div>

            <div className="ca-abonnements-list">
              {abonnements.map((abonnement) => (
                <div key={abonnement.idclient} className="ca-abonnement-card">
                  <div className="ca-card-background"></div>
                  
                  <div className="ca-card-header">
                    <div className="ca-card-title">
                      <div className="ca-card-info">
                        <h3 className="ca-card-name">
                          {abonnement.prenom} {abonnement.nom}
                        </h3>
                        <p className="ca-card-date">
                          Abonnement {abonnement.type_abonnement}
                        </p>
                      </div>
                    </div>
                    
                    <div className="ca-card-header-right">
                      <span className={getStatusBadgeClass(abonnement.statut)}>
                        <span className="ca-status-icon">
                          {getStatusIcon(abonnement.statut)}
                        </span>
                        <span className="ca-status-text">{abonnement.statut}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="ca-card-divider"></div>
                  
                  <div className="ca-card-content">
                    <div className="ca-section">
                      <h4 className="ca-section-title">Détails de l'abonnement</h4>
                      
                      <div className="ca-details-grid">
                        <div className="ca-detail-item">
                          <span className="ca-detail-label">Type</span>
                          <span className="ca-detail-value">{abonnement.type_abonnement}</span>
                        </div>
                        
                        <div className="ca-detail-item">
                          <span className="ca-detail-label">Date début</span>
                          <span className="ca-detail-value">{formatDate(abonnement.date_debut)}</span>
                        </div>
                        
                        <div className="ca-detail-item">
                          <span className="ca-detail-label">Date fin</span>
                          <span className="ca-detail-value">{formatDate(abonnement.date_fin)}</span>
                        </div>
                        
                        <div className="ca-detail-item">
                          <span className="ca-detail-label">Prix total</span>
                          <span className="ca-detail-value ca-price-value">{abonnement.prix_total} DH</span>
                        </div>
                        
                        <div className="ca-detail-item">
                          <span className="ca-detail-label">Mode de paiement</span>
                          <span className="ca-detail-value">{abonnement.mode_paiement || 'Non spécifié'}</span>
                        </div>
                        
                        <div className="ca-detail-item">
                          <span className="ca-detail-label">N° Client</span>
                          <span className="ca-detail-value">#{abonnement.idclient}</span>
                        </div>
                      </div>
                    </div>

                    {abonnement.heure_reservation && abonnement.heure_fin && (
                      <div className="ca-section">
                        <h4 className="ca-section-title">Créneau horaire</h4>
                        <div className="ca-details-grid">
                          <div className="ca-detail-item">
                            <span className="ca-detail-label">Début</span>
                            <span className="ca-detail-value">{formatTime(abonnement.heure_reservation)}</span>
                          </div>
                          <div className="ca-detail-item">
                            <span className="ca-detail-label">Fin</span>
                            <span className="ca-detail-value">{formatTime(abonnement.heure_fin)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="ca-section">
                      <h4 className="ca-section-title">Contact</h4>
                      <div className="ca-details-grid">
                        <div className="ca-detail-item">
                          <span className="ca-detail-label">Email</span>
                          <span className="ca-detail-value">{abonnement.email}</span>
                        </div>
                        <div className="ca-detail-item">
                          <span className="ca-detail-label">Téléphone</span>
                          <span className="ca-detail-value">{abonnement.telephone || 'Non spécifié'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ca-actions">
              <button className="ca-new-verification-button" onClick={() => setIsVerified(false)}>
                <RotateCcw size={16} />
                Nouvelle recherche
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConsultationAbonnement;