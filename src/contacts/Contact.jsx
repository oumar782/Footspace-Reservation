import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/contact.css';

import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight,
  Send,
  Check,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  PhoneCall,
  FileText,
  CalendarCheck,
  ChevronRight,
  Target,
  Shield,
  Award,
  Sparkles
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    motif: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const contactReasons = [
    { value: 'general', label: 'Question générale', icon: <HelpCircle size={16} /> },
    { value: 'reservation', label: 'Réservation', icon: <Calendar size={16} /> },
    { value: 'pricing', label: 'Tarifs & Devis', icon: <FileText size={16} /> },
    { value: 'event', label: 'Événement privé', icon: <Users size={16} /> },
    { value: 'partnership', label: 'Partenariat', icon: <Star size={16} /> },
    { value: 'complaint', label: 'Réclamation', icon: <AlertCircle size={16} /> }
  ];

  const contactInfo = [
    {
      icon: <MapPin size={28} />,
      title: "Adresse",
      details: ["Boulevard Mohammed V", "Casablanca, Maroc"],
      link: "https://maps.google.com",
      linkText: "Voir sur Google Maps"
    },
    {
      icon: <Phone size={28} />,
      title: "Téléphone",
      details: ["+212 6 21 97 62 88", "WhatsApp disponible"],
      link: "tel:+212621976288",
      linkText: "Appeler maintenant"
    },
    {
      icon: <Mail size={28} />,
      title: "Email",
      details: ["contact@playforest.ma", "reservation@playforest.ma"],
      link: "mailto:contact@playforest.ma",
      linkText: "Envoyer un email"
    },
    {
      icon: <Clock size={28} />,
      title: "Horaires",
      details: ["Lun-Dim: 6h00 - 23h00", "Accueil: 8h00 - 20h00"],
      link: null
    }
  ];

  const faqs = [
    {
      question: "Comment réserver un terrain ?",
      answer: "Vous pouvez réserver directement en ligne via notre système de réservation ou nous appeler. Le paiement se fait en ligne ou sur place.",
      icon: <CalendarCheck size={20} />
    },
    {
      question: "Quels sont les équipements fournis ?",
      answer: "Nous fournissons les vestiaires, douches, éclairage et parking gratuit. Les ballons peuvent être loués sur demande.",
      icon: <Target size={20} />
    },
    {
      question: "Politique d'annulation ?",
      answer: "Annulation gratuite jusqu'à 24h avant le match. En cas d'intempéries, remboursement intégral.",
      icon: <AlertCircle size={20} />
    },
    {
      question: "Tarifs pour les clubs ?",
      answer: "Nous proposons des tarifs préférentiels pour les clubs et équipes régulières. Contactez-nous pour un devis personnalisé.",
      icon: <Users size={20} />
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.nom || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Veuillez entrer une adresse email valide');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch('https://backend-foot-omega.vercel.app/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Message envoyé avec succès !');
        setIsSubmitted(true);
        setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '', motif: 'general' });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        toast.error(data.message || 'Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      toast.error('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ct-page">
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
      <section className="ct-hero">
        <div className="ct-hero-backdrop"></div>
        <div className="ct-hero-overlay"></div>
        <div className="ct-hero-pattern"></div>
        
        <div className="ct-hero-container">
          <div className="ct-hero-content">
            <div className="ct-hero-badge">
              <span className="ct-hero-badge-dot"></span>
              <span className="ct-hero-badge-text">Contactez-nous</span>
            </div>
            
            <h1 className="ct-hero-title">
              <span className="ct-hero-title-line">Contactez</span>
              <span className="ct-hero-title-line ct-hero-title-gold">Notre Équipe</span>
            </h1>
            
            <p className="ct-hero-subtitle">
              Notre équipe est à votre écoute pour répondre à toutes vos questions 
              et vous accompagner dans vos projets sportifs.
            </p>
          </div>
        </div>
        
        <div className="ct-hero-scroll" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>Découvrir</span>
          <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* Contact Info */}
      <section className="ct-info">
        <div className="ct-container">
          <div className="ct-section-header">
            <span className="ct-section-subtitle">Nous trouver</span>
            <h2 className="ct-section-title">
              Nos <span className="ct-gradient-text">Coordonnées</span>
            </h2>
            <p className="ct-section-desc">
              Plusieurs façons de nous contacter, choisissez celle qui vous convient
            </p>
          </div>

          <div className="ct-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="ct-info-card">
                <div className="ct-info-icon">
                  {info.icon}
                </div>
                <h3 className="ct-info-title">{info.title}</h3>
                <div className="ct-info-details">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex}>{detail}</p>
                  ))}
                </div>
                {info.link && (
                  <a 
                    href={info.link} 
                    className="ct-info-link"
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {info.linkText} <ArrowRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="ct-form-section">
        <div className="ct-container">
          <div className="ct-form-grid">
            {/* Contact Form */}
            <div className="ct-form-container">
              <div className="ct-section-header ct-section-header-left">
                <span className="ct-section-subtitle">Nous écrire</span>
                <h2 className="ct-section-title" style={{ fontSize: '2rem' }}>
                  Envoyez-nous un <span className="ct-gradient-text">Message</span>
                </h2>
              </div>
              
              {isSubmitted ? (
                <div className="ct-success">
                  <div className="ct-success-icon">
                    <Check size={40} />
                  </div>
                  <h3 className="ct-success-title">Message Envoyé !</h3>
                  <p className="ct-success-desc">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="ct-form">
                  <div className="ct-form-row">
                    <div className="ct-form-group">
                      <label className="ct-form-label">Nom complet *</label>
                      <input
                        type="text"
                        value={formData.nom}
                        onChange={(e) => handleInputChange('nom', e.target.value)}
                        className="ct-form-input"
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>
                    <div className="ct-form-group">
                      <label className="ct-form-label">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="ct-form-input"
                        placeholder="jean.dupont@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="ct-form-row">
                    <div className="ct-form-group">
                      <label className="ct-form-label">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                        className="ct-form-input"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    <div className="ct-form-group">
                      <label className="ct-form-label">Motif de contact</label>
                      <select
                        value={formData.motif}
                        onChange={(e) => handleInputChange('motif', e.target.value)}
                        className="ct-form-input"
                      >
                        {contactReasons.map((reason) => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">Sujet</label>
                    <input
                      type="text"
                      value={formData.sujet}
                      onChange={(e) => handleInputChange('sujet', e.target.value)}
                      className="ct-form-input"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="ct-form-textarea"
                      rows={6}
                      placeholder="Décrivez votre demande en détail..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="ct-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="ct-spinner"></span>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Envoyer le Message</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="ct-sidebar">
              {/* Map */}
              <div className="ct-map">
                <div className="ct-map-placeholder">
                  <MapPin size={48} className="ct-map-icon" />
                  <h3 className="ct-map-title">Notre Localisation</h3>
                  <p className="ct-map-address">Boulevard Mohammed V, Casablanca</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ct-map-link"
                  >
                    Voir sur Google Maps <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="ct-quick">
                <h3 className="ct-quick-title">Actions Rapides</h3>
                
                <Link to="/reservation" className="ct-quick-card">
                  <div className="ct-quick-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="ct-quick-content">
                    <h4 className="ct-quick-card-title">Réservation Express</h4>
                    <p className="ct-quick-card-desc">Réservez votre terrain en 2 minutes</p>
                  </div>
                  <ChevronRight size={16} className="ct-quick-arrow" />
                </Link>

                <a href="tel:+212621976288" className="ct-quick-card">
                  <div className="ct-quick-icon">
                    <PhoneCall size={24} />
                  </div>
                  <div className="ct-quick-content">
                    <h4 className="ct-quick-card-title">Appel Direct</h4>
                    <p className="ct-quick-card-desc">+212 6 21 97 62 88</p>
                  </div>
                  <ChevronRight size={16} className="ct-quick-arrow" />
                </a>

                <Link to="/abonnement" className="ct-quick-card">
                  <div className="ct-quick-icon">
                    <Users size={24} />
                  </div>
                  <div className="ct-quick-content">
                    <h4 className="ct-quick-card-title">Devis Personnalisé</h4>
                    <p className="ct-quick-card-desc">Tarifs clubs et événements</p>
                  </div>
                  <ChevronRight size={16} className="ct-quick-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="ct-faq">
        <div className="ct-container">
          <div className="ct-section-header">
            <span className="ct-section-subtitle">Questions fréquentes</span>
            <h2 className="ct-section-title">
              Questions <span className="ct-gradient-text">Fréquentes</span>
            </h2>
            <p className="ct-section-desc">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="ct-faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="ct-faq-card">
                <div className="ct-faq-content">
                  <div className="ct-faq-icon">
                    {faq.icon}
                  </div>
                  <div className="ct-faq-text">
                    <h3 className="ct-faq-question">{faq.question}</h3>
                    <p className="ct-faq-answer">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="ct-faq-footer">
            <p className="ct-faq-footer-text">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a href="#contact-form" className="ct-faq-btn">
              <MessageCircle size={18} />
              <span>Contactez-nous</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="ct-emergency">
        <div className="ct-container">
          <div className="ct-emergency-content">
            <h2 className="ct-emergency-title">
              Contact d'Urgence
            </h2>
            <p className="ct-emergency-subtitle">
              Pour toute urgence pendant vos créneaux de jeu
            </p>
            <div className="ct-emergency-card">
              <div className="ct-emergency-info">
                <div className="ct-emergency-icon">
                  <Phone size={32} />
                </div>
                <div className="ct-emergency-details">
                  <div className="ct-emergency-number">+212 6 21 97 62 88</div>
                  <div className="ct-emergency-availability">Disponible 24h/24</div>
                </div>
              </div>
              <p className="ct-emergency-note">
                En cas d'urgence médicale, appelez directement le 15 (SAMU)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;