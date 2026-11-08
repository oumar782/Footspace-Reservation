/**
 * PlayForest — Service API centralisé (endpoints)
 * Connecté au backend Express / PostgreSQL (`authpf`)
 */
import { apiClient, localApiClient, extractData } from './apiClient';

/* ═══════════════════════════════════════════════════ */
/* AUTHENTIFICATION (/api/authentification)             */
/* ═══════════════════════════════════════════════════ */
export const authAPI = {
  login: (email, password) =>
    apiClient.post('/api/authentification/login', { email, password }).then(extractData),
  register: (payload) =>
    apiClient.post('/api/authentification/register', payload).then(extractData),
  me: () => apiClient.get('/api/authentification/me').then(extractData),
  logout: () => apiClient.post('/api/authentification/logout').then(extractData),
  getUserById: (id) => apiClient.get(`/api/authentification/users/${id}`).then(extractData),
  updateUser: (id, payload) => apiClient.put(`/api/authentification/users/${id}`, payload).then(extractData),
};

/* ═══════════════════════════════════════════════════ */
/* SESSIONS                                             */
/* ═══════════════════════════════════════════════════ */
export const sessionsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });
    return apiClient.get(`/api/sessions?${params.toString()}`).then(extractData);
  },
  getById: (id) => apiClient.get(`/api/sessions/${id}`).then(extractData),
  create: (data) => apiClient.post('/api/sessions', data).then(extractData),
  join: (id, player) =>
    apiClient.post(`/api/sessions/${id}/players`, player).then(extractData),
  leave: (id, playerId) =>
    apiClient.delete(`/api/sessions/${id}/players/${playerId}`).then(extractData),
  cancel: (id) => apiClient.delete(`/api/sessions/${id}`).then(extractData),
  getStats: () =>
    apiClient.get('/api/sessions/statistiques/overview').then(extractData),
};

/* ═══════════════════════════════════════════════════ */
/* TERRAINS / CRÉNEAUX                                  */
/* ═══════════════════════════════════════════════════ */
export const fieldsAPI = {
  getAll: () => apiClient.get('/api/creneaux/creneaux').then(extractData),
  getById: (id) => apiClient.get(`/api/creneaux/${id}`).then(extractData),
  search: (params) =>
    apiClient.get('/api/creneaux/creneaux', { params }).then(extractData),
  updateStatus: (id, status) =>
    apiClient.put(`/api/gestioncreneaux/${id}`, { statut: status }).then(extractData),
};

/* ═══════════════════════════════════════════════════ */
/* RÉSERVATIONS                                          */
/* ═══════════════════════════════════════════════════ */
export const bookingsAPI = {
  create: (data) => apiClient.post('/api/reservation/', data).then(extractData),
  getClientReservations: (email) =>
    apiClient.get(`/api/reservation/client/${email}`).then(extractData),
  getById: (id) => apiClient.get(`/api/reservation/${id}`).then(extractData),
  updateStatus: (id, statut) =>
    apiClient.put(`/api/reservation/${id}/statut`, { statut }).then(extractData),
  getAll: () => apiClient.get('/api/reservation').then(extractData),
};

/* ═══════════════════════════════════════════════════ */
/* COACHS                                                */
/* ═══════════════════════════════════════════════════ */
export const coachesAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });
    return apiClient.get(`/api/coach?${params.toString()}`).then(extractData);
  },
  getById: (id) => apiClient.get(`/api/coach/${id}`).then(extractData),
  getByDiscipline: (discipline) =>
    apiClient.get(`/api/coach/discipline/${discipline}`).then(extractData),
  getRecommended: (discipline) => {
    const url = discipline
      ? `/api/coach/recommended/${discipline}`
      : '/api/coach/recommended';
    return apiClient.get(url).then(extractData);
  },
  addReview: (coachId, data) =>
    apiClient.post(`/api/coach/${coachId}/reviews`, data).then(extractData),
};

/* ═══════════════════════════════════════════════════ */
/* TOURNOIS                                              */
/* ═══════════════════════════════════════════════════ */
export const tournamentsAPI = {
  getAll: (sportFilter = '') => {
    const params = sportFilter ? `?sport=${sportFilter}` : '';
    return apiClient.get(`/api/tournoi${params}`).then(extractData);
  },
  getById: (id) => apiClient.get(`/api/tournoi/${id}`).then(extractData),
  create: (data) => apiClient.post('/api/tournoi', data).then(extractData),
  update: (id, data) => apiClient.put(`/api/tournoi/${id}`, data).then(extractData),
  delete: (id) => apiClient.delete(`/api/tournoi/${id}`).then(extractData),
  register: (id, teamData) =>
    apiClient.post(`/api/tournoi/${id}/register`, teamData).then(extractData),
  getRegistrations: (id) =>
    apiClient.get(`/api/tournoi/${id}/registrations`).then(extractData),
  cancelRegistration: (id, email) =>
    apiClient
      .delete(`/api/tournoi/${id}/registrations`, { params: { email } })
      .then(extractData),
  getStats: (id) => apiClient.get(`/api/tournoi/${id}/stats`).then(extractData),
  getSports: () => apiClient.get('/api/tournoi/sports/list').then(extractData),
  getByDate: (date) => apiClient.get(`/api/tournoi/date/${date}`).then(extractData),
  getRemainingSpots: (id) =>
    apiClient.get(`/api/tournoi/${id}/remaining-spots`).then(extractData),
  checkRegistration: (id, email) =>
    apiClient
      .get(`/api/tournoi/${id}/check-registration`, { params: { email } })
      .then(extractData),
};

/* ═══════════════════════════════════════════════════ */
/* BOUTIQUE                                             */
/* ═══════════════════════════════════════════════════ */
export const shopAPI = {
  getAll: (params = {}) =>
    localApiClient.get('/api/boutique/products', { params }).then(extractData),
  getById: (id) => localApiClient.get(`/api/boutique/products/${id}`).then(extractData),
  create: (data) => localApiClient.post('/api/boutique/products', data).then(extractData),
  update: (id, data) => localApiClient.put(`/api/boutique/products/${id}`, data).then(extractData),
  delete: (id) => localApiClient.delete(`/api/boutique/products/${id}`).then(extractData),
  getCategories: () => localApiClient.get('/api/boutique/categories').then(extractData),
  createOrder: (data) => localApiClient.post('/api/orders', data).then(extractData),
  getOrders: () => localApiClient.get('/api/orders').then(extractData),
  getOrder: (id) => localApiClient.get(`/api/orders/${id}`).then(extractData),
  getStats: () => localApiClient.get('/api/stats').then(extractData),
};

export default { authAPI, sessionsAPI, fieldsAPI, bookingsAPI, coachesAPI, tournamentsAPI, shopAPI };