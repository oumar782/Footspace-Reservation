import React from 'react';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { formatShopPrice } from '../data/shop';

const Cart = ({ items, open, onClose, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1200 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <aside className={`shop-cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="shop-cart-panel">
        <div className="shop-cart-header">
          <div>
            <span className="shop-cart-eyebrow">Panier</span>
            <h2>Votre selection</h2>
          </div>
          <button type="button" className="shop-icon-button" onClick={onClose} title="Fermer le panier">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="shop-cart-empty">
            <ShoppingCart size={46} />
            <h3>Panier vide</h3>
            <p>Ajoutez des articles depuis la boutique pour preparer votre commande.</p>
          </div>
        ) : (
          <div className="shop-cart-items">
            {items.map((item) => (
              <div className="shop-cart-item" key={`${item.id}-${item.selectedSize}`}>
                <img src={item.image} alt={item.name} />
                <div className="shop-cart-item-content">
                  <h3>{item.name}</h3>
                  <span>{item.selectedSize || item.sizes?.[0] || 'Unique'} | {formatShopPrice(item.price)}</span>
                  <div className="shop-cart-quantity">
                    <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.selectedSize)} title="Diminuer">
                      <Minus size={14} />
                    </button>
                    <strong>{item.quantity}</strong>
                    <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.selectedSize)} title="Augmenter">
                      <Plus size={14} />
                    </button>
                    <button type="button" className="shop-cart-remove" onClick={() => onRemoveItem(item.id, item.selectedSize)} title="Supprimer">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="shop-cart-summary">
          <div>
            <span>Sous-total</span>
            <strong>{formatShopPrice(subtotal)}</strong>
          </div>
          <div>
            <span>Livraison</span>
            <strong>{shipping === 0 ? 'Offerte' : formatShopPrice(shipping)}</strong>
          </div>
          <div className="shop-cart-total">
            <span>Total</span>
            <strong>{formatShopPrice(total)}</strong>
          </div>
          <button type="button" className="shop-checkout-button" disabled={!items.length} onClick={onCheckout}>
            Commander
          </button>
        </div>
      </div>
      <button type="button" className="shop-cart-backdrop" onClick={onClose} aria-label="Fermer le panier" />
    </aside>
  );
};

export default Cart;
