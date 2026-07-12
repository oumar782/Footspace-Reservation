import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from "./pages/Homepage";
import Header from "./composant/Header";
import Footer from "./composant/Footer";
import Terrains from "./pages/Terrains";
import Reservation from "./pages/Reservation";
import Paiement from './pages/paiement';
import About from './pages/About';
import Contact from "./contacts/Contact";
import Modalreserve from "./pages/ReservationModal";
import Consulreserve from "./pages/Consul";
import Details from "./pages/Reservation-details";
import Abonnement from "./pages/Abonnement";
import Creneaux from './pages/creneaux';
import ConsultationAbonnement from './pages/ConsultationAbonnement';
import Sessions from './pages/Sessions';
import Coaches from './pages/Coaches';
import Tournois from './pages/Tournois';
import Boutique from './pages/Boutique';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div>
          <Routes>
            {/* Redirection principale */}
            <Route path="/" element={<Navigate to="/homes" replace />} />
            
            {/* Pages principales */}
            <Route path="/homes" element={<HomePage />} />
            <Route path="/terrains" element={<Terrains />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/paiement" element={<Paiement />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/creneaux" element={<Creneaux />} />
            <Route path="/about" element={<About />} />
            
            {/* Réservations */}
            <Route path="/Formulaire-reservation" element={<Modalreserve />} />
            <Route path="/consultation-reservation" element={<Consulreserve />} />
            <Route path="/details-reservation" element={<Details />} />
            
            {/* Abonnements */}
            <Route path="/abonnement" element={<Abonnement />} />
            <Route path="/consultation-abonnement" element={<ConsultationAbonnement />} />
            
            {/* Autres pages */}
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/tournois" element={<Tournois />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/shop/product/:id" element={<ProductDetail />} />
            
            {/* Redirections pour les URLs en double */}
            <Route path="/Consultation-reservation" element={<Navigate to="/consultation-reservation" replace />} />
            <Route path="/reservations" element={<Navigate to="/reservation" replace />} />
            <Route path="/tarifs" element={<Navigate to="/terrains" replace />} />
            
            {/* Route 404 - Page non trouvée */}
            <Route path="*" element={<Navigate to="/homes" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;