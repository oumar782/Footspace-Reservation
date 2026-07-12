// services/sessionService.js
import axios from 'axios';

const API_URL = 'https://backend-foot-omega.vercel.app/api/sessions';

const PLAYERS_BY_SPORT = {
  football: 14,
  tennis: 4,
  basketball: 10,
  volleyball: 12,
  handball: 14,
  rugby: 14,
  padel: 4,
  badminton: 4,
  pingpong: 4,
};

export const getPlayersNeeded = (sport) => {
  return PLAYERS_BY_SPORT[sport?.toLowerCase()] || 10;
};

export const getSessions = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.sport) params.append('sport', filters.sport);
    if (filters.ville) params.append('ville', filters.ville);
    if (filters.quartier) params.append('quartier', filters.quartier);
    if (filters.date) params.append('date', filters.date);
    if (filters.status) params.append('status', filters.status);

    const url = `${API_URL}${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axios.get(url);
    
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions:', error);
    return [];
  }
};

export const getSessionById = async (sessionId) => {
  try {
    const response = await axios.get(`${API_URL}/${sessionId}`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    return null;
  }
};

export const createSessionFromReservation = async (reservation, creneau) => {
  try {
    const sport = (reservation.typeterrain || creneau?.typeTerrain || 'football').toLowerCase();
    const playersNeeded = getPlayersNeeded(sport);

    const sessionData = {
      reservation_id: reservation.id || Date.now(),
      sport,
      date: reservation.datereservation || creneau?.datecreneaux,
      heure: reservation.heurereservation || creneau?.heure,
      heurefin: reservation.heurefin || creneau?.heurefin,
      terrain: reservation.nomterrain || creneau?.nomterrain || 'Terrain Principal',
      ville: reservation.ville || creneau?.ville || 'Non specifie',
      quartier: reservation.quartier || creneau?.quartier || 'Non specifie',
      creator_name: `${reservation.prenom} ${reservation.nomclient}`,
      creator_email: reservation.email || '',
      creator_phone: reservation.telephone || '',
      players_needed: playersNeeded
    };

    const response = await axios.post(API_URL, sessionData);
    
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erreur lors de la creation de la session');
  } catch (error) {
    console.error('Erreur lors de la creation de la session:', error);
    throw error;
  }
};

export const joinSession = async (sessionId, playerInfo) => {
  try {
    const response = await axios.post(`${API_URL}/${sessionId}/players`, {
      name: playerInfo.name,
      email: playerInfo.email || '',
      phone: playerInfo.phone
    });

    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erreur lors de l\'inscription');
  } catch (error) {
    console.error('Erreur lors de l\'inscription à la session:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Erreur lors de l\'inscription');
    }
    throw error;
  }
};

export const leaveSession = async (sessionId, playerId) => {
  try {
    const response = await axios.delete(`${API_URL}/${sessionId}/players/${playerId}`);
    if (response.data.success) {
      return true;
    }
    throw new Error(response.data.message || 'Erreur lors du retrait');
  } catch (error) {
    console.error('Erreur lors du retrait de la session:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Erreur lors du retrait');
    }
    throw error;
  }
};

export const updateSession = async (sessionId, updates) => {
  try {
    const response = await axios.put(`${API_URL}/${sessionId}`, updates);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erreur lors de la mise à jour');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la session:', error);
    throw error;
  }
};

export const cancelSession = async (sessionId) => {
  try {
    const response = await axios.delete(`${API_URL}/${sessionId}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erreur lors de l\'annulation');
  } catch (error) {
    console.error('Erreur lors de l\'annulation de la session:', error);
    throw error;
  }
};

export const getSessionsBySport = async (sport) => {
  try {
    if (!sport) return getSessions();
    const response = await axios.get(`${API_URL}/sport/${sport}`);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions par sport:', error);
    return [];
  }
};

export const getOpenSessionsCount = async () => {
  try {
    const sessions = await getSessions({ status: 'open' });
    return sessions.length;
  } catch (error) {
    console.error('Erreur lors du comptage des sessions ouvertes:', error);
    return 0;
  }
};

export const getSessionsStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistiques/overview`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return null;
  }
};

export const seedDemoSessions = async () => {
  try {
    const existingSessions = await getSessions();
    if (existingSessions.length > 0) return;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    const demoSessions = [
      {
        sport: 'football',
        date: dateStr,
        heure: '18:00',
        heurefin: '19:30',
        terrain: 'Terrain PlayZone Casa A',
        ville: 'Casablanca',
        quartier: 'Maarif',
        creator_name: 'Yassine B.',
        creator_email: 'demo@playzone.ma',
        creator_phone: '0612345678',
        players_needed: 14
      },
      {
        sport: 'basketball',
        date: dateStr,
        heure: '20:00',
        heurefin: '21:30',
        terrain: 'Court PlayZone Rabat',
        ville: 'Rabat',
        quartier: 'Agdal',
        creator_name: 'Sara A.',
        creator_email: 'sara@demo.ma',
        creator_phone: '0687654321',
        players_needed: 10
      },
      {
        sport: 'padel',
        date: dateStr,
        heure: '17:00',
        heurefin: '18:00',
        terrain: 'Padel Center PlayZone',
        ville: 'Casablanca',
        quartier: 'Anfa',
        creator_name: 'Nadia F.',
        creator_email: 'nadia@demo.ma',
        creator_phone: '0678912345',
        players_needed: 4
      }
    ];

    for (const session of demoSessions) {
      await axios.post(API_URL, session);
    }

    console.log('✅ Sessions de demonstration creees avec succes');
  } catch (error) {
    console.error('❌ Erreur lors de la creation des sessions de demonstration:', error);
  }
};

export const formatSession = (session) => {
  return {
    id: session.id,
    reservationId: session.reservation_id,
    sport: session.sport,
    date: session.date,
    heure: session.heure,
    heurefin: session.heurefin,
    terrain: session.terrain,
    ville: session.ville,
    quartier: session.quartier,
    creatorName: session.creator_name,
    creatorEmail: session.creator_email,
    creatorPhone: session.creator_phone,
    playersNeeded: session.players_needed,
    playersJoined: session.players || [],
    currentPlayers: session.current_players || 0,
    status: session.status,
    createdAt: session.created_at,
    updatedAt: session.updated_at
  };
};

export default {
  getSessions,
  getSessionById,
  createSessionFromReservation,
  joinSession,
  leaveSession,
  updateSession,
  cancelSession,
  getSessionsBySport,
  getOpenSessionsCount,
  getSessionsStats,
  seedDemoSessions,
  getPlayersNeeded,
  formatSession
};