// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Imports avec les chemins corrects
import HomePage from "./pages/Homepage";
import Header from "./composant/Header";
import Footer from "./composant/Footer";
import Terrains from "./pages/Terrains";
import Reservation from "./pages/Reservation";
import Paiement from './pages/paiement';
import About from './pages/About';
import Contact from "./contacts/Contact";
import Modalreserve from "./pages/ReservationModal";
import Consulreserve from "./pages/Consul";  // Sans l'extension .jsx
import Details from "./pages/Reservation-details";
import Abonnement from "./pages/Abonnement";
import Creneaux from './pages/creneaux';
import ConsultationAbonnement from './pages/ConsultationAbonnement';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/homes" />} />
            <Route path="/homes" element={<HomePage />} />
            <Route path="/terrains" element={<Terrains />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/paiement" element={<Paiement />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/creneaux" element={<Creneaux />} />
            <Route path="/about" element={<About />} />
            <Route path="/Formulaire-reservation" element={<Modalreserve />} />
            <Route path="/consultation-reservation" element={<Consulreserve />} />
            <Route path="/details-reservation" element={<Details />} />
            <Route path="/abonnement" element={<Abonnement />} />
            <Route path="/consultation-abonnement" element={<ConsultationAbonnement />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;