// src/components/Cart.jsx
import { useShop } from '../context/shopContext';
import CartItem from './CartItem';

export default function Cart() {
  const { cart, getTotalItems, getTotalPrice } = useShop();

  return (
    <div>
      <h2>Cart ({getTotalItems()})</h2>

      {cart.length === 0 && <p>Empty</p>}

      {cart.map(i => (
        <CartItem key={i.id} item={i} />
      ))}

      <h3>Total: ${getTotalPrice()}</h3>
    </div>
  );
}
