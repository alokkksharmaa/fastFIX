import { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

function scrollToExample() {
  const inputRef = useRef(null);
  const scrollTo = useRef(null);

  const scroll = () => {
    scrollTo.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <input ref={inputRef} type="text" placeholder="Focus me on load" />
      <button onClick={scroll}>Scroll to Input</button>
      <div ref={scrollTo} style={{ height: "100vh", backgroundColor: "lightblue" }}>
        <p>This is the target element to scroll to.</p>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<scrollToExample />);

export default scrollToExample;