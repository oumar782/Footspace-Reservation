import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './abonnement.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import des icônes Lucide React
import { 
  Calendar, 
  Users, 
  Star, 
  ArrowRight,
  Check,
  Clock,
  Target,
  CreditCard,
  Phone,
  Mail,
  User,
  Award,
  CalendarCheck,
  Clock3,
  Loader,
  ChevronRight,
  X,
  CalendarDays
} from 'lucide-react';

const Abonnement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    type_abonnement: 'mensuel',
    mode_paiement: 'Carte',
    date_debut: '',
    date_fin: '',
    heure_reservation: '',
    heure_fin: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Types d'abonnements disponibles
  const abonnements = [
    {
      id: 'mensuel',
      nom: 'Mensuel',
      prix: 500,
      duree: '30 jours',
      features: [
        'Accès au terrain 2h/semaine',
        'Créneaux flexibles',
        'Annulation 24h à l\'avance',
        'Accès vestiaires premium'
      ],
      popular: false,
      icon: <Clock size={32} />
    },
    {
      id: 'trimestriel',
      nom: 'Trimestriel',
      prix: 1350,
      duree: '90 jours',
      features: [
        'Économisez 150 dh',
        'Accès au terrain 3h/semaine',
        'Créneaux prioritaires',
        'Accès illimité aux vestiaires',
        '1 invitation offerte'
      ],
      popular: true,
      icon: <CalendarCheck size={32} />
    },
    {
      id: 'semestriel',
      nom: 'Semestriel',
      prix: 2500,
      duree: '180 jours',
      features: [
        'Économisez 500 dh',
        'Accès au terrain 4h/semaine',
        'Créneaux VIP',
        'Parking réservé',
        '3 invitations offertes',
        'Massage après-match'
      ],
      popular: false,
      icon: <Award size={32} />
    },
    {
      id: 'annuel',
      nom: 'Annuel',
      prix: 4500,
      duree: '365 jours',
      features: [
        'Économisez 1500 dh',
        'Accès illimité au terrain',
        'Créneaux prioritaires 24h/24',
        'Accès au club VIP',
        'Équipement personnalisé',
        '10 invitations offertes'
      ],
      popular: false,
      icon: <Target size={32} />
    }
  ];

  // Modes de paiement
  const modesPaiement = [
    { value: 'Carte', label: 'Carte Bancaire' },
    { value: 'Especes', label: 'Espèces' },
    { value: 'Mobile Money', label: 'Mobile Money' },
    { value: 'Virement', label: 'Virement Bancaire' }
  ];

  // Créneaux horaires disponibles
  const creneauxHoraires = [
    '06:00', '08:00', '10:00', '12:00', '14:00', 
    '16:00', '18:00', '20:00', '22:00'
  ];

  // Obtenir la date du jour au format YYYY-MM-DD pour l'input min
  const today = new Date().toISOString().split('T')[0];
  
  // Calculer la date max (1 an à partir d'aujourd'hui)
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const maxDate = nextYear.toISOString().split('T')[0];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calcul de la date de fin si le type d'abonnement change et que la date de début est déjà définie
    if (field === 'type_abonnement' && formData.date_debut) {
      calculateEndDate(value, formData.date_debut);
    }
    
    // Auto-calcul de la date de fin si la date de début change
    if (field === 'date_debut' && value) {
      calculateEndDate(formData.type_abonnement, value);
    }
  };

  const calculateEndDate = (type, startDate) => {
    if (!type || !startDate) return;
    
    const date = new Date(startDate);
    
    switch (type) {
      case 'mensuel':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'trimestriel':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'semestriel':
        date.setMonth(date.getMonth() + 6);
        break;
      case 'annuel':
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        date.setMonth(date.getMonth() + 1);
    }
    
    const endDate = date.toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      date_fin: endDate
    }));
  };

  const validateForm = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Veuillez entrer une adresse email valide');
      return false;
    }

    const phoneRegex = /^[0-9+\-\s]{10,}$/;
    if (!phoneRegex.test(formData.telephone)) {
      toast.error('Veuillez entrer un numéro de téléphone valide');
      return false;
    }

    if (!formData.date_debut || !formData.date_fin) {
      toast.error('Veuillez sélectionner vos dates d\'abonnement');
      return false;
    }

    const debut = new Date(formData.date_debut);
    const fin = new Date(formData.date_fin);
    if (debut >= fin) {
      toast.error('La date de fin doit être postérieure à la date de début');
      return false;
    }

    if (!formData.heure_reservation || !formData.heure_fin) {
      toast.error('Veuillez sélectionner vos heures de réservation');
      return false;
    }

    const heureDebut = new Date(`1970-01-01T${formData.heure_reservation}`);
    const heureFin = new Date(`1970-01-01T${formData.heure_fin}`);
    if (heureDebut >= heureFin) {
      toast.error('L\'heure de fin doit être postérieure à l\'heure de début');
      return false;
    }

    return true;
  };

  const calculatePrixTotal = () => {
    const abonnement = abonnements.find(a => a.id === formData.type_abonnement);
    return abonnement ? abonnement.prix : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      statut: 'en attente', // Statut mis à "en attente"
      type_abonnement: formData.type_abonnement,
      date_debut: formData.date_debut,
      date_fin: formData.date_fin,
      prix_total: calculatePrixTotal(),
      mode_paiement: formData.mode_paiement,
      photo_abonne: null,
      heure_reservation: formData.heure_reservation,
      heure_fin: formData.heure_fin
    };

    console.log('📤 Envoi des données:', payload);

    try {
      const response = await fetch('https://backend-foot-omega.vercel.app/api/clients/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('📥 Réponse du serveur:', data);

      if (response.ok && data.success) {
        toast.success('Demande d\'abonnement envoyée avec succès !');
        
        // Rediriger vers la page de consultation avec l'ID du client créé
        setTimeout(() => {
          navigate(`/Consultation-reservation?id=${data.data.idclient}`);
        }, 1500);
      } else {
        toast.error(data.message || 'Erreur lors de l\'envoi de la demande');
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      toast.error('Erreur de connexion au serveur');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="abonnement-page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Hero Section */}
      <section className="abonnement-hero-modern">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span className="hero-badge-text">ABONNEMENTS PREMIUM</span>
            </div>
            
            <h1 className="hero-title">
              <span className="hero-title-line">Choisissez votre</span>
              <span className="hero-title-line hero-title-highlight">Formule</span>
            </h1>
            
            <p className="hero-subtitle">
              Des abonnements flexibles adaptés à tous les niveaux. 
              Profitez de nos installations premium aux meilleurs tarifs.
            </p>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <span>Découvrir</span>
          <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* Abonnements Section */}
      <section className="abonnements-section-modern">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle-modern">NOS FORMULES</span>
            <h2 className="section-title-modern">
              Des <span className="gradient-text">abonnements</span> sur mesure
            </h2>
            <p className="section-description-modern">
              Choisissez la formule qui correspond à votre pratique
            </p>
          </div>

          <div className="abonnements-grid-modern">
            {abonnements.map((abo) => (
              <div 
                key={abo.id} 
                className={`abonnement-card-modern ${abo.popular ? 'popular' : ''}`}
              >
                {abo.popular && (
                  <div className="popular-badge">
                    <Star size={14} fill="currentColor" />
                    <span>Le plus populaire</span>
                  </div>
                )}
                
                <div className="abonnement-icon-modern">
                  {abo.icon}
                </div>
                
                <h3 className="abonnement-name-modern">{abo.nom}</h3>
                
                <div className="abonnement-price-modern">
                  <span className="price-number">{abo.prix}</span>
                  <span className="price-currency">dh</span>
                  <span className="price-period">/{abo.duree}</span>
                </div>
                
                <ul className="abonnement-features-modern">
                  {abo.features.map((feature, index) => (
                    <li key={index}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="abonnement-cta-modern"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, type_abonnement: abo.id }));
                    setShowForm(true);
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }}
                >
                  Choisir cette formule
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire d'abonnement */}
      {showForm && (
        <section className="form-section-modern" id="formulaire">
          <div className="container">
            <div className="form-container-modern">
              <div className="form-header-modern">
                <div>
                  <span className="form-subtitle-modern">DEMANDE D'ABONNEMENT</span>
                  <h2 className="form-title-modern">
                    Formulaire de <span className="gradient-text">souscription</span>
                  </h2>
                </div>
                <button 
                  className="form-close-modern"
                  onClick={() => setShowForm(false)}
                  type="button"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="abonnement-form-modern">
                <div className="form-row-modern">
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <User size={16} />
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      className="form-input-modern"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <User size={16} />
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={formData.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      className="form-input-modern"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                </div>

                <div className="form-row-modern">
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <Mail size={16} />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input-modern"
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <Phone size={16} />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      className="form-input-modern"
                      placeholder="06 12 34 56 78"
                      required
                    />
                  </div>
                </div>

                <div className="form-row-modern">
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <Calendar size={16} />
                      Type d'abonnement *
                    </label>
                    <select
                      value={formData.type_abonnement}
                      onChange={(e) => handleInputChange('type_abonnement', e.target.value)}
                      className="form-input-modern"
                    >
                      {abonnements.map((abo) => (
                        <option key={abo.id} value={abo.id}>
                          {abo.nom} - {abo.prix} dh / {abo.duree}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <CreditCard size={16} />
                      Mode de paiement *
                    </label>
                    <select
                      value={formData.mode_paiement}
                      onChange={(e) => handleInputChange('mode_paiement', e.target.value)}
                      className="form-input-modern"
                    >
                      {modesPaiement.map((mode) => (
                        <option key={mode.value} value={mode.value}>
                          {mode.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-modern">
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <CalendarDays size={16} />
                      Date de début *
                    </label>
                    <input
                      type="date"
                      value={formData.date_debut}
                      onChange={(e) => handleInputChange('date_debut', e.target.value)}
                      min={today}
                      max={maxDate}
                      className="form-input-modern"
                      required
                    />
                  </div>
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <CalendarDays size={16} />
                      Date de fin *
                    </label>
                    <input
                      type="date"
                      value={formData.date_fin}
                      onChange={(e) => handleInputChange('date_fin', e.target.value)}
                      min={formData.date_debut || today}
                      className="form-input-modern"
                      required
                      readOnly // Optionnel: rendre la date de fin en lecture seule car elle est calculée automatiquement
                    />
                    <small className="form-hint-modern">
                      Calculée automatiquement selon votre abonnement
                    </small>
                  </div>
                </div>

                <div className="form-row-modern">
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <Clock3 size={16} />
                      Heure de début *
                    </label>
                    <select
                      value={formData.heure_reservation}
                      onChange={(e) => handleInputChange('heure_reservation', e.target.value)}
                      className="form-input-modern"
                      required
                    >
                      <option value="">Sélectionnez une heure</option>
                      {creneauxHoraires.map((heure) => (
                        <option key={heure} value={heure}>
                          {heure}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <Clock3 size={16} />
                      Heure de fin *
                    </label>
                    <select
                      value={formData.heure_fin}
                      onChange={(e) => handleInputChange('heure_fin', e.target.value)}
                      className="form-input-modern"
                      required
                    >
                      <option value="">Sélectionnez une heure</option>
                      {creneauxHoraires.map((heure) => (
                        <option key={heure} value={heure}>
                          {heure}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-summary-modern">
                  <h4 className="summary-title-modern">Récapitulatif</h4>
                  <div className="summary-item-modern">
                    <span>Abonnement {abonnements.find(a => a.id === formData.type_abonnement)?.nom}</span>
                    <span className="summary-value">{calculatePrixTotal()} dh</span>
                  </div>
                  {formData.date_debut && formData.date_fin && (
                    <div className="summary-item-modern">
                      <span>Période</span>
                      <span className="summary-value">
                        {new Date(formData.date_debut).toLocaleDateString('fr-FR')} - {new Date(formData.date_fin).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  <div className="summary-total-modern">
                    <span>Total à payer</span>
                    <span className="total-value">{calculatePrixTotal()} dh</span>
                  </div>
                  <div className="summary-status-modern">
                    <span className="status-badge">Statut: En attente de validation</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="form-submit-btn-modern"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="spinner" />
                      <span>Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>Confirmer ma demande</span>
                    </>
                  )}
                </button>

                <p className="form-legal-modern">
                  En soumettant ce formulaire, vous acceptez nos conditions générales 
                  et notre politique de confidentialité. Votre demande sera traitée dans les plus brefs délais.
                </p>
              </form>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Abonnement;