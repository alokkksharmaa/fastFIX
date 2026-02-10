// src/components/CartItem.jsx
import { useShop } from "../context/shopContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useShop();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <img src={item.thumbnail} width="50" />
      <p>{item.title}</p>
      <p>${item.price} x {item.quantity}</p>

      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
}
