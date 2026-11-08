import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLE } from '../../contexts/AuthContext.jsx';
import './auth.css';

const SPORT_OPTIONS = [
  { id: 'football', label: 'Football', icon: '⚽' },
  { id: 'padel', label: 'Padel', icon: '🎾' },
  { id: 'basketball', label: 'Basketball', icon: '🏀' },
  { id: 'running', label: 'Running', icon: '🏃' },
  { id: 'tennis', label: 'Tennis', icon: '🎾' },
  { id: 'futsal', label: 'Futsal', icon: '⚽' },
  { id: 'volleyball', label: 'Volleyball', icon: '🏐' },
  { id: 'boxe', label: 'Boxe', icon: '🥊' },
];

const SKILL_LEVELS = [
  { value: 'BEGINNER', label: 'Débutant' },
  { value: 'INTERMEDIATE', label: 'Intermédiaire' },
  { value: 'ADVANCED', label: 'Confirmé' },
  { value: 'EXPERT', label: 'Expert' },
];

const ROLE_OPTIONS = [
  {
    value: ROLE.PLAYER,
    label: 'Joueur',
    desc: 'Je cherche des matchs et des terrains',
  },
  {
    value: ROLE.COACH,
    label: 'Coach / Pro',
    desc: 'Je propose des entraînements pro',
  },
];

const MIN_PASSWORD = 8;
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const PHONE_RE = /^(\+212|0)[5-7]\d{8}$/;

const cleanPhone = (value) => value.replace(/[\s.-]/g, '');

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: 'Casablanca',
    quartier: 'Maârif',
    skillLevel: 'INTERMEDIATE',
    sports: ['football'],
    role: ROLE.PLAYER,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Efface l'erreur du champ modifié ainsi que l'erreur globale
    setErrors((prev) => {
      if (!prev[field] && !prev.submit) return prev;
      return { ...prev, [field]: '', submit: '' };
    });
  };

  const toggleSport = (sportId) => {
    setFormData((prev) => {
      const exists = prev.sports.includes(sportId);
      const updated = exists
        ? prev.sports.filter((s) => s !== sportId)
        : [...prev.sports, sportId];
      // Au moins un sport reste toujours sélectionné
      return { ...prev, sports: updated.length === 0 ? [sportId] : updated };
    });
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Nom complet requis';

    if (!formData.email.trim()) e.email = 'Adresse E-mail requise';
    else if (!EMAIL_RE.test(formData.email.trim())) e.email = 'Adresse E-mail invalide';

    if (formData.password.length < MIN_PASSWORD) {
      e.password = `${MIN_PASSWORD} caractères minimum`;
    }

    const phone = cleanPhone(formData.phone);
    if (phone && !PHONE_RE.test(phone)) {
      e.phone = 'Numéro marocain invalide (ex: 0612345678)';
    }

    if (!formData.city.trim()) e.city = 'Ville requise';
    if (!formData.quartier.trim()) e.quartier = 'Quartier requis';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // L'appel POST http://localhost:5000/api/auth/register est fait
      // par register() (AuthContext -> services/api.js).
      const res = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: cleanPhone(formData.phone) || undefined,
        city: formData.city.trim(),
        quartier: formData.quartier.trim(),
        role: formData.role,
        skillLevel: formData.skillLevel,
        sports: formData.sports,
      });

      // On stocke les préférences renvoyées par le serveur
      // (avec repli sur le formulaire si la réponse est incomplète).
      const p = res?.data?.preferences;
      try {
        localStorage.setItem(
          'playforest_prefs',
          JSON.stringify({
            sports: p?.sports ?? formData.sports,
            skill_level: p?.skill_level ?? formData.skillLevel,
            location: p?.preferred_city ?? formData.city.trim(),
            quartier: p?.preferred_quartier ?? formData.quartier.trim(),
            onboarding_complete: p?.onboarding_completed ?? true,
          })
        );
      } catch {
        // localStorage indisponible (navigation privée, quota) : non bloquant
      }

      navigate('/home', { replace: true });
    } catch (err) {
      // Les erreurs de l'API portent leur message lisible dans err.message
      const message =
        err?.message || 'Une erreur est survenue lors de la création du compte.';

      if (err?.status === 409) {
        setErrors({ email: message });
      } else {
        setErrors({ submit: message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pf-auth pf-auth--centered">
      <div className="pf-auth__panel">
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <Link to="/home" className="pf-auth__brand" aria-label="PlayForest - Accueil">
            <div className="pf-auth__logo">PF</div>
            <span>Play<span>Forest</span></span>
          </Link>
        </div>

        <div className="pf-auth__card">
          <h1 className="pf-auth__title">Créer un compte</h1>
          <p className="pf-auth__subtitle">
            Rejoignez PlayForest et renseignez vos informations et préférences sportives.
          </p>

          <form className="pf-auth__form" onSubmit={handleSubmit} noValidate>

            {/* SECTION 1 : Profil & Identifiants */}
            <div className="pf-auth__section">
              <div className="pf-auth__section-title">
                1. Profil &amp; Identifiants
              </div>

              <div className="pf-auth__field">
                <label id="register-role-label">Rôle principal</label>
                <div
                  className="pf-auth__role-selector"
                  role="radiogroup"
                  aria-labelledby="register-role-label"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <label key={opt.value} className="pf-auth__role-option">
                      <input
                        type="radio"
                        name="role"
                        value={opt.value}
                        checked={formData.role === opt.value}
                        onChange={() => handleChange('role', opt.value)}
                      />
                      <div className="pf-auth__role-desc">
                        <strong>{opt.label}</strong>
                        <span>{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pf-auth__row">
                <div className="pf-auth__field">
                  <label htmlFor="register-name">Nom complet *</label>
                  <div className={`pf-auth__input-wrap ${errors.name ? 'pf-auth__input-wrap--error' : ''}`}>
                    <input
                      id="register-name"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      placeholder="Ex: Youssef Benani"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      required
                    />
                  </div>
                  {errors.name && <span className="pf-auth__error" role="alert">{errors.name}</span>}
                </div>

                <div className="pf-auth__field">
                  <label htmlFor="register-email">Adresse E-mail *</label>
                  <div className={`pf-auth__input-wrap ${errors.email ? 'pf-auth__input-wrap--error' : ''}`}>
                    <input
                      id="register-email"
                      type="email"
                      autoComplete="email"
                      placeholder="youssef@exemple.ma"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      required
                    />
                  </div>
                  {errors.email && <span className="pf-auth__error" role="alert">{errors.email}</span>}
                </div>
              </div>

              <div className="pf-auth__row">
                <div className="pf-auth__field">
                  <label htmlFor="register-password">Mot de passe ({MIN_PASSWORD} car. min) *</label>
                  <div className={`pf-auth__input-wrap ${errors.password ? 'pf-auth__input-wrap--error' : ''}`}>
                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      aria-invalid={Boolean(errors.password)}
                      required
                      minLength={MIN_PASSWORD}
                    />
                    <button
                      type="button"
                      className="pf-auth__toggle-pw"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? 'Masquer' : 'Afficher'}
                    </button>
                  </div>
                  {errors.password && <span className="pf-auth__error" role="alert">{errors.password}</span>}
                </div>

                <div className="pf-auth__field">
                  <label htmlFor="register-phone">Téléphone (Optionnel)</label>
                  <div className={`pf-auth__input-wrap ${errors.phone ? 'pf-auth__input-wrap--error' : ''}`}>
                    <input
                      id="register-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </div>
                  {errors.phone && <span className="pf-auth__error" role="alert">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* SECTION 2 : Localisation */}
            <div className="pf-auth__section">
              <div className="pf-auth__section-title">
                2. Zone Géographique
              </div>

              <div className="pf-auth__row">
                <div className="pf-auth__field">
                  <label htmlFor="register-city">Ville principale *</label>
                  <div className={`pf-auth__input-wrap ${errors.city ? 'pf-auth__input-wrap--error' : ''}`}>
                    <input
                      id="register-city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Casablanca"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      aria-invalid={Boolean(errors.city)}
                      required
                    />
                  </div>
                  {errors.city && <span className="pf-auth__error" role="alert">{errors.city}</span>}
                </div>

                <div className="pf-auth__field">
                  <label htmlFor="register-quartier">Quartier / Secteur *</label>
                  <div className={`pf-auth__input-wrap ${errors.quartier ? 'pf-auth__input-wrap--error' : ''}`}>
                    <input
                      id="register-quartier"
                      type="text"
                      placeholder="Maârif"
                      value={formData.quartier}
                      onChange={(e) => handleChange('quartier', e.target.value)}
                      aria-invalid={Boolean(errors.quartier)}
                      required
                    />
                  </div>
                  {errors.quartier && <span className="pf-auth__error" role="alert">{errors.quartier}</span>}
                </div>
              </div>
            </div>

            {/* SECTION 3 : Préférences Sportives */}
            <div className="pf-auth__section">
              <div className="pf-auth__section-title">
                3. Préférences Sportives
              </div>

              {/* Niveau */}
              <div className="pf-auth__field">
                <label>Niveau sportif *</label>
                <div className="pf-auth__skill-grid">
                  {SKILL_LEVELS.map((lvl) => {
                    const isSelected = formData.skillLevel === lvl.value;
                    return (
                      <button
                        key={lvl.value}
                        type="button"
                        className={`pf-auth__skill-btn ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => handleChange('skillLevel', lvl.value)}
                        aria-pressed={isSelected}
                      >
                        {lvl.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-sports */}
              <div className="pf-auth__field">
                <label>Sports pratiqués (Multi-sélection) *</label>
                <div className="pf-auth__sports-grid">
                  {SPORT_OPTIONS.map((sport) => {
                    const isSelected = formData.sports.includes(sport.id);
                    return (
                      <button
                        key={sport.id}
                        type="button"
                        className={`pf-auth__sport-btn ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => toggleSport(sport.id)}
                        aria-pressed={isSelected}
                      >
                        <span className="pf-auth__sport-icon">{sport.icon}</span>
                        <span>{sport.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="pf-auth__error pf-auth__error--block" role="alert">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              className="pf-auth__btn pf-auth__btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Création de compte...' : 'Créer mon compte'}
            </button>

            <p className="pf-auth__switch">
              Déjà inscrit ?{' '}
              <Link to="/login" className="pf-auth__link">Se connecter</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}