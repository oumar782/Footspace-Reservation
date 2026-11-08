/**
 * PlayForest UI — Progress
 * Barre de progression linéaire
 */
import './Progress.css';

const Progress = ({ value = 0, max = 100, size = 'md', color = 'green', label = false, className = '' }) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const sizeClass = `pf-progress--${size}`;
  const colorClass = `pf-progress--${color}`;

  return (
    <div className={`pf-progress ${sizeClass} ${colorClass} ${className}`} role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
      <div className="pf-progress__track">
        <div className="pf-progress__fill" style={{ width: `${percent}%` }} />
      </div>
      {label && <span className="pf-progress__label">{value}/{max}</span>}
    </div>
  );
};

export default Progress;