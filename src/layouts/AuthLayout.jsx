import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './layouts.css';

export default function AuthLayout() {
  return (
    <div className="pf-layout pf-layout--auth">
      <Link to="/home" className="pf-auth__mobile-brand" aria-label="PlayForest — Accueil">
        <img src={logo} alt="" />
        <span>Play<span>Forest</span></span>
      </Link>
      <aside className="pf-auth__hero" aria-hidden="true">
        <Link to="/home" className="pf-auth__brand">
          <img src={logo} alt="PlayForest" />
          <div className="pf-auth__brand-name">
            Play<span>Forest</span>
          </div>
        </Link>

        <div className="pf-auth__pitch">
          <h1>
            Rejoins <span>la communauté</span> de sportifs.
          </h1>
          <p>
            Trouve tes partenaires de jeu, réserve ton terrain et participe à des
            événements sportifs près de chez toi.
          </p>

          <ul className="pf-auth__bullets">
            <li>+ 500 joueurs actifs à Casablanca</li>
            <li>12 terrains partenaires</li>
            <li>+ 3 000 sessions organisées</li>
          </ul>
        </div>

        <footer className="pf-auth__foot">
          © {new Date().getFullYear()} PlayForest · Tous droits réservés.
        </footer>
      </aside>

      <div className="pf-auth__panel">
        <div className="pf-auth__panel-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
