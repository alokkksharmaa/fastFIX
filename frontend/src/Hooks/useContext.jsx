import { createContext, useContext, useState } from "react";

const CounterContext = createContext();

export function counterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  const value = {
    count,
    increment,
    decrement,
    reset,
    incrementBy,
  };
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("user must be within a counterProvider");
  }

  return context;
}
