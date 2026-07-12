import React, { useState } from 'react';
import './SafeImage.css';

const SPORT_IMAGES = {
  football: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
  tennis: 'https://images.unsplash.com/photo-1622279457126-a7931d5b3a46?w=800&h=600&fit=crop',
  basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
  volleyball: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop',
  default: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
};

const FALLBACK = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop';

const SafeImage = ({ src, alt, sport, className, style }) => {
  const [imgSrc, setImgSrc] = useState(src || SPORT_IMAGES[sport] || FALLBACK);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (sport && SPORT_IMAGES[sport] && imgSrc !== SPORT_IMAGES[sport]) {
      setImgSrc(SPORT_IMAGES[sport]);
    } else {
      setImgSrc(FALLBACK);
    }
  };

  return (
    <div className={`safe-image-wrap ${loaded ? 'loaded' : ''} ${className || ''}`} style={style}>
      {!loaded && <div className="safe-image-skeleton" />}
      <img
        src={imgSrc}
        alt={alt || ''}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className="safe-image"
      />
    </div>
  );
};

export default SafeImage;
