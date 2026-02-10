// src/components/ProductList.jsx
import { useShop } from "../context/shopContext";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products } = useShop();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
        gap: "1.5rem",
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
