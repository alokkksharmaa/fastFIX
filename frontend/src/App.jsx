// src/App.jsx
import { ShopProvider } from './context/shopContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <ShopProvider>
      <h1>Shop</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 3 }}>
          <ProductList />
        </div>
        <div style={{ flex: 1 }}>
          <Cart />
        </div>
      </div>
    </ShopProvider>
  );
}

export default App;
