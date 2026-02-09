import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  // If you later want to fetch real data, uncomment this:
  /*
  useEffect(() => {
    fetch("https://your-api.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);
  */

  // Static data (using this for now since fetch url was empty)
  const mockProducts = [
    { id: 1, name: "Wireless Mouse", price: 439.99, description: "Ergonomic mouse with RGB" },
    { id: 2, name: "Mechanical Keyboard", price: 567.0, description: "RGB, hot-swappable switches" },
    { id: 5, name: '4K Monitor 27"', price: 5999.99, description: "IPS panel, 144Hz" },
    { id: 7, name: "USB-C Hub", price: 299.0, description: "6-in-1 with PD charging" },
  ];

  // Use API data when available, otherwise static data
  const displayProducts = products.length > 0 ? products : mockProducts;

  return (
    <div>
      <h2>Products</h2>

      {displayProducts.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        displayProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <p>{product.description}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Product;