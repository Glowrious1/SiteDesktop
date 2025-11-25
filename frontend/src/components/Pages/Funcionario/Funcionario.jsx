import React, { useState, useEffect } from "react";
import "./Funcionario.css";
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

export default function Funcionario() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:3001/Funcionario")
      .then(res => {
        setFuncionarios(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/Login");
  }

  async function excluirFuncionario(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;

  try {
    await axios.delete(`http://localhost:3001/Funcionario/${id}`);
    setFuncionarios(funcionarios.filter(f => f.IdFun !== id));
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

          <button className="menu-btn active" onClick={() => navigate("/Funcionario")}>
            <Users size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn" onClick={() => navigate("/perfil")}>
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

          {/* TOP HEADER */}
          <div className="func-top">
            <h2>Funcionário</h2>

            <button 
              className="btn-add"
              onClick={() => navigate("/AdicioFun")}
            >
              <Plus size={18} />
              Novo Funcionário
            </button>
          </div>

          {/* CAMPO DE BUSCA */}
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
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {funcionarios.map((f) => (
                <tr key={f.IdFun}>
                  <td>{f.Nome}</td>
                  <td>{f.Email}</td>
                  <td>
                    <button className="btn-edit">Editar</button>
                    <button 
                        className="btn-delete"
                        onClick={() => excluirFuncionario(f.IdFun)}
                        >
                        Excluir
                     </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-container">
            <div className="lado-esquerdo">
              <p>(55) 11 14323-2342</p>
              <p>LUSTRIOUS@GMAIL.COM</p>
            </div>

            <div className="footer-icons">
              <a href="https://www.instagram.com/lustriousskincare/">
                <img src="/instagram.png" alt="Instagram" />
              </a>
              <a href="#">
                <img src="/linkedin.png" alt="LinkedIn" />
              </a>
              <a href="#">
                <img src="/whatsapp.png" alt="WhatsApp" />
              </a>
            </div>
          </div>

          <div className="direitos-autorais">
            <p>&copy;DIREITOS AUTORAIS 2025</p>
          </div>
        </footer>
      </main>

      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Tem certeza que deseja sair?</h2>

            <div className="modal-buttons">
              <button className="yes" onClick={handleLogout}>Sim</button>
              <button className="no" onClick={() => setShowLogoutModal(false)}>Não</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
