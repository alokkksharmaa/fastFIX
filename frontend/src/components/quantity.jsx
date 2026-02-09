import React, { useState, useEffect } from 'react';

const InventoryManager = () => {
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // THE RULE: Reset count when quantity hits 5
  useEffect(() => {
    if (quantity === 5) {
      console.log("Quantity reached 5. Resetting count...");
      setCount(0);
    }
  }, [quantity]); // Only watch quantity

  const handleIncrementCount = () => {
    setCount(prev => (prev % 2 === 0 ? prev + 2 : prev + 1));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Logic Controller</h2>
      <p>Count: <strong>{count}</strong></p>
      <p>Quantity: <strong>{quantity}</strong></p>

      <button onClick={handleIncrementCount}>
        Increment Count (Even+2 / Odd+1)
      </button>

      <button 
        onClick={() => setQuantity(prev => prev + 1)}
        style={{ marginLeft: '10px', backgroundColor: quantity === 4 ? 'red' : '' }}
      >
        Increase Quantity
      </button>

      {quantity === 5 && <p style={{ color: 'red' }}>Rule triggered: Count reset!</p>}
    </div>
  );
};

export default InventoryManager;