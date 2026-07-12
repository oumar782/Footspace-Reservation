CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sport VARCHAR(120) NOT NULL,
  category VARCHAR(120) NOT NULL,
  brand VARCHAR(120),
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  discount DECIMAL(5, 2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  sizes JSON,
  images JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  icon VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status VARCHAR(60) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO categories (name, icon) VALUES
  ('Football', 'Goal'),
  ('Basketball', 'ShoppingBasket'),
  ('Tennis', 'Trophy'),
  ('Running', 'HeartPulse'),
  ('Fitness', 'Dumbbell'),
  ('Sports de combat', 'Swords'),
  ('Volleyball', 'Volleyball')
ON DUPLICATE KEY UPDATE icon = VALUES(icon);
