// src/App.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create Context
const ShopContext = createContext();

// 2. Provider (very short)
function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch once on mount
  useEffect(() => {
    fetch('https://fakestoreapi.com/products') 
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]); // simple push — allows duplicates
  };

  return (
    <ShopContext.Provider value={{ products, cart, addToCart }}>
      {children}
    </ShopContext.Provider>
  );
}

// 3. Custom hook
function useShop() {
  return useContext(ShopContext);
}

// ────────────────────────────────────────────────
// Main App
// ────────────────────────────────────────────────

export default function App() {
  return (
    <ShopProvider>
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Simple Shop</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <ProductsList />
          <CartList />
        </div>
      </div>
    </ShopProvider>
  );
}

function ProductsList() {
  const { products, addToCart } = useShop();

  if (products.length === 0) return <p>Loading products...</p>;

  return (
    <>
      <h2>Products</h2>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "6px",
          }}
        >
          <img
            src={p.image}
            alt={p.title}
            style={{ width: "100%", height: "140px", objectFit: "contain" }}
          />
          <h4 style={{ margin: "10px 0 6px", fontSize: "1.1rem" }}>{p.title}</h4>
          <p style={{ margin: "0 0 10px", fontWeight: "bold" }}>${p.price}</p>
          <button
            onClick={() => addToCart(p)}
            style={{
              background: "#4CAF50",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  );
}

function CartList() {
  const { cart } = useShop();

  return (
    <>
      <div style={{ position: "sticky", top: "20px" }}>
        <h2>Cart ({cart.length})</h2>
        {cart.length === 0 && <p>Cart is empty</p>}
        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              background: "#f9f9f9",
            }}
          >
            <strong>{item.title}</strong>
            <br />
            ${item.price}
          </div>
        ))}
      </div>
    </>
  );
}