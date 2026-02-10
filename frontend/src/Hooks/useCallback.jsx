import { useState, useCallback } from 'react';
import React from 'react';

const FancyButton = React.memo(({ onClick }) => {
  console.log("FancyButton rendered → should happen very rarely!");
  return <button onClick={onClick} style={{padding: "20px", fontSize: "24px"}}>🐴 CLICK ME</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  // This is the magic line
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);   // ← empty = function never changes identity

  return (
    <div style={{background: dark ? "#222" : "#fff", color: dark ? "white" : "black", minHeight:"100vh"}}>
      <h1>Clicks: {count}</h1>
      
      <FancyButton onClick={handleClick} />
      
      <br/><br/>
      <button onClick={() => setDark(!dark)}>
        Toggle dark mode (this should NOT re-render FancyButton)
      </button>
    </div>
  );
}

export default App;