import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // This is the correct endpoint for product data (includes thumbnail & images)
    fetch("https://dummyjson.com/products?limit=10&skip=10")
      // or use search: "https://dummyjson.com/products/search?q=phone&limit=10"
      // or limit fields: "...&select=title,price,description,thumbnail"

      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} - Failed to fetch`);
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px',
      justifyItems: 'center'
    }}>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p>₹{product.price.toFixed(2)}</p>
          <p>{product.description?.slice(0, 80)}...</p>
          <Link to={`/product/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Product;