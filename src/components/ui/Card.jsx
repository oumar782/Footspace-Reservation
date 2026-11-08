/**
 * PlayForest UI — Card
 * Un conteneur flexible avec header, body, footer
 */
import './Card.css';

const Card = ({
  children,
  title,
  subtitle,
  icon,
  footer,
  headerAction,
  padding = 'md',
  className = '',
  onClick,
  hover = false,
  border = true,
  ...rest
}) => {
  const classes = [
    'pf-card',
    `pf-card--p${padding}`,
    hover ? 'pf-card--hover' : '',
    border ? 'pf-card--border' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} {...rest}>
      {(title || subtitle || icon || headerAction) && (
        <div className="pf-card__head">
          {icon && <span className="pf-card__icon">{icon}</span>}
          {title && <h3 className="pf-card__title">{title}</h3>}
          {subtitle && <p className="pf-card__subtitle">{subtitle}</p>}
          {headerAction && <div className="pf-card__header-action">{headerAction}</div>}
        </div>
      )}
      <div className="pf-card__body">{children}</div>
      {footer && <div className="pf-card__footer">{footer}</div>}
    </div>
  );
};

export default Card;