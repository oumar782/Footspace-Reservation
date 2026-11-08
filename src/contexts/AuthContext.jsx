import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate depuis le localStorage au montage
  useEffect(() => {
    const storedToken = localStorage.getItem('playforest_token');
    const storedUser = localStorage.getItem('playforest_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('playforest_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await authAPI.login(email, password);
    const receivedToken = response?.token || response?.data?.token;
    const userData = response?.data || response?.user;

    if (receivedToken) {
      localStorage.setItem('playforest_token', receivedToken);
      setToken(receivedToken);
    }
    if (userData) {
      localStorage.setItem('playforest_user', JSON.stringify(userData));
      setUser(userData);

      // Hydrater les préférences filtrées du projet
      const sports = userData.preferredSports || userData.preferred_sports || ['football'];
      const skillLevel = userData.skillLevel || userData.skill_level || 'INTERMEDIATE';
      const city = userData.preferredCity || userData.city || 'Casablanca';
      const quartier = userData.preferredQuartier || userData.quartier || 'Maârif';

      localStorage.setItem('playforest_prefs', JSON.stringify({
        sports: Array.isArray(sports) ? sports : [sports],
        skill_level: skillLevel,
        location: city,
        quartier: quartier,
        onboarding_complete: true
      }));
    }
    return userData;
  }, []);

  const register = useCallback(async (payload) => {
    const response = await authAPI.register(payload);
    const userData = response?.data || response?.user;
    const receivedToken = response?.token || response?.data?.token;

    if (userData) {
      localStorage.setItem('playforest_user', JSON.stringify(userData));
      setUser(userData);

      const sports = userData.preferredSports || payload.preferredSports || payload.sports || ['football'];
      const skillLevel = userData.skillLevel || payload.skillLevel || 'INTERMEDIATE';
      const city = userData.preferredCity || userData.city || payload.city || 'Casablanca';
      const quartier = userData.preferredQuartier || userData.quartier || payload.quartier || 'Maârif';

      localStorage.setItem('playforest_prefs', JSON.stringify({
        sports: Array.isArray(sports) ? sports : [sports],
        skill_level: skillLevel,
        location: city,
        quartier: quartier,
        onboarding_complete: true
      }));
    }

    // Auto-login après inscription si un token est renvoyé ou par appel login
    if (receivedToken) {
      localStorage.setItem('playforest_token', receivedToken);
      setToken(receivedToken);
    } else {
      // Appel automatique du login si pas de token immédiat
      try {
        await login(payload.email, payload.password);
      } catch (e) {
        console.warn('Auto-login post register:', e);
      }
    }
    return userData;
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem('playforest_token');
    localStorage.removeItem('playforest_user');
    localStorage.removeItem('playforest_prefs');
    setToken(null);
    setUser(null);
  }, []);

  // Vérifie le rôle de l'utilisateur
  const hasRole = useCallback(
    (roles) => {
      if (!user?.role) return false;
      return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
    },
    [user?.role]
  );

  const isAuthenticated = !!token || !!user;

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated, login, register, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export const ROLE = {
  PLAYER: 'PLAYER',
  COACH: 'COACH',
  FACILITY_MANAGER: 'FACILITY_MANAGER',
  TOURNAMENT_ORGANIZER: 'TOURNAMENT_ORGANIZER',
  ADMIN: 'ADMIN',
};

export const getRoleRedirect = (role) => {
  switch (role) {
    case ROLE.PLAYER: return '/home';
    case ROLE.COACH: return '/coach/dashboard';
    case ROLE.FACILITY_MANAGER: return '/business/dashboard';
    case ROLE.TOURNAMENT_ORGANIZER: return '/organizer/dashboard';
    case ROLE.ADMIN: return '/admin';
    default: return '/home';
  }
};

export default AuthContext;