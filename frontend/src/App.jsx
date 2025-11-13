import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/home.jsx";
import Favoritos from "./components/Pages/Favoritos/Favoritos.jsx";
import Produto from "./components/Pages/Produto/Produto.jsx";
import Produtos from "./components/Pages/Produtos/Produtos.jsx"; 
import Login from "./components/Pages/Login/Login.jsx";
import Cadastro from "./components/Pages/Cadastro/Cadastro.jsx";
import Rosto from "./components/Pages/Rosto/Rosto.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/produto" element={<Produto />} />
      <Route path="/produtos" element={<Produtos />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/rosto" element={<Rosto/>} />
    </Routes>
  );
}

export default App;
