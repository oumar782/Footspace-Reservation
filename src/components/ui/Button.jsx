/**
 * PlayForest UI — Button
 * Variantes : primary | secondary | ghost | danger | gradient
 * Tailles : sm | md | lg
 */
import './Button.css';

const SIZE_CLASS = {
  sm: 'pf-btn--sm',
  md: 'pf-btn--md',
  lg: 'pf-btn--lg',
};

const VARIANT_CLASS = {
  primary: 'pf-btn--primary',
  secondary: 'pf-btn--secondary',
  ghost: 'pf-btn--ghost',
  danger: 'pf-btn--danger',
  gradient: 'pf-btn--gradient',
  green: 'pf-btn--green',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  const classes = [
    'pf-btn',
    SIZE_CLASS[size] || SIZE_CLASS.md,
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    fullWidth ? 'pf-btn--full' : '',
    loading ? 'pf-btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconElement = icon && (
    <span className={`pf-btn__icon pf-btn__icon--${iconPosition}`}>
      {icon}
    </span>
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="pf-btn__spinner" role="status" aria-label="Chargement" />}
      {iconElement}
      <span className="pf-btn__label">{children}</span>
    </button>
  );
};

export default Button;