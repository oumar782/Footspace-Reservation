// src/data/coaches.js
import axios from 'axios';

const API_URL = 'https://backend-foot-omega.vercel.app/api/coach';

// COACH_COLORS exportÃ© pour compatibilitÃ©
export const COACH_COLORS = [
  ['#09A923', '#13BE2D'],
  ['#F3BB18', '#ECC74F'],
  ['#4DB95C', '#09A923'],
  ['#1A1B1D', '#1A1B1D'],
  ['#13BE2D', '#4DB95C'],
  ['#F3BB18', '#F3BB18'],
  ['#09A923', '#1A1B1D'],
  ['#ECC74F', '#F3BB18'],
];

// RÃ©cupÃ©rer tous les coaches depuis l'API
export const getCoaches = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.discipline) params.append('discipline', filters.discipline);
    if (filters.city) params.append('city', filters.city);
    if (filters.search) params.append('search', filters.search);
    
    const url = `${API_URL}${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axios.get(url);
    
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la rÃ©cupÃ©ration des coaches:', error);
    return [];
  }
};

// RÃ©cupÃ©rer les coaches par discipline depuis l'API
export const getCoachesByDiscipline = async (discipline) => {
  try {
    if (!discipline) return getCoaches();
    const response = await axios.get(`${API_URL}/discipline/${discipline}`);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la rÃ©cupÃ©ration des coaches par discipline:', error);
    return [];
  }
};

// RÃ©cupÃ©rer les coaches recommandÃ©s depuis l'API
export const getRecommendedCoaches = async (discipline) => {
  try {
    const url = discipline ? `${API_URL}/recommended/${discipline}` : `${API_URL}/recommended`;
    const response = await axios.get(url);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la rÃ©cupÃ©ration des coaches recommandÃ©s:', error);
    return [];
  }
};

// RÃ©cupÃ©rer un coach par son ID depuis l'API
export const getCoachById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la rÃ©cupÃ©ration du coach:', error);
    return null;
  }
};

// Ajouter un avis sur un coach
export const addCoachReview = async (coachId, reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/${coachId}/reviews`, reviewData);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erreur lors de l\'ajout de l\'avis');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'avis:', error);
    throw error;
  }
};

// Fonction utilitaire pour obtenir les initiales d'un coach
export const getCoachInitials = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

// Export par dÃ©faut pour la compatibilitÃ©
export default {
  getCoaches,
  getCoachesByDiscipline,
  getRecommendedCoaches,
  getCoachById,
  addCoachReview,
  getCoachInitials,
  COACH_COLORS
};