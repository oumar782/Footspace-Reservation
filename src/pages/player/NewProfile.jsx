import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Calendar,
  Trophy,
  Users,
  CalendarDays,
  MapPin,
  Map,
  UserCircle,
  Award,
  Sparkles,
  ShieldCheck,
  Save
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { authAPI } from '../../services/api';
import './NewProfile.css';

const SKILL_LEVELS = [
  { value: 'BEGINNER', label: 'Débutant' },
  { value: 'INTERMEDIATE', label: 'Intermédiaire' },
  { value: 'ADVANCED', label: 'Confirmé' },
  { value: 'EXPERT', label: 'Expert' },
];

const quickLinks = [
  { label: 'Mes réservations', Icon: MapPin, to: '/consultation-reservation' },
  { label: 'Mes communautés', Icon: Users, to: '/communities' },
  { label: 'Modifier mes préférences', Icon: Sparkles, to: '/onboarding' },
  { label: 'Mes coachs', Icon: UserCircle, to: '/explore/coaches' },
  { label: 'Mes équipements', Icon: Award, to: '/boutique' }
];

export default function NewProfile() {
  const { user: authUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPrefs, setUserPrefs] = useState(null);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('INTERMEDIATE');
  const [savingSkillLevel, setSavingSkillLevel] = useState(false);
  const [skillLevelFeedback, setSkillLevelFeedback] = useState('');

  useEffect(() => {
    // Lecture de l'utilisateur connecté depuis le contexte ou localStorage
    const storedUser = localStorage.getItem('playforest_user');
    const storedPrefs = localStorage.getItem('playforest_prefs');
    
    if (authUser) {
      setUserData(authUser);
    } else if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }

    if (storedPrefs) {
      try {
        setUserPrefs(JSON.parse(storedPrefs));
      } catch (e) {
        console.error(e);
      }
    }
  }, [authUser]);

  useEffect(() => {
    const skillLevel = userData?.skillLevel || userData?.skill_level || userPrefs?.skill_level || 'INTERMEDIATE';
    const normalizedLevel = String(skillLevel).toUpperCase();
    setSelectedSkillLevel(SKILL_LEVELS.some((level) => level.value === normalizedLevel) ? normalizedLevel : 'INTERMEDIATE');
  }, [userData, userPrefs]);

  const handleSkillLevelSave = async (event) => {
    event.preventDefault();
    if (!userData?.id) {
      setSkillLevelFeedback('Impossible d’identifier le compte connecté.');
      return;
    }

    setSavingSkillLevel(true);
    setSkillLevelFeedback('');
    try {
      const response = await authAPI.updateUser(userData.id, { skillLevel: selectedSkillLevel });
      const responseUser = response?.data?.data || response?.data || response?.user || response;
      const updatedUser = {
        ...userData,
        ...(responseUser && typeof responseUser === 'object' ? responseUser : {}),
        skillLevel: selectedSkillLevel,
        skill_level: selectedSkillLevel,
      };
      const storedPrefs = JSON.parse(localStorage.getItem('playforest_prefs') || '{}');
      const updatedPrefs = { ...storedPrefs, skill_level: selectedSkillLevel };

      localStorage.setItem('playforest_user', JSON.stringify(updatedUser));
      localStorage.setItem('playforest_prefs', JSON.stringify(updatedPrefs));
      setUserData(updatedUser);
      setUserPrefs(updatedPrefs);
      setSkillLevelFeedback('Niveau mis à jour.');
    } catch (error) {
      setSkillLevelFeedback(error.response?.data?.message || 'Le niveau n’a pas pu être enregistré.');
    } finally {
      setSavingSkillLevel(false);
    }
  };

  // Extraction du vrai nom et des vraies préférences
  const fullName = userData?.fullName || userData?.full_name || userData?.name || 'Athlète PlayForest';
  const email = userData?.email || 'email@exemple.ma';
  const city = userData?.preferredCity || userData?.city || userPrefs?.location || 'Casablanca';
  const quartier = userData?.preferredQuartier || userData?.quartier || userPrefs?.quartier || 'Maârif';
  const roleLabel = userData?.role === 'COACH' ? 'Coach Pro' : userData?.role === 'ADMIN' ? 'Administrateur' : 'Joueur Membre';

  const sportsArray = userData?.preferredSports || userData?.preferred_sports || userPrefs?.sports || ['football'];
  const sportsList = Array.isArray(sportsArray)
    ? sportsArray.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' · ')
    : String(sportsArray);

  const skillLevelLabel = `Niveau ${SKILL_LEVELS.find((level) => level.value === selectedSkillLevel)?.label || 'Intermédiaire'}`;

  const locationLabel = `${city}, ${quartier}`;

  // Statistiques calculées dynamiquement selon l'utilisateur
  const userStats = [
    { label: 'Réservations', value: userData?.totalBookings || userData?.total_bookings || 0, Icon: MapPin },
    { label: 'Matchs joués', value: userData?.totalMatchesPlayed || userData?.total_matches_played || 0, Icon: Calendar },
    { label: 'Tournois', value: userData?.totalTournaments || userData?.total_tournaments || 0, Icon: Trophy },
    { label: 'Communautés', value: 1, Icon: Users }
  ];

  return (
    <div className="pf-profile">
      <section className="pf-profile__container">
        <header className="pf-profile__header">
          <div className="pf-profile__cover" />
          <div className="pf-profile__head">
            <div className="pf-profile__avatar">
              {fullName.charAt(0).toUpperCase()}
            </div>

            <div className="pf-profile__identity">
              <h1>{fullName}</h1>
              <div className="pf-profile__tags">
                <span className="pf-badge pf-badge--green" style={{ textTransform: 'uppercase', fontSize: '11px' }}>{roleLabel}</span>
                <span className="pf-profile__sport">{sportsList}</span>
                <span className="pf-profile__level">{skillLevelLabel}</span>
              </div>
              <div className="pf-profile__location">
                <Map size={14} /> {locationLabel}
              </div>
            </div>

            <div className="pf-profile__actions">
              <Link to="/onboarding" className="pf-profile__btn pf-profile__btn--ghost">
                <Sparkles size={16} /> Modifier mes Filtres
              </Link>
            </div>
          </div>
        </header>

        {/* STATISTIQUES EN DIRECT DU JOUEUR */}
        <section className="pf-profile__stats">
          {userStats.map(({ label, value, Icon }) => (
            <div key={label} className="pf-profile__stat">
              <div className="pf-profile__stat-icon">
                <Icon size={16} />
              </div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <div className="pf-profile__grid">
          <section className="pf-profile__card pf-profile__card--bio">
            <h2><ShieldCheck size={18} style={{ color: '#10b981', display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} /> À propos &amp; Préférences</h2>
            <p>
              Compte vérifié sur PlayForest ({email}). Préférences actives pour la recherche de terrains et matchs à {city} ({quartier}).
            </p>
            <div className="pf-profile__meta-row">
              <div>
                <span>Sports pratiqués</span>
                <strong>{sportsList}</strong>
              </div>
              <div>
                <span>Zone Géographique</span>
                <strong>{city} ({quartier})</strong>
              </div>
            </div>
            <form className="pf-profile__skill-form" onSubmit={handleSkillLevelSave}>
              <label htmlFor="profile-skill-level">Modifier mon niveau</label>
              <div className="pf-profile__skill-controls">
                <select
                  id="profile-skill-level"
                  value={selectedSkillLevel}
                  onChange={(event) => {
                    setSelectedSkillLevel(event.target.value);
                    setSkillLevelFeedback('');
                  }}
                  disabled={savingSkillLevel}
                >
                  {SKILL_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
                <button className="pf-profile__btn pf-profile__btn--primary" type="submit" disabled={savingSkillLevel}>
                  <Save size={16} /> {savingSkillLevel ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
              {skillLevelFeedback && <p className="pf-profile__skill-feedback" role="status">{skillLevelFeedback}</p>}
            </form>
          </section>

          <section className="pf-profile__card pf-profile__card--links">
            <h2>Accès Rapides</h2>
            <div className="pf-profile__links-grid">
              {quickLinks.map(({ label, Icon, to }) => (
                <Link key={label} to={to} className="pf-profile__link-item">
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
