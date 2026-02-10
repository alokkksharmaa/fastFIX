import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data.products); // important fix
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id);
      if (exist) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const getTotalItems = () =>
    cart.reduce((s, i) => s + i.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
