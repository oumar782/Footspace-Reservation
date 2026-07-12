import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, PackageCheck, Plus, Ruler, ShoppingCart, Star, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { formatShopPrice, getProductById, shopProducts } from '../data/shop';
import './boutique.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return shopProducts.filter((item) => item.id !== product.id && item.sport === product.sport).slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <main className="shop-page">
        <div className="shop-not-found">
          <h1>Produit introuvable</h1>
          <Link to="/boutique">Retour a la boutique</Link>
        </div>
      </main>
    );
  }

  const addToCart = (item = product, size = selectedSize, qty = quantity) => {
    setCartItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id && cartItem.selectedSize === size);
      if (existing) {
        return current.map((cartItem) => cartItem.id === item.id && cartItem.selectedSize === size ? { ...cartItem, quantity: cartItem.quantity + qty } : cartItem);
      }
      return [...current, { ...item, selectedSize: size, quantity: qty }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (itemId, qty, size) => {
    if (qty <= 0) {
      setCartItems((current) => current.filter((item) => !(item.id === itemId && item.selectedSize === size)));
      return;
    }
    setCartItems((current) => current.map((item) => item.id === itemId && item.selectedSize === size ? { ...item, quantity: qty } : item));
  };

  return (
    <main className="shop-page">
      <button type="button" className="shop-back-link" onClick={() => navigate('/boutique')}>
        <ArrowLeft size={18} />
        Retour boutique
      </button>

      <section className="shop-detail-layout">
        <div className="shop-detail-gallery">
          <div className="shop-detail-main-image">
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="shop-detail-thumbs">
            {product.images.map((image) => (
              <button type="button" key={image} className={selectedImage === image ? 'active' : ''} onClick={() => setSelectedImage(image)}>
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="shop-detail-info">
          <span className="shop-detail-kicker">{product.sport} | {product.brand}</span>
          <h1>{product.name}</h1>
          <div className="shop-detail-rating">
            <Star size={17} fill="currentColor" />
            <strong>{product.rating}</strong>
            <span>{product.reviews} avis clients</span>
          </div>
          <p>{product.description}</p>

          <div className="shop-detail-price">
            <strong>{formatShopPrice(product.price)}</strong>
            {product.oldPrice > product.price && <span>{formatShopPrice(product.oldPrice)}</span>}
          </div>

          <div className="shop-detail-block">
            <h2><Ruler size={18} /> Tailles disponibles</h2>
            <div className="shop-size-options">
              {product.sizes.map((size) => (
                <button type="button" key={size} className={selectedSize === size ? 'active' : ''} onClick={() => setSelectedSize(size)}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="shop-detail-quantity">
            <span>Quantite</span>
            <input type="number" min="1" max={product.stock} value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))} />
          </div>

          <button type="button" className="shop-detail-add" onClick={() => addToCart()}>
            <ShoppingCart size={19} />
            Ajouter au panier
          </button>

          <div className="shop-detail-services">
            <span><PackageCheck size={17} /> {product.stock} articles en stock</span>
            <span><Truck size={17} /> Livraison rapide PlayForest</span>
            <span><CheckCircle size={17} /> Retours possibles sous 14 jours</span>
          </div>
        </div>
      </section>

      <section className="shop-detail-panels">
        <div>
          <h2>Description</h2>
          <p>{product.description} Ce produit est selectionne pour une pratique sportive reguliere avec une finition fiable et confortable.</p>
        </div>
        <div>
          <h2>Informations techniques</h2>
          {product.technical.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div>
          <h2>Avis clients</h2>
          <p>"Tres bon rapport qualite-prix, livraison rapide et produit conforme."</p>
          <small>Client PlayForest verifie</small>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-section-header">
          <span>Produits similaires</span>
          <h2>Dans la meme discipline</h2>
        </div>
        <div className="shop-products-grid">
          {similarProducts.map((item) => (
            <ProductCard key={item.id} product={item} onAddToCart={(selected) => addToCart(selected, selected.sizes[0], 1)} onViewDetails={(productId) => navigate(`/shop/product/${productId}`)} />
          ))}
        </div>
      </section>

      <Cart
        items={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={(itemId, size) => setCartItems((current) => current.filter((item) => !(item.id === itemId && item.selectedSize === size)))}
        onCheckout={() => setCartOpen(false)}
      />
    </main>
  );
};

export default ProductDetail;
