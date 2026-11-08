/**
 * PlayForest UI — Skeleton
 * Placeholders de chargement pour images, texte, cartes
 */
import './Skeleton.css';

const Skeleton = ({ type = 'text', width, height, className = '' }) => {
  const classes = [`pf-skeleton`, `pf-skeleton--${type}`, className].filter(Boolean).join(' ');
  const style = width || height ? {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  } : undefined;

  return <div className={classes} style={style} />;
};

export default Skeleton;