import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Products/product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;