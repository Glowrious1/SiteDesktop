import React, { useState } from "react";
import "./FunHome.css";

import { 
  LayoutDashboard,
  Users,
  User,

  Grid2x2,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function FuncionarioHome() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/Login");
  }

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo1">L</div>

        <nav className="menu1">

          <button className="menu-btn active" onClick={() => navigate("/FuncionarioHome")}>
            <LayoutDashboard size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn"   onClick={() => navigate("/Funcionario")}>
            <Users size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn" onClick={() => navigate("/Cliente")}>
            <User size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn" onClick={() => navigate("/funPro")}>
            <Grid2x2 size={26} strokeWidth={1.7} />
          </button>

          {/* BOTÃO DE LOGOUT */}
          <button
            className="menu-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut size={26} strokeWidth={1.7} />
          </button>

        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="home-content">
        <div className="banner">
          <img src="/banner6.png" alt="Banner Funcionário" />
        </div>
      </main>

      {/* MODAL DE LOGOUT */}
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
