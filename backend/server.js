// Declarando as dependencias que serão utilizadas no projeto
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const produtos = require('./produtos');

// App recebe a função do express para realizar as operações
const app = express()

//Declanrando o banco de dados (usa variáveis de ambiente quando disponíveis)
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_NAME || "dbilumina",
});
//Usando o  express para converte os dados em JSON
app.use(express.json()); // converte todo hmtl em  json

// Usando o cors
app.use(cors());
//declarando  a porta do servidor
const port = 3001;

// Endpoints para produtos: preferencialmente via banco, com fallback para dados estáticos
app.get('/produtos', (req, res) => {
    const q = `
        SELECT p.CodigoBarras as id,
               p.NomeProd as nome,
               p.ValorUnitario as preco,
               p.foto as imagem,
               p.Descricao as descricao,
               c.Categoria as categoria
        FROM Produto p
        LEFT JOIN Categoria c ON p.codCategoria = c.codCategoria
    `;

    db.query(q, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos no DB:', err);
            if (Array.isArray(produtos) && produtos.length > 0) {
                return res.json(produtos);
            }
            return res.status(500).json({ error: 'Erro ao buscar produtos' });
        }

        const mapped = results.map((r) => ({
            id: r.id,
            nome: r.nome,
            preco: (r.preco === null || r.preco === undefined) ? null : (typeof r.preco === 'number' ? r.preco.toFixed(2).replace('.', ',') : String(r.preco)),
            imagem: r.imagem || '/placeholder.png',
            avaliacao: r.avaliacao || 0,
            categoria: r.categoria || null,
            descricao: r.descricao || ''
        }));

        res.json(mapped);
    });
});

app.get('/produto/:id', (req, res) => {
    const id = req.params.id;
    const q = `
        SELECT p.CodigoBarras as id,
               p.NomeProd as nome,
               p.ValorUnitario as preco,
               p.foto as imagem,
               p.Descricao as descricao,
               c.Categoria as categoria
        FROM Produto p
        LEFT JOIN Categoria c ON p.codCategoria = c.codCategoria
        WHERE p.CodigoBarras = ?
    `;

    db.query(q, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar produto no DB:', err);
            if (Array.isArray(produtos) && produtos.length > 0) {
                const prod = produtos.find((p) => String(p.id) === String(id));
                if (prod) return res.json(prod);
            }
            return res.status(500).json({ error: 'Erro ao buscar produto' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const r = results[0];
        const mapped = {
            id: r.id,
            nome: r.nome,
            preco: (r.preco === null || r.preco === undefined) ? null : (typeof r.preco === 'number' ? r.preco.toFixed(2).replace('.', ',') : String(r.preco)),
            imagem: r.imagem || '/placeholder.png',
            avaliacao: r.avaliacao || 0,
            categoria: r.categoria || null,
            descricao: r.descricao || ''
        };

        return res.json(mapped);
    });
});

// CARRINHO 

app.get("/carrinho/:idUser", (req, res) => {
    const q = `
        SELECT 
            c.IdCarrinho,
            c.IdProd,
            c.Qtd,
            c.ValorUnitario,
            c.ValorTotal,
            p.NomeProd as nome,
            p.foto as imagem
        FROM Carrinho c
        LEFT JOIN Produto p ON p.CodigoBarras = c.IdProd
        WHERE c.IdUser = ?;
    `;

    db.query(q, [req.params.idUser], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

// CARRINHO - AUMENTAR, DIMINUIR, REMOVER

app.put("/carrinho/add/:id", (req, res) => {
    const q = `
        UPDATE Carrinho
        SET 
            Qtd = Qtd + 1,
            ValorTotal = (Qtd + 1) * ValorUnitario
        WHERE IdCarrinho = ?;
    `;

    db.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json("Quantidade aumentada");
    });
});


app.put("/carrinho/remove/:id", (req, res) => {
    const q = `
        UPDATE Carrinho
        SET 
            Qtd = GREATEST(Qtd - 1, 1),
            ValorTotal = GREATEST(Qtd - 1, 1) * ValorUnitario
        WHERE IdCarrinho = ?;
    `;

    db.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json("Quantidade diminuída");
    });
});


app.delete("/carrinho/:id", (req, res) => {
    const q = `DELETE FROM Carrinho WHERE IdCarrinho = ?`;

    db.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json("Item removido");
    });
});




// CARRINHO ADICIONAR
app.post("/carrinho/addItem", (req, res) => {
    const { IdUser, IdProd, Qtd, ValorUnitario } = req.body;

    if (!IdUser || !IdProd || !Qtd || !ValorUnitario) {
        return res.status(400).json({ error: "Dados incompletos" });
    }

    const ValorTotal = Qtd * ValorUnitario;

    const sql = `
        INSERT INTO Carrinho (IdUser, IdProd, Qtd, ValorUnitario, ValorTotal)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [IdUser, IdProd, Qtd, ValorUnitario, ValorTotal], (err, result) => {
        if (err) {
            console.log("Erro SQL:", err);
            return res.status(500).json(err);
        }
        // Buscar o registro inserido e retornar ao cliente
        const insertedId = result.insertId;
        const qGet = `
            SELECT c.IdCarrinho, c.IdProd, c.Qtd, c.ValorUnitario, c.ValorTotal, p.NomeProd as nome, p.foto as imagem
            FROM Carrinho c
            LEFT JOIN Produto p ON p.CodigoBarras = c.IdProd
            WHERE c.IdCarrinho = ?
        `;

        db.query(qGet, [insertedId], (err2, rows) => {
            if (err2) {
                console.error('Erro ao buscar item inserido:', err2);
                return res.status(201).json({ message: 'Item adicionado!', id: insertedId });
            }

            return res.status(201).json({ message: 'Item adicionado!', item: rows[0] || null });
        });
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

// ROTA PARA ADICIONAR FUNCIONÁRIO 
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




// ROTA PARA EDITAR FUNCIONÁRIO

// ROTA PARA BUSCAR UM FUNCIONÁRIO PELO 
app.get("/Funcionario/:id", (req, res) => {
    const sql = "SELECT * FROM Funcionario WHERE IdFun = ?";
    
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Funcionário não encontrado" });
        }

        res.json(result[0]);
    });
});


app.put("/Funcionario/:id", (req, res) => {
  const { Nome, Email, Senha } = req.body;

  const sql = "UPDATE Funcionario SET Nome=?, Email=?, Senha=? WHERE IdFun=?";
  db.query(sql, [Nome, Email, Senha, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Funcionário atualizado!" });
  });
});

// LISTAR TODOS
app.get("/Cliente", (req, res) => {
    const sql = "SELECT * FROM Cliente";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
});



// LISTAR UM
app.get("/Cliente/:id", (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM Cliente WHERE IdClient = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result[0]);
    });
});



// CRIAR
app.post("/Cliente", (req, res) => {
    const { Nome, Email, CPF, Senha, CepCli } = req.body;

    if (!Nome || !Email || !CPF) {
        return res.status(400).json({ error: "Preencha os campos obrigatórios." });
    }

    const sql = `
        INSERT INTO Cliente (Nome, Email, CPF, Senha, CepCli)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [Nome, Email, CPF, Senha, CepCli], (err, result) => {
        if (err) return res.status(500).json(err);

        return res.json({ message: "Cliente adicionado com sucesso!" });
    });
});



// EDITARapp.put("/Cliente/:id", (req, res) => {
app.put("/Cliente/:id", (req, res) => {
    const { id } = req.params;
    const { Nome, Email, CPF, Senha, CepCli } = req.body;

    const sql = `
        UPDATE Cliente
        SET Nome = ?, Email = ?, CPF = ?, Senha = ?, CepCli = ?
        WHERE IdClient = ?
    `;

    db.query(sql, [Nome, Email, CPF, Senha, CepCli, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cliente atualizado com sucesso!" });
    });
});



// DELETAR
app.delete("/Cliente/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM Cliente WHERE IdClient = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Cliente deletado com sucesso!" });
    });
});





// executando o servidor
app.listen(port,()=>{
    console.log(`Servidor Rodando na Porta:${port}`)
});
