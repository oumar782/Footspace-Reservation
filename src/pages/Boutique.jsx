import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Filter,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import {
  formatShopPrice,
  productTypes,
  shopCategories,
  shopProducts,
} from '../data/shop';
import './boutique.css';

const initialFilters = {
  sport: '',
  type: '',
  size: '',
  minPrice: '',
  maxPrice: '',
  brand: '',
  availability: '',
  gender: '',
  search: '',
};

const Boutique = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialFilters);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminProducts, setAdminProducts] = useState(shopProducts);
  const [adminForm, setAdminForm] = useState({
    name: '',
    sport: 'Football',
    category: 'Chaussures',
    brand: '',
    price: '',
    stock: '',
  });

  const brands = useMemo(() => [...new Set(shopProducts.map((product) => product.brand))], []);
  const sizes = useMemo(() => [...new Set(shopProducts.flatMap((product) => product.sizes))], []);

  const filteredProducts = useMemo(() => {
    return adminProducts.filter((product) => {
      const search = filters.search.trim().toLowerCase();
      const matchesSearch = !search || product.name.toLowerCase().includes(search) || product.brand.toLowerCase().includes(search);
      const matchesSport = !filters.sport || product.sport === filters.sport;
      const matchesType = !filters.type || product.type === filters.type || product.category === filters.type;
      const matchesSize = !filters.size || product.sizes.includes(filters.size);
      const matchesMin = !filters.minPrice || product.price >= Number(filters.minPrice);
      const matchesMax = !filters.maxPrice || product.price <= Number(filters.maxPrice);
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesAvailability = !filters.availability || (filters.availability === 'available' ? product.stock > 0 : product.stock === 0);
      const matchesGender = !filters.gender || product.gender === filters.gender || product.gender === 'Mixte';

      return matchesSearch && matchesSport && matchesType && matchesSize && matchesMin && matchesMax && matchesBrand && matchesAvailability && matchesGender;
    });
  }, [adminProducts, filters]);

  const popularProducts = adminProducts.filter((product) => product.badge === 'Populaire');
  const newProducts = adminProducts.filter((product) => product.badge === 'Nouveaute');
  const promoProducts = adminProducts.filter((product) => product.discount > 0);
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalSales = 28470;

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  const addToCart = (product, selectedSize = product.sizes[0]) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        return current.map((item) => item.id === product.id && item.selectedSize === selectedSize ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, selectedSize, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, quantity, selectedSize) => {
    if (quantity <= 0) {
      removeItem(id, selectedSize);
      return;
    }
    setCartItems((current) => current.map((item) => item.id === id && item.selectedSize === selectedSize ? { ...item, quantity } : item));
  };

  const removeItem = (id, selectedSize) => {
    setCartItems((current) => current.filter((item) => !(item.id === id && item.selectedSize === selectedSize)));
  };

  const openCategory = (sport) => {
    setFilters((current) => ({ ...current, sport }));
    document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToProduct = (id) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    navigate(`/shop/product/${id}`);
  };

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    const product = {
      id: `${adminForm.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: adminForm.name,
      sport: adminForm.sport,
      category: adminForm.category,
      type: adminForm.category,
      brand: adminForm.brand,
      price: Number(adminForm.price),
      oldPrice: 0,
      discount: 0,
      stock: Number(adminForm.stock),
      available: Number(adminForm.stock) > 0,
      sizes: ['S', 'M', 'L'],
      gender: 'Mixte',
      badge: 'Admin',
      rating: 4.2,
      reviews: 0,
      description: 'Produit ajoute depuis le tableau de bord boutique.',
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
      images: ['https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80'],
      technical: ['Stock gere', 'Categorie boutique', 'Produit PlayForest'],
    };
    setAdminProducts((current) => [product, ...current]);
    setAdminForm({ name: '', sport: 'Football', category: 'Chaussures', brand: '', price: '', stock: '' });
  };

  const deleteAdminProduct = (id) => {
    setAdminProducts((current) => current.filter((product) => product.id !== id));
  };

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="shop-hero-content">
          <div className="shop-hero-badge">
            <ShoppingBag size={16} />
            <span>Boutique PlayForest</span>
          </div>
          <h1>Marketplace sportive PlayForest<span>.</span></h1>
          <p>Maillots, chaussures, equipements et accessoires selectionnes pour toutes les disciplines de la communaute.</p>
          <div className="shop-hero-actions">
            <button type="button" className="shop-primary-button" onClick={() => document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              <Search size={18} />
              Explorer le catalogue
            </button>
            <button type="button" className="shop-secondary-button" onClick={() => setCartOpen(true)}>
              <ShoppingCart size={18} />
              Panier ({totalCartItems})
            </button>
          </div>
          <div className="shop-hero-stats">
            <span><Package size={18} /> {adminProducts.length} produits</span>
            <span><Truck size={18} /> Livraison offerte des 1200 DH</span>
            <span><ShieldCheck size={18} /> Paiement securise</span>
          </div>
        </div>
        <div className="shop-hero-showcase">
          {popularProducts.slice(0, 3).map((product) => (
            <button type="button" key={product.id} className="shop-hero-product" onClick={() => goToProduct(product.id)}>
              <img src={product.image} alt={product.name} />
              <span>{product.brand}</span>
              <strong>{formatShopPrice(product.price)}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-section-header">
          <span>Categories sportives</span>
          <h2>Trouvez par discipline</h2>
        </div>
        <div className="shop-category-grid">
          {shopCategories.map(({ id, name, icon: Icon, color }) => {
            const count = adminProducts.filter((product) => product.sport === name).length;
            return (
              <button type="button" className="shop-category-card" key={id} onClick={() => openCategory(name)}>
                <span className="shop-category-icon" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
                  <Icon size={20} />
                </span>
                <strong>{name}</strong>
                <small>{count} produits</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="shop-section shop-curated-section">
        <div className="shop-section-header">
          <span>Selection PlayForest</span>
          <h2>Populaires, nouveautes et promotions</h2>
        </div>
        <div className="shop-curated-grid">
          <div className="shop-curated-column">
            <h3><BarChart3 size={18} /> Produits populaires</h3>
            {popularProducts.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetails={goToProduct} />)}
          </div>
          <div className="shop-curated-column">
            <h3><Sparkles size={18} /> Nouveautes</h3>
            {newProducts.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetails={goToProduct} />)}
          </div>
          <div className="shop-curated-column">
            <h3><SlidersHorizontal size={18} /> Promotions</h3>
            {promoProducts.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetails={goToProduct} />)}
          </div>
        </div>
      </section>

      <section className="shop-section" id="shop-catalog">
        <div className="shop-section-header">
          <span>Catalogue produits</span>
          <h2>Filtrage avance</h2>
        </div>

        <div className="shop-filters">
          <div className="shop-search-field">
            <Search size={18} />
            <input value={filters.search} onChange={(event) => updateFilter('search', event.target.value)} placeholder="Rechercher par produit ou marque" />
          </div>
          <label>
            <Filter size={15} />
            Sport
            <select value={filters.sport} onChange={(event) => updateFilter('sport', event.target.value)}>
              <option value="">Tous</option>
              {shopCategories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
            </select>
          </label>
          <label>
            Type
            <select value={filters.type} onChange={(event) => updateFilter('type', event.target.value)}>
              <option value="">Tous</option>
              {productTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>
          <label>
            Taille
            <select value={filters.size} onChange={(event) => updateFilter('size', event.target.value)}>
              <option value="">Toutes</option>
              {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </label>
          <label>
            Prix min
            <input type="number" value={filters.minPrice} onChange={(event) => updateFilter('minPrice', event.target.value)} placeholder="0" />
          </label>
          <label>
            Prix max
            <input type="number" value={filters.maxPrice} onChange={(event) => updateFilter('maxPrice', event.target.value)} placeholder="1500" />
          </label>
          <label>
            Marque
            <select value={filters.brand} onChange={(event) => updateFilter('brand', event.target.value)}>
              <option value="">Toutes</option>
              {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
            </select>
          </label>
          <label>
            Disponibilite
            <select value={filters.availability} onChange={(event) => updateFilter('availability', event.target.value)}>
              <option value="">Toutes</option>
              <option value="available">En stock</option>
              <option value="soldout">Rupture</option>
            </select>
          </label>
          <label>
            Genre
            <select value={filters.gender} onChange={(event) => updateFilter('gender', event.target.value)}>
              <option value="">Tous</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Enfant">Enfant</option>
            </select>
          </label>
          <button type="button" className="shop-clear-filters" onClick={() => setFilters(initialFilters)}>
            <X size={15} />
            Reinitialiser
          </button>
        </div>

        <div className="shop-results-bar">
          <strong>{filteredProducts.length}</strong>
          <span>produits trouves</span>
        </div>

        <div className="shop-products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetails={goToProduct} />
          ))}
        </div>
      </section>

      <section className="shop-section shop-admin-section">
        <div className="shop-section-header">
          <span>Dashboard administrateur</span>
          <h2>Gestion Boutique</h2>
        </div>
        <div className="shop-admin-grid">
          <form className="shop-admin-form" onSubmit={handleAdminSubmit}>
            <h3>Ajouter un produit</h3>
            <input required value={adminForm.name} onChange={(event) => setAdminForm((current) => ({ ...current, name: event.target.value }))} placeholder="Nom du produit" />
            <div className="shop-admin-row">
              <select value={adminForm.sport} onChange={(event) => setAdminForm((current) => ({ ...current, sport: event.target.value }))}>
                {shopCategories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
              </select>
              <select value={adminForm.category} onChange={(event) => setAdminForm((current) => ({ ...current, category: event.target.value }))}>
                {productTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="shop-admin-row">
              <input required value={adminForm.brand} onChange={(event) => setAdminForm((current) => ({ ...current, brand: event.target.value }))} placeholder="Marque" />
              <input required type="number" min="0" step="0.01" value={adminForm.price} onChange={(event) => setAdminForm((current) => ({ ...current, price: event.target.value }))} placeholder="Prix" />
              <input required type="number" min="0" step="1" value={adminForm.stock} onChange={(event) => setAdminForm((current) => ({ ...current, stock: event.target.value }))} placeholder="Stock" />
            </div>
            <button type="submit" className="shop-primary-button">
              <Package size={17} />
              Ajouter produit
            </button>
          </form>

          <div className="shop-admin-stats">
            <div><span>Produits</span><strong>{adminProducts.length}</strong></div>
            <div><span>Ventes</span><strong>{formatShopPrice(totalSales)}</strong></div>
            <div><span>Meilleure categorie</span><strong>Football</strong></div>
            <div><span>Commandes</span><strong>128</strong></div>
          </div>

          <div className="shop-admin-table">
            <h3>Stock et categories</h3>
            {adminProducts.slice(0, 7).map((product) => (
              <div key={product.id} className="shop-admin-line">
                <span>{product.name}</span>
                <small>{product.sport} | {product.stock} stock</small>
                <button type="button" onClick={() => deleteAdminProduct(product.id)}>Supprimer</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cart
        items={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => setCartOpen(false)}
      />
    </div>
  );
};

export default Boutique;