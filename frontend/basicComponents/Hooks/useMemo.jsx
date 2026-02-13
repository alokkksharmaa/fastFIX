import { useState } from "react";

const UseMemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const doubleCount = () => {
    console.log("Counted double");
    return count * 2;
  };
  return (
    <div>
      <h1>UseMemo Example</h1>
      <p>Count: {count}</p>
      <p>Double Count: {doubleCount()}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <input type="text" placeholder="type" value={text} onChange={(e) => setText(e.target.value)}/>
    </div>
  );
};

export default UseMemo;
