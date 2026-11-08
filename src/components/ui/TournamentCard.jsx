import { useState } from 'react';
import { Calendar, MapPin, Users, Trophy, CheckCircle, XCircle, Crown, Medal } from 'lucide-react';
import './TournamentCard.css';

export default function TournamentCard({ tournament, onRegister, isLoading }) {
  const {
    name,
    description,
    sport,
    status,
    date,
    endDate,
    location,
    fee,
    teamsJoined = [],
    teamsNeeded = 0,
    prize,
  } = tournament;

  const [showModal, setShowModal] = useState(false);

  const progress = Math.min(100, ((teamsJoined.length || 0) / (teamsNeeded || 1)) * 100);
  const spotsLeft = Math.max(0, (teamsNeeded || 0) - (teamsJoined.length || 0));
  const isFull = spotsLeft <= 0 || status === 'full';
  const isCancelled = status === 'cancelled';
  const isCompleted = status === 'completed';

  const getStatusColor = () => {
    if (isCancelled) return '#ef4444';
    if (isFull) return '#f59e0b';
    if (isCompleted) return '#059669';
    return '#10b981';
  };

  const getStatusLabel = () => {
    if (isCancelled) return 'Annule';
    if (isFull) return 'Complet';
    if (isCompleted) return 'Termine';
    return 'Ouvert';
  };

  const handleRegister = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return '';
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <span className="pf-tournament-card__loading-spinner" />
          Inscription...
        </>
      );
    }
    if (isFull) {
      return <><XCircle size={18} /> Complet</>;
    }
    return <><CheckCircle size={18} /> S'inscrire</>;
  };

  return (
    <>
      <article className="pf-tournament-card">
        <div className="pf-tournament-card__header">
          <div className="pf-tournament-card__sport-badge">
            <Trophy size={20} />
            <span>{sport}</span>
          </div>
          <div className="pf-tournament-card__status-badge" style={{ backgroundColor: getStatusColor() }}>
            {getStatusLabel()}
          </div>
        </div>

        <h3 className="pf-tournament-card__title">{name}</h3>

        {description && (
          <p className="pf-tournament-card__description">
            {description.length > 120 ? description.slice(0, 120) + '...' : description}
          </p>
        )}

        <div className="pf-tournament-card__details">
          <div className="pf-tournament-card__detail">
            <Calendar size={16} />
            <span>
              {formatDate(date)}
              {endDate && endDate !== date ? ' - ' + formatDate(endDate) : ''}
            </span>
          </div>
          <div className="pf-tournament-card__detail">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
          <div className="pf-tournament-card__detail">
            <Users size={16} />
            <span>{teamsJoined.length}/{teamsNeeded} equipes</span>
          </div>
          {prize && (
            <div className="pf-tournament-card__detail pf-tournament-card__detail--prize">
              <Medal size={16} />
              <span>{prize} EUR</span>
            </div>
          )}
        </div>

        <div className="pf-tournament-card__progress-section">
          <div className="pf-tournament-card__progress-label">
            <span>Inscriptions</span>
            <span>{spotsLeft} places restantes</span>
          </div>
          <div className="pf-tournament-card__progress-bar">
            <div className="pf-tournament-card__progress-fill" style={{ width: progress + '%' }} />
          </div>
        </div>

        {!isCancelled && !isCompleted && (
          <div className="pf-tournament-card__actions">
            {fee && <span className="pf-tournament-card__fee">{fee} DH</span>}
            <button
              className={`pf-tournament-card__register-btn ${isFull ? 'is-full' : ''} ${isLoading ? 'is-loading' : ''}`}
              onClick={handleRegister}
              disabled={isFull || isLoading}
            >
              {getButtonContent()}
            </button>
          </div>
        )}

        {isCompleted && (
          <div className="pf-tournament-card__completed">
            <Crown size={18} /> Tournoi termine
          </div>
        )}
      </article>

      {showModal && (
        <div className="pf-modal-overlay" onClick={handleCloseModal} role="presentation">
          <div className="pf-modal pf-modal--md" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="pf-modal__header">
              <h2 className="pf-modal__title">Inscription au tournoi</h2>
              <button className="pf-modal__close" onClick={handleCloseModal} aria-label="Fermer">
                <XCircle size={20} />
              </button>
            </div>
            <div className="pf-modal__body">
              <p style={{ color: '#64748b', fontSize: '14px' }}>
                Formulaire pour <strong style={{ color: '#0f172a' }}>{name}</strong>
              </p>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '8px' }}>
                Ce formulaire sera connecte a votre backend API.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
