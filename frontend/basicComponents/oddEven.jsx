import React, { useState } from 'react';

const SmartIncrementer = () => {
  const [count, setCount] = useState(0);

  // Logic: Even + 2, Odd + 1
  const handleIncrement = () => {
    setCount((prevCount) => (prevCount % 2 === 0 ? prevCount + 2 : prevCount + 1));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Logical Counter</h1>
      <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
        {count}
      </div>
      
      <button 
        onClick={handleIncrement}
        style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
      >
        Increment
      </button>

      <button 
        onClick={() => setCount(0)} 
        style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '1rem' }}
      >
        Reset
      </button>

      <p style={{ marginTop: '20px', color: '#666' }}>
        Current state is <strong>{count % 2 === 0 ? 'EVEN' : 'ODD'}</strong>
      </p>
    </div>
  );
};

export default SmartIncrementer;