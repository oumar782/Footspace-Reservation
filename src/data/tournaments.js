// src/utils/tournamentStorage.js
import axios from 'axios';

const API_URL = 'https://backend-foot-omega.vercel.app/api/tournoi';

// ============================================
// COULEURS DES SPORTS
// ============================================
export const getSportColor = (sport) => {
    const colors = {
        football: '#0a750d',
        tennis: '#ffd700',
        basketball: '#e67e22',
        volleyball: '#8e44ad',
        handball: '#2980b9',
        padel: '#27ae60',
        badminton: '#e74c3c',
        rugby: '#2c3e50',
        pingpong: '#e67e22'
    };
    return colors[sport?.toLowerCase()] || '#0a750d';
};

// ============================================
// RÉCUPÉRER TOUS LES TOURNOIS
// ============================================
export const getTournaments = async (sportFilter = '') => {
    try {
        const params = new URLSearchParams();
        if (sportFilter) params.append('sport', sportFilter);
        
        const url = `${API_URL}${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await axios.get(url);
        
        if (response.data.success) {
            return response.data.data.map(t => ({
                id: t.id,
                name: t.name,
                sport: t.sport,
                type: t.type || 'tournament',
                description: t.description || '',
                date: t.date,
                end_date: t.end_date || t.date,
                time: t.time,
                location: t.location,
                teamsNeeded: t.teams_needed,
                teamsJoined: t.teamsJoined || [],
                teams_joined: t.teams_joined || 0,
                fee: t.fee || '0',
                status: t.status || 'open',
                created_at: t.created_at,
                updated_at: t.updated_at
            }));
        }
        return [];
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

// ============================================
// RÉCUPÉRER UN TOURNOI PAR SON ID
// ============================================
export const getTournamentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (response.data.success) {
            const t = response.data.data;
            return {
                id: t.id,
                name: t.name,
                sport: t.sport,
                type: t.type || 'tournament',
                description: t.description || '',
                date: t.date,
                end_date: t.end_date || t.date,
                time: t.time,
                location: t.location,
                teamsNeeded: t.teams_needed,
                teamsJoined: t.teamsJoined || [],
                teams_joined: t.teams_joined || 0,
                fee: t.fee || '0',
                status: t.status || 'open',
                created_at: t.created_at,
                updated_at: t.updated_at
            };
        }
        return null;
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
};

// ============================================
// CRÉER UN NOUVEAU TOURNOI
// ============================================
export const createTournament = async (tournamentData) => {
    try {
        const response = await axios.post(API_URL, tournamentData);
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || 'Erreur lors de la création');
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};

// ============================================
// MODIFIER UN TOURNOI
// ============================================
export const updateTournament = async (id, tournamentData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, tournamentData);
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || 'Erreur lors de la mise à jour');
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};

// ============================================
// SUPPRIMER UN TOURNOI (soft delete)
// ============================================
export const deleteTournament = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || 'Erreur lors de la suppression');
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};

// ============================================
// S'INSCRIRE À UN TOURNOI
// ============================================
export const registerForTournament = async (tournamentId, formData) => {
    try {
        if (!formData.team_name || !formData.captain_name || !formData.email || !formData.phone) {
            throw new Error('Tous les champs sont obligatoires');
        }

        const response = await axios.post(`${API_URL}/${tournamentId}/register`, {
            team_name: formData.team_name,
            captain_name: formData.captain_name,
            email: formData.email,
            phone: formData.phone
        });

        if (response.data.success) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        }
        throw new Error(response.data.message || 'Erreur lors de l\'inscription');
    } catch (error) {
        console.error('Erreur:', error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de l\'inscription');
        }
        throw error;
    }
};

// ============================================
// RÉCUPÉRER LES INSCRIPTIONS D'UN TOURNOI
// ============================================
export const getTournamentRegistrations = async (tournamentId) => {
    try {
        const response = await axios.get(`${API_URL}/${tournamentId}/registrations`);
        if (response.data.success) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

// ============================================
// ANNULER UNE INSCRIPTION
// ============================================
export const cancelRegistration = async (registrationId) => {
    try {
        const response = await axios.delete(`${API_URL}/registrations/${registrationId}`);
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || 'Erreur lors de l\'annulation');
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};

// ============================================
// RÉCUPÉRER LES STATISTIQUES DES TOURNOIS
// ============================================
export const getTournamentStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/statistiques/overview`);
        if (response.data.success) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
};

// ============================================
// RÉCUPÉRER LA LISTE DES SPORTS DISPONIBLES
// ============================================
export const getSportsList = async () => {
    try {
        const response = await axios.get(`${API_URL}/sports/list`);
        if (response.data.success) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

// ============================================
// RECHERCHER DES TOURNOIS PAR DATE
// ============================================
export const getTournamentsByDate = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/date/${date}`);
        if (response.data.success) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

// ============================================
// VÉRIFIER LES PLACES RESTANTES
// ============================================
export const getRemainingSpots = async (tournamentId) => {
    try {
        const response = await axios.get(`${API_URL}/${tournamentId}/remaining-spots`);
        if (response.data.success) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
};

// ============================================
// VÉRIFIER SI UNE ÉQUIPE EST INSCRITE
// ============================================
export const checkRegistration = async (tournamentId, email) => {
    try {
        const response = await axios.get(`${API_URL}/${tournamentId}/check-registration?email=${encodeURIComponent(email)}`);
        if (response.data.success) {
            return response.data.data;
        }
        return { registered: false, registration: null };
    } catch (error) {
        console.error('Erreur:', error);
        return { registered: false, registration: null };
    }
};

// ============================================
// FORMATER UN TOURNOI POUR L'AFFICHAGE
// ============================================
export const formatTournament = (tournament) => {
    return {
        id: tournament.id,
        name: tournament.name,
        sport: tournament.sport,
        type: tournament.type || 'tournament',
        description: tournament.description || '',
        date: tournament.date,
        end_date: tournament.end_date || tournament.date,
        time: tournament.time,
        location: tournament.location,
        teamsNeeded: tournament.teams_needed,
        teamsJoined: tournament.teamsJoined || [],
        teams_joined: tournament.teams_joined || 0,
        fee: tournament.fee || 'Gratuit',
        status: tournament.status || 'open',
        created_at: tournament.created_at,
        updated_at: tournament.updated_at
    };
};

// ============================================
// EXPORT PAR DÉFAUT
// ============================================
export default {
    getTournaments,
    getTournamentById,
    createTournament,
    updateTournament,
    deleteTournament,
    registerForTournament,
    getTournamentRegistrations,
    cancelRegistration,
    getTournamentStats,
    getSportsList,
    getTournamentsByDate,
    getRemainingSpots,
    checkRegistration,
    formatTournament,
    getSportColor
};