import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    celular: "",
    cpf: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", form);
    // Aqui você pode enviar os dados para o backend futuramente
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome completo</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <label>Celular</label>
          <input
            type="text"
            name="celular"
            placeholder="(XX) XXXXX-XXXX"
            value={form.celular}
            onChange={handleChange}
          />

          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            placeholder="XXX.XXX.XXX-XX"
            value={form.cpf}
            onChange={handleChange}
          />

          <div className="cadastro-buttons">
            <button
              type="button"
              className="voltar"
              onClick={() => navigate("/login")}
            >
              Voltar
            </button>
            <button type="submit" className="cadastrar">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
