// src/components/CounterDisplay.jsx
import { useCounter } from "../context/counterContext"; 

export default function CounterDisplay() {
  const { count } = useCounter();

  return (
    <div style={{
      fontSize: '4rem',
      fontWeight: 'bold',
      margin: '1.5rem 0',
      color: count >= 0 ? '#2c3e50' : '#c0392b'
    }}>
      {count}
    </div>
  );
}