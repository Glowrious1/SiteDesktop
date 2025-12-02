import React, { useState } from "react";
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

export default function AdicioCli() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    senha: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/Cliente", {
        Nome: form.nome,
        Email: form.email,
        CPF: form.cpf,
        CepCli: form.cep,
        Senha: form.senha
      });

      alert("Cliente cadastrado com sucesso!");
      navigate("/Cliente");

    } catch (err) {
      alert("Erro ao cadastrar cliente.");
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

      <aside className="sidebar">
        <div className="logo1">L</div>

        <nav className="menu1">
            <button className="menu-btn" onClick={() => navigate("/FuncionarioHome")}>
                <LayoutDashboard size={26} strokeWidth={1.7} />
              </button>
    
              <button className="menu-btn " onClick={() => navigate("/Cliente")}>
                <Users size={26} strokeWidth={1.7} />
              </button>
    
              <button className="menu-btn active" onClick={() => navigate("/Cliente")}>
                <User size={26} strokeWidth={1.7} />
              </button>
              <button className="menu-btn" onClick={() => navigate("/funPro")}>
                <Grid2x2 size={26} strokeWidth={1.7} />
              </button>
    
              <button className="menu-btn" onClick={() => setShowLogoutModal(true)}>
                <LogOut size={26} strokeWidth={1.7} />
              </button>
        </nav>
      </aside>

      <main className="home-content">

        <div className="form-func-box">

          <button className="btn-voltar-func" onClick={() => navigate("/Cliente")}>
            <ArrowLeft size={18} />
            Voltar
          </button>

          <h2>Novo Cliente</h2>

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
              <label>CPF</label>
              <input 
                type="text"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CEP</label>
              <input 
                type="text"
                name="cep"
                value={form.cep}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input 
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
              />
            </div>

            <button className="btn-submit" type="submit">
              Cadastrar Cliente
            </button>
          </form>
        </div>
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
