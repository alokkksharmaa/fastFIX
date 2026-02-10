import { createContext } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const sharedValue = "Hello from Context!";
  return (
    <MyContext.Provider value={{ sharedValue, count, setCount }}>
      {children}
    </MyContext.Provider>
  );
}
export { MyProvider };
export default MyContext;
