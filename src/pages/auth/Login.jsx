import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Eye, EyeOff, Mail, Lock, LogIn, UserPlus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || '/home';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      
      // Auto-set dummy onboarding prefs if missing so user isn't trapped
      if (!localStorage.getItem('playforest_prefs')) {
        localStorage.setItem('playforest_prefs', JSON.stringify({
          sports: ['football'],
          skill_level: 'INTERMEDIATE',
          location: 'Casablanca',
          quartier: 'Maârif',
          onboarding_complete: true
        }));
      }
      
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pf-auth pf-auth--centered">
      <div className="pf-auth__panel">
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <Link to="/home" className="pf-auth__brand" aria-label="PlayForest - Accueil">
            <div className="pf-auth__logo">PF</div>
            <span>Play<span>Forest</span></span>
          </Link>
        </div>

        <div className="pf-auth__card">
          <h1 className="pf-auth__title">Ravi de vous revoir !</h1>
          <p className="pf-auth__subtitle">
            Connectez-vous pour retrouver vos matchs, réservations et votre communauté.
          </p>

          <form className="pf-auth__form" onSubmit={handleSubmit} noValidate>
            <div className="pf-auth__field">
              <label htmlFor="login-email">Adresse E-mail</label>
              <div className="pf-auth__input-wrap">
                <Mail size={18} className="pf-auth__input-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            <div className="pf-auth__field">
              <div className="pf-auth__field-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="login-password">Mot de passe</label>
              </div>
              <div className="pf-auth__input-wrap">
                <Lock size={18} className="pf-auth__input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="pf-auth__toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="pf-auth__error pf-auth__error--block">{error}</div>
            )}

            <button
              type="submit"
              className="pf-auth__btn pf-auth__btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="pf-auth__btn-loading">
                  <span className="pf-auth__spinner" />
                  Connexion en cours...
                </span>
              ) : (
                <>
                  <LogIn size={18} /> Se Connecter
                </>
              )}
            </button>

            <p className="pf-auth__switch" style={{ marginTop: '4px', textAlign: 'center' }}>
              Pas encore de compte ?{' '}
              <Link to="/register" className="pf-auth__link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <UserPlus size={14} /> Créer un compte
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
