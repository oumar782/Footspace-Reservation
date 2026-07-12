import React, { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  Mail, 
  Phone, 
  X, 
  Filter,
  CheckCircle,
  XCircle,
  Loader,
  Trophy,
  UserPlus,
  CalendarDays,
  Activity,
  Dumbbell,
  Target,
  Volleyball,
  Circle,
  Zap,
  Shield,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  getSessions, 
  joinSession, 
  seedDemoSessions,
  formatSession,
  cancelSession 
} from '../utils/sessionStorage';
import './sessions.css';

const SPORTS = ['', 'football', 'tennis', 'basketball', 'volleyball', 'handball', 'padel', 'badminton'];

const Sessions = () => {
  const location = useLocation();
  const [sportFilter, setSportFilter] = useState(location.state?.sport || '');
  const [dateFilter, setDateFilter] = useState('');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinForm, setJoinForm] = useState(null);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      const filters = {};
      if (sportFilter) filters.sport = sportFilter;
      if (dateFilter) filters.date = dateFilter;
      
      const data = await getSessions(filters);
      setSessions(data.map(formatSession));
    } catch (error) {
      console.error('Erreur lors du chargement des sessions:', error);
      showToast('Erreur lors du chargement des sessions', 'error');
    } finally {
      setLoading(false);
    }
  }, [sportFilter, dateFilter]);

  useEffect(() => {
    seedDemoSessions();
    loadSessions();
  }, [loadSessions]);

  const showToast = (message, type = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => {
      setToast('');
      setToastType('success');
    }, 3000);
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
      });
    } catch { return dateStr; }
  };

  const getSportColor = (sport) => {
    const colors = {
      football: '#0a750d',
      tennis: '#ffd700',
      basketball: '#e67e22',
      volleyball: '#8e44ad',
      handball: '#2980b9',
      padel: '#27ae60',
      badminton: '#e74c3c'
    };
    return colors[sport?.toLowerCase()] || '#0a750d';
  };

  const getSportIcon = (sport) => {
    const icons = {
      football: <Activity size={20} />,
      tennis: <Circle size={20} />,
      basketball: <Target size={20} />,
      volleyball: <Volleyball size={20} />,
      handball: <Shield size={20} />,
      padel: <Zap size={20} />,
      badminton: <Dumbbell size={20} />
    };
    return icons[sport?.toLowerCase()] || <Activity size={20} />;
  };

  const openJoinForm = (sessionId) => {
    const info = JSON.parse(localStorage.getItem('clientInfo') || '{}');
    const email = localStorage.getItem('clientEmail') || '';
    
    setJoinForm(sessionId);
    setFormData({
      name: `${info.prenom || ''} ${info.nomclient || ''}`.trim() || '',
      email: email || '',
      phone: info.telephone || ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitJoinForm = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showToast('Veuillez saisir votre nom complet', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Veuillez saisir votre numéro de téléphone', 'error');
      return;
    }
    if (!formData.email.trim()) {
      showToast('Veuillez saisir votre email', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Format d\'email invalide', 'error');
      return;
    }

    const phoneRegex = /^[0-9+\s]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      showToast('Numéro de téléphone invalide (minimum 10 chiffres)', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await joinSession(joinForm, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      });
      
      if (result) {
        localStorage.setItem('clientEmail', formData.email);
        localStorage.setItem('clientInfo', JSON.stringify({
          prenom: formData.name.split(' ')[0] || '',
          nomclient: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          telephone: formData.phone
        }));
        
        showToast('Vous avez rejoint la session avec succès !', 'success');
        setJoinForm(null);
        setFormData({ name: '', email: '', phone: '' });
        await loadSessions();
      }
    } catch (error) {
      showToast(error.message || 'Erreur lors de l\'inscription', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSession = async (sessionId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette session ?')) return;
    
    try {
      await cancelSession(sessionId);
      showToast('Session annulée avec succès', 'success');
      await loadSessions();
    } catch (error) {
      showToast(error.message || 'Erreur lors de l\'annulation', 'error');
    }
  };

  const clearFilters = () => {
    setSportFilter('');
    setDateFilter('');
  };

  if (loading) {
    return (
      <div className="ss-layout">
        <div className="ss-layout-main">
          <div className="ss-loading">
            <Loader className="ss-loading-spinner" size={56} />
            <p>Chargement des sessions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ss-layout">
      <div className="ss-layout-main">
        {/* Hero Section - Agrandie */}
        <div className="ss-hero">
          <div className="ss-hero-content">
            <div className="ss-hero-badge">
              <Trophy size={20} />
              <span>Sessions Sportives</span>
            </div>
            <h1 className="ss-hero-title">
              Trouvez vos <span className="ss-hero-gold">Coéquipiers</span>
            </h1>
            <p className="ss-hero-subtitle">
              Rejoignez des joueurs passionnés pour vos matchs et entraînements
            </p>
            <div className="ss-hero-stats">
              <div className="ss-hero-stat">
                <Users size={22} />
                <span>{sessions.length} Sessions</span>
              </div>
              <div className="ss-hero-stat">
                <CheckCircle size={22} />
                <span>{sessions.filter(s => s.status === 'open').length} Ouvertes</span>
              </div>
              <div className="ss-hero-stat">
                <XCircle size={22} />
                <span>{sessions.filter(s => s.status === 'full').length} Complètes</span>
              </div>
            </div>
          </div>
          <div className="ss-hero-decoration">
            <div className="ss-orbital-ring"></div>
            <div className="ss-orbital-ring"></div>
            <div className="ss-orbital-ring"></div>
          </div>
        </div>

        {/* Filters - Agrandis */}
        <div className="ss-filters">
          <div className="ss-filter-group">
            <label>
              <Filter size={18} />
              Sport
            </label>
            <div className="ss-filter-tabs">
              <button 
                className={`ss-filter-tab ${!sportFilter ? 'active' : ''}`}
                onClick={() => setSportFilter('')}
              >
                <span>Tous</span>
              </button>
              {SPORTS.filter(Boolean).map(s => (
                <button 
                  key={s}
                  className={`ss-filter-tab ${sportFilter === s ? 'active' : ''}`}
                  onClick={() => setSportFilter(s)}
                  style={{ 
                    '--sport-color': getSportColor(s),
                    borderColor: sportFilter === s ? getSportColor(s) : 'transparent'
                  }}
                >
                  {getSportIcon(s)}
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ss-filter-group ss-filter-date">
            <label>
              <Calendar size={18} />
              Date
            </label>
            <div className="ss-filter-date-input">
              <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="ss-date-input"
              />
              {dateFilter && (
                <button 
                  className="ss-clear-date"
                  onClick={() => setDateFilter('')}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {(sportFilter || dateFilter) && (
            <button className="ss-clear-filters" onClick={clearFilters}>
              <X size={16} />
              Effacer les filtres
            </button>
          )}
        </div>

        {/* Toast - Agrandi */}
        {toast && (
          <div className={`ss-toast ${toastType}`}>
            <span className="ss-toast-icon">
              {toastType === 'success' ? <CheckCircle size={22} /> : <XCircle size={22} />}
            </span>
            {toast}
          </div>
        )}

        {/* Sessions List - Agrandie */}
        {sessions.length === 0 ? (
          <div className="ss-empty">
            <div className="ss-empty-icon">
              <Trophy size={72} />
            </div>
            <h3>Aucune session disponible</h3>
            <p>Créez une session après votre réservation de terrain</p>
          </div>
        ) : (
          <div className="ss-grid">
            {sessions.map(session => {
              const spotsLeft = session.playersNeeded - (session.currentPlayers || session.playersJoined?.length || 0);
              const isFull = spotsLeft <= 0 || session.status === 'full';
              const isHighlighted = location.state?.highlightSession === session.id;
              const progress = ((session.currentPlayers || session.playersJoined?.length || 0) / session.playersNeeded) * 100;
              const color = getSportColor(session.sport);
              const players = session.playersJoined || [];

              return (
                <div
                  key={session.id}
                  className={`ss-card ${isHighlighted ? 'highlighted' : ''} ${isFull ? 'full' : ''}`}
                >
                  <div className="ss-card-inner">
                    <div className="ss-card-pattern"></div>
                    
                    <div className="ss-card-header">
                      <div className="ss-card-sport">
                        <div className="ss-sport-icon" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
                          {getSportIcon(session.sport)}
                        </div>
                        <span className="ss-sport-name">{session.sport}</span>
                      </div>
                      <div className={`ss-status-badge ${isFull ? 'full' : 'open'}`}>
                        {isFull ? (
                          <>
                            <XCircle size={14} /> Complet
                          </>
                        ) : (
                          <>
                            <CheckCircle size={14} /> Ouvert
                          </>
                        )}
                      </div>
                    </div>

                    <h3 className="ss-card-title">{session.terrain || 'Terrain'}</h3>

                    <div className="ss-card-info">
                      <div className="ss-info-item">
                        <Calendar size={18} />
                        <span>{formatDate(session.date)}</span>
                      </div>
                      <div className="ss-info-item">
                        <Clock size={18} />
                        <span>{session.heure} - {session.heurefin}</span>
                      </div>
                      <div className="ss-info-item">
                        <MapPin size={18} />
                        <span>{session.ville}, {session.quartier}</span>
                      </div>
                    </div>

                    <div className="ss-card-host">
                      <User size={16} />
                      <span>Organisé par <strong>{session.creatorName}</strong></span>
                      {session.creatorPhone && (
                        <span className="ss-host-phone">
                          <Phone size={14} /> {session.creatorPhone}
                        </span>
                      )}
                    </div>

                    <div className="ss-card-players">
                      <div className="ss-players-header">
                        <div className="ss-players-count">
                          <Users size={18} />
                          <span>{session.currentPlayers || players.length || 0}/{session.playersNeeded} joueurs</span>
                        </div>
                        <span className="ss-spots-left">
                          {spotsLeft > 0 ? `${spotsLeft} places restantes` : 'Complet'}
                        </span>
                      </div>
                      
                      <div className="ss-progress">
                        <div 
                          className="ss-progress-fill"
                          style={{ 
                            width: `${Math.min(progress, 100)}%`,
                            background: `linear-gradient(90deg, ${color}, ${color}dd)`
                          }}
                        />
                      </div>

                      <div className="ss-players-grid">
                        {players.slice(0, 10).map((p, i) => {
                          const colors = ['#0a750d', '#ffd700', '#e67e22', '#8e44ad', '#2980b9', '#27ae60', '#e74c3c', '#2c3e50', '#1abc9c', '#9b59b6'];
                          const displayName = p.name || 'Joueur';
                          return (
                            <div 
                              key={i} 
                              className="ss-player-avatar"
                              style={{ background: colors[i % colors.length] }}
                              title={displayName}
                            >
                              {displayName.charAt(0).toUpperCase()}
                            </div>
                          );
                        })}
                        {players.length > 10 && (
                          <div className="ss-player-avatar ss-player-more">+{players.length - 10}</div>
                        )}
                        {[...Array(Math.max(0, session.playersNeeded - players.length))].slice(0, 10 - players.length).map((_, i) => (
                          <div key={`empty-${i}`} className="ss-player-avatar ss-player-empty">
                            ?
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="ss-card-actions">
                      {!isFull && (
                        <button 
                          className="ss-join-btn"
                          onClick={() => openJoinForm(session.id)}
                          style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
                        >
                          <UserPlus size={20} />
                          Rejoindre la session
                          <ArrowRight size={18} className="ss-btn-arrow" />
                        </button>
                      )}
                      
                      {session.creatorEmail === localStorage.getItem('clientEmail') && session.status === 'open' && (
                        <button 
                          className="ss-cancel-btn"
                          onClick={() => handleCancelSession(session.id)}
                        >
                          <XCircle size={18} />
                          Annuler la session
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Join Form Modal - Agrandi */}
        {joinForm && (
          <div className="ss-modal-overlay" onClick={() => setJoinForm(null)}>
            <div className="ss-modal" onClick={e => e.stopPropagation()}>
              <button className="ss-modal-close" onClick={() => setJoinForm(null)}>
                <X size={28} />
              </button>
              
              <div className="ss-modal-header">
                <div className="ss-modal-icon">
                  <UserPlus size={36} />
                </div>
                <h3>Rejoindre la session</h3>
                <p className="ss-modal-sub">Entrez vos informations pour rejoindre</p>
              </div>

              <form onSubmit={submitJoinForm} className="ss-modal-form">
                <div className="ss-form-group">
                  <label>
                    <User size={18} />
                    Nom complet <span className="ss-required">*</span>
                  </label>
                  <input 
                    name="name"
                    type="text" 
                    placeholder="Votre nom complet" 
                    value={formData.name}
                    onChange={handleFormChange}
                    required 
                    disabled={isSubmitting}
                    className="ss-form-input"
                  />
                </div>

                <div className="ss-form-group">
                  <label>
                    <Mail size={18} />
                    Email <span className="ss-required">*</span>
                  </label>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="votre@email.com" 
                    value={formData.email}
                    onChange={handleFormChange}
                    required 
                    disabled={isSubmitting}
                    className="ss-form-input"
                  />
                </div>

                <div className="ss-form-group">
                  <label>
                    <Phone size={18} />
                    Téléphone <span className="ss-required">*</span>
                  </label>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="06 12 34 56 78" 
                    value={formData.phone}
                    onChange={handleFormChange}
                    required 
                    disabled={isSubmitting}
                    className="ss-form-input"
                  />
                </div>

                <div className="ss-modal-actions">
                  <button 
                    type="button" 
                    className="ss-btn-secondary" 
                    onClick={() => setJoinForm(null)}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="ss-btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={20} className="ss-spinner" />
                        Inscription...
                      </>
                    ) : (
                      <>
                        <UserPlus size={20} />
                        Rejoindre
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

export default Sessions;