import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, ChevronRight, Sparkles, Target, Users, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './Onboarding.css';

const SPORT_CATEGORIES = [
  { id: 'football', label: 'Football', icon: '⚽', color: '#10b981' },
  { id: 'padel', label: 'Padel', icon: '🎾', color: '#06b6d4' },
  { id: 'basketball', label: 'Basketball', icon: '🏀', color: '#f59e0b' },
  { id: 'running', label: 'Running', icon: '🏃', color: '#8b5cf6' },
  { id: 'tennis', label: 'Tennis', icon: '🎾', color: '#ec4899' },
  { id: 'futsal', label: 'Futsal', icon: '⚽', color: '#14b8a8' },
  { id: 'boxe', label: 'Boxe', icon: '🥊', color: '#ef4444' },
  { id: 'cycling', label: 'Vélo', icon: '🚴', color: '#3b82f6' },
  { id: 'volleyball', label: 'Volleyball', icon: '🏐', color: '#3b82f6' },
  { id: 'handball', label: 'Handball', icon: '🤾', color: '#10b981' }
];

const SKILL_LEVELS = [
  { value: 'BEGINNER', label: 'Débutant', desc: 'Je commence tout juste ou joue pour le loisir' },
  { value: 'INTERMEDIATE', label: 'Intermédiaire', desc: 'Je connais les règles et les fondamentaux' },
  { value: 'ADVANCED', label: 'Confirmé', desc: 'Je joue régulièrement et cherche du défi' },
  { value: 'EXPERT', label: 'Expert', desc: 'Compétiteur pro / niveau universitaire' },
];

const INTEREST_TAGS = [
  'Tournois', 'Matchs amicaux', 'Entraînements', 'Stages',
  'Compétitions', 'Coaching', 'Récupération', 'Équipement',
  'Nutrition', 'Bien-être', 'Performance', 'Fun',
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedSports, setSelectedSports] = useState(['football']);
  const [skillLevel, setSkillLevel] = useState('INTERMEDIATE');
  const [location, setLocation] = useState('Casablanca');
  const [quartier, setQuartier] = useState('Maârif');
  const [interests, setInterests] = useState(['Matchs amicaux', 'Tournois']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem('playforest_token')) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const toggleSport = (id) => setSelectedSports((p) =>
    p.includes(id) ? p.filter((s) => s !== id) : [...p, id]);
  const toggleInterest = (tag) => setInterests((p) =>
    p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]);

  const handleComplete = () => {
    if (selectedSports.length === 0 || !skillLevel) return;
    setIsSubmitting(true);
    const prefs = {
      sports: selectedSports,
      skill_level: skillLevel,
      location: location || 'Casablanca',
      quartier: quartier || 'Tous les quartiers',
      interests: interests.slice(0, 8),
      onboarding_complete: true,
    };
    localStorage.setItem('playforest_prefs', JSON.stringify(prefs));
    setTimeout(() => { setIsSubmitting(false); navigate('/home', { replace: true }); }, 600);
  };

  const progress = (step / 3) * 100;

  return (
    <div className="pf-onboarding">
      <div className="pf-onboarding__progress">
        <div className="pf-onboarding__bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="pf-onboarding__card pf-glass">
        <div className="pf-onboarding__head">
          <div className="pf-onboarding__icon-spark">
            <Sparkles className="pf-onboarding__spark" size={26} />
          </div>
          <h1>Personnalise ton Profil Sportif</h1>
          <p>Étape {step} sur 3 · Filtres & Préférences sur-mesure</p>
        </div>

        <div className="pf-onboarding__body">
          {step === 1 && (
            <div className="pf-onboarding__step">
              <label className="pf-onboarding__step-label">
                <Dumbbell size={18} /> Vos Sports Favoris (Multi-sélection)
              </label>
              <p className="pf-onboarding__step-desc">Cliquez sur un ou plusieurs sports que vous pratiquez.</p>
              <div className="pf-onboarding__sport-grid">
                {SPORT_CATEGORIES.map((sport) => {
                  const isSelected = selectedSports.includes(sport.id);
                  return (
                    <button
                      key={sport.id}
                      type="button"
                      className={`pf-onboarding__sport ${isSelected ? 'pf-onboarding__sport--selected' : ''}`}
                      onClick={() => toggleSport(sport.id)}
                      style={{ '--accent': sport.color }}
                    >
                      <span className="pf-onboarding__sport-icon">{sport.icon}</span>
                      <span className="pf-onboarding__sport-name">{sport.label}</span>
                      {isSelected && <span className="pf-onboarding__check-badge">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="pf-onboarding__step">
              <label className="pf-onboarding__step-label">
                <Target size={18} /> Niveau & Localisation
              </label>
              <p className="pf-onboarding__step-desc">Sélectionne ton niveau global et ta zone géographique.</p>
              
              <div className="pf-onboarding__level-list" style={{ marginBottom: '24px' }}>
                {SKILL_LEVELS.map((lvl) => (
                  <label key={lvl.value} className={`pf-onboarding__level ${skillLevel === lvl.value ? 'pf-onboarding__level--selected' : ''}`}>
                    <input
                      type="radio"
                      name="skill"
                      value={lvl.value}
                      checked={skillLevel === lvl.value}
                      onChange={() => setSkillLevel(lvl.value)}
                    />
                    <div className="pf-onboarding__level-desc">
                      <strong>{lvl.label}</strong>
                      <span>{lvl.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="pf-onboarding__field">
                  <label htmlFor="onboarding-location">Ta ville *</label>
                  <div className="pf-onboarding__input-wrap">
                    <MapPin size={18} />
                    <input
                      id="onboarding-location"
                      type="text"
                      placeholder="Ex: Casablanca, Rabat, Marrakech"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pf-onboarding__field">
                  <label htmlFor="onboarding-quartier">Ton quartier / secteur *</label>
                  <div className="pf-onboarding__input-wrap">
                    <MapPin size={18} />
                    <input
                      id="onboarding-quartier"
                      type="text"
                      placeholder="Ex: Maârif, Agdal, Guéliz"
                      value={quartier}
                      onChange={(e) => setQuartier(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="pf-onboarding__step">
              <label className="pf-onboarding__step-label">
                <Users size={18} /> Tes Objectifs & Intérêts
              </label>
              <p className="pf-onboarding__step-desc">Que recherches-tu principalement sur PlayForest ?</p>
              <div className="pf-onboarding__tags">
                {INTEREST_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`pf-onboarding__tag ${interests.includes(tag) ? 'pf-onboarding__tag--selected' : ''}`}
                    onClick={() => toggleInterest(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pf-onboarding__nav">
          {step > 1 && (
            <button className="pf-btn pf-btn--secondary pf-btn--sm" onClick={() => setStep(step - 1)}>
              Retour
            </button>
          )}
          {step < 3 ? (
            <button
              className="pf-btn pf-btn--primary pf-btn--sm pf-onboarding__next"
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? selectedSports.length === 0 : !skillLevel || !location}
            >
              Continuer <ChevronRight size={16} />
            </button>
          ) : (
            <button
              className="pf-btn pf-btn--primary pf-btn--sm"
              onClick={handleComplete}
              disabled={isSubmitting || selectedSports.length === 0}
            >
              {isSubmitting ? 'Finalisation…' : 'Valider mes Filtres'}
            </button>
          )}
        </div>
      </div>
      <div className="pf-onboarding__skip">
        <Link to="/home" className="pf-onboarding__skip-link">Passer pour le moment</Link>
      </div>
    </div>
  );
}
