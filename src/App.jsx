import { createElement, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PlayerLayout from './layouts/PlayerLayout.jsx';
import BusinessLayout from './layouts/BusinessLayout.jsx';
import OrganizerLayout from './layouts/OrganizerLayout.jsx';
import SeoManager from './components/SeoManager.jsx';

const NewHome = lazy(() => import('./pages/player/NewHome.jsx'));
const NewCommunities = lazy(() => import('./pages/player/NewCommunities.jsx'));
const NewPlay = lazy(() => import('./pages/player/NewPlay.jsx'));
const NewExplore = lazy(() => import('./pages/player/NewExplore.jsx'));
const NewProfile = lazy(() => import('./pages/player/NewProfile.jsx'));

const Login = lazy(() => import('./pages/auth/Login.jsx'));
const Register = lazy(() => import('./pages/auth/Register.jsx'));
const Onboarding = lazy(() => import('./pages/auth/Onboarding.jsx'));
const Offline = lazy(() => import('./pages/Offline.jsx'));
const Feed = lazy(() => import('./components/Feed/Feed.jsx'));

const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const Terrains = lazy(() => import('./pages/Terrains.jsx'));
const Reservation = lazy(() => import('./pages/Reservation.jsx'));
const ReservationModal = lazy(() => import('./pages/ReservationModal.jsx'));
const Consul = lazy(() => import('./pages/Consul.jsx'));
const ReservationDetails = lazy(() => import('./pages/Reservation-details.jsx'));
const Sessions = lazy(() => import('./pages/Sessions.jsx'));
const Coaches = lazy(() => import('./pages/Coaches.jsx'));
const Tournois = lazy(() => import('./pages/Tournois.jsx'));
const Abonnement = lazy(() => import('./pages/Abonnement.jsx'));
const ConsultationAbonnement = lazy(() => import('./pages/ConsultationAbonnement.jsx'));
const Paiement = lazy(() => import('./pages/paiement.jsx'));
const Creneaux = lazy(() => import('./pages/creneaux.jsx'));
const Boutique = lazy(() => import('./pages/Boutique.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./contacts/Contact.jsx'));

const BusinessDashboard = lazy(() => import('./pages/business/BusinessDashboard.jsx'));
const BusinessFacilities = lazy(() => import('./pages/business/BusinessFacilities.jsx'));
const BusinessBookings = lazy(() => import('./pages/business/BusinessBookings.jsx'));
const BusinessEvents = lazy(() => import('./pages/business/BusinessEvents.jsx'));
const BusinessTournaments = lazy(() => import('./pages/business/BusinessTournaments.jsx'));
const BusinessRevenue = lazy(() => import('./pages/business/BusinessRevenue.jsx'));
const BusinessAnalytics = lazy(() => import('./pages/business/BusinessAnalytics.jsx'));
const OrganizerDashboard = lazy(() => import('./pages/business/OrganizerDashboard.jsx'));

const renderPage = (Page) => (
  <Suspense fallback={(
    <div role="status" style={{ minHeight: '40vh', display: 'grid', placeItems: 'center', color: '#64748b' }}>
      Chargement...
    </div>
  )}>
    {createElement(Page)}
  </Suspense>
);

function RootRedirect() {
  const token = localStorage.getItem('playforest_token');
  const prefsStr = localStorage.getItem('playforest_prefs');
  
  if (!token) {
    return renderPage(NewExplore);
  }

  try {
    const prefs = prefsStr ? JSON.parse(prefsStr) : null;
    if (!prefs?.onboarding_complete) {
      return <Navigate to="/onboarding" replace />;
    }
  } catch {
    return <Navigate to="/onboarding" replace />;
  }

  return <Navigate to="/home" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <SeoManager />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        {/* =========================================================
            REDIRECTIONS COMPATIBILITÉ ANCIENNES URLS
            (toutes les routes existantes restent accessibles)
           ========================================================= */}
        {/* Inscription & Onboarding en premier si non connecté */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/homes" element={<Navigate to="/home" replace />} />

        {/* Anciennes pages de Réservation / Consultation → URLs gardées */}
        <Route path="/Formulaire-reservation" element={<Navigate to="/reservation" replace />} />

        {/* Route cassée dans le code existant → on la renomme proprement */}
        <Route path="/mes-reservations" element={<Navigate to="/consultation-reservation" replace />} />
        <Route path="/reservations" element={<Navigate to="/consultation-reservation" replace />} />

        {/* Routes professionnelles manquantes → vers Business */}
        <Route path="/admin/tournois" element={<Navigate to="/business/tournaments" replace />} />
        <Route path="/infrastructure" element={<Navigate to="/business/facilities" replace />} />

        {/* =========================================================
            AUTH & PWA — PlayForest (non protégé)
            Login / Register / Onboarding / Offline
           ========================================================= */}
        <Route path="/login" element={renderPage(Login)} />
        <Route path="/register" element={renderPage(Register)} />
        <Route path="/onboarding/*" element={renderPage(Onboarding)} />
        <Route path="/onboarding/welcome" element={renderPage(Onboarding)} />
        <Route path="/offline" element={renderPage(Offline)} />

        {/* =========================================================
            PLAYFOREST JOUEUR — Nouvel univers (core)
            Layout : PlayerLayout (PlayerNav desktop + BottomNav mobile)
           ========================================================= */}
        <Route element={<PlayerLayout />}>
          {/* ----- Pages "nouvelle architecture" ----- */}
          <Route path="/home" element={renderPage(NewHome)} />
          <Route path="/communities" element={renderPage(NewCommunities)} />
          <Route path="/communities/:id" element={renderPage(NewCommunities)} />
          <Route path="/play" element={renderPage(NewPlay)} />
          <Route path="/play/create" element={renderPage(NewPlay)} />
          <Route path="/play/:id" element={renderPage(Sessions)} />

          {/* Explorer — hub regroupant Terrains, Événements, Tournois, Coachs, Équipements */}
          <Route path="/explore" element={renderPage(NewExplore)} />
          <Route path="/explore/fields" element={renderPage(Terrains)} />
          <Route path="/explore/events" element={renderPage(Tournois)} />
          <Route path="/explore/tournaments" element={renderPage(Tournois)} />
          <Route path="/explore/coaches" element={renderPage(Coaches)} />
          <Route path="/explore/equipment" element={renderPage(Boutique)} />

          {/* Profil sportif */}
          <Route path="/profile" element={renderPage(NewProfile)} />
          <Route path="/profile/*" element={renderPage(NewProfile)} />

          {/* =========================================================
              PAGES EXISTANTES CONSERVÉES DANS LE PLAYERLAYOUT
              :
              - Terrains, Sessions, Coachs, Tournois (encore accessibles directement)
              - Réservation, paiement, consultation
              - Abonnements
              - Boutique
              - À propos, Contact
              ========================================================= */}

          {/* Pages métiers conservées en URL directe (backward compat) */}
          <Route path="/terrains" element={renderPage(Terrains)} />
          <Route path="/sessions" element={renderPage(Sessions)} />
          <Route path="/coaches" element={renderPage(Coaches)} />
          <Route path="/tournois" element={renderPage(Tournois)} />

          {/* Réservation / paiement */}
          <Route path="/reservation" element={renderPage(Reservation)} />
          <Route path="/reservation/:terrainId" element={renderPage(Reservation)} />
          <Route path="/reservation-modal" element={renderPage(ReservationModal)} />
          <Route path="/creneaux" element={renderPage(Creneaux)} />
          <Route path="/paiement" element={renderPage(Paiement)} />
          <Route path="/consultation-reservation" element={renderPage(Consul)} />
          <Route path="/details-reservation" element={renderPage(ReservationDetails)} />

          {/* Abonnements */}
          <Route path="/abonnement" element={renderPage(Abonnement)} />
          <Route path="/consultation-abonnement" element={renderPage(ConsultationAbonnement)} />

          {/* Boutique */}
          <Route path="/boutique" element={renderPage(Boutique)} />
          <Route path="/shop/product/:id" element={renderPage(ProductDetail)} />

                    {/* Pages statiques / légales */}
          <Route path="/about" element={renderPage(About)} />
          <Route path="/contact" element={renderPage(Contact)} />

          {/* Fil d'actualités & social */}
          <Route path="/feed" element={renderPage(Feed)} />
          <Route path="/notifications" element={renderPage(Feed)} />
          <Route path="/messages" element={renderPage(Feed)} />


          {/* Fallback joueur */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>

        {/* =========================================================
            PLAYFOREST BUSINESS — Espace pro Gestion de terrains
           ========================================================= */}
        <Route path="/business" element={<Navigate to="/business/dashboard" replace />} />
        <Route element={<BusinessLayout />}>
          <Route path="/business/dashboard" element={renderPage(BusinessDashboard)} />
          <Route path="/business/bookings" element={renderPage(BusinessBookings)} />
          <Route path="/business/facilities" element={renderPage(BusinessFacilities)} />
          <Route path="/business/facilities/new" element={renderPage(BusinessFacilities)} />
          <Route path="/business/facilities/:id" element={renderPage(BusinessFacilities)} />
          <Route path="/business/clients" element={renderPage(BusinessBookings)} />
          <Route path="/business/events" element={renderPage(BusinessEvents)} />
          <Route path="/business/events/create" element={renderPage(BusinessEvents)} />
          <Route path="/business/tournaments" element={renderPage(BusinessTournaments)} />
          <Route path="/business/revenue" element={renderPage(BusinessRevenue)} />
          <Route path="/business/analytics" element={renderPage(BusinessAnalytics)} />
          <Route path="/business/*" element={<Navigate to="/business/dashboard" replace />} />
        </Route>

        {/* =========================================================
            PLAYFOREST ORGANIZER — Espace organisateur de tournois
           ========================================================= */}
        <Route path="/organizer" element={<Navigate to="/organizer/dashboard" replace />} />
        <Route element={<OrganizerLayout />}>
          <Route path="/organizer/dashboard" element={renderPage(OrganizerDashboard)} />
          <Route path="/organizer/tournaments" element={renderPage(OrganizerDashboard)} />
          <Route path="/organizer/tournaments/create" element={renderPage(OrganizerDashboard)} />
          <Route path="/organizer/teams" element={renderPage(OrganizerDashboard)} />
          <Route path="/organizer/scheduling" element={renderPage(OrganizerDashboard)} />
          <Route path="/organizer/stats" element={renderPage(OrganizerDashboard)} />
          <Route path="/organizer/*" element={<Navigate to="/organizer/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
