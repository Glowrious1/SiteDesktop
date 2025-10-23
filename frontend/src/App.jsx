import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/home.jsx";
import Favoritos from "./components/Pages/Favoritos/Favoritos.jsx";
import Produto from "./components/Pages/Produto/Produto.jsx";
import Produtos from "./components/Pages/Produtos/Produtos.jsx"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/produto" element={<Produto />} />
      <Route path="/produtos" element={<Produtos />} /> 
    </Routes>
  );
}

export default App;
