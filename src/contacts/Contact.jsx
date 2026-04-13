import React, { useState } from 'react';
import '../css/contact.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import des icônes Lucide React
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
  Target
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
      icon: <MapPin size={32} />,
      title: "Adresse",
      details: ["123 Avenue du Stade", "75001 Paris, France"],
      link: "https://maps.google.com",
      linkText: "Voir sur Google Maps"
    },
    {
      icon: <Phone size={32} />,
      title: "Téléphone",
      details: ["01 23 45 67 89", "Urgences: 06 12 34 56 78"],
      link: "tel:+33123456789",
      linkText: "Appeler maintenant"
    },
    {
      icon: <Mail size={32} />,
      title: "Email",
      details: ["contact@footfield.fr", "reservation@footfield.fr"],
      link: "mailto:contact@footfield.fr",
      linkText: "Envoyer un email"
    },
    {
      icon: <Clock size={32} />,
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Message envoyé avec succès !');
        setIsSubmitted(true);
        
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: '',
          motif: 'general'
        });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        toast.error(data.message || 'Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
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
      <section className="contact-hero-modern">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span className="hero-badge-text">CONTACTEZ-NOUS</span>
            </div>
            
            <h1 className="hero-title">
              <span className="hero-title-line">Contactez</span>
              <span className="hero-title-line hero-title-highlight">Notre Équipe</span>
            </h1>
            
            <p className="hero-subtitle">
              Notre équipe est à votre écoute pour répondre à toutes vos questions 
              et vous accompagner dans vos projets.
            </p>
          </div>
        </div>
        
        <div className="hero-scroll-indicator" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>Découvrir</span>
          <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle-modern">NOUS TROUVER</span>
            <h2 className="section-title-modern">
              Nos <span className="gradient-text">Coordonnées</span>
            </h2>
            <p className="section-description-modern">
              Plusieurs façons de nous contacter, choisissez celle qui vous convient
            </p>
          </div>

          <div className="contact-info-grid-modern">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card-modern">
                <div className="contact-info-icon-modern">
                  {info.icon}
                </div>
                <h3 className="contact-info-title-modern">{info.title}</h3>
                <div className="contact-info-details-modern">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex}>{detail}</p>
                  ))}
                </div>
                {info.link && (
                  <a 
                    href={info.link} 
                    className="contact-info-link-modern"
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
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-grid-modern">
            {/* Contact Form */}
            <div className="contact-form-container-modern">
              <div className="section-header-modern" style={{ textAlign: 'left', marginBottom: '30px' }}>
                <span className="section-subtitle-modern">NOUS ÉCRIRE</span>
                <h2 className="section-title-modern" style={{ fontSize: '2rem' }}>
                  Envoyez-nous un <span className="gradient-text">Message</span>
                </h2>
              </div>
              
              {isSubmitted ? (
                <div className="success-message-modern">
                  <div className="success-icon-modern">
                    <Check size={40} />
                  </div>
                  <h3 className="success-title-modern">Message Envoyé !</h3>
                  <p className="success-description-modern">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-modern">
                  <div className="form-row-modern">
                    <div className="form-group-modern">
                      <label className="form-label-modern">Nom complet *</label>
                      <input
                        type="text"
                        value={formData.nom}
                        onChange={(e) => handleInputChange('nom', e.target.value)}
                        className="form-input-modern"
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>
                    <div className="form-group-modern">
                      <label className="form-label-modern">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input-modern"
                        placeholder="jean.dupont@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-modern">
                    <div className="form-group-modern">
                      <label className="form-label-modern">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                        className="form-input-modern"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    <div className="form-group-modern">
                      <label className="form-label-modern">Motif de contact</label>
                      <select
                        value={formData.motif}
                        onChange={(e) => handleInputChange('motif', e.target.value)}
                        className="form-input-modern"
                      >
                        {contactReasons.map((reason) => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">Sujet</label>
                    <input
                      type="text"
                      value={formData.sujet}
                      onChange={(e) => handleInputChange('sujet', e.target.value)}
                      className="form-input-modern"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="form-textarea-modern"
                      rows={6}
                      placeholder="Décrivez votre demande en détail..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-submit-btn-modern"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
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

            {/* Map & Quick Actions */}
            <div className="contact-sidebar-modern">
              {/* Interactive Map */}
              <div className="map-card-modern">
                <div className="map-placeholder-modern">
                  <MapPin size={48} className="map-icon-modern" />
                  <h3 className="map-title-modern">Notre Localisation</h3>
                  <p className="map-address-modern">123 Avenue du Stade, 75001 Paris</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="map-link-modern"
                  >
                    Voir sur Google Maps <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions-modern">
                <h3 className="quick-actions-title-modern">Actions Rapides</h3>
                
                <a 
                  href="/reservations" 
                  className="quick-action-card-modern"
                >
                  <div className="quick-action-icon-modern">
                    <Calendar size={24} />
                  </div>
                  <div className="quick-action-content-modern">
                    <h4 className="quick-action-title-modern">Réservation Express</h4>
                    <p className="quick-action-description-modern">Réservez votre terrain en 2 minutes</p>
                  </div>
                  <ChevronRight size={16} className="quick-action-arrow-modern" />
                </a>

                <a 
                  href="tel:+33123456789" 
                  className="quick-action-card-modern"
                >
                  <div className="quick-action-icon-modern">
                    <PhoneCall size={24} />
                  </div>
                  <div className="quick-action-content-modern">
                    <h4 className="quick-action-title-modern">Appel Direct</h4>
                    <p className="quick-action-description-modern">01 23 45 67 89</p>
                  </div>
                  <ChevronRight size={16} className="quick-action-arrow-modern" />
                </a>

                <a 
                  href="/tarifs" 
                  className="quick-action-card-modern"
                >
                  <div className="quick-action-icon-modern">
                    <Users size={24} />
                  </div>
                  <div className="quick-action-content-modern">
                    <h4 className="quick-action-title-modern">Devis Personnalisé</h4>
                    <p className="quick-action-description-modern">Tarifs clubs et événements</p>
                  </div>
                  <ChevronRight size={16} className="quick-action-arrow-modern" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section-modern">
        <div className="container">
          <div className="section-header-modern">
            <span className="section-subtitle-modern">QUESTIONS FRÉQUENTES</span>
            <h2 className="section-title-modern">
              Questions <span className="gradient-text">Fréquentes</span>
            </h2>
            <p className="section-description-modern">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="faq-grid-modern">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card-modern">
                <div className="faq-content-modern">
                  <div className="faq-icon-modern">
                    {faq.icon}
                  </div>
                  <div className="faq-text-modern">
                    <h3 className="faq-question-modern">{faq.question}</h3>
                    <p className="faq-answer-modern">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-footer-modern">
            <p className="faq-footer-text-modern">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a href="#contact-form" className="faq-contact-btn-modern">
              <MessageCircle size={18} />
              <span>Contactez-nous</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="emergency-section-modern">
        <div className="container">
          <div className="emergency-contact-modern">
            <div className="emergency-content-modern">
              <h2 className="emergency-title-modern">
                Contact d'Urgence
              </h2>
              <p className="emergency-subtitle-modern">
                Pour toute urgence pendant vos créneaux de jeu
              </p>
              <div className="emergency-card-modern">
                <div className="emergency-info-modern">
                  <div className="emergency-icon-modern">
                    <Phone size={32} />
                  </div>
                  <div className="emergency-details-modern">
                    <div className="emergency-number-modern">06 12 34 56 78</div>
                    <div className="emergency-availability-modern">Disponible 24h/24</div>
                  </div>
                </div>
                <p className="emergency-note-modern">
                  En cas d'urgence médicale, appelez directement le 15 (SAMU)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;