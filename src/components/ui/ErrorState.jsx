/**
 * PlayForest UI — ErrorState
 * Message d'erreur clair + bouton retry
 */
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';
import './ErrorState.css';

const ErrorState = ({
  title = 'Une erreur est survenue',
  description = 'Impossible de charger les données. Réessayez plus tard.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`pf-error ${className}`}>
      <div className="pf-error__icon">
        <AlertCircle size={56} />
      </div>
      <h3 className="pf-error__title">{title}</h3>
      <p className="pf-error__desc">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="md" onClick={onRetry} icon={<RefreshCw size={16} />}>
          Réessayer
        </Button>
      )}
    </div>
  );
};

export default ErrorState;