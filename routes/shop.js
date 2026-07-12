import express from 'express';
import db from '../db.js';

const router = express.Router();

const parseJsonArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return String(value).split(',').map((item) => item.trim()).filter(Boolean);
  }
};

const normalizeProduct = (row) => ({
  ...row,
  price: Number(row.price),
  discount: Number(row.discount || 0),
  stock: Number(row.stock || 0),
  sizes: parseJsonArray(row.sizes),
  images: parseJsonArray(row.images || row.image),
});

router.post('/products', async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      sport,
      price,
      discount = 0,
      stock = 0,
      sizes = [],
      brand,
      image,
      images,
    } = req.body;

    const productImages = images?.length ? images : [image].filter(Boolean);
    const [result] = await db.query(
      `INSERT INTO products (name, description, sport, category, brand, price, discount, stock, sizes, images)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, sport, category, brand, price, discount, stock, JSON.stringify(sizes), JSON.stringify(productImages)]
    );

    res.status(201).json({ id: result.insertId, ...req.body, images: productImages });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la creation du produit', error: error.message });
  }
});

router.get('/products', async (req, res) => {
  try {
    const { sport, category, minPrice, maxPrice, size, search, brand } = req.query;
    const clauses = [];
    const values = [];

    if (sport) {
      clauses.push('sport = ?');
      values.push(sport);
    }
    if (category) {
      clauses.push('category = ?');
      values.push(category);
    }
    if (brand) {
      clauses.push('brand = ?');
      values.push(brand);
    }
    if (minPrice) {
      clauses.push('price >= ?');
      values.push(Number(minPrice));
    }
    if (maxPrice) {
      clauses.push('price <= ?');
      values.push(Number(maxPrice));
    }
    if (size) {
      clauses.push('sizes LIKE ?');
      values.push(`%"${size}"%`);
    }
    if (search) {
      clauses.push('(LOWER(name) LIKE ? OR LOWER(brand) LIKE ?)');
      values.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const [rows] = await db.query(`SELECT * FROM products ${where} ORDER BY created_at DESC`, values);
    res.json(rows.map(normalizeProduct));
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des produits', error: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Produit introuvable' });
    res.json(normalizeProduct(rows[0]));
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement du produit', error: error.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const allowed = ['name', 'description', 'sport', 'category', 'brand', 'price', 'discount', 'stock', 'sizes', 'images'];
    const entries = Object.entries(req.body).filter(([key]) => allowed.includes(key));
    if (!entries.length) return res.status(400).json({ message: 'Aucune donnee a modifier' });

    const fields = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([key, value]) => (['sizes', 'images'].includes(key) ? JSON.stringify(value) : value));
    await db.query(`UPDATE products SET ${fields} WHERE id = ?`, [...values, req.params.id]);
    res.json({ message: 'Produit modifie avec succes' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification du produit', error: error.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Produit supprime avec succes' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error: error.message });
  }
});

router.get('/categories', async (_req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.name, c.icon, COUNT(p.id) AS products
       FROM categories c
       LEFT JOIN products p ON p.sport = c.name
       GROUP BY c.id, c.name, c.icon
       ORDER BY c.name`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des categories', error: error.message });
  }
});

router.post('/orders', async (req, res) => {
  const connection = await db.getConnection?.();
  try {
    const { user_id, total, status = 'pending', items = [] } = req.body;
    const executor = connection || db;
    if (connection) await connection.beginTransaction();

    const [orderResult] = await executor.query(
      'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
      [user_id || null, total, status]
    );

    for (const item of items) {
      await executor.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderResult.insertId, item.product_id, item.quantity, item.price]
      );
      await executor.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    if (connection) await connection.commit();
    res.status(201).json({ id: orderResult.insertId, user_id, total, status, items });
  } catch (error) {
    if (connection) await connection.rollback();
    res.status(500).json({ message: 'Erreur lors de la creation de la commande', error: error.message });
  } finally {
    connection?.release?.();
  }
});

router.get('/orders', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des commandes', error: error.message });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!orders.length) return res.status(404).json({ message: 'Commande introuvable' });
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
    res.json({ ...orders[0], items });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement de la commande', error: error.message });
  }
});

router.get('/stats', async (_req, res) => {
  try {
    const [[productStats]] = await db.query('SELECT COUNT(*) AS total_products FROM products');
    const [[salesStats]] = await db.query("SELECT COALESCE(SUM(total), 0) AS total_sales FROM orders WHERE status != 'cancelled'");
    const [[categoryStats]] = await db.query(
      `SELECT p.sport AS best_category, COUNT(oi.id) AS sales
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       GROUP BY p.sport
       ORDER BY sales DESC
       LIMIT 1`
    );
    const [[productBest]] = await db.query(
      `SELECT p.name AS best_product, SUM(oi.quantity) AS sold
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       GROUP BY p.id, p.name
       ORDER BY sold DESC
       LIMIT 1`
    );

    res.json({
      total_products: Number(productStats.total_products || 0),
      total_sales: Number(salesStats.total_sales || 0),
      best_category: categoryStats?.best_category || null,
      best_product: productBest?.best_product || null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des statistiques', error: error.message });
  }
});

export default router;
