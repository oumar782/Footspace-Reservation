import { Link } from 'react-router-dom';
import {
  MapPin,
  CalendarDays,
  Trophy,
  GraduationCap,
  ShoppingBag,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import './NewExplore.css';

const exploreSections = [
  {
    key: 'fields',
    title: 'Terrains',
    subtitle: 'Trouve et réserve le terrain idéal.',
    to: '/explore/fields',
    Icon: MapPin,
    tag: 'Réservation',
    color: 'green',
    stats: '12 terrains partenaires'
  },
  {
    key: 'events',
    title: 'Événements',
    subtitle: 'Matchs, stages, activités communautaires.',
    to: '/explore/events',
    Icon: CalendarDays,
    tag: 'Compétition',
    color: 'blue',
    stats: '28 événements à venir'
  },
  {
    key: 'tournaments',
    title: 'Tournois',
    subtitle: "Rejoins les compétitions près de chez toi.",
    to: '/explore/tournaments',
    Icon: Trophy,
    tag: 'À gagner',
    color: 'orange',
    stats: '7 tournois ouverts'
  },
  {
    key: 'coaches',
    title: 'Coachs',
    subtitle: 'Développe ton niveau avec un professionnel.',
    to: '/explore/coaches',
    Icon: GraduationCap,
    tag: 'Progression',
    color: 'violet',
    stats: '24 coachs certifiés'
  },
  {
    key: 'equipment',
    title: 'Équipements',
    subtitle: 'Découvre les équipements sportifs de la communauté.',
    to: '/explore/equipment',
    Icon: ShoppingBag,
    tag: 'Secondaire',
    color: 'slate',
    stats: 'Boutique PlayForest'
  }
];

export default function NewExplore() {
  return (
    <div className="pf-explore">
      <section className="pf-explore__hero">
        <div className="pf-explore__container">
          <span className="pf-explore__eyebrow">
            <Sparkles size={14} /> Explorer PlayForest
          </span>
          <h1>Explorer</h1>
          <p>
            Terrains, événements, tournois, coachs, équipements — tout ce dont
            tu as besoin pour vivre ton sport est ici.
          </p>
        </div>
      </section>

      <section className="pf-explore__container pf-explore__grid">
        {exploreSections.map(({ to, title, subtitle, Icon, tag, color, stats }) => (
          <Link
            key={to}
            to={to}
            className={`pf-explore__card pf-explore__card--${color}`}
          >
            <div className="pf-explore__top">
              <div className={`pf-explore__icon pf-explore__icon--${color}`}>
                <Icon size={22} />
              </div>
              <span className="pf-explore__tag">{tag}</span>
            </div>

            <h2>{title}</h2>
            <p>{subtitle}</p>

            <div className="pf-explore__foot">
              <span className="pf-explore__stats">{stats}</span>
              <span className="pf-explore__cta">
                Découvrir <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
