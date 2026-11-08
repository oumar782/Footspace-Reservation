import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, ArrowRight, CheckCircle, X } from 'lucide-react';
import { createSessionFromReservation } from '../utils/sessionStorage';
import './PostReservationModal.css';

const PostReservationModal = ({ isOpen, onClose, onComplete, reservation, creneau, inline = false }) => {
  const navigate = useNavigate();
  
  // ✅ TOUS LES HOOKS SONT APPELÉS ICI - AVANT TOUT RETURN CONDITIONNEL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  // Nettoyer le composant quand il se ferme
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setMessage('');
      setIsClosing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        console.log('Veuillez choisir une option pour continuer');
        if (onClose) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // ✅ TOUTES LES FUNCTIONS SONT DÉFINIES AVEC useCallback ICI
  // Même si elles utilisent des variables qui pourraient être undefined
  const finish = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else if (onClose) {
        onClose();
      }
      setIsClosing(false);
    }, 300);
  }, [onComplete, onClose]);

  // Calcul du sport même si reservation est null (fallback)
  const sport = reservation?.typeterrain || 
                creneau?.typeterrain || 
                creneau?.typeTerrain || 
                'football';

  const handleMatch = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setMessage('Création de la session en cours...');
    
    try {
      if (typeof createSessionFromReservation === 'function') {
        createSessionFromReservation(reservation, creneau);
      } else {
        console.warn('createSessionFromReservation n\'est pas définie');
        const sessionData = {
          id: Date.now(),
          sport: sport,
          date: reservation?.datecreneaux || reservation?.date || new Date().toISOString(),
          heure: reservation?.heure || '00:00',
          terrain: reservation?.numeroterrain || creneau?.numeroterrain || '1',
          participants: [],
          maxParticipants: 10,
          createdBy: 'user',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('currentSession', JSON.stringify(sessionData));
      }
      
      setMessage('✅ Session créée avec succès !');
      
      setTimeout(() => {
        navigate('/sessions', { state: { highlightSession: Date.now(), sport } });
        finish();
      }, 1500);
    } catch (error) {
      console.error('Erreur création session:', error);
      setMessage('❌ Erreur lors de la création de la session');
      setLoading(false);
    }
  }, [loading, reservation, creneau, sport, navigate, finish]);

  const handleCoach = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setMessage('🔄 Redirection vers les coachs...');
    
    setTimeout(() => {
      navigate('/coaches', { state: { recommendedSport: sport } });
      finish();
    }, 800);
  }, [loading, sport, navigate, finish]);

  const handleSkip = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setMessage('🔄 Redirection vers vos réservations...');
    
    setTimeout(() => {
      navigate('/consultation-reservation');
      finish();
    }, 600);
  }, [loading, navigate, finish]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      console.log('Veuillez choisir une option pour continuer');
      const container = e.currentTarget.querySelector('.post-res-container');
      if (container) {
        container.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
          container.style.animation = '';
        }, 500);
      }
    }
  }, []);

  // ⚠️ LE RETURN CONDITIONNEL VIENT MAINTENANT - APRÈS TOUS LES HOOKS
  if (!isOpen || !reservation) {
    return null;
  }

  // 🔥 TOUS LES HOOKS SONT DÉFINIS - LE RENDU PEUT MAINTENANT AVOIR LIEU
  const showSuccess = message && !loading;

  const content = (
    <div className={`post-res-container ${isClosing ? 'closing' : ''} ${inline ? 'post-res-inline-container' : ''}`}>
      <button 
        className="post-res-close" 
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <X size={24} />
      </button>

      <div className="post-res-header">
        <CheckCircle className="post-res-icon" size={40} />
        <h2>Réservation confirmée !</h2>
        <p>Votre créneau a été réservé avec succès</p>
      </div>

      {loading && !showSuccess && (
        <div className="post-res-success">
          <div className="success-spinner"></div>
          <p>{message || 'Traitement en cours...'}</p>
        </div>
      )}

      {showSuccess && (
        <div className="post-res-success">
          <CheckCircle size={48} className="success-icon" />
          <p>{message}</p>
        </div>
      )}

      {!loading && !message && (
        <>
          <div className="post-res-subtitle">
            <p>Que souhaitez-vous faire maintenant ?</p>
          </div>

          <div className="post-res-options">
            <button 
              className="post-res-card" 
              onClick={handleMatch}
              disabled={loading}
            >
              <div className="post-res-icon-wrap"><Users size={28} /></div>
              <div className="post-res-card-content">
                <h3>Chercher un match</h3>
                <p>Trouvez des joueurs pour jouer ensemble</p>
              </div>
              <ArrowRight size={18} className="post-res-arrow" />
            </button>

            <button 
              className="post-res-card" 
              onClick={handleCoach}
              disabled={loading}
            >
              <div className="post-res-icon-wrap"><GraduationCap size={28} /></div>
              <div className="post-res-card-content">
                <h3>Prendre un coach</h3>
                <p>Améliorez votre niveau avec un coach</p>
              </div>
              <ArrowRight size={18} className="post-res-arrow" />
            </button>
          </div>

          <button 
            className="post-res-skip" 
            onClick={handleSkip}
            disabled={loading}
          >
            Passer pour l'instant
          </button>

          <p className="post-res-hint">
             Vous pourrez retrouver cette réservation dans votre espace personnel
          </p>
        </>
      )}
    </div>
  );

  if (inline) {
    return <div className="post-res-inline-wrapper">{content}</div>;
  }

  return <div className="post-res-overlay" onClick={handleOverlayClick}>{content}</div>;
};

export default PostReservationModal;