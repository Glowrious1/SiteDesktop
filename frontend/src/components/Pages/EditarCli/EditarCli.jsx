import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

export default function EditarCli() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    senha: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/Cliente/${id}`)
      .then((res) => {
        if (res.data) {
          setForm({
            nome: res.data.Nome,
            email: res.data.Email,
            cpf: res.data.CPF,
            cep: res.data.CepCli,
            senha: res.data.Senha
          });
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar cliente:", err);
        alert("Erro ao carregar cliente.");
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/Cliente/${id}`, {
        Nome: form.nome,
        Email: form.email,
        CPF: form.cpf,
        CepCli: form.cep,
        Senha: form.senha
      });

      alert("Cliente atualizado com sucesso!");
      navigate("/Cliente");
    } catch (err) {
      alert("Erro ao atualizar cliente.");
      console.error(err);
    }
  }

  return (
    <div className="layout">

      <main className="home-content">
        <div className="form-func-box">

          <button className="btn-voltar-func" onClick={() => navigate("/Cliente")}>
            <ArrowLeft size={18} />
            Voltar
          </button>

          <h2>Editar Cliente</h2>

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
              Atualizar Cliente
            </button>
          </form>

        </div>
      </main>

    </div>
  );
}
