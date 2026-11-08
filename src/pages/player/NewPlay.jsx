import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, CalendarPlus, Filter, MapPin, Calendar, Users, Zap, ChevronRight } from 'lucide-react';
import { filterPersonalizedItems, getPersonalizationPreferences, normalizePersonalizationValue } from '../../utils/personalization';
import './NewPlay.css';

const demoSessions = [
  { id: 1, title: 'Match Foot 7vs7 - Tous niveaux', sport: 'Football', date: "Aujourd'hui · 20:00", location: 'Terrain Al Qods, Casablanca', city: 'Casablanca', quartier: 'Centre', filled: 8, total: 14, level: 'Intermédiaire', price: '40 Dhs', community: 'Casa Football Amateurs' },
  { id: 2, title: 'Padel mixte - Débutants bienvenus', sport: 'Padel', date: 'Demain · 18:30', location: 'Padel Center, Casablanca', city: 'Casablanca', quartier: 'Maarif', filled: 3, total: 4, level: 'Débutant', price: '80 Dhs', community: 'Padel Club Maarif' },
  { id: 3, title: 'Basket 5x5 - Session hommes', sport: 'Basketball', date: 'Vendredi · 21:00', location: 'Salle Sports Medina, Casablanca', city: 'Casablanca', quartier: 'Médina', filled: 7, total: 10, level: 'Confirmé', price: '35 Dhs', community: null },
  { id: 4, title: 'Running groupe 8km - Anfa', sport: 'Running', date: 'Dimanche · 08:00', location: 'Corniche Anfa, Casablanca', city: 'Casablanca', quartier: 'Anfa', filled: 18, total: 30, level: 'Tous niveaux', price: 'Gratuit', community: 'Runners Anfa Sunrise' },
  { id: 5, title: 'Futsal - Petit terrain', sport: 'Futsal', date: 'Lundi · 19:30', location: 'FootCenter Aïn Sebaâ, Casablanca', city: 'Casablanca', quartier: 'Ain Sebaa', filled: 4, total: 10, level: 'Intermédiaire', price: '30 Dhs', community: null },
  { id: 6, title: 'Tennis - Double mixte', sport: 'Tennis', date: 'Mardi · 17:00', location: 'Tennis Club Oasis, Casablanca', city: 'Casablanca', quartier: 'Oasis', filled: 2, total: 4, level: 'Débutant', price: '60 Dhs', community: null }
];

export default function NewPlay() {
  const [preferences] = useState(getPersonalizationPreferences);
  const [sportFilter, setSportFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const preferredSports = preferences.sports;
  const personalizedSessions = filterPersonalizedItems(demoSessions, preferences);
  const availableSports = [...new Set(personalizedSessions.map((session) => session.sport))];
  const normalizedSearch = normalizePersonalizationValue(searchTerm);
  const visibleSessions = personalizedSessions.filter((session) => {
    const matchesSport = !sportFilter || normalizePersonalizationValue(session.sport) === sportFilter;
    const matchesSearch = !normalizedSearch || normalizePersonalizationValue(
      `${session.title} ${session.location} ${session.community || ''}`
    ).includes(normalizedSearch);
    return matchesSport && matchesSearch;
  });

  return (
    <div className="pf-play">
      <section className="pf-play__hero">
        <div className="pf-play__container pf-play__hero-inner">
          <div>
            <span className="pf-play__eyebrow"><Zap size={14} /> Action en cours</span>
            <h1>Tu veux jouer ?</h1>
            <p className="pf-play__subtitle">
              Trouve une session {preferences.city ? `à ${preferences.city}` : 'près de toi'} dans tes sports préférés.
            </p>
            <div className="pf-play__hero-ctas">
              <Link to="/sessions" className="pf-play__cta pf-play__cta--primary">
                <Search size={18} /> Trouver une session
              </Link>
              <Link to="/reservation" className="pf-play__cta pf-play__cta--secondary">
                <CalendarPlus size={18} /> Créer une session
              </Link>
            </div>
          </div>

          <div className="pf-play__quick-stats">
            <div><strong>{visibleSessions.length}</strong><span>sessions pour toi</span></div>
            <div><strong>{preferredSports.length || 'Tous'}</strong><span>{preferredSports.length === 1 ? 'sport préféré' : 'sports préférés'}</span></div>
            <div><strong>{preferences.city || 'Maroc'}</strong><span>ta zone</span></div>
          </div>
        </div>
      </section>

      <section className="pf-play__container pf-play__filters">
        <form className="pf-play__search" onSubmit={(event) => event.preventDefault()}>
          <Search size={18} className="pf-play__icon" />
          <input
            type="search"
            placeholder="Sport, lieu, communauté..."
            className="pf-play__search-input"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className="pf-play__search-btn" type="submit">Rechercher</button>
        </form>

        <div className="pf-play__filter-row" aria-label="Préférences appliquées">
          <span className="pf-play__filter"><MapPin size={14} /> {preferences.city || 'Toutes les villes'}</span>
          <span className="pf-play__filter"><Calendar size={14} /> Cette semaine</span>
          <span className="pf-play__filter"><Users size={14} /> Tous niveaux</span>
          <span className="pf-play__filter pf-play__filter--ghost"><Filter size={14} /> Sports préférés</span>
        </div>

        <div className="pf-play__chips" role="toolbar" aria-label="Filtrer par sport">
          {['', ...availableSports].map((sport) => (
            <button
              key={sport || 'all'}
              type="button"
              className={`pf-play__chip ${sportFilter === normalizePersonalizationValue(sport) ? 'is-active' : ''}`}
              onClick={() => setSportFilter(normalizePersonalizationValue(sport))}
            >
              {sport ? sport : preferredSports.length ? 'Tous mes sports' : 'Tous'}
            </button>
          ))}
        </div>
      </section>

      <section className="pf-play__container pf-play__section">
        <div className="pf-play__section-head">
          <h2>Sessions disponibles</h2>
          <span className="pf-play__count">{visibleSessions.length} sessions</span>
        </div>
        <div className="pf-play__list">
          {visibleSessions.length === 0 ? (
            <p className="pf-play__empty">Aucune session ne correspond à ta ville et à tes sports préférés.</p>
          ) : visibleSessions.map((session) => (
            <article key={session.id} className="pf-play__session">
              <div className="pf-play__sport-col">
                <span className={`pf-play__sport pf-play__sport--${session.sport.toLowerCase()}`}>{session.sport}</span>
                <span className="pf-play__level">{session.level}</span>
              </div>
              <div className="pf-play__main">
                <h3>{session.title}</h3>
                <div className="pf-play__meta">
                  <span><Calendar size={14} /> {session.date}</span>
                  <span><MapPin size={14} /> {session.location}</span>
                </div>
                {session.community && <span className="pf-play__community">{session.community}<ChevronRight size={14} /></span>}
              </div>
              <div className="pf-play__right">
                <div className="pf-play__players">
                  <div className="pf-play__progress">
                    <div className="pf-play__progress-fill" style={{ width: `${(session.filled / session.total) * 100}%` }} />
                  </div>
                  <span className="pf-play__count-label">{session.filled}/{session.total} joueurs</span>
                </div>
                <div className="pf-play__bottom">
                  <span className="pf-play__price">{session.price}</span>
                  <Link to="/sessions" className="pf-play__join">Rejoindre</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
