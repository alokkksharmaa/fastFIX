import { useState } from "react";

const useState = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>UseState Example</h1>

      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
      
    </div>
  );
};

export default useState;
