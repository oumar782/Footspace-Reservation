// src/data/coaches.js
import axios from 'axios';

const API_URL = 'https://backend-foot-omega.vercel.app/api/coach';

// COACH_COLORS exporté pour compatibilité
export const COACH_COLORS = [
  ['#3e6c1a', '#027e0f'],
  ['#ffd700', '#ffb347'],
  ['#0ea5e9', '#06b6d4'],
  ['#10b981', '#34d399'],
  ['#f59e0b', '#fbbf24'],
  ['#ef4444', '#f97316'],
  ['#8b5cf6', '#a855f7'],
  ['#ec4899', '#f472b6'],
];

// Récupérer tous les coaches depuis l'API
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
    console.error('Erreur lors de la récupération des coaches:', error);
    return [];
  }
};

// Récupérer les coaches par discipline depuis l'API
export const getCoachesByDiscipline = async (discipline) => {
  try {
    if (!discipline) return getCoaches();
    const response = await axios.get(`${API_URL}/discipline/${discipline}`);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des coaches par discipline:', error);
    return [];
  }
};

// Récupérer les coaches recommandés depuis l'API
export const getRecommendedCoaches = async (discipline) => {
  try {
    const url = discipline ? `${API_URL}/recommended/${discipline}` : `${API_URL}/recommended`;
    const response = await axios.get(url);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des coaches recommandés:', error);
    return [];
  }
};

// Récupérer un coach par son ID depuis l'API
export const getCoachById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du coach:', error);
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

// Export par défaut pour la compatibilité
export default {
  getCoaches,
  getCoachesByDiscipline,
  getRecommendedCoaches,
  getCoachById,
  addCoachReview,
  getCoachInitials,
  COACH_COLORS
};