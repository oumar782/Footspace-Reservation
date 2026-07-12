import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  MapPin, 
  Clock, 
  Calendar,
  CheckCircle,
  XCircle,
  Medal,
  Filter,
  Phone,
  User,
  Mail,
  UsersIcon,
  Loader,
  LayoutDashboard,
  BarChart3,
  Settings2,
  ClipboardList,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  Crown,
  Gem,
  Zap
} from 'lucide-react';
import { 
  getTournaments, 
  registerForTournament,
  getSportColor 
} from '../data/tournaments';
import './tournois.css';

const SPORTS = ['', 'football', 'tennis', 'basketball', 'volleyball', 'handball', 'padel', 'badminton'];

const Tournois = () => {
  const location = useLocation();
  const [sportFilter, setSportFilter] = useState(location.state?.sport || '');
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registerForm, setRegisterForm] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    team_name: '',
    captain_name: '',
    email: '',
    phone: ''
  });

  const showToast = (message, type = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => {
      setToast('');
      setToastType('success');
    }, 4000);
  };

  const loadTournaments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTournaments(sportFilter);
      setTournaments(data);
    } catch (error) {
      console.error('Erreur:', error);
      showToast('Erreur lors du chargement des tournois', 'error');
    } finally {
      setLoading(false);
    }
  }, [sportFilter]);

  useEffect(() => {
    loadTournaments();
  }, [loadTournaments]);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
      });
    } catch { return dateStr; }
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return formatDate(startDate || endDate);
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    if (start === end) return start;
    return `${start} → ${end}`;
  };

  const handleRegister = (tournament) => {
    const info = JSON.parse(localStorage.getItem('clientInfo') || '{}');
    const email = localStorage.getItem('clientEmail') || '';
    
    setSelectedTournament(tournament);
    setFormData({
      team_name: '',
      captain_name: `${info.prenom || ''} ${info.nomclient || ''}`.trim() || '',
      email: email || '',
      phone: info.telephone || ''
    });
    setRegisterForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitRegisterForm = async (e) => {
    e.preventDefault();
    
    if (!formData.team_name.trim()) {
      showToast('Veuillez saisir le nom de votre équipe', 'error');
      return;
    }
    if (!formData.captain_name.trim()) {
      showToast('Veuillez saisir le nom du capitaine', 'error');
      return;
    }
    if (!formData.email.trim()) {
      showToast('Veuillez saisir votre email', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Veuillez saisir votre numéro de téléphone', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Format d\'email invalide', 'error');
      return;
    }

    const phoneRegex = /^[0-9+\s]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      showToast('Numéro de téléphone invalide', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerForTournament(selectedTournament.id, formData);
      
      if (result && result.success) {
        localStorage.setItem('clientEmail', formData.email);
        localStorage.setItem('clientInfo', JSON.stringify({
          prenom: formData.captain_name.split(' ')[0] || '',
          nomclient: formData.captain_name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          telephone: formData.phone
        }));
        
        showToast('Inscription au tournoi enregistrée avec succès !', 'success');
        setRegisterForm(false);
        setSelectedTournament(null);
        setFormData({
          team_name: '',
          captain_name: '',
          email: '',
          phone: ''
        });
        await loadTournaments();
      } else {
        showToast(result?.message || 'Erreur lors de l\'inscription', 'error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showToast(error.message || 'Erreur lors de l\'inscription', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="tr-page">
        <div className="tr-page-main">
          <div className="tr-loading">
            <Loader className="tr-loading-spinner" size={48} />
            <p>Chargement des tournois...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tr-page">
      <div className="tr-page-main">
        {/* Hero Section */}
        <section className="tr-hero">
          <div className="tr-hero-content">
            <div className="tr-hero-badge">
              <Trophy size={16} />
              <span>Compétitions & Tournois</span>
            </div>
            <h1 className="tr-hero-title">
              <span className="tr-hero-gold">Tournois</span> d'Exception
            </h1>
            <p className="tr-hero-subtitle">
              Participez aux compétitions PlayZone et vivez l'intensité du sport
            </p>
            <div className="tr-hero-stats">
              <div className="tr-hero-stat">
                <Trophy size={18} />
                <span>{tournaments.length} Tournois</span>
              </div>
              <div className="tr-hero-stat">
                <Users size={18} />
                <span>
                  {tournaments.reduce((acc, t) => acc + (t.teamsJoined?.length || 0), 0)} Équipes
                </span>
              </div>
              <div className="tr-hero-stat">
                <Medal size={18} />
                <span>
                  {tournaments.filter(t => t.status === 'open').length} Ouverts
                </span>
              </div>
            </div>
          </div>
          <div className="tr-hero-decoration">
            <div className="tr-orbital-ring"></div>
            <div className="tr-orbital-ring"></div>
            <div className="tr-orbital-ring"></div>
          </div>
        </section>

        {/* Gestion des Tournois - Section Admin */}
        <section className="tr-management">
          <div className="tr-management-content">
            <div className="tr-management-icon">
              <LayoutDashboard size={32} />
            </div>
            <div className="tr-management-info">
              <div className="tr-management-badge">
                <Sparkles size={14} />
                <span>Gestion des Tournois</span>
              </div>
              <h2 className="tr-management-title">
                <span className="tr-gradient-text">Application</span> de Gestion
              </h2>
              <p className="tr-management-desc">
                Créez, gérez et suivez vos tournois en temps réel. Tableaux, scores, 
                classements et statistiques à portée de main.
              </p>
              <div className="tr-management-features">
                <div className="tr-management-feature">
                  <CheckCircle size={16} />
                  <span>Création rapide de tournois</span>
                </div>
                <div className="tr-management-feature">
                  <CheckCircle size={16} />
                  <span>Gestion des équipes et inscriptions</span>
                </div>
                <div className="tr-management-feature">
                  <CheckCircle size={16} />
                  <span>Tableaux et scores en direct</span>
                </div>
                <div className="tr-management-feature">
                  <CheckCircle size={16} />
                  <span>Classements automatiques</span>
                </div>
              </div>
              <Link to="/admin/tournois" className="tr-management-btn">
                <span>Consulter l'application</span>
                <ArrowRight size={18} className="tr-btn-arrow" />
              </Link>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="tr-filters">
          <div className="tr-filter-group">
            <label>
              <Filter size={16} />
              Filtrer par sport
            </label>
            <div className="tr-filter-tabs">
              <button 
                className={`tr-filter-tab ${!sportFilter ? 'active' : ''}`}
                onClick={() => setSportFilter('')}
              >
                <span>Tous</span>
              </button>
              {SPORTS.filter(Boolean).map(s => (
                <button 
                  key={s}
                  className={`tr-filter-tab ${sportFilter === s ? 'active' : ''}`}
                  onClick={() => setSportFilter(s)}
                >
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`tr-toast ${toastType}`}>
            <span className="tr-toast-icon">
              {toastType === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
            </span>
            {toast}
          </div>
        )}

        {/* Tournaments Grid */}
        {tournaments.length === 0 ? (
          <div className="tr-empty">
            <div className="tr-empty-icon">
              <Trophy size={64} />
            </div>
            <h3>Aucun tournoi disponible</h3>
            <p>Revenez plus tard pour découvrir les prochains tournois</p>
          </div>
        ) : (
          <div className="tr-grid">
            {tournaments.map(tournament => {
              const teamsJoined = tournament.teamsJoined || [];
              const teamsNeeded = tournament.teamsNeeded || 0;
              const spotsLeft = Math.max(0, teamsNeeded - teamsJoined.length);
              const isFull = spotsLeft <= 0 || tournament.status === 'full';
              const isCancelled = tournament.status === 'cancelled';
              const isCompleted = tournament.status === 'completed';
              const color = getSportColor(tournament.sport);
              
              const userEmail = localStorage.getItem('clientEmail');
              const isRegistered = teamsJoined.some(team => team.email === userEmail);

              return (
                <div
                  key={tournament.id}
                  className={`tr-card ${isFull ? 'full' : ''} ${isCancelled ? 'cancelled' : ''}`}
                >
                  <div className="tr-card-inner">
                    <div className="tr-card-pattern"></div>
                    
                    <div className="tr-card-header">
                      <div className="tr-card-sport">
                        <div className="tr-sport-icon" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
                          <Trophy size={20} />
                        </div>
                        <span className="tr-sport-name">{tournament.sport}</span>
                      </div>
                      <div 
                        className={`tr-status-badge ${isFull ? 'full' : isCancelled ? 'cancelled' : 'open'}`}
                        style={{ 
                          background: isCancelled ? '#ef4444' : isFull ? '#f59e0b' : '#0a750d'
                        }}
                      >
                        {isCancelled ? 'Annulé' : isFull ? 'Complet' : 'Ouvert'}
                      </div>
                    </div>

                    <h3 className="tr-card-title">{tournament.name}</h3>

                    <p className="tr-card-desc">{tournament.description}</p>

                    <div className="tr-card-info">
                      <div className="tr-info-item">
                        <Calendar size={16} />
                        <span>{formatDateRange(tournament.date, tournament.end_date)}</span>
                      </div>
                      <div className="tr-info-item">
                        <Clock size={16} />
                        <span>{tournament.time}</span>
                      </div>
                      <div className="tr-info-item">
                        <MapPin size={16} />
                        <span>{tournament.location}</span>
                      </div>
                    </div>

                    <div className="tr-card-teams">
                      <div className="tr-teams-header">
                        <div className="tr-teams-count">
                          <Users size={14} />
                          <span>{teamsJoined.length}/{teamsNeeded} Équipes</span>
                        </div>
                        <span className="tr-spots-left">
                          {isFull ? 'Complet' : `${spotsLeft} places`}
                        </span>
                      </div>
                      
                      <div className="tr-progress">
                        <div 
                          className="tr-progress-fill"
                          style={{ 
                            width: `${Math.min((teamsJoined.length / teamsNeeded) * 100, 100)}%`,
                            background: `linear-gradient(90deg, ${color}, var(--tr-gold))`
                          }}
                        />
                      </div>

                      <div className="tr-teams-grid">
                        {teamsJoined.slice(0, 8).map((team, i) => {
                          const colors = ['#0a750d', '#ffd700', '#e67e22', '#8e44ad', '#2980b9', '#27ae60', '#e74c3c', '#2c3e50'];
                          return (
                            <div 
                              key={i} 
                              className="tr-team-avatar"
                              style={{ background: colors[i % colors.length] }}
                              title={team.team_name || team.name}
                            >
                              {(team.team_name || team.name || '?').charAt(0).toUpperCase()}
                            </div>
                          );
                        })}
                        {teamsJoined.length > 8 && (
                          <div className="tr-team-avatar tr-team-more">+{teamsJoined.length - 8}</div>
                        )}
                      </div>
                    </div>

                    <div className="tr-fee">
                      <span className="tr-fee-amount">{tournament.fee || '0'}</span>
                      <span className="tr-fee-unit">DH / équipe</span>
                    </div>

                    <div className="tr-card-actions">
                      {!isCancelled && !isCompleted && (
                        <button 
                          className={`tr-register-btn ${isRegistered ? 'registered' : ''} ${isFull ? 'full' : ''}`}
                          onClick={() => handleRegister(tournament)}
                          disabled={isFull || isRegistered}
                          style={{ 
                            background: isRegistered 
                              ? 'linear-gradient(135deg, #10b981, #34d399)' 
                              : isFull
                                ? '#94a3b8' 
                                : `linear-gradient(135deg, ${color}, ${color}dd)`
                          }}
                        >
                          {isRegistered ? (
                            <>
                              <CheckCircle size={18} /> Inscrit
                            </>
                          ) : isFull ? (
                            <>
                              <XCircle size={18} /> Complet
                            </>
                          ) : (
                            <>
                              <Trophy size={18} /> S'inscrire
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Register Modal */}
        {registerForm && selectedTournament && (
          <div className="tr-modal-overlay" onClick={() => setRegisterForm(false)}>
            <div className="tr-modal" onClick={e => e.stopPropagation()}>
              <button className="tr-modal-close" onClick={() => setRegisterForm(false)}>
                <XCircle size={24} />
              </button>
              
              <div className="tr-modal-header">
                <div className="tr-modal-icon">
                  <Trophy size={32} />
                </div>
                <h3>Inscription au tournoi</h3>
                <p className="tr-modal-sub">
                  {selectedTournament.name}
                </p>
              </div>

              <form onSubmit={submitRegisterForm} className="tr-modal-form">
                <div className="tr-form-group">
                  <label>
                    <UsersIcon size={16} />
                    Nom de l'équipe <span className="tr-required">*</span>
                  </label>
                  <input 
                    name="team_name"
                    type="text" 
                    placeholder="Nom de votre équipe" 
                    value={formData.team_name}
                    onChange={handleFormChange}
                    required 
                    disabled={isSubmitting}
                    className="tr-form-input"
                  />
                </div>

                <div className="tr-form-group">
                  <label>
                    <User size={16} />
                    Nom du capitaine <span className="tr-required">*</span>
                  </label>
                  <input 
                    name="captain_name"
                    type="text" 
                    placeholder="Nom complet du capitaine" 
                    value={formData.captain_name}
                    onChange={handleFormChange}
                    required 
                    disabled={isSubmitting}
                    className="tr-form-input"
                  />
                </div>

                <div className="tr-form-group">
                  <label>
                    <Mail size={16} />
                    Email <span className="tr-required">*</span>
                  </label>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="votre@email.com" 
                    value={formData.email}
                    onChange={handleFormChange}
                    required 
                    disabled={isSubmitting}
                    className="tr-form-input"
                  />
                </div>

                <div className="tr-form-group">
                  <label>
                    <Phone size={16} />
                    Téléphone <span className="tr-required">*</span>
                  </label>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="06 12 34 56 78" 
                    value={formData.phone}
                    onChange={handleFormChange}
                    required 
                    disabled={isSubmitting}
                    className="tr-form-input"
                  />
                </div>

                <div className="tr-modal-actions">
                  <button 
                    type="button" 
                    className="tr-btn-secondary" 
                    onClick={() => setRegisterForm(false)}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="tr-btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={18} className="tr-spinner" />
                        Inscription...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        S'inscrire
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournois;