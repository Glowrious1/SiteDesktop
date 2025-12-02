import React, { useState, useEffect } from "react";
import "./Editar.css";

import { 
  LayoutDashboard,
  Users,
  User,
  Grid2x2,
  LogOut,
  ArrowLeft
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditarFun() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: ""
  });

  // 🔥 Carregar dados do funcionário
  useEffect(() => {
    axios
      .get(`http://localhost:3001/Funcionario/${id}`)
      .then((res) => {
        if (res.data) {
          setForm({
            nome: res.data.Nome,
            email: res.data.Email,
            senha: res.data.Senha
          });
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao carregar dados do funcionário.");
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/Funcionario/${id}`, {
        Nome: form.nome,
        Email: form.email,
        Senha: form.senha
      });

      alert("Funcionário atualizado com sucesso!");
      navigate("/Funcionario");
    } catch (err) {
      alert("Erro ao atualizar funcionário.");
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


          <button className="menu-btn" onClick={() => navigate("/funPro")}>
            <Grid2x2 size={26} strokeWidth={1.7} />
          </button>

          <button className="menu-btn" onClick={() => setShowLogoutModal(true)}>
            <LogOut size={26} strokeWidth={1.7} />
          </button>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="home-content">

        <div className="form-func-box">

          {/* VOLTAR */}
          <button className="btn-voltar-func" onClick={() => navigate("/funcionario")}>
            <ArrowLeft size={18} />
            Voltar
          </button>

          <h2>Editar Funcionário</h2>

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
              Atualizar Funcionário
            </button>

          </form>
        </div>

       
      </main>
    </div>
  );
}
