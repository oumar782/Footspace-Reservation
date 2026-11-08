import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './abonnement.css';

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
  CalendarDays,
  Sparkles,
  Gem,
  Trophy,
  Zap
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

  const modesPaiement = [
    { value: 'Carte', label: 'Carte Bancaire' },
    { value: 'Especes', label: 'Espèces' },
    { value: 'Mobile Money', label: 'Mobile Money' },
    { value: 'Virement', label: 'Virement Bancaire' }
  ];

  const creneauxHoraires = [
    '06:00', '08:00', '10:00', '12:00', '14:00', 
    '16:00', '18:00', '20:00', '22:00'
  ];

  const today = new Date().toISOString().split('T')[0];
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const maxDate = nextYear.toISOString().split('T')[0];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'type_abonnement' && formData.date_debut) {
      calculateEndDate(value, formData.date_debut);
    }
    if (field === 'date_debut' && value) {
      calculateEndDate(formData.type_abonnement, value);
    }
  };

  const calculateEndDate = (type, startDate) => {
    if (!type || !startDate) return;
    const date = new Date(startDate);
    switch (type) {
      case 'mensuel': date.setMonth(date.getMonth() + 1); break;
      case 'trimestriel': date.setMonth(date.getMonth() + 3); break;
      case 'semestriel': date.setMonth(date.getMonth() + 6); break;
      case 'annuel': date.setFullYear(date.getFullYear() + 1); break;
      default: date.setMonth(date.getMonth() + 1);
    }
    const endDate = date.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date_fin: endDate }));
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
      statut: 'en attente',
      type_abonnement: formData.type_abonnement,
      date_debut: formData.date_debut,
      date_fin: formData.date_fin,
      prix_total: calculatePrixTotal(),
      mode_paiement: formData.mode_paiement,
      photo_abonne: null,
      heure_reservation: formData.heure_reservation,
      heure_fin: formData.heure_fin
    };

    try {
      const response = await fetch('https://backend-foot-omega.vercel.app/api/clients/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Demande d\'abonnement envoyée avec succès !');
        setTimeout(() => {
          navigate(`/consultation-abonnement?id=${data.data.idclient}`);
        }, 1500);
      } else {
        toast.error(data.message || 'Erreur lors de l\'envoi de la demande');
      }
    } catch (error) {
      toast.error('Erreur de connexion au serveur');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ab-page">
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
      <section className="ab-hero">
        <div className="ab-hero-backdrop"></div>
        <div className="ab-hero-overlay"></div>
        <div className="ab-hero-pattern"></div>
        
        <div className="ab-hero-container">
          <div className="ab-hero-content">
            <div className="ab-hero-badge">
              <span className="ab-hero-badge-dot"></span>
              <span className="ab-hero-badge-text">Abonnements Premium</span>
            </div>
            
            <h1 className="ab-hero-title">
              <span className="ab-hero-title-line">Choisissez votre</span>
              <span className="ab-hero-title-line ab-hero-title-gold">Formule</span>
            </h1>
            
            <p className="ab-hero-subtitle">
              Des abonnements flexibles adaptés à tous les niveaux. 
              Profitez de nos installations premium aux meilleurs tarifs.
            </p>
          </div>
        </div>
        
        <div className="ab-hero-scroll" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>Découvrir</span>
          <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* Abonnements Section */}
      <section className="ab-plans">
        <div className="ab-container">
          <div className="ab-section-header">
            <span className="ab-section-subtitle">Nos Formules</span>
            <h2 className="ab-section-title">
              Des <span className="ab-gradient-text">abonnements</span> sur mesure
            </h2>
            <p className="ab-section-desc">
              Choisissez la formule qui correspond à votre pratique
            </p>
          </div>

          <div className="ab-plans-grid">
            {abonnements.map((abo) => (
              <div 
                key={abo.id} 
                className={`ab-plan-card ${abo.popular ? 'ab-plan-card--popular' : ''}`}
              >
                {abo.popular && (
                  <div className="ab-plan-badge">
                    <Star size={14} fill="currentColor" />
                    <span>Le plus populaire</span>
                  </div>
                )}
                
                <div className="ab-plan-icon">
                  {abo.icon}
                </div>
                
                <h3 className="ab-plan-name">{abo.nom}</h3>
                
                <div className="ab-plan-price">
                  <span className="ab-price-number">{abo.prix}</span>
                  <span className="ab-price-currency">dh</span>
                  <span className="ab-price-period">/{abo.duree}</span>
                </div>
                
                <ul className="ab-plan-features">
                  {abo.features.map((feature, index) => (
                    <li key={index}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="ab-plan-btn"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, type_abonnement: abo.id }));
                    setShowForm(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <section className="ab-form-section" id="formulaire">
          <div className="ab-container">
            <div className="ab-form-container">
              <div className="ab-form-header">
                <div>
                  <span className="ab-form-subtitle">Demande d'abonnement</span>
                  <h2 className="ab-form-title">
                    Formulaire de <span className="ab-gradient-text">souscription</span>
                  </h2>
                </div>
                <button 
                  className="ab-form-close"
                  onClick={() => setShowForm(false)}
                  type="button"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="ab-form">
                <div className="ab-form-row">
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <User size={16} />
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      className="ab-form-input"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <User size={16} />
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={formData.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      className="ab-form-input"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                </div>

                <div className="ab-form-row">
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <Mail size={16} />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="ab-form-input"
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <Phone size={16} />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      className="ab-form-input"
                      placeholder="06 12 34 56 78"
                      required
                    />
                  </div>
                </div>

                <div className="ab-form-row">
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <Calendar size={16} />
                      Type d'abonnement *
                    </label>
                    <select
                      value={formData.type_abonnement}
                      onChange={(e) => handleInputChange('type_abonnement', e.target.value)}
                      className="ab-form-input"
                    >
                      {abonnements.map((abo) => (
                        <option key={abo.id} value={abo.id}>
                          {abo.nom} - {abo.prix} dh / {abo.duree}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <CreditCard size={16} />
                      Mode de paiement *
                    </label>
                    <select
                      value={formData.mode_paiement}
                      onChange={(e) => handleInputChange('mode_paiement', e.target.value)}
                      className="ab-form-input"
                    >
                      {modesPaiement.map((mode) => (
                        <option key={mode.value} value={mode.value}>
                          {mode.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="ab-form-row">
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <CalendarDays size={16} />
                      Date de début *
                    </label>
                    <input
                      type="date"
                      value={formData.date_debut}
                      onChange={(e) => handleInputChange('date_debut', e.target.value)}
                      min={today}
                      max={maxDate}
                      className="ab-form-input"
                      required
                    />
                  </div>
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <CalendarDays size={16} />
                      Date de fin *
                    </label>
                    <input
                      type="date"
                      value={formData.date_fin}
                      onChange={(e) => handleInputChange('date_fin', e.target.value)}
                      min={formData.date_debut || today}
                      className="ab-form-input"
                      required
                    />
                    <small className="ab-form-hint">
                      Calculée automatiquement selon votre abonnement
                    </small>
                  </div>
                </div>

                <div className="ab-form-row">
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <Clock3 size={16} />
                      Heure de début *
                    </label>
                    <select
                      value={formData.heure_reservation}
                      onChange={(e) => handleInputChange('heure_reservation', e.target.value)}
                      className="ab-form-input"
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
                  <div className="ab-form-group">
                    <label className="ab-form-label">
                      <Clock3 size={16} />
                      Heure de fin *
                    </label>
                    <select
                      value={formData.heure_fin}
                      onChange={(e) => handleInputChange('heure_fin', e.target.value)}
                      className="ab-form-input"
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

                <div className="ab-form-summary">
                  <h4 className="ab-summary-title">Récapitulatif</h4>
                  <div className="ab-summary-item">
                    <span>Abonnement {abonnements.find(a => a.id === formData.type_abonnement)?.nom}</span>
                    <span className="ab-summary-value">{calculatePrixTotal()} dh</span>
                  </div>
                  {formData.date_debut && formData.date_fin && (
                    <div className="ab-summary-item">
                      <span>Période</span>
                      <span className="ab-summary-value">
                        {new Date(formData.date_debut).toLocaleDateString('fr-FR')} - {new Date(formData.date_fin).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  <div className="ab-summary-total">
                    <span>Total à payer</span>
                    <span className="ab-total-value">{calculatePrixTotal()} dh</span>
                  </div>
                  <div className="ab-summary-status">
                    <span className="ab-status-badge">Statut: En attente de validation</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="ab-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="ab-spinner" />
                      <span>Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>Confirmer ma demande</span>
                    </>
                  )}
                </button>

                <p className="ab-form-legal">
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