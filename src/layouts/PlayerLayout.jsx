import { Outlet } from 'react-router-dom';
import PlayerNav from '../components/navigation/PlayerNav.jsx';
import PlayerFooter from '../components/navigation/PlayerFooter.jsx';
import BottomNav from '../components/navigation/BottomNav.jsx';
import './layouts.css';

export default function PlayerLayout() {
  return (
    <div className="pf-layout pf-layout--player">
      <PlayerNav />
      <main id="pf-main-content" className="pf-layout__main" role="main">
        <Outlet />
      </main>
      <PlayerFooter />
      <BottomNav />
    </div>
  );
}
