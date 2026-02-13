import { memo } from "react";

const ExpensiveChild = memo(function ExpensiveChild({ count, onClick }) {
  console.log("Child rendered");
  return <button onClick={onClick}>Count: {count}</button>;
});

export default ExpensiveChild;