import React, { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Users, 
  Star, 
  Award, 
  Filter,
  Loader,
  Trophy,
  Sparkles
} from 'lucide-react';
import CoachCard from '../components/CoachCard';
import { getCoaches, getCoachesByDiscipline, getRecommendedCoaches } from '../data/coaches';
import './coaches.css';

const DISCIPLINES = ['football', 'tennis', 'basketball', 'volleyball', 'handball', 'padel', 'badminton'];

const Coaches = () => {
  const location = useLocation();
  const recommendedSport = location.state?.recommendedSport || '';
  
  const [discipline, setDiscipline] = useState(recommendedSport);
  const [coaches, setCoaches] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les coaches
  const loadCoaches = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      let data;
      if (discipline) {
        data = await getCoachesByDiscipline(discipline);
      } else {
        data = await getCoaches();
      }
      
      setCoaches(data);
    } catch (err) {
      console.error('Erreur lors du chargement des coaches:', err);
      setError('Impossible de charger les coaches. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }, [discipline]);

  // Charger les coaches recommandés
  const loadRecommended = useCallback(async () => {
    try {
      if (recommendedSport) {
        const data = await getRecommendedCoaches(recommendedSport);
        setRecommended(data);
      } else {
        setRecommended([]);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des coaches recommandés:', err);
    }
  }, [recommendedSport]);

  useEffect(() => {
    loadCoaches();
    loadRecommended();
  }, [loadCoaches, loadRecommended]);

  // Gérer le changement de discipline
  const handleDisciplineChange = (newDiscipline) => {
    setDiscipline(newDiscipline);
  };

  // Afficher le loader
  if (loading) {
    return (
      <div className="ch-page">
        <div className="ch-page-main">
          <div className="ch-loading">
            <Loader className="ch-loading-spinner" size={48} />
            <p>Chargement des coaches...</p>
          </div>
        </div>
      </div>
    );
  }

  // Afficher l'erreur
  if (error) {
    return (
      <div className="ch-page">
        <div className="ch-page-main">
          <div className="ch-error">
            <p>{error}</p>
            <button onClick={loadCoaches} className="ch-retry-btn">
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ch-page">
      <div className="ch-page-main">
        {/* Hero Section */}
        <section className="ch-hero">
          <div className="ch-hero-content">
            <div className="ch-hero-badge">
              <span>Expert Coaches</span>
            </div>
            <h1 className="ch-hero-title">
              Nos <span className="ch-hero-gold">Coachs</span> d'Exception
            </h1>
            <p className="ch-hero-subtitle">
              Des professionnels passionnés pour vous accompagner vers l'excellence
            </p>
            <div className="ch-hero-stats">
              <div className="ch-hero-stat">
                <Users size={20} />
                <span>{coaches.length} Coachs</span>
              </div>
              <div className="ch-hero-stat">
                <Award size={20} />
                <span>Experts Certifiés</span>
              </div>
              <div className="ch-hero-stat">
                <Star size={20} />
                <span>4.8 / 5</span>
              </div>
            </div>
          </div>
          <div className="ch-hero-decoration">
            <div className="ch-orbital-ring"></div>
            <div className="ch-orbital-ring"></div>
            <div className="ch-orbital-ring"></div>
          </div>
        </section>

        {/* Recommended Section */}
        {recommended.length > 0 && (
          <section className="ch-recommended">
            <div className="ch-recommended-header">
              <div className="ch-recommended-badge">
                <Sparkles size={16} />
                <span>Recommandés pour vous</span>
              </div>
              <p className="ch-recommended-desc">
                Les meilleurs coaches pour : <strong>{recommendedSport}</strong>
              </p>
            </div>
            <div className="ch-grid">
              {recommended.map(coach => (
                <CoachCard key={coach.id} coach={coach} recommended />
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="ch-filters">
          <div className="ch-filter-group">
            <label>
              <Filter size={16} />
              Filtrer par discipline
            </label>
            <div className="ch-filter-tabs">
              <button 
                className={`ch-filter-tab ${!discipline ? 'active' : ''}`}
                onClick={() => handleDisciplineChange('')}
              >
                Tous
              </button>
              {DISCIPLINES.map(d => (
                <button 
                  key={d}
                  className={`ch-filter-tab ${discipline === d ? 'active' : ''}`}
                  onClick={() => handleDisciplineChange(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Coaches Grid */}
        {coaches.length === 0 ? (
          <div className="ch-empty">
            <div className="ch-empty-icon">
              <Trophy size={64} />
            </div>
            <h3>Aucun coach disponible</h3>
            <p>Essayez de modifier vos filtres de recherche</p>
          </div>
        ) : (
          <div className="ch-grid">
            {coaches.map(coach => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coaches;