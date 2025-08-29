import React, { useEffect } from 'react';  // Assurez-vous de bien importer useEffect
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from "../src/pages/Homepage.jsx";
import Terrains from "../src/pages/Terrains.jsx";
import Reservation from "../src/pages/Reservation.jsx";
import Paiement from './pages/paiement.jsx';
import About from './pages/About.jsx';
import Contact from "../src/contacts/Contact.jsx";  // Pas besoin de l'extension .jsx


 
import Creneaux from './pages/creneaux.jsx';  


import axios from 'axios';

const App = () => {
  useEffect(() => {
    // Effectuer une requête GET vers le backend pour récupérer des données
    axios.get('http://localhost:5000')  // Adresse de ton backend (assure-toi qu'il fonctionne)
      .then(response => {
        console.log(response.data);  // Affiche la réponse du backend dans la console
      })
      .catch(error => {
        console.error('Il y a eu une erreur!', error);  // Si erreur, l'afficher
      });
  }, []);  // Le tableau vide [] signifie que ce code s'exécute uniquement au chargement initial

  return (
    <div className="App">
      
      <Router>
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
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
