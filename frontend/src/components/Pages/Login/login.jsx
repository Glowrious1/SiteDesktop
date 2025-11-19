import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

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
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const data = await response.json();

      if (!data.auth) {
        alert("Usuário ou senha incorretos!");
        return;
      }

      // 🔥 Redirecionamento por tipo de usuário
      if (data.role === "Admin" || data.role === "Funcionario") {
        navigate("/funhome");
      } else if (data.role === "Cliente") {
        navigate("/");
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao conectar ao servidor!");
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

        {/* 🔥 Agora o formulário usa handleLogin */}
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
            onClick={() => navigate("/cadastro")}
          >
            Cadastrar aqui
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
