import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, CalendarPlus, Search, Trophy, UserCheck, MapPin, Dumbbell, Star, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import Feed from '../../components/Feed/Feed.jsx';
import './NewHome.css';
import { filterPersonalizedItems, getPersonalizationPreferences } from '../../utils/personalization';
import { formatSession, getSessions } from '../../utils/sessionStorage';

const COMMUNITIES_API_URL = import.meta.env.VITE_COMMUNITIES_API_URL || '/api/communities';

export default function NewHome() {
  const [userPrefs, setUserPrefs] = useState(null);
  const [userName, setUserName] = useState('Sportif');
  const [communities, setCommunities] = useState([]);
  const [communitiesLoading, setCommunitiesLoading] = useState(true);
  const [communitiesError, setCommunitiesError] = useState('');
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  useEffect(() => {
    // Lecture des préférences d'onboarding enregistrées lors de l'inscription
    const storedPrefs = localStorage.getItem('playforest_prefs');
    const storedUser = localStorage.getItem('playforest_user');
    
    if (storedPrefs) {
      try {
        setUserPrefs(JSON.parse(storedPrefs));
      } catch (e) {
        console.error('Erreur lecture prefs', e);
      }
    }
    
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u?.name || u?.full_name) setUserName(u.name || u.full_name);
      } catch (e) {
        console.error('Erreur lecture user', e);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadCommunities = async () => {
      try {
        const token = localStorage.getItem('playforest_token') || localStorage.getItem('token');
        const response = await fetch(COMMUNITIES_API_URL, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          const apiError = data?.error?.message || data?.error || data?.message || data?.errors;
          throw new Error(typeof apiError === 'string' ? apiError : JSON.stringify(apiError) || `Erreur ${response.status}`);
        }
        if (!cancelled) setCommunities(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        if (!cancelled) setCommunitiesError(error.message);
      } finally {
        if (!cancelled) setCommunitiesLoading(false);
      }
    };

    loadCommunities();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadSessions = async () => {
      try {
        const data = await getSessions();
        if (!cancelled) {
          setSessions(filterPersonalizedItems(data.map(formatSession), getPersonalizationPreferences()));
        }
      } finally {
        if (!cancelled) setSessionsLoading(false);
      }
    };

    loadSessions();
    return () => { cancelled = true; };
  }, []);

  const sportsFilter = Array.isArray(userPrefs?.sports) ? userPrefs.sports : userPrefs?.sports ? [userPrefs.sports] : ['football'];
  const userCity = userPrefs?.location || 'Casablanca';
  const preferences = getPersonalizationPreferences();
  const personalizedCommunities = filterPersonalizedItems(communities, preferences);
  const personalizedSessions = filterPersonalizedItems(sessions, preferences);

  return (
    <div className="pf-home">
      {/* Hero Immersif avec Personnalisation */}
      <section className="pf-home__hero">
        <div className="pf-home__hero-inner">
          <div className="pf-home__hero-copy">
            {userPrefs?.onboarding_complete ? (
              <div className="pf-home__badge-pref">
                <Sparkles size={14} className="pf-home__spark-icon" />
                <span>Expérience personnalisée · {userCity} ({sportsFilter.join(', ')})</span>
              </div>
            ) : (
              <div className="pf-home__eyebrow">
                <span className="pf-home__eyebrow-dot" />
                Nouvelle saison · Communauté PlayForest
              </div>
            )}

            <h1 className="pf-home__title">
              BIENVENUE {userName.toUpperCase()} ! <br />
              <span>TON SPORT. TA PASSION.</span>
            </h1>
            <p className="pf-home__subtitle">
              Réserves tes terrains à {userCity}, rejoins des matchs adaptés à ton niveau et domine la compétition.
            </p>

            <div className="pf-home__hero-ctas">
              <Link to="/play" className="pf-home__cta pf-home__cta--primary">
                <Search size={18} /> Trouver une session
              </Link>
              <Link to="/explore/fields" className="pf-home__cta pf-home__cta--secondary">
                <MapPin size={18} /> Réserver un terrain
              </Link>
            </div>

            <div className="pf-home__hero-stats">
              <div>
                <strong>1 284</strong>
                <span>joueurs actifs</span>
              </div>
              <div className="pf-home__stat-sep" />
              <div>
                <strong>128</strong>
                <span>sessions cette semaine</span>
              </div>
              <div className="pf-home__stat-sep" />
              <div>
                <strong>24</strong>
                <span>tournois à venir</span>
              </div>
            </div>
          </div>

          <div className="pf-home__hero-art" aria-hidden="true">
            <div className="pf-home__blob pf-home__blob--1" />
            <div className="pf-home__blob pf-home__blob--2" />
            <div className="pf-home__card-stack">
              <div className="pf-home__stack-card pf-home__stack-card--1">
                <div className="pf-home__stack-avatars">
                  <span>Y</span><span>A</span><span>M</span>
                </div>
                <div>
                  <p>Match {sportsFilter[0] ? sportsFilter[0].toUpperCase() : 'FOOTBALL'} · Ce soir 20h</p>
                  <span>8 / 14 joueurs · {userCity}</span>
                </div>
              </div>
              <div className="pf-home__stack-card pf-home__stack-card--2">
                <div className="pf-home__stack-icon"><Trophy size={16} /></div>
                <div>
                  <p>Tournoi Open {userCity}</p>
                  <span>Samedi · 16 équipes engagées</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Raccourcis d'actions rapides */}
      <section className="pf-home__section">
        <div className="pf-home__container">
          <h2 className="pf-home__section-title">
            Que veux-tu faire aujourd'hui ?
          </h2>

          <div className="pf-home__actions">
            <Link to="/play" className="pf-home__action-card pf-home__action-card--green">
              <div className="pf-home__action-icon"><Users size={22} /></div>
              <h3>Trouver des joueurs</h3>
              <p>Rejoins une session de match près de chez toi.</p>
              <span className="pf-home__action-cta">Explorer →</span>
            </Link>

            <Link to="/explore/fields" className="pf-home__action-card pf-home__action-card--blue">
              <div className="pf-home__action-icon"><MapPin size={22} /></div>
              <h3>Réserver un terrain</h3>
              <p>Trouve et réserve le meilleur complexe à {userCity}.</p>
              <span className="pf-home__action-cta">Réserver →</span>
            </Link>

            <Link to="/explore/tournaments" className="pf-home__action-card pf-home__action-card--orange">
              <div className="pf-home__action-icon"><Trophy size={22} /></div>
              <h3>Rejoindre un tournoi</h3>
              <p>Inscris ton équipe aux prochaines compétitions.</p>
              <span className="pf-home__action-cta">Voir les tournois →</span>
            </Link>

            <Link to="/explore/coaches" className="pf-home__action-card pf-home__action-card--violet">
              <div className="pf-home__action-icon"><Dumbbell size={22} /></div>
              <h3>Trouver un coach</h3>
              <p>Perfectionne tes compétences avec un entraîneur certifié.</p>
              <span className="pf-home__action-cta">Chercher un coach →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Communautés Filtrées */}
      <section className="pf-home__section pf-home__section--communities">
        <div className="pf-home__container">
          <div className="pf-home__section-head">
            <div>
              <h2 className="pf-home__section-title">Communautés créées</h2>
              <p className="pf-home__section-sub">
                Les communautés disponibles pour rejoindre ou découvrir.
              </p>
            </div>
            <Link to="/communities" className="pf-home__see-all">
              Voir toutes les communautés →
            </Link>
          </div>

          <div className="pf-home__communities">
            {communitiesLoading ? (
              <p>Chargement des communautés...</p>
            ) : communitiesError ? (
              <p role="alert">{communitiesError}</p>
            ) : personalizedCommunities.length === 0 ? (
              <p>Aucune communauté créée pour l'instant.</p>
            ) : personalizedCommunities.map((community) => {
                const sport = community.sport || 'Sport';
                const color = sport.toLowerCase() === 'padel' ? 'blue' : ['tennis', 'basketball'].includes(sport.toLowerCase()) ? 'orange' : 'green';
                const location = community.location || [community.city, community.quartier].filter(Boolean).join(' · ');
                const members = community.membersCount ?? community.members_count ?? community.members ?? 0;

                return (
                <article key={community.id} className={`pf-home__community pf-home__community--${color}`}>
                  <div className="pf-home__community-cover" />
                  <div className="pf-home__community-body">
                    <span className="pf-home__sport-tag">{sport}</span>
                    <h3>{community.name}</h3>
                    <p className="pf-home__community-loc">{location}</p>
                    <div className="pf-home__community-foot">
                      <div className="pf-home__community-members">
                        <UserCheck size={14} /> {members} membres
                      </div>
                      <Link to="/communities" className="pf-home__community-btn">Découvrir</Link>
                    </div>
                  </div>
                </article>
                );
              })}
          </div>
        </div>
      </section>

      {/* Sessions de Matchs Filtrées */}
      <section className="pf-home__section">
        <div className="pf-home__container">
          <div className="pf-home__section-head">
            <div>
              <h2 className="pf-home__section-title">Sessions de matchs près de toi</h2>
              <p className="pf-home__section-sub">
                Sessions ouvertes autour de {userCity}.
              </p>
            </div>
            <Link to="/play" className="pf-home__see-all">
              Toutes les sessions →
            </Link>
          </div>

          <div className="pf-home__sessions">
            {sessionsLoading ? (
              <p>Chargement des sessions...</p>
            ) : personalizedSessions.length === 0 ? (
              <p>Aucune session disponible pour tes préférences.</p>
            ) : personalizedSessions.map((s) => (
              <article key={s.id} className="pf-home__session-card">
                <div className="pf-home__session-head">
                  <span className="pf-home__session-sport">{s.sport}</span>
                  <span className="pf-home__session-level">{s.status || 'Ouverte'}</span>
                </div>
                <h3>{s.terrain || 'Session sportive'}</h3>
                <p className="pf-home__session-time">{[s.date, s.heure].filter(Boolean).join(' · ')}</p>
                <p className="pf-home__session-loc">{[s.quartier, s.ville].filter(Boolean).join(' · ')}</p>
                <div className="pf-home__session-foot">
                  <span className="pf-home__session-players">{s.currentPlayers} / {s.playersNeeded} joueurs</span>
                  <Link to="/play" className="pf-home__session-join">Rejoindre</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fil d'actualités PlayForest */}
      <section className="pf-home__section pf-home__section--feed">
        <div className="pf-home__container">
          <div className="pf-home__section-head">
            <h2 className="pf-home__section-title">Actualités de votre fil sportif</h2>
            <p className="pf-home__section-sub">
              Publications, résultats et contenus partagés par vos coéquipiers.
            </p>
          </div>
          <Feed limit={5} />
        </div>
      </section>
    </div>
  );
}
