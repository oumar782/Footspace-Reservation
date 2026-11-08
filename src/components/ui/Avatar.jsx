/**
 * PlayForest UI — Avatar
 * Supporte: image, initiales, taille (sm/md/lg/xl), status cercle
 */
import './Avatar.css';

const SIZE_MAP = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  status = null,
  statusColor = 'green',
  className = '',
}) => {
  const px = SIZE_MAP[size] || SIZE_MAP.md;
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const statusClasses = {
    green: 'pf-avatar__status--green',
    yellow: 'pf-avatar__status--yellow',
    red: 'pf-avatar__status--red',
    gray: 'pf-avatar__status--gray',
  };

  return (
    <div
      className={`pf-avatar pf-avatar--${size} ${className}`}
      style={{ width: px, height: px, fontSize: px * 0.38 }}
      aria-label={name || alt}
    >
      {src ? (
        <img src={src} alt={alt || name} className="pf-avatar__img" loading="lazy" />
      ) : (
        <span className="pf-avatar__initials">{initials || '?'}</span>
      )}
      {status && (
        <span
          className={`pf-avatar__status ${statusClasses[statusColor] || statusClasses.green}`}
          aria-label={`Statut: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;