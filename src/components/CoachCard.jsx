import React, { useState } from 'react';
import {
  Star, MapPin, Clock, Award, ChevronDown, ChevronUp,
  Trophy, Users, Calendar, CheckCircle,
} from 'lucide-react';
import { getCoachInitials } from '../data/coaches';
import './CoachCard.css';

const SkillRing = ({ label, value, color }) => (
  <div className="coach-skill-item">
    <div className="coach-skill-ring" style={{ '--pct': value, '--color': color }}>
      <svg viewBox="0 0 36 36">
        <path className="coach-skill-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path className="coach-skill-fill" strokeDasharray={`${value}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
      <span className="coach-skill-value">{value}</span>
    </div>
    <span className="coach-skill-label">{label}</span>
  </div>
);

const CoachCard = ({ coach, recommended = false, onBook }) => {
  const [expanded, setExpanded] = useState(false);
  const [booked, setBooked] = useState(false);
  const initials = getCoachInitials(coach.name);
  const [color1, color2] = coach.colors;

  const handleBook = () => {
    setBooked(true);
    if (onBook) onBook(coach);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div className={`coach-card ${recommended ? 'recommended' : ''}`}>
      {recommended && (
        <div className="coach-recommended-badge">
          <Star size={12} /> Recommandé
        </div>
      )}

      <div className="coach-card-header">
        <div className="coach-avatar" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}>
          <span className="coach-avatar-initials">{initials}</span>
        </div>

        <div className="coach-info">
          <h3>{coach.name}</h3>
          <div className="coach-meta">
            <span className="coach-discipline">
              <Trophy size={12} /> {coach.discipline}
            </span>
            <span className="coach-rating">
              <Star size={14} fill="#FFD700" color="#FFD700" />
              {coach.rating}
            </span>
          </div>
          <div className="coach-location">
            <MapPin size={13} /> {coach.city}
          </div>
        </div>

        <div className="coach-price">
          <span className="coach-price-amount">{coach.price}</span>
          <span className="coach-price-unit">DH/h</span>
        </div>
      </div>

      {coach.dna?.length > 0 && (
        <div className="coach-profile-tags">
          <span className="coach-profile-label">Profil</span>
          {coach.dna.map((trait) => (
            <span key={trait} className="coach-profile-tag">{trait}</span>
          ))}
        </div>
      )}

      <p className="coach-bio">{coach.bio}</p>

      <div className="coach-skills">
        <SkillRing label="Technique" value={coach.skills.technique} color="#3e6c1a" />
        <SkillRing label="Pédagogie" value={coach.skills.pedagogy} color="#027e0f" />
        <SkillRing label="Motivation" value={coach.skills.motivation} color="#FFD700" />
        <SkillRing label="Expérience" value={coach.skills.experience} color="#054d0a" />
      </div>

      <button className="coach-expand-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {expanded ? 'Réduire' : 'Voir plus'}
      </button>

      {expanded && (
        <div className="coach-details">
          <div className="coach-detail-section">
            <h4><Award size={16} /> Certifications</h4>
            <div className="coach-tags">
              {coach.certifications.map(c => (
                <span key={c} className="coach-tag cert">{c}</span>
              ))}
            </div>
          </div>

          <div className="coach-detail-section">
            <h4>Spécialités</h4>
            <div className="coach-tags">
              {coach.specialties.map(s => (
                <span key={s} className="coach-tag spec">{s}</span>
              ))}
            </div>
          </div>

          <div className="coach-detail-section">
            <h4><Trophy size={16} /> Parcours</h4>
            <div className="coach-timeline">
              {coach.career.map((step, i) => (
                <div key={i} className="coach-timeline-item">
                  <div className="coach-timeline-dot" />
                  <div className="coach-timeline-content">
                    <span className="coach-timeline-year">{step.year}</span>
                    <strong>{step.role}</strong>
                    <span>{step.club}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="coach-detail-row">
            <div><Clock size={14} /> {coach.availability}</div>
            <div><Users size={14} /> Langues: {coach.languages.join(', ')}</div>
            <div><Award size={14} /> {coach.experience} d'expérience</div>
          </div>
        </div>
      )}

      <button className={`coach-book-btn ${booked ? 'booked' : ''}`} onClick={handleBook} disabled={booked}>
        {booked ? (
          <><CheckCircle size={18} /> Réservé !</>
        ) : (
          <><Calendar size={18} /> Réserver ce coach</>
        )}
      </button>
    </div>
  );
};

export default CoachCard;