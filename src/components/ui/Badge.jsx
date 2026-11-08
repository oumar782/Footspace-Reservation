/**
 * PlayForest UI — Badge
 * Variants : success | warning | error | info | neutral | gold | green
 * Sizes : sm | md
 */
import './Badge.css';

const VARIANT_CLASS = {
  success: 'pf-badge--success',
  warning: 'pf-badge--warning',
  error: 'pf-badge--error',
  info: 'pf-badge--info',
  neutral: 'pf-badge--neutral',
  gold: 'pf-badge--gold',
  green: 'pf-badge--green',
  orange: 'pf-badge--orange',
  purple: 'pf-badge--purple',
};

const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  dot = false,
  className = '',
}) => {
  const classes = [
    'pf-badge',
    VARIANT_CLASS[variant] || VARIANT_CLASS.neutral,
    `pf-badge--${size}`,
    dot ? 'pf-badge--dot' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-label={typeof children === 'string' ? children : undefined}>
      {dot && <span className="pf-badge__dot" />}
      {icon && <span className="pf-badge__icon">{icon}</span>}
      {!dot && <span className="pf-badge__text">{children}</span>}
    </span>
  );
};

export default Badge;