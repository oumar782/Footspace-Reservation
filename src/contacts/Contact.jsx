import React, { useState } from 'react';
import './Contact.css';
import Header from "../composant/Header";
import Footer from "../composant/Footer";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactReasons = [
    { value: 'general', label: 'Question générale' },
    { value: 'reservation', label: 'Réservation' },
    { value: 'pricing', label: 'Tarifs & Devis' },
    { value: 'event', label: 'Événement privé' },
    { value: 'partnership', label: 'Partenariat' },
    { value: 'complaint', label: 'Réclamation' }
  ];

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: "Adresse",
      details: ["123 Avenue du Stade", "75001 Paris, France"],
      link: "https://maps.google.com"
    },
    {
      icon: 'fas fa-phone',
      title: "Téléphone",
      details: ["01 23 45 67 89", "Urgences: 06 12 34 56 78"],
      link: "tel:+33123456789"
    },
    {
      icon: 'fas fa-envelope',
      title: "Email",
      details: ["contact@footfield.fr", "reservation@footfield.fr"],
      link: "mailto:contact@footfield.fr"
    },
    {
      icon: 'fas fa-clock',
      title: "Horaires",
      details: ["Lun-Dim: 6h00 - 23h00", "Accueil: 8h00 - 20h00"],
      link: null
    }
  ];

  const faqs = [
    {
      question: "Comment réserver un terrain ?",
      answer: "Vous pouvez réserver directement en ligne via notre système de réservation ou nous appeler. Le paiement se fait en ligne ou sur place."
    },
    {
      question: "Quels sont les équipements fournis ?",
      answer: "Nous fournissons les vestiaires, douches, éclairage et parking gratuit. Les ballons peuvent être loués sur demande."
    },
    {
      question: "Politique d'annulation ?",
      answer: "Annulation gratuite jusqu'à 24h avant le match. En cas d'intempéries, remboursement intégral."
    },
    {
      question: "Tarifs pour les clubs ?",
      answer: "Nous proposons des tarifs préférentiels pour les clubs et équipes régulières. Contactez-nous pour un devis personnalisé."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactReason: 'general'
      });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <Header />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="golden-text">Contactez</span> Nous
            </h1>
            <p className="hero-subtitle">
              Notre équipe est à votre écoute pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-icon">
                  <i className={info.icon}></i>
                </div>
                <h3 className="contact-info-title">{info.title}</h3>
                <div className="contact-info-details">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex}>
                      {info.link && detailIndex === 0 ? (
                        <a 
                          href={info.link} 
                          className="contact-info-link"
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-section contact-section-gray">
        <div className="contact-container">
          <div className="contact-form-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <h2 className="contact-form-title">
                Envoyez-nous un <span className="gradient-text">Message</span>
              </h2>
              
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="success-title">Message Envoyé !</h3>
                  <p className="success-description">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nom complet *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="form-input"
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input"
                        placeholder="jean.dupont@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="form-input"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Motif de contact</label>
                      <select
                        value={formData.contactReason}
                        onChange={(e) => handleInputChange('contactReason', e.target.value)}
                        className="form-input"
                      >
                        {contactReasons.map((reason) => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sujet *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="form-input"
                      placeholder="Objet de votre message"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="form-textarea"
                      rows={6}
                      placeholder="Décrivez votre demande en détail..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-submit-btn"
                  >
                    <i className="fas fa-paper-plane"></i>
                    <span>Envoyer le Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map & Quick Actions */}
            <div className="contact-sidebar">
              {/* Interactive Map */}
              <div className="map-card">
                <div className="map-placeholder">
                  <i className="fas fa-map-marker-alt"></i>
                  <h3 className="map-title">Notre Localisation</h3>
                  <p className="map-address">123 Avenue du Stade, 75001 Paris</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    Voir sur Google Maps →
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h3 className="quick-actions-title">Actions Rapides</h3>
                
                <a 
                  href="/reservations" 
                  className="quick-action-card"
                >
                  <div className="quick-action-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="quick-action-content">
                    <h4 className="quick-action-title">Réservation Express</h4>
                    <p className="quick-action-description">Réservez votre terrain en 2 minutes</p>
                  </div>
                </a>

                <a 
                  href="tel:+33123456789" 
                  className="quick-action-card"
                >
                  <div className="quick-action-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="quick-action-content">
                    <h4 className="quick-action-title">Appel Direct</h4>
                    <p className="quick-action-description">01 23 45 67 89</p>
                  </div>
                </a>

                <a 
                  href="/tarifs" 
                  className="quick-action-card"
                >
                  <div className="quick-action-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="quick-action-content">
                    <h4 className="quick-action-title">Devis Personnalisé</h4>
                    <p className="quick-action-description">Tarifs clubs et événements</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="section-header">
            <h2 className="section-title">
              Questions <span className="gradient-text">Fréquentes</span>
            </h2>
            <p className="section-subtitle">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <div className="faq-content">
                  <div className="faq-icon">
                    <i className="fas fa-comment"></i>
                  </div>
                  <div className="faq-text">
                    <h3 className="faq-question">{faq.question}</h3>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-footer">
            <p className="faq-footer-text">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a href="#contact-form" className="faq-contact-btn">
              <i className="fas fa-comment"></i>
              <span>Contactez-nous</span>
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="contact-section contact-section-gray">
        <div className="contact-container">
          <div className="emergency-contact">
            <h2 className="emergency-title">
              Contact d'Urgence
            </h2>
            <p className="emergency-subtitle">
              Pour toute urgence pendant vos créneaux de jeu
            </p>
            <div className="emergency-card">
              <div className="emergency-content">
                <div className="emergency-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="emergency-info">
                  <div className="emergency-number">06 12 34 56 78</div>
                  <div className="emergency-availability">Disponible 24h/24</div>
                </div>
              </div>
              <p className="emergency-note">
                En cas d'urgence médicale, appelez directement le 15 (SAMU)
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </div>
  );
};

export default Contact;