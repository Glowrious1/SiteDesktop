import React, { useState } from "react";
import "./AdicioFun.css";

import { 
  LayoutDashboard,
  Users,
  User,
  Settings,
  Grid2x2,
  LogOut,
  ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdicioFun() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: ""
  });

  

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
    async function handleSubmit(e) {
    e.preventDefault();

    try {
        await axios.post("http://localhost:3001/Funcionario", {
        Nome: form.nome,
        Email: form.email,
        Senha: form.senha
        });

        alert("Funcionário cadastrado com sucesso!");
        navigate("/Funcionario");

    } catch (err) {
        alert("Erro ao cadastrar funcionário.");
        console.error(err);
    }
    }


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

      {/* CONTEÚDO */}
      <main className="home1-content">

        <div className="form-func-box">

          {/* VOLTAR */}
          <button className="btn-voltar-func" onClick={() => navigate("/funcionario")}>
            <ArrowLeft size={18} />
            Voltar
          </button>

          <h2>Novo Funcionário</h2>

          <form className="form-func" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Nome</label>
              <input 
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input 
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn-submit" type="submit">
              Cadastrar Funcionário
            </button>

          </form>
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
