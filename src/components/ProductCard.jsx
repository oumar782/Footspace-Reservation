import React from 'react';
import { Eye, PackageCheck, Plus, Ruler, Star, Tag } from 'lucide-react';
import { formatShopPrice, getCategoryColor, getCategoryIcon } from '../data/shop';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const SportIcon = getCategoryIcon(product.sport);
  const color = getCategoryColor(product.sport);
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  return (
    <article className="shop-product-card">
      <div className="shop-product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className="shop-product-badge">
            <Tag size={13} />
            {product.badge}
          </span>
        )}
        {product.discount > 0 && <span className="shop-product-discount">-{product.discount}%</span>}
      </div>

      <div className="shop-product-body">
        <div className="shop-product-category">
          <span className="shop-product-category-icon" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
            <SportIcon size={17} />
          </span>
          <span>{product.sport}</span>
        </div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="shop-product-meta">
          <span>
            <Ruler size={14} />
            {product.sizes.slice(0, 4).join(', ')}
          </span>
          <span>
            <PackageCheck size={14} />
            {product.stock} en stock
          </span>
        </div>

        <div className="shop-product-rating">
          <Star size={15} fill="currentColor" />
          <span>{product.rating}</span>
          <small>{product.reviews} avis</small>
        </div>

        <div className="shop-product-footer">
          <div className="shop-product-price">
            <strong>{formatShopPrice(product.price)}</strong>
            {hasDiscount && <span>{formatShopPrice(product.oldPrice)}</span>}
          </div>
          <div className="shop-product-actions">
            <button type="button" className="shop-icon-button" onClick={() => onViewDetails(product.id)} title="Voir details">
              <Eye size={18} />
            </button>
            <button type="button" className="shop-add-button" onClick={() => onAddToCart(product)}>
              <Plus size={17} />
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
