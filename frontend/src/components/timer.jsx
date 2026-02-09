import { useState, useRef } from "react";

function Timer() {
  const [time, setTime] = useState(0);
  const timeRef = useRef(null);

  const startTimer = () => {
    if (timeRef.current) return;
    timeRef.current = setInterval(() => {
      setTime((count) => count + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

  const reset = () => {
    stopTimer();
    setTime(0);
  };

  return (
    <div>
      <h1>Timer: {time} seconds</h1>
      <button className="button" onClick={startTimer}>Start Timer</button>
      <button className="button" onClick={stopTimer}>Stop Timer</button>
      <button className="button" onClick={reset}>Reset Timer</button>
    </div>
  );
}

export default Timer;
