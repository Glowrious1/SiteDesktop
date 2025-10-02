import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/home.jsx";
import Favoritos from "./components/Pages/Favoritos/Favoritos.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
    </Routes>
  );
}

export default App;
