import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';
import { createSessionFromReservation } from '../utils/sessionStorage';
import './PostReservationModal.css';

const PostReservationModal = ({ isOpen, onClose, onComplete, reservation, creneau }) => {
  const { t } = useLanguage();
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
    setMessage(t.postReservation.sessionCreated);
    setTimeout(() => {
      navigate('/sessions', { state: { highlightSession: Date.now(), sport } });
      finish();
    }, 1200);
  };

  const handleCoach = () => {
    setMessage(t.postReservation.redirectCoach);
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
          <h2>{t.postReservation.title}</h2>
          <p>{t.postReservation.subtitle}</p>
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
                <h3>{t.postReservation.needMatch}</h3>
                <p>{t.postReservation.needMatchDesc}</p>
              </div>
              <ArrowRight size={18} />
            </button>

            <button className="post-res-card" onClick={handleCoach} disabled={loading}>
              <div className="post-res-icon-wrap"><GraduationCap size={28} /></div>
              <div className="post-res-card-content">
                <h3>{t.postReservation.needCoach}</h3>
                <p>{t.postReservation.needCoachDesc}</p>
              </div>
              <ArrowRight size={18} />
            </button>

            <button className="post-res-skip" onClick={handleSkip}>{t.postReservation.skip}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostReservationModal;
