/**
 * PlayForest — Page hors ligne
 * Affiche un écran propre lorsque l'utilisateur n'a pas de connexion.
 */
import { Wifi, RefreshCw, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Offline.css';

export default function Offline() {
  return (
    <div className="pf-offline">
      <div className="pf-offline__container">
        <div className="pf-offline__icon">
          <Wifi size={72} />
        </div>

        <h1 className="pf-offline__title">Vous êtes hors connexion</h1>

        <p className="pf-offline__text">
          Certaines fonctionnalités nécessitent une connexion Internet.
          Revérifiez votre connexion puis réessayez.
        </p>

        <button
          className="pf-offline__retry"
          onClick={() => window.location.reload()}
          aria-label="Réessayer la connexion"
        >
          <RefreshCw size={18} /> Réessayer
        </button>

        <div className="pf-offline__cached">
          <Inbox size={16} />
          Certaines données mises en cache peuvent être consultées.
        </div>

        <Link to="/home" className="pf-offline__home">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

/* Inline CSS pour éviter un fichier CSS supplémentaire léger */
Offline; // noop — le CSS est chargé via le composant parent si besoin