import React, { useState } from "react";
import { 
  LayoutDashboard,
  Users,
  User,
  Grid2x2,
  LogOut,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdicioProdu() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    preco: "",
    descricao: ""
  });

  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    const file = e.target.files[0];
    setImagem(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("nome", form.nome);
    data.append("categoria", form.categoria);
    data.append("preco", form.preco);
    data.append("descricao", form.descricao);
    data.append("imagem", imagem);

    try {
      await axios.post("http://localhost:3001/produto", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Produto cadastrado com sucesso!");
      navigate("/funPro");

    } catch (err) {
      alert("Erro ao cadastrar produto.");
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

          <h2>Novo Produto</h2>

          <form className="form-func" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Nome do Produto</label>
              <input 
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <select 
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="maquiagem">Maquiagem</option>
                <option value="cabelo">Cabelo</option>
                <option value="rosto">Rosto</option>
                <option value="perfumes">Perfumes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Preço</label>
              <input 
                type="number"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Imagem</label>
              <input 
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {preview && (
              <img 
                src={preview}
                alt="Preview"
                style={{ width: "140px", borderRadius: "8px", marginTop: "10px" }}
              />
            )}

            <button className="btn-submit" type="submit">
              Adicionar Produto
            </button>

          </form>
        </div>
      </main>

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
