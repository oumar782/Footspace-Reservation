/**
 * PlayForest — Route protégée & guarde de rôle
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * Enroule une route pour exiger une authentification.
 * @param {boolean|undefined} requireAuth — si true, redirige vers /login si non auth
 * @param {string|string[]|undefined} allowedRoles — rôles autorisés
 * @param {React.ReactNode} fallback — élément à rendre si l'utilisateur n'a pas le bon rôle
 */
export default function ProtectedRoute({ children, requireAuth = false, allowedRoles, fallback = null }) {
  const { isAuthenticated, hasRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <div>Chargement…</div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return fallback ?? <Navigate to="/home" replace />;
  }

  return children;
}

export const RoleRoute = ({ role, children, fallback = null }) => (
  <ProtectedRoute allowedRoles={role} fallback={fallback ?? <Navigate to="/home" replace />}>
    {children}
  </ProtectedRoute>
);