import React, { useState, useEffect } from "react";
import axios from "axios";

import { 
  LayoutDashboard,
  Users,
  User,
  Grid2x2,
  LogOut,
  Search,
  Plus
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function FunPro() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [tipos, setTipos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/tipoProduto")
      .then(res => setTipos(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/Login");
  }

  async function excluirTipo(cod) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      await axios.delete(`http://localhost:3001/tipoProduto/${cod}`);
      setTipos(tipos.filter(t => t.codTipoProduto !== cod));
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

          <button className="menu-btn" onClick={() => navigate("/Funcionario")}>
            <Users size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn" onClick={() => navigate("/Cliente")}>
            <User size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn active" onClick={() => navigate("/funPro")}>
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

          {/* TOPO */}
          <div className="func-top">
            <h2>Tipos de Produto</h2>

            <button 
              className="btn-add"
              onClick={() => navigate("/AdicioTipo")}
            >
              <Plus size={18} />
              Novo Produto
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
                <th>Código</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {tipos.map((t) => (
                <tr key={t.codTipoProduto}>
                  <td>{t.codTipoProduto}</td>
                  <td>{t.TipoProduto}</td>
                  <td>{t.codCategoria}</td>

                  <td>
                    <button 
                      className="btn-edit" 
                      onClick={() => navigate(`/EditarPro/${t.codTipoProduto}`)}
                    >
                      Editar
                    </button>

                    <button 
                      className="btn-delete"
                      onClick={() => excluirTipo(t.codTipoProduto)}
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

      {/* MODAL */}
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
