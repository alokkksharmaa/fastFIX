import { BrowserRouter, Routes, Route } from "react-router-dom";
import UseMemo from "./UseMemo/useMemo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/use-memo" element={<UseMemo/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;