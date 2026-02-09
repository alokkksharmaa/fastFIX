// App.jsx  (main file)
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 439.99,
    description: "Ergonomic mouse with RGB",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 567.0,
    description: "RGB, hot-swappable switches",
  },
  {
    id: 5,
    name: '4K Monitor 27"',
    price: 5999.99,
    description: "IPS panel, 144Hz",
  },
  {
    id: 7,
    name: "USB-C Hub",
    price: 299.0,
    description: "6-in-1 with PD charging",
  },
];

function ProductList() {
  return (
    <div>
      <h1>Our Products</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ margin: "12px 0" }}>
            <Link to={`/products/${product.id}`}>
              {product.name} – ₹{product.price.toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams(); // ← gets the :id from URL
  const numericId = Number(id); // convert string → number

  const product = products.find((p) => p.id === numericId);

  if (!product) {
    return (
      <div>
        <h1>Product not found 😔</h1>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <Link to="/products">← Back to all products</Link>
      <h1>{product.name}</h1>
      <h3>₹{product.price.toFixed(2)}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Product ID:</strong> {product.id}
      </p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to our Shop</h1>
      <Link to="/products">See all products →</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "1.5rem" }}>
          Home
        </Link>
        <Link to="/products">Products</Link>
      </nav>

      <main style={{ padding: "1.5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          {/* Optional: 404 */}
          <Route path="*" element={<h2>404 – Page not found</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
