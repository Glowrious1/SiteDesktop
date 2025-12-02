import React, { useState, useEffect } from "react";


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

export default function EditarPro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [form, setForm] = useState({
    tipoProduto: "",
    codCategoria: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tipoProduto/${id}`)
      .then((res) => {
        if (res.data) {
          setForm({
            tipoProduto: res.data.TipoProduto,
            codCategoria: res.data.codCategoria
          });
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao carregar tipo de produto.");
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/tipoProduto/${id}`, {
        TipoProduto: form.tipoProduto,
        codCategoria: form.codCategoria
      });

      alert("Tipo de produto atualizado!");
      navigate("/funPro");
    } catch (err) {
      alert("Erro ao atualizar tipo de produto.");
      console.error(err);
    }
  }

  return (
    <div className="layout">

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

      <main className="home-content">

        <div className="form-func-box">

          <button className="btn-voltar-func" onClick={() => navigate("/funPro")}>
            <ArrowLeft size={18} />
            Voltar
          </button>

          <h2>Editar Tipo de Produto</h2>

          <form className="form-func" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Tipo do Produto</label>
              <input 
                type="text"
                name="tipoProduto"
                value={form.tipoProduto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Código da Categoria</label>
              <input 
                type="number"
                name="codCategoria"
                value={form.codCategoria}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn-submit" type="submit">
              Atualizar Tipo
            </button>

          </form>
        </div>

      </main>
    </div>
  );
}
