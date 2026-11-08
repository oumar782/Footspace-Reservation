import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, Filter, Users, Plus, Star, MapPin, UserCheck, Crown, Sparkles,
  CheckCircle2, XCircle, Clock, MessageSquare, Send, ShieldCheck, ThumbsUp,
  Flame, ChevronLeft, Lock, Globe, ArrowRight, X, Image as ImageIcon, Video as VideoIcon,
  Share2, Heart, Play, Trophy, Bell, Upload, FileText
} from 'lucide-react';
import './NewCommunities.css';
import { filterPersonalizedItems } from '../../utils/personalization';

/* =========================================================
   CONFIG API
   ========================================================= */
const API_BASE = import.meta.env.VITE_COMMUNITIES_API_URL || '/api/communities';
const AVAILABLE_SPORTS = ['Football', 'Padel', 'Tennis', 'Basketball', 'Running', 'Futsal'];

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function communityCity(community) {
  return normalizeText(community.city || (community.location || '').split('·')[0]);
}

function communityQuartier(community) {
  return normalizeText(community.quartier || (community.location || '').split('·')[1]);
}

function matchesPreference(preference, value) {
  const normalizedPreference = normalizeText(preference);
  const normalizedValue = normalizeText(value);
  return Boolean(normalizedPreference && normalizedValue && (
    normalizedPreference.includes(normalizedValue) || normalizedValue.includes(normalizedPreference)
  ));
}

const getToken = () =>
  localStorage.getItem('playforest_token') ||
  localStorage.getItem('token') ||
  null;

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  let data = null;
  try { data = await res.json(); } catch { /* no body */ }

  if (!res.ok) {
    if (import.meta.env.DEV && data?.error) {
      console.error(`Erreur API communautés (${res.status}) :`, data.error);
    }
    const apiError = data?.error?.message || data?.error || data?.message || data?.errors;
    const errorMessage = typeof apiError === 'string' ? apiError : JSON.stringify(apiError);
    const err = new Error(errorMessage || `Erreur ${res.status}`);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

/* =========================================================
   HELPERS : mapping API -> UI
   ========================================================= */

function formatRelativeDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "À l'instant";
  if (min < 60) return `Il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `Il y a ${h}h`;
  const j = Math.floor(h / 24);
  if (j === 1) return 'Hier';
  if (j < 30) return `Il y a ${j} jours`;
  return d.toLocaleDateString('fr-FR');
}

function pickColor(sport) {
  if (sport === 'Football') return 'green';
  if (sport === 'Padel') return 'blue';
  if (sport === 'Tennis') return 'orange';
  if (sport === 'Basketball') return 'orange';
  return 'green';
}

// Convertit une communauté renvoyée par l'API en objet consommé par l'UI
function mapCommunityFromApi(c) {
  return {
    id: String(c.id),
    name: c.name,
    sport: c.sport,
    location: c.location || `${c.city} · ${c.quartier}`,
    city: c.city,
    quartier: c.quartier,
    membersCount: c.membersCount ?? c.members_count ?? 0,
    level: c.level,
    isPrivate: c.isPrivate ?? c.is_private ?? true,
    featured: c.featured ?? false,
    color: pickColor(c.sport),
    adminName: c.adminName || c.admin_name || 'Admin',
    adminEmail: '',
    description: c.description,
    createdByUserId: c.createdByUserId != null || c.created_by_user_id != null
      ? String(c.createdByUserId ?? c.created_by_user_id)
      : null,
    // ✅ Rôle de l'utilisateur connecté vis-à-vis de cette communauté
    // (calculé côté backend dans GET /:id et GET /)
    isAdmin: c.isAdmin == null ? null : Boolean(c.isAdmin),
    isMember: !!c.isMember,
    posts: [],
    members: [],
    pendingRequests: [],
  };
}

function mapPostFromApi(p, { currentUserName = '', currentUserId = null, memberNames = new Map() } = {}) {
  const authorId = String(p.authorUserId ?? p.author_user_id ?? '');

  return {
    id: String(p.id),
    author: p.authorName || p.author || memberNames.get(authorId) ||
      (authorId && authorId === String(currentUserId) ? currentUserName : 'Membre'),
    authorRole: p.authorRole || 'Membre',
    date: formatRelativeDate(p.createdAt),
    postType: p.postType || 'text',
    content: p.content || '',
    mediaUrl: p.mediaUrl || '',
    mediaType: p.mediaType || 'none',
    likes: p.likesCount ?? 0,
    userLiked: !!p.userLiked,
    comments: (p.comments || []).map((c) => ({
      id: String(c.id),
      author: c.authorName || c.author || memberNames.get(String(c.authorUserId ?? c.author_user_id ?? '')) || 'Membre',
      date: formatRelativeDate(c.createdAt),
      text: c.content,
    })),
  };
}

function mapMemberFromApi(m) {
  return {
    name: m.name || 'Membre',
    role: m.role === 'ADMIN' ? 'Administrateur / Fondateur' : 'Membre Officiel',
    level: m.level || 'Intermédiaire',
    sport: m.sport || '',
    userId: m.userId,
  };
}

function mapRequestFromApi(r) {
  return {
    id: String(r.id),
    name: r.name || 'Candidat',
    city: r.city || '',
    level: r.level || 'Intermédiaire',
    message: r.message || '',
    userId: r.userId,
  };
}

/* =========================================================
   COMPOSANT PRINCIPAL
   ========================================================= */

export default function NewCommunities() {
  const location = useLocation();
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [adminCommunities, setAdminCommunities] = useState([]);
  const [adminJoinRequests, setAdminJoinRequests] = useState([]);
  const [loadingAdminRequests, setLoadingAdminRequests] = useState(false);
  const [processingRequestId, setProcessingRequestId] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(null);
  const [joinMessage, setJoinMessage] = useState('');
  const [userRequests, setUserRequests] = useState({});
  const [joiningCommunityId, setJoiningCommunityId] = useState(null);
  const [postAccessDenied, setPostAccessDenied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [newCommData, setNewCommData] = useState({
    name: '',
    sport: 'Football',
    isPrivate: true,
    description: '',
  });

  const [userPrefs, setUserPrefs] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('Sportif PlayForest');
  const [currentUserId, setCurrentUserId] = useState(null);

  /* ----------- Toasts ----------- */
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  }, []);

  /* ----------- Charger les préférences utilisateur ----------- */
  useEffect(() => {
    const storedPrefs = localStorage.getItem('playforest_prefs');
    const storedUser = localStorage.getItem('playforest_user');

    if (storedPrefs) {
      try {
        const p = JSON.parse(storedPrefs);
        setUserPrefs(p);
        if (p.sports && p.sports.length > 0) {
          setActiveFilter('Tous');
        }
      } catch (e) { console.error(e); }
    }

    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.name || u.full_name) setCurrentUserName(u.name || u.full_name);
        if (u.id != null) setCurrentUserId(String(u.id));
        const sports = u.preferredSports || u.preferred_sports || u.sports;
        const skillLevel = u.skillLevel || u.skill_level;
        if (skillLevel || sports) {
          setUserPrefs(prev => ({
            ...(prev || {}),
            ...(skillLevel ? { skill_level: skillLevel } : {}),
            ...(sports && !prev?.sports ? { sports: Array.isArray(sports) ? sports : [sports] } : {}),
          }));
        }
      } catch (e) { console.error(e); }
    }
  }, []);

  /* ----------- Charger les communautés depuis l'API ----------- */
  const loadCommunities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await apiFetch('/', { method: 'GET' });
      const list = (Array.isArray(json?.data) ? json.data : []).map(mapCommunityFromApi);
      setCommunities(list);
    } catch (err) {
      console.error('Erreur chargement communautés :', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCommunities(); }, [loadCommunities]);

  /* ----------- Charger le détail d'une communauté ----------- */
  const loadCommunityDetail = useCallback(async (communityId) => {
    setPostAccessDenied(false);
    try {
      const json = await apiFetch(`/${communityId}`, { method: 'GET' });
      const c = json.data;
      const base = mapCommunityFromApi(c);
      const memberNames = new Map((c.members || [])
        .filter((member) => member.userId != null && member.name)
        .map((member) => [String(member.userId), member.name]));

      const detail = {
        ...base,
        members: (c.members || []).map(mapMemberFromApi),
        posts: (c.posts || []).map((p) => mapPostFromApi(p, { currentUserName, currentUserId, memberNames })),
        pendingRequests: [],
      };

      // ✅ Ne charger les demandes QUE si on est admin (sinon 403 inutile)
      if (detail.isAdmin) {
        try {
          const reqJson = await apiFetch(`/${communityId}/join-requests`, { method: 'GET' });
          detail.pendingRequests = (reqJson.data || []).map(mapRequestFromApi);
        } catch (e) {
          console.warn('Impossible de charger les demandes :', e.message);
        }
      }

      setSelectedCommunity(detail);
    } catch (err) {
      console.error('Erreur détail communauté :', err);
      triggerToast(`❌ ${err.message}`);
    }
  }, [currentUserName, currentUserId, triggerToast]);

  /* ----------- ADMIN : demandes visibles dans la cloche ----------- */
  const loadAdminJoinRequests = useCallback(async () => {
    if (communities.length === 0) {
      setAdminCommunities([]);
      setAdminJoinRequests([]);
      return;
    }

    setLoadingAdminRequests(true);
    try {
      const managedCommunities = communities.filter((community) => community.isAdmin === true);
      setAdminCommunities(managedCommunities);

      const requestResults = await Promise.allSettled(managedCommunities.map(async (community) => {
        const json = await apiFetch(`/${community.id}/join-requests`, { method: 'GET' });
        return (json.data || []).map((request) => ({
          ...mapRequestFromApi(request),
          communityId: community.id,
          communityName: community.name,
        }));
      }));

      setAdminJoinRequests(requestResults.flatMap((result) =>
        result.status === 'fulfilled' ? result.value : []
      ));
    } finally {
      setLoadingAdminRequests(false);
    }
  }, [communities]);

  useEffect(() => {
    loadAdminJoinRequests();
  }, [loadAdminJoinRequests]);

  useEffect(() => {
    const openRequests = new URLSearchParams(location.search).get('openRequests') === '1';
    if (!openRequests) return;

    setSelectedCommunity(null);
    setShowNotificationDrawer(true);
    if (adminCommunities.length > 0) loadAdminJoinRequests();
  }, [location.search, adminCommunities.length, loadAdminJoinRequests]);

  /* ----------- CRÉER UNE COMMUNAUTÉ ----------- */
  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    if (!newCommData.name.trim() || !newCommData.description.trim()) return;

    try {
      const json = await apiFetch('/', {
        method: 'POST',
        body: JSON.stringify({
          name: newCommData.name.trim(),
          sport: newCommData.sport,
          description: newCommData.description.trim(),
          is_private: newCommData.isPrivate,
        }),
      });

      const created = mapCommunityFromApi(json.data);
      setCommunities(prev => [created, ...prev.filter((community) => community.id !== created.id)]);
      setSelectedCommunity(null);
      setActiveFilter('Tous');
      setSearchQuery('');
      setShowCreateModal(false);
      setNewCommData({ name: '', sport: 'Football', isPrivate: true, description: '' });
      triggerToast(`🎉 La communauté "${created.name}" a été créée !`);
    } catch (err) {
      console.error('Erreur create community :', err);
      triggerToast(`❌ ${err.message}`);
    }
  };

  /* ----------- DEMANDER À REJOINDRE ----------- */
  const handleSendJoinRequest = async (e) => {
    e.preventDefault();
    if (!showJoinModal || joiningCommunityId === showJoinModal.id) return;
    const commId = showJoinModal.id;
    setJoiningCommunityId(commId);

    try {
      const result = await apiFetch(`/${commId}/join-requests`, {
        method: 'POST',
        body: JSON.stringify({
          message: joinMessage || "Bonjour ! J'aimerais rejoindre votre communauté.",
        }),
      });

      const responseCode = result?.code || result?.data?.code;
      const requestState = responseCode === 'ALREADY_MEMBER' ? 'member' : 'pending';
      setUserRequests((previous) => ({ ...previous, [commId]: requestState }));
      if (requestState === 'member') {
        setCommunities((previous) => previous.map((community) => (
          community.id === commId ? { ...community, isMember: true } : community
        )));
        setSelectedCommunity((previous) => previous?.id === commId
          ? { ...previous, isMember: true }
          : previous);
      }
      setShowJoinModal(null);
      setJoinMessage('');
      triggerToast(responseCode === 'ALREADY_MEMBER'
        ? '✅ Déjà membre'
        : responseCode === 'REQUEST_PENDING'
          ? '📩 Demande en attente'
          : "📩 Demande envoyée à l'admin.");
    } catch (err) {
      if (err.status === 409) {
        triggerToast('📩 Demande en attente');
        setUserRequests((previous) => ({ ...previous, [commId]: 'pending' }));
        setShowJoinModal(null);
        setJoinMessage('');
      } else {
        triggerToast(`❌ ${err.message}`);
      }
    } finally {
      setJoiningCommunityId(null);
    }
  };

  /* ----------- ADMIN : ACCEPTER / REFUSER ----------- */
  const handleAdminDecision = async (commId, requestId, isAccepted) => {
    setProcessingRequestId(`${commId}:${requestId}`);
    try {
      await apiFetch(`/${commId}/join-requests/${requestId}`, {
        method: 'PATCH',
        body: JSON.stringify({ action: isAccepted ? 'accept' : 'reject' }),
      });

      if (isAccepted) {
        window.dispatchEvent(new Event('playforest:community-member-accepted'));
      }
      triggerToast(isAccepted ? '✅ Membre accepté !' : '❌ Demande refusée.');
      setAdminJoinRequests(prev => prev.filter(request =>
        !(request.communityId === commId && request.id === String(requestId))
      ));
      if (selectedCommunity?.id === commId) await loadCommunityDetail(commId);
      await loadCommunities();
    } catch (err) {
      console.error('Erreur décision admin :', err);
      triggerToast(`❌ ${err.message}`);
    } finally {
      setProcessingRequestId(null);
    }
  };

  /* ----------- PUBLIER UN POST ----------- */
  const handleCreatePost = async (commId, postPayload) => {
    if (!postPayload.content?.trim() && !postPayload.mediaUrl?.trim()) return;

    try {
      await apiFetch(`/${commId}/posts`, {
        method: 'POST',
        body: JSON.stringify({
          content: postPayload.content || '',
          postType: postPayload.postType || 'text',
          mediaUrl: postPayload.mediaUrl || null,
          mediaType: postPayload.mediaType || 'none',
        }),
      });

      triggerToast('📢 Publication partagée !');
      await loadCommunityDetail(commId);
    } catch (err) {
      console.error('Erreur create post :', err);
      if (err.status === 403) {
        setPostAccessDenied(true);
        setSelectedCommunity((previous) => previous?.id === commId
          ? { ...previous, isMember: false }
          : previous);
        triggerToast('Vous devez être membre de cette communauté pour publier.');
        return;
      }
      triggerToast(`❌ ${err.message}`);
    }
  };

  /* ----------- AJOUTER UN COMMENTAIRE ----------- */
  const handleAddComment = async (commId, postId, commentText) => {
    if (!commentText.trim()) return;

    try {
      await apiFetch(`/${commId}/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: commentText.trim() }),
      });
      await loadCommunityDetail(commId);
    } catch (err) {
      console.error('Erreur commentaire :', err);
      triggerToast(`❌ ${err.message}`);
    }
  };

  /* ----------- TOGGLE LIKE ----------- */
  const handleToggleLike = async (commId, postId) => {
    try {
      await apiFetch(`/${commId}/posts/${postId}/likes`, { method: 'POST' });
      await loadCommunityDetail(commId);
    } catch (err) {
      console.error('Erreur like :', err);
      triggerToast(`❌ ${err.message}`);
    }
  };

  /* ----------- FILTRAGE ----------- */
  const userCity = normalizeText(userPrefs?.location);
  const skillCode = String(userPrefs?.skill_level || '').toUpperCase();
  const skillLabels = {
    BEGINNER: 'debutant',
    INTERMEDIATE: 'intermediaire',
    ADVANCED: 'confirme',
    EXPERT: 'expert',
  };
  const userSkill = skillLabels[skillCode] || normalizeText(userPrefs?.skill_level);
  const userQuartier = normalizeText(userPrefs?.quartier);
  const preferredSports = (Array.isArray(userPrefs?.sports)
    ? userPrefs.sports
    : userPrefs?.sports ? [userPrefs.sports] : [])
    .map(normalizeText)
    .filter(Boolean);
  const personalizedCommunities = filterPersonalizedItems(communities, userPrefs);
  const availableFilters = preferredSports.length > 0
    ? AVAILABLE_SPORTS.filter((sport) => preferredSports.includes(normalizeText(sport)))
    : AVAILABLE_SPORTS;

  const filteredCommunities = personalizedCommunities.filter((c) => {
      const matchesSportFilter = activeFilter === 'Tous' || normalizeText(c.sport) === normalizeText(activeFilter);
      const normalizedSearch = normalizeText(searchQuery);
      const matchesSearch = !normalizedSearch || [c.name, c.location, c.sport]
        .some((value) => normalizeText(value).includes(normalizedSearch));
      return matchesSportFilter && matchesSearch;
    })
    .sort((a, b) => {
      const preferenceScore = (community) => (
        (matchesPreference(userCity, communityCity(community)) ? 4 : 0) +
        (matchesPreference(userQuartier, communityQuartier(community)) ? 2 : 0) +
        (preferredSports.some((sport) => matchesPreference(sport, community.sport)) ? 1 : 0) +
        (community.level && matchesPreference(userSkill, community.level) ? 1 : 0)
      );
      return preferenceScore(b) - preferenceScore(a);
    });

  return (
    <div className="pf-communities">
      {/* Toast */}
      {toastMessage && (
        <div className="pf-toast pf-glass" style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: '#090d16', color: '#ffffff', padding: '14px 22px', borderRadius: '16px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.3)', fontWeight: '700', fontSize: '14px',
          display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(16, 185, 129, 0.4)'
        }}>
          <Sparkles size={18} style={{ color: '#10b981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {selectedCommunity ? (
        <CommunityDetailView
          community={selectedCommunity}
          onBack={() => setSelectedCommunity(null)}
          onSendPost={(payload) => handleCreatePost(selectedCommunity.id, payload)}
          onAddComment={(postId, text) => handleAddComment(selectedCommunity.id, postId, text)}
          onToggleLike={(postId) => handleToggleLike(selectedCommunity.id, postId)}
          onAdminDecision={(reqId, accept) => handleAdminDecision(selectedCommunity.id, reqId, accept)}
          userRequestStatus={userRequests[selectedCommunity.id]}
          onRequestJoin={() => setShowJoinModal(selectedCommunity)}
          postAccessDenied={postAccessDenied}
        />
      ) : (
        <>
          <section className="pf-communities__header">
            <div className="pf-communities__container">
              <div className="pf-communities__title-wrap">
                {userPrefs?.location && (
                  <div className="pf-badge pf-badge--green" style={{ marginBottom: '12px' }}>
                    <Sparkles size={14} /> Zone préférée : {userPrefs.location} ({userPrefs.quartier || 'Maârif'})
                  </div>
                )}
                <h1>Écosystème des Communautés PlayForest</h1>
                <p>Rejoins des clubs sportifs, partage tes photos &amp; vidéos, échange avec les membres.</p>
              </div>

              <div className="pf-communities__actions">
                {adminCommunities.length > 0 && (
                  <button
                    type="button"
                    className={`pf-community-bell ${adminJoinRequests.length ? 'pf-community-bell--active' : ''}`}
                    onClick={() => {
                      const opening = !showNotificationDrawer;
                      setShowNotificationDrawer(opening);
                      if (opening) loadAdminJoinRequests();
                    }}
                    aria-label={`Demandes d'adhésion en attente : ${adminJoinRequests.length}`}
                    aria-expanded={showNotificationDrawer}
                    title="Demandes d'adhésion"
                  >
                    <Bell size={21} aria-hidden="true" />
                    {adminJoinRequests.length > 0 && (
                      <span className="pf-community-bell__count">
                        {adminJoinRequests.length > 99 ? '99+' : adminJoinRequests.length}
                      </span>
                    )}
                  </button>
                )}

                <button className="pf-communities__create" onClick={() => setShowCreateModal(true)}>
                  <Plus size={18} /> Créer une communauté
                </button>
              </div>
            </div>
          </section>

          {showNotificationDrawer && adminCommunities.length > 0 && (
            <section className="pf-communities__container pf-community-inbox">
              <div className="pf-card pf-community-inbox__panel">
                <div className="pf-community-inbox__header">
                  <h3>
                    <Bell size={18} aria-hidden="true" />
                    Demandes à valider
                    <span className="pf-community-inbox__total">{adminJoinRequests.length}</span>
                  </h3>
                  <button
                    type="button"
                    className="pf-community-inbox__close"
                    onClick={() => {
                      setShowNotificationDrawer(false);
                      navigate('/communities', { replace: true });
                    }}
                    aria-label="Fermer les demandes"
                  >
                    <X size={18} />
                  </button>
                </div>

                {loadingAdminRequests ? (
                  <p className="pf-community-inbox__empty">Actualisation des demandes...</p>
                ) : adminJoinRequests.length === 0 ? (
                  <p className="pf-community-inbox__empty">Aucune demande en attente.</p>
                ) : (
                  <div className="pf-community-inbox__list">
                    {adminJoinRequests.map((request) => {
                      const requestKey = `${request.communityId}:${request.id}`;
                      const isProcessing = processingRequestId === requestKey;

                      return (
                        <article className="pf-community-inbox__item" key={requestKey}>
                          <div className="pf-community-inbox__details">
                            <strong>{request.name}</strong>
                            <span>{request.communityName}</span>
                            <small>
                              {[request.city, `Niveau ${request.level}`].filter(Boolean).join(' · ')}
                            </small>
                            {request.message && <p>{request.message}</p>}
                          </div>
                          <div className="pf-community-inbox__actions">
                            <button
                              type="button"
                              className="pf-btn pf-btn--danger pf-btn--sm"
                              onClick={() => handleAdminDecision(request.communityId, request.id, false)}
                              disabled={Boolean(processingRequestId)}
                            >
                              <XCircle size={15} /> Refuser
                            </button>
                            <button
                              type="button"
                              className="pf-btn pf-btn--primary pf-btn--sm"
                              onClick={() => handleAdminDecision(request.communityId, request.id, true)}
                              disabled={Boolean(processingRequestId)}
                            >
                              <CheckCircle2 size={15} /> Accepter
                            </button>
                            {isProcessing && <span className="pf-community-inbox__working">Traitement...</span>}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="pf-communities__controls pf-communities__container">
            <div className="pf-communities__search">
              <Search size={18} className="pf-communities__search-icon" />
              <input
                type="search"
                placeholder="Rechercher une communauté par nom, sport ou quartier..."
                className="pf-communities__search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="pf-communities__search-btn">Rechercher</button>
            </div>

            <div className="pf-communities__filters" role="toolbar">
              {['Tous', ...availableFilters].map((s) => (
                <button
                  key={s}
                  className={`pf-communities__chip ${activeFilter === s ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveFilter(s);
                    if (s === 'Tous') setSearchQuery('');
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          <section className="pf-communities__section pf-communities__container">
            <div className="pf-communities__section-head">
              <h2><Star size={18} /> Communautés ({filteredCommunities.length})</h2>
            </div>

            {loading && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                Chargement des communautés...
              </div>
            )}

            {error && (
              <div style={{ padding: '20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '14px', color: '#b91c1c', marginBottom: '20px' }}>
                ❌ {error}
                <button onClick={loadCommunities} style={{ marginLeft: '12px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: '#b91c1c' }}>
                  Réessayer
                </button>
              </div>
            )}

            {!loading && communities.length === 0 && !error && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                <Users size={40} style={{ margin: '0 auto 10px' }} />
                <p>Aucune communauté pour l'instant. Sois le premier à en créer une !</p>
              </div>
            )}

            {!loading && communities.length > 0 && filteredCommunities.length === 0 && !error && (
              <div style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                <p>Aucune communauté ne correspond à ces critères.</p>
                <button
                  className="pf-btn pf-btn--secondary pf-btn--sm"
                  onClick={() => {
                    setActiveFilter('Tous');
                    setSearchQuery('');
                  }}
                >
                  Tous
                </button>
              </div>
            )}

            <div className="pf-communities__grid">
              {filteredCommunities.map((c) => {
                const isLocationMatch = matchesPreference(userCity, communityCity(c)) ||
                  matchesPreference(userQuartier, communityQuartier(c));
                const isLevelMatch = Boolean(c.level && (
                  matchesPreference(userSkill, c.level) || normalizeText(c.level).includes('tous')
                ));
                const isPerfectMatch = isLocationMatch && isLevelMatch;

                return (
                  <article key={c.id} className={`pf-community-card pf-community-card--${c.color}`}>
                    <div className="pf-community-card__cover">
                      {isPerfectMatch ? (
                        <span className="pf-community-card__badge" style={{ color: '#047857', background: '#ecfdf5', border: '1px solid #10b981' }}>
                          <Sparkles size={12} /> Match Parfait
                        </span>
                      ) : c.isPrivate ? (
                        <span className="pf-community-card__badge" style={{ color: '#0369a1' }}>
                          <Lock size={12} /> Sur Validation Admin
                        </span>
                      ) : (
                        <span className="pf-community-card__badge" style={{ color: '#047857' }}>
                          <Globe size={12} /> Publique
                        </span>
                      )}
                    </div>

                    <div className="pf-community-card__body">
                      <span className="pf-community-card__sport">{c.sport}</span>
                      <h3>{c.name}</h3>
                      <p className="pf-community-card__loc"><MapPin size={14} /> {c.location}</p>

                      <div className="pf-community-card__meta">
                        <span><UserCheck size={14} /> {c.membersCount} membres</span>
                        <span className="pf-community-card__level">• Admin : {c.adminName.split(' ')[0]}</span>
                      </div>

                      <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {c.description}
                      </p>

                      <div className="pf-community-card__foot">
                        <button
                          className="pf-btn pf-btn--secondary pf-btn--sm"
                          onClick={() => loadCommunityDetail(c.id)}
                        >
                          Fil &amp; Actualités
                        </button>

                        {c.isAdmin ? (
                          <span className="pf-badge pf-badge--pro">
                            <Crown size={12} /> Administrateur
                          </span>
                        ) : c.isMember || userRequests[c.id] === 'member' ? (
                          <span className="pf-badge pf-badge--green">
                            <UserCheck size={12} /> Déjà membre
                          </span>
                        ) : userRequests[c.id] === 'pending' ? (
                          <span className="pf-badge pf-badge--warning">
                            <Clock size={12} /> En attente validation
                          </span>
                        ) : (
                          <button
                            className="pf-btn pf-btn--primary pf-btn--sm"
                            onClick={() => setShowJoinModal(c)}
                          >
                            Rejoindre
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* MODAL : CRÉER UNE COMMUNAUTÉ */}
      {showCreateModal && (
        <div className="pf-modal-overlay" style={{
          position: 'fixed', inset: 0, background: 'rgba(9, 13, 22, 0.7)',
          backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }} onClick={() => setShowCreateModal(false)}>
          <div className="pf-card pf-glass" style={{ width: '100%', maxWidth: '540px', padding: '32px', borderRadius: '24px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>Créer une Nouvelle Communauté</h2>
              <button onClick={() => setShowCreateModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateCommunity} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>Nom de la communauté *</label>
                <input
                  type="text"
                  placeholder="Ex: Padel Masters Maarif"
                  value={newCommData.name}
                  onChange={e => setNewCommData({ ...newCommData, name: e.target.value })}
                  required
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '6px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700' }}>Sport principal *</label>
                  <select
                    value={newCommData.sport}
                    onChange={e => setNewCommData({ ...newCommData, sport: e.target.value })}
                    style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '6px' }}
                  >
                    {['Football', 'Padel', 'Basketball', 'Tennis', 'Running', 'Futsal'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700' }}>Accès &amp; Validation *</label>
                  <select
                    value={newCommData.isPrivate ? 'private' : 'public'}
                    onChange={e => setNewCommData({ ...newCommData, isPrivate: e.target.value === 'private' })}
                    style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '6px' }}
                  >
                    <option value="private">Sur validation de l'Admin</option>
                    <option value="public">Libre accès publique</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>Description du club &amp; règles *</label>
                <textarea
                  placeholder="Décrivez l'ambiance, les jours de matchs et les conditions de recrutement..."
                  rows={3}
                  value={newCommData.description}
                  onChange={e => setNewCommData({ ...newCommData, description: e.target.value })}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '6px', fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="pf-btn pf-btn--primary pf-btn--lg" style={{ marginTop: '10px' }}>
                <Plus size={18} /> Officialiser la Communauté
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL : DEMANDE D'ADHÉSION */}
      {showJoinModal && (
        <div className="pf-modal-overlay" style={{
          position: 'fixed', inset: 0, background: 'rgba(9, 13, 22, 0.7)',
          backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }} onClick={() => setShowJoinModal(null)}>
          <div className="pf-card pf-glass" style={{ width: '100%', maxWidth: '480px', padding: '28px', borderRadius: '24px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Rejoindre {showJoinModal.name}</h3>
              <button onClick={() => setShowJoinModal(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>
              Cette communauté est gérée par <strong>{showJoinModal.adminName}</strong>. Votre message sera transmis pour validation.
            </p>

            <form onSubmit={handleSendJoinRequest}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Message au responsable :</label>
                <textarea
                  rows={4}
                  placeholder="Bonjour ! J'aimerais rejoindre votre communauté..."
                  value={joinMessage}
                  onChange={e => setJoinMessage(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="pf-btn pf-btn--secondary pf-btn--md" style={{ flex: 1 }} onClick={() => setShowJoinModal(null)}>
                  Annuler
                </button>
                <button
                  type="submit"
                  className="pf-btn pf-btn--primary pf-btn--md"
                  style={{ flex: 1 }}
                  disabled={joiningCommunityId === showJoinModal.id}
                >
                  <Send size={16} /> {joiningCommunityId === showJoinModal.id ? 'Envoi...' : 'Envoyer la demande'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   VUE DÉTAILLÉE — avec gestion admin basée sur isAdmin (API)
   ========================================================= */
function CommunityDetailView({
  community,
  onBack,
  onSendPost,
  onAddComment,
  onToggleLike,
  onAdminDecision,
  userRequestStatus,
  onRequestJoin,
  postAccessDenied,
}) {
  const [activeTab, setActiveTab] = useState('feed');
  const [postText, setPostText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('none');
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});

  const fileInputRef = useRef(null);

  // ✅ Fiable : calculé côté backend (pfcommunity_members.role = 'ADMIN')
  const isAdmin = !!community.isAdmin;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    const reader = new FileReader();
    reader.onload = (event) => {
      setMediaUrl(event.target.result);
      setMediaType(isVideo ? 'video' : isImage ? 'image' : 'none');
      setShowMediaInput(true);
    };
    reader.readAsDataURL(file);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postText.trim() && !mediaUrl.trim()) return;
    onSendPost({
      content: postText,
      mediaUrl: mediaUrl.trim(),
      mediaType,
      postType: mediaType !== 'none' ? mediaType : 'text',
    });
    setPostText('');
    setMediaUrl('');
    setMediaType('none');
    setShowMediaInput(false);
  };

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    onAddComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="pf-community-detail pf-fade-up">
      <section className="pf-communities__header" style={{ padding: '40px 0 32px' }}>
        <div className="pf-communities__container">
          <button className="pf-btn pf-btn--ghost pf-btn--sm" onClick={onBack} style={{ marginBottom: '16px' }}>
            <ChevronLeft size={16} /> Retour aux communautés
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <span className="pf-badge pf-badge--green" style={{ marginBottom: '8px' }}>
                {community.sport} · {community.location}
              </span>
              <h1 style={{ fontSize: '32px', margin: '4px 0 8px' }}>{community.name}</h1>
              <p style={{ margin: 0, color: '#64748b' }}>
                Administrateur : <strong>{community.adminName}</strong>{' '}
                {isAdmin && <span className="pf-badge pf-badge--pro" style={{ marginLeft: '6px' }}>Vous êtes Admin</span>}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {isAdmin ? (
                <span className="pf-badge pf-badge--pro" style={{ padding: '10px 18px', fontSize: '13px' }}>
                  <Crown size={16} /> Administrateur
                </span>
              ) : community.isMember || userRequestStatus === 'member' ? (
                <span className="pf-badge pf-badge--green" style={{ padding: '10px 18px', fontSize: '13px' }}>
                  <UserCheck size={16} /> Déjà membre
                </span>
              ) : userRequestStatus === 'pending' ? (
                <span className="pf-badge pf-badge--warning" style={{ padding: '10px 18px', fontSize: '13px' }}>
                  <Clock size={16} /> Demande en attente
                </span>
              ) : (
                <button className="pf-btn pf-btn--primary pf-btn--md" onClick={onRequestJoin}>
                  <UserCheck size={18} /> Rejoindre la communauté
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="pf-communities__container" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '24px' }}>
          <button
            className={`pf-btn ${activeTab === 'feed' ? 'pf-btn--primary' : 'pf-btn--ghost'} pf-btn--sm`}
            onClick={() => setActiveTab('feed')}
          >
            📰 Fil Multimédia ({community.posts.length})
          </button>
          <button
            className={`pf-btn ${activeTab === 'members' ? 'pf-btn--primary' : 'pf-btn--ghost'} pf-btn--sm`}
            onClick={() => setActiveTab('members')}
          >
            👥 Membres ({community.members.length})
          </button>

          {/* ✅ Onglet admin uniquement */}
          {isAdmin && (
            <button
              className={`pf-btn ${activeTab === 'requests' ? 'pf-btn--danger' : 'pf-btn--ghost'} pf-btn--sm`}
              onClick={() => setActiveTab('requests')}
            >
              📩 Demandes
              {community.pendingRequests.length > 0 && (
                <span style={{
                  marginLeft: '8px', background: '#ef4444', color: '#fff',
                  borderRadius: '999px', padding: '2px 8px', fontSize: '11px', fontWeight: 700
                }}>
                  {community.pendingRequests.length}
                </span>
              )}
            </button>
          )}
        </div>

        {activeTab === 'feed' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
            <div>
              <div className="pf-card" style={{ padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={16} style={{ color: '#10b981' }} /> Publier sur le mur de {community.name}
                </h3>

                {!community.isMember && !isAdmin ? (
                  <p role={postAccessDenied ? 'alert' : undefined} style={{ color: postAccessDenied ? '#b91c1c' : '#64748b', margin: 0 }}>
                    {postAccessDenied
                      ? 'Vous devez être membre de cette communauté pour publier.'
                      : 'Rejoignez la communauté pour publier sur son fil.'}
                  </p>
                ) : (
                <form onSubmit={handlePostSubmit}>
                  <textarea
                    rows={3}
                    placeholder="Racontez votre dernier match..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', fontFamily: 'inherit', marginBottom: '12px' }}
                  />

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />

                  {showMediaInput && (
                    <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                        <button type="button" className={`pf-btn ${mediaType === 'image' ? 'pf-btn--primary' : 'pf-btn--secondary'} pf-btn--sm`} onClick={() => setMediaType('image')}>
                          <ImageIcon size={14} /> Photo
                        </button>
                        <button type="button" className={`pf-btn ${mediaType === 'video' ? 'pf-btn--primary' : 'pf-btn--secondary'} pf-btn--sm`} onClick={() => setMediaType('video')}>
                          <VideoIcon size={14} /> Vidéo
                        </button>
                      </div>

                      {mediaUrl ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '13px', color: '#059669', fontWeight: '700' }}>✓ Média prêt</span>
                          <button type="button" onClick={() => { setMediaUrl(''); setMediaType('none'); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={16} /></button>
                        </div>
                      ) : (
                        <input
                          type="url"
                          placeholder="URL du média..."
                          value={mediaUrl}
                          onChange={(e) => setMediaUrl(e.target.value)}
                          style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                        />
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="button" className="pf-btn pf-btn--ghost pf-btn--sm" onClick={() => fileInputRef.current?.click()}>
                        <Upload size={16} style={{ color: '#059669' }} /> Importer
                      </button>
                      <button type="button" className="pf-btn pf-btn--ghost pf-btn--sm" onClick={() => { setShowMediaInput(!showMediaInput); if (mediaType === 'none') setMediaType('image'); }}>
                        <ImageIcon size={16} style={{ color: '#0369a1' }} /> URL
                      </button>
                    </div>

                    <button type="submit" className="pf-btn pf-btn--primary pf-btn--sm" disabled={!postText.trim() && !mediaUrl.trim()}>
                      <Send size={15} /> Publier
                    </button>
                  </div>
                </form>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {community.posts.map((post) => (
                  <article key={post.id} className="pf-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <div className="pf-player-nav__avatar" style={{ width: '42px', height: '42px' }}>
                        {post.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong style={{ fontSize: '15.5px', display: 'block' }}>{post.author}</strong>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{post.authorRole} · {post.date}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#1e293b', margin: '0 0 16px' }}>
                      {post.content}
                    </p>

                    {post.mediaUrl && post.mediaType === 'image' && (
                      <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
                        <img src={post.mediaUrl} alt="Publication" style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }} />
                      </div>
                    )}

                    {post.mediaUrl && post.mediaType === 'video' && (
                      <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', background: '#000000', border: '1px solid #e2e8f0' }}>
                        <video controls style={{ width: '100%', maxHeight: '420px' }}>
                          <source src={post.mediaUrl} type="video/mp4" />
                        </video>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '16px' }}>
                      <button className={`pf-btn ${post.userLiked ? 'pf-btn--primary' : 'pf-btn--ghost'} pf-btn--sm`} onClick={() => onToggleLike(post.id)}>
                        <Flame size={16} /> Présent / J'aime ({post.likes})
                      </button>
                      <button className="pf-btn pf-btn--ghost pf-btn--sm">
                        <MessageSquare size={16} /> Commentaires ({post.comments.length})
                      </button>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                      {post.comments.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                          {post.comments.map((c) => (
                            <div key={c.id} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                                <strong>{c.author}</strong>
                                <span style={{ color: '#94a3b8' }}>{c.date}</span>
                              </div>
                              <p style={{ margin: 0, fontSize: '13.5px', color: '#334155' }}>{c.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <form onSubmit={(e) => handleCommentSubmit(post.id, e)} style={{ display: 'flex', gap: '10px' }}>
                        <input
                          type="text"
                          placeholder="Écrire un commentaire..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          style={{ flex: 1, height: '40px', padding: '0 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13.5px' }}
                        />
                        <button type="submit" className="pf-btn pf-btn--primary pf-btn--sm" disabled={!commentInputs[post.id]?.trim()}>
                          Répondre
                        </button>
                      </form>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="pf-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>À propos</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{community.description}</p>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginTop: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                    <span>Sport</span><strong>{community.sport}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Accès</span><strong>{community.isPrivate ? 'Sur validation' : 'Libre'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="pf-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Membres Certifiés</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {community.members.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                  <div className="pf-player-nav__avatar">{m.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <strong style={{ fontSize: '15px', display: 'block' }}>{m.name}</strong>
                    <span style={{ fontSize: '12px', color: '#059669', fontWeight: '700' }}>{m.role}</span>
                  </div>
                  <span className="pf-badge pf-badge--neutral" style={{ marginLeft: 'auto' }}>{m.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Panneau admin — UNIQUEMENT visible par l'admin */}
        {activeTab === 'requests' && isAdmin && (
          <div className="pf-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} style={{ color: '#10b981' }} /> Demandes d'Adhésion ({community.pendingRequests.length})
            </h3>

            {community.pendingRequests.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                <CheckCircle2 size={36} style={{ margin: '0 auto 10px', color: '#10b981' }} />
                <p>Aucune demande en attente.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {community.pendingRequests.map((req) => (
                  <div key={req.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '18px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '16px' }}>{req.name}</strong>
                        <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '10px' }}>{req.city} · Niveau {req.level}</span>
                      </div>
                      <span className="pf-badge pf-badge--warning">En attente</span>
                    </div>

                    <p style={{ fontSize: '14px', background: '#ffffff', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', fontStyle: 'italic', margin: '0 0 16px' }}>
                      "{req.message}"
                    </p>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button className="pf-btn pf-btn--danger pf-btn--sm" onClick={() => onAdminDecision(req.id, false)}>
                        <XCircle size={16} /> Refuser
                      </button>
                      <button className="pf-btn pf-btn--primary pf-btn--sm" onClick={() => onAdminDecision(req.id, true)}>
                        <CheckCircle2 size={16} /> Accepter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}