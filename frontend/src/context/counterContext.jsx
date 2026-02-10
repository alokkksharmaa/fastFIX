// src/context/CounterContext.jsx
import { createContext, useContext, useState } from 'react';

const CounterContext = createContext();

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const decrementBy = (amount) => setCount(c => c +  amount);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = ()  => setCount(0);
  const incrementBy = (amount) => setCount(c => c + amount);

  const value = {
    count,
    decrementBy,
    increment,
    decrement,
    reset,
    incrementBy,
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}