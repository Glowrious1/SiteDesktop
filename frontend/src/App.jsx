import { Routes, Route } from "react-router-dom";
import Toast from './components/Toast/Toast.jsx';
import Home from "./components/Pages/Home/home.jsx";
import Favoritos from "./components/Pages/Favoritos/Favoritos.jsx";
import Produto from "./components/Pages/Produto/Produto.jsx";
import Produtos from "./components/Pages/Produtos/Produtos.jsx"; 
import Cadastro from "./components/Pages/Cadastro/Cadastro.jsx";
import Rosto from "./components/Pages/Rosto/Rosto.jsx";
import Duvidas from "./components/Pages/Duvidas/Duvidas.jsx";
import FuncionarioHome from "./components/Pages/FuncionarioHome/FunHome.jsx";
import Login from "./components/Pages/Login/Login.jsx";
import Funcionario from "./components/Pages/Funcionario/Funcionario.jsx";
import AdicioFun from "./components/Pages/AdicioFun/AdicioFun.jsx";
import Carrinho from "./components/Pages/Carrinho/Carrinho.jsx";
import EditarFun from "./components/Pages/EditarFun/EditarFun.jsx";
import Cliente from "./components/Pages/Cliente/Cliente.jsx";
import AdicioCli from "./components/Pages/AdicioCli/AdicioCli.jsx"; 
import EditarCli from "./components/Pages/EditarCli/EditarCli.jsx";
import Cabelo from "./components/Pages/Cabelo/Cabelo.jsx";
import Perfumes from "./components/Pages/Perfumes/Perfumes.jsx";
import Corpo from "./components/Pages/Corpo/Corpo.jsx";
import FunPro from "./components/Pages/FunProduto/FunPro.jsx";
import AdicioProdu from "./components/Pages/AdicioPro/AdicioProdu.jsx";
import EditarPro from "./components/Pages/EditarPro/EditarPro.jsx";
import Pagamento from "./components/Pages/pagamento/Pagamento.jsx";
import NotaFiscal from "./components/Pages/nota/notafiscal.jsx";

function App() {
  return (
    <>
    <Toast />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/produto/:id" element={<Produto />} />
      <Route path="/produtos" element={<Produtos />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/rosto" element={<Rosto />} />
      <Route path="/duvidas" element={<Duvidas/>}/>
      <Route path="/FuncionarioHome" element={<FuncionarioHome />} />
      <Route path="/Funcionario" element={<Funcionario />} />
      <Route path="/AdicioFun" element={<AdicioFun />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/EditarFun/:id" element={<EditarFun />} />
      <Route path="/Cliente" element={<Cliente />} />
      <Route path="/AdicioCli" element={<AdicioCli />} />
      <Route path="/EditarCli/:id" element={<EditarCli />} />
      <Route path="/cabelo" element={<Cabelo />} />
      <Route path="/perfumes" element={<Perfumes />} />
      <Route path="/corpo" element={<Corpo />} />
      <Route path="/funPro" element={<FunPro />} />
      <Route path="/AdicioTipo" element={<AdicioProdu />} />
      <Route path="/EditarPro/:id" element={<EditarPro />} />
      <Route path="/pagamento" element={<Pagamento />} />
      <Route path="/nota" element={<NotaFiscal />} />
    </Routes>
    </>
  );
}

export default App;
