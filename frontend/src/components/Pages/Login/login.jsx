import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        senha: senha
      });

      const data = response.data;

      if (!data.auth) {
        alert("Usuário ou senha incorretos!");
        return;
      }

      if (data.role === "Admin" || data.role === "Funcionario") {
        navigate("/FuncionarioHome");
      } else if (data.role === "Cliente") {
        navigate("/");
      }

    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/image13.jpg" alt="Login" />
        
        <button className="btn-voltar" onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>

      <div className="login-form">
        <h2 className="login-title">Login</h2>


        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="lembrar-senha">
            <input type="checkbox" id="lembrar" />
            <label htmlFor="lembrar">Me lembre a senha</label>
          </div>

          <button type="submit" className="btn-login">
            Logar
          </button>

          <button
            type="button"
            className="btn-cadastrar"
            onClick={() => navigate("/cadastro")}>
            Cadastrar aqui
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

git status
