import { Link } from 'react-router-dom';
import { Trophy, Plus } from 'lucide-react';
import './BusinessPages.css';

export default function BusinessTournaments() {
  return (
    <div className="biz-page">
      <div className="biz-page__head">
        <div>
          <h1>Gestion des tournois</h1>
          <p>Créez, organisez et suivez l'ensemble de vos compétitions.</p>
        </div>
        <div className="biz-page__head-actions">
          <Link to="/organizer/dashboard" className="biz-btn biz-btn--ghost">
            <Trophy size={15} /> Ouvrir PlayForest Organizer
          </Link>
          <Link to="/organizer/dashboard" className="biz-btn biz-btn--primary">
            <Plus size={15} /> Nouveau tournoi
          </Link>
        </div>
      </div>

      <div className="biz-placeholder">
        <Trophy size={40} style={{ color: '#f59e0b', marginBottom: 12 }} />
        <h2>Espace Tournois</h2>
        <p>
          Gérez les inscriptions, les équipes, les calendriers, les matchs
          et les classements depuis l'espace dédié <strong>PlayForest Organizer</strong>.
        </p>
        <Link to="/organizer/dashboard" className="biz-btn biz-btn--primary">
          Accéder à Organizer →
        </Link>
      </div>
    </div>
  );
}
