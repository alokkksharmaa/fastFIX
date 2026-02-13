// src/components/CounterButtons.jsx
import { useCounter } from "../context/counterContext"; 

export default function CounterButtons({ variant = 'normal' }) {
  
  const { decrementBy, increment, decrement, reset, incrementBy } = useCounter();

  const buttonStyle = {
    padding: variant === 'small' ? '0.5rem 1rem' : '0.8rem 1.6rem',
    fontSize: variant === 'small' ? '1rem' : '1.2rem',
    margin: '0.5rem',
    borderRadius: '8px',
    border: 'border-box',
    cursor: 'pointer',
  };

  return (
    <div>
      <button onClick={() => decrementBy(-5)}
      style={{ ...buttonStyle, background: '#e74c3c', color: 'white' }}
      > 
      -5
      </button>
      <button 
        onClick={decrement}
        style={{ ...buttonStyle, background: '#e74c3c', color: 'white' }}
      >
        -1
      </button>
      
      <button 
        onClick={increment}
        style={{ ...buttonStyle, background: '#2ecc71', color: 'white' }}
      >
        +1
      </button>
      
      <button 
        onClick={() => incrementBy(5)}
        style={{ ...buttonStyle, background: '#3498db', color: 'white' }}
      >
        +5
      </button>
      
      <button 
        onClick={reset}
        style={{ ...buttonStyle, background: '#7f8c8d', color: 'white' }}
      >
        Reset
      </button>
    </div>
  );
}