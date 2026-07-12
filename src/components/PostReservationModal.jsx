import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
import { createSessionFromReservation } from '../utils/sessionStorage';
import './PostReservationModal.css';

const PostReservationModal = ({ isOpen, onClose, onComplete, reservation, creneau }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen || !reservation) return null;

  const sport = reservation.typeterrain || creneau?.typeTerrain || 'football';

  const finish = () => {
    if (onComplete) onComplete();
    else onClose();
  };

  const handleMatch = () => {
    setLoading(true);
    createSessionFromReservation(reservation, creneau);
    setMessage('Session créée avec succès !');
    setTimeout(() => {
      navigate('/sessions', { state: { highlightSession: Date.now(), sport } });
      finish();
    }, 1200);
  };

  const handleCoach = () => {
    setMessage('Redirection vers les coachs...');
    setTimeout(() => {
      navigate('/coaches', { state: { recommendedSport: sport } });
      finish();
    }, 800);
  };

  const handleSkip = () => {
    navigate('/consultation-reservation');
    finish();
  };

  return (
    <div className="post-res-overlay">
      <div className="post-res-container">
        <div className="post-res-header">
          <CheckCircle className="post-res-icon" size={32} />
          <h2>Réservation confirmée !</h2>
          <p>Que souhaitez-vous faire maintenant ?</p>
        </div>

        {message ? (
          <div className="post-res-success">
            <CheckCircle size={40} />
            <p>{message}</p>
          </div>
        ) : (
          <div className="post-res-options">
            <button className="post-res-card" onClick={handleMatch} disabled={loading}>
              <div className="post-res-icon-wrap"><Users size={28} /></div>
              <div className="post-res-card-content">
                <h3>Chercher un match</h3>
                <p>Trouvez des joueurs pour jouer ensemble</p>
              </div>
              <ArrowRight size={18} />
            </button>

            <button className="post-res-card" onClick={handleCoach} disabled={loading}>
              <div className="post-res-icon-wrap"><GraduationCap size={28} /></div>
              <div className="post-res-card-content">
                <h3>Prendre un coach</h3>
                <p>Améliorez votre niveau avec un coach</p>
              </div>
              <ArrowRight size={18} />
            </button>

            <button className="post-res-skip" onClick={handleSkip}>
              Passer pour l'instant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostReservationModal;