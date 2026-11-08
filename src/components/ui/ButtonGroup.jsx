/**
 * PlayForest UI — ButtonGroup
 */
import './ButtonGroup.css';

const ButtonGroup = ({ options = [], value, onChange, orientation = 'horizontal', className = '' }) => {
  const classes = [
    'pf-btn-group',
    `pf-btn-group--${orientation}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="radiogroup">
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`pf-btn-group__item ${isActive ? 'pf-btn-group__item--active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.icon && <span className="pf-btn-group__icon">{opt.icon}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;