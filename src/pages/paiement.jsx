
import React, { useState } from 'react';
import './Reservation.css';
import './paiement.css';
import Header from '../composant/Header.jsx';

import { Link } from "react-router-dom";
const Paiement = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Réservation pour: ${name}, Email: ${email}, Date: ${date}`);
  };

  return (
    <>
      <Header />

     <div className="bouton">
         {/* Bouton pour consulter le créneau */}
         <Link to="/reservation" className="btn">
           Je consulte le créneau
         </Link>
   
         <Link to="/paiement" className="btn">
           Je paie ma reservation
         </Link>
   
         
         <Link to="/consultation" className="btn">
           Je consulte ma reservation
         </Link>
       </div>
  <div className='degrade'>
    <h1>payer  votre espace de foot en seulement quelque clics et en toute serenite</h1>
      <div className="reservation-containers">
        <h1>Faites-vous plaisir ! payer  Votre reservation</h1>
        <form onSubmit={handleSubmit} className="reservation-form">
          
          <div className='form-group'>
          <label htmlFor="name"> votre Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
           <label htmlFor="name"> votre Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div className='form-group'>
           <label htmlFor="name"> votre Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
           <label htmlFor="name"> votre Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div className='form-group'>
         <label htmlFor="name"> votre Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="date">Date de Réservation:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          </div>
         <div className='reservations-formss'>
          <button type="submit">je paie ma reservation</button>
          </div>
        </form>
        <div className="reservation-info">
        <p style={{ fontSize: '15px' }}>
  <span style={{ color: 'green', fontSize: '25px',  }}>Nb:</span>
  Pour toute question, merci de consulter le chatbot pour plus de details.
</p>


        </div>
      </div>
      </div>
    </>
  );
};

export default Paiement;