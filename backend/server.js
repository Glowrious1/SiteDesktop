// Declarando as dependencias que serão utilizadas no projeto
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

// App recebe a função do express para realizar as operações
const app = express()

//Declanrando o banco de dados
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "dbilumina",
});
//Usando o  express para converte os dados em JSON
app.use(express.json()); // converte todo hmtl em  json

// Usando o cors
app.use(cors());
//declarando  a porta do servidor
const port = 3001;


app.get("/carrinho/:id", (req, res) => {
    const q = `SELECT * FROM Carrinho WHERE IdUser = ${req.params.id}`;
    //Pega a conexão
    db.getConnection((err, connection) => {
        //Verifica se tem algum erro
        if(err) {
            console.log("Erro na conexão:", err);
            return res.status(500).json({ error: "Erro de conexão com o banco de dados"});
        }
        
        connection.query(q, (err, resultado) => {
            connection.release();
            if (err) return res.json(err);
            return res.json(resultado);
        })
    });
});



//mano bugo legal

app.post("/login", (req, res) => {
    console.log("BODY RECEBIDO /login:", req.body);

    const { email, senha } = req.body;

    const teste = req.body;
    console.log("teste:", teste);
    console.log("Dados recebidos:", { email, senha });

    if (!email || !senha) {
        return res.status(400).json({ auth: false, message: "Email e senha são obrigatórios" });
    }

    const emailTrim = String(email).trim();
    const senhaTrim = String(senha).trim();

    const sql = "SELECT * FROM Usuario WHERE Email = ? AND Senha = ? AND Ativo = 1";

    db.query(sql, [emailTrim, senhaTrim], (err, result) => {
        if (err) {
            console.error("Erro na query /login:", err);
            return res.status(500).json({ auth: false, message: "Erro no servidor" });
        }

        if (!result || result.length === 0) {
            return res.json({ auth: false, message: "Email ou senha incorretos!" });
        }

        console.log("Resultado da query /login:", result);

        const usuario = result[0];

        return res.json({
            auth: true,
            id: usuario.IdUser,
            nome: usuario.Nome,
            role: usuario.Role
        });
    });
});

// ROTA PARA ADICIONAR FUNCIONÁRIO (SINGULAR)
app.post("/Funcionario", (req, res) => {
  const { Nome, Email, Senha } = req.body;

  if (!Nome || !Email || !Senha) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const sql = "INSERT INTO Funcionario (Nome, Email, Senha) VALUES (?, ?, ?)";

  db.query(sql, [Nome, Email, Senha], (err, result) => {
    if (err) {
      console.error("Erro ao inserir funcionário:", err);
      return res.status(500).json({ error: "Erro ao adicionar funcionário." });
    }

    return res.status(201).json({
      message: "Funcionário cadastrado com sucesso!",
      id: result.insertId
    });
  });
});

// ROTA PARA LISTAR FUNCIONÁRIOS
app.get("/Funcionario", (req, res) => {
  const sql = "SELECT * FROM Funcionario";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao buscar funcionários:", err);
      return res.status(500).json({ error: "Erro ao consultar funcionários." });
    }

    return res.json(result);
  });
});

// ROTA PARA EXCLUIR FUNCIONÁRIO
app.delete("/Funcionario/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Funcionario WHERE IdFun = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir funcionário:", err);
      return res.status(500).json({ error: "Erro ao excluir funcionário." });
    }

    return res.json({ message: "Funcionário excluído com sucesso!" });
  });
});



// executando o servidor
app.listen(port,()=>{
    console.log(`Servidor Rodando na Porta:${port}`)
});
