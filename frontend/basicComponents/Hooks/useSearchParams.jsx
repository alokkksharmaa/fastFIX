import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchParams = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (!category) return;

    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [category]);

  return (
    <div>
      <h1>Products in {category} category</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchParams;
