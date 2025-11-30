import React, { useState, useEffect } from "react";
import "./Cliente.css"; 
import axios from "axios";

import { 
  LayoutDashboard,
  Users,
  User,
  Settings,
  Grid2x2,
  LogOut,
  Search,
  Plus
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Cliente() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  // Buscar clientes
  useEffect(() => {
    axios.get("http://localhost:3001/Cliente")
      .then(res => {
        setClientes(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/Login");
  }

  async function excluirCliente(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      await axios.delete(`http://localhost:3001/Cliente/${id}`);
      setClientes(clientes.filter(c => c.IdClient !== id));
    } catch (err) {
      console.log(err);
      alert("Erro ao excluir");
    }
  }

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo1">L</div>

        <nav className="menu1">

          <button className="menu-btn" onClick={() => navigate("/FuncionarioHome")}>
            <LayoutDashboard size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn " onClick={() => navigate("/Funcionario")}>
            <Users size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn active" onClick={() => navigate("/Cliente")}>
            <User size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn" onClick={() => navigate("/config")}>
            <Settings size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn" onClick={() => navigate("/produtos")}>
            <Grid2x2 size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn" onClick={() => setShowLogoutModal(true)}>
            <LogOut size={26} strokeWidth={1.7} />
          </button>

        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="home-content">
        
        <div className="func-box-home">

          {/* HEADER */}
          <div className="func-top">
            <h2>Clientes</h2>

            <button 
              className="btn-add"
              onClick={() => navigate("/AdicioCli")}
            >
              <Plus size={18} />
              Novo Cliente
            </button>
          </div>

          {/* BUSCA */}
          <div className="func-search-home">
            <input type="text" placeholder="Pesquisar..." />
            <Search size={18} />
          </div>

          {/* TABELA */}
          <table className="func-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>CEP</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientes.map((c) => (
                <tr key={c.IdClient}>
                  <td>{c.Nome}</td>
                  <td>{c.Email}</td>
                  <td>{c.CPF}</td>
                  <td>{c.CepCli}</td>

                  <td>
                    <button 
                      className="btn-edit" 
                      onClick={() => navigate(`/EditarCli/${c.IdClient}`)}
                    >
                      Editar
                    </button>

                    <button 
                      className="btn-delete" 
                      onClick={() => excluirCliente(c.IdClient)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </main>
    </div>
  );
}
