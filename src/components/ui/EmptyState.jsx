/**
 * PlayForest UI — EmptyState
 * Message utile + CTA pour les listes vides
 */
import { React } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './EmptyState.css';

const EmptyState = ({
  title = 'Aucun résultat',
  description = 'Il n’y a rien à afficher pour le moment.',
  icon: Icon,
  actionLabel,
  actionTo,
  onAction,
  className = '',
}) => {
  return (
    <div className={`pf-empty ${className}`}>
      {Icon && <div className="pf-empty__icon"><Icon size={56} /></div>}
      <h3 className="pf-empty__title">{title}</h3>
      <p className="pf-empty__desc">{description}</p>
      {(actionLabel && actionTo) && (
        <Link to={actionTo} className="pf-empty__cta">
          <Button variant="gradient" size="md">{actionLabel}</Button>
        </Link>
      )}
      {onAction && (
        <Button variant="primary" size="md" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

export default EmptyState;