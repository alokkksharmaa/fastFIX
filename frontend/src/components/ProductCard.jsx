// src/components/ProductCard.jsx
import { useShop } from "../context/shopContext";
export default function ProductCard({ product }) {
  const { addToCart } = useShop();

  return (
    <div style={{
      border: "1px solid #eee",
      padding: "1rem",
      borderRadius: "8px",
      background: "white"
    }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
      />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
