require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();

// Middlewares principais
app.use(express.json());
app.use(cors());

// Pasta de uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 📌 CONFIGURAÇÃO DO MULTER (upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"))
});
const upload = multer({ storage });

// 📌 Conexão com o Banco MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "2312",
    database: process.env.DB_NAME || "dbilumina",
});

// Porta do servidor
const port = 3001;


// ADICIONAR PRODUTO
app.post("/produto", upload.single("foto"), (req, res) => {
    const { nome, preco, descricao, categoria, qtd, genero, home } = req.body;

    const imagem = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes!" });
    }

    const sql = `
        INSERT INTO Produto 
        (NomeProd, ValorUnitario, Descricao, foto, codCategoria, qtd, Genero, home)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        nome,
        preco,
        descricao,
        imagem,
        categoria,
        qtd || 0,
        genero || null,
        home || 0
    ], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({ message: "Produto cadastrado!", id: result.insertId });
    });
});


app.get("/tipoProduto", (req, res) => {
    const sql = "SELECT * FROM Categoria";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});





/* ===============================================================================================
    ROTAS DE PRODUTO
================================================================================================ */

// LISTAR TODOS OS PRODUTOS  (API geral)
app.get("/produto", (req, res) => {
    const sql = `
        SELECT 
            p.CodigoBarras AS id,
            p.NomeProd AS nome,
            p.ValorUnitario AS preco,
            p.foto AS imagem,
            p.Descricao AS descricao,
            p.qtd,
            p.Genero,
            c.Categoria AS categoria,
            p.home
        FROM Produto p
        LEFT JOIN Categoria c ON p.codCategoria = c.codCategoria
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


// LISTAR POR CATEGORIA  (ex: /produto/cabelo)
app.get("/produto/:categoria", (req, res) => {
    const categoria = req.params.categoria;

    const sql = `
        SELECT 
            p.CodigoBarras AS id,
            p.NomeProd AS nome,
            p.ValorUnitario AS preco,
            p.foto AS imagem,
            p.Descricao AS descricao,
            p.qtd,
            p.Genero,
            c.Categoria AS categoria,
            p.home
        FROM Produto p
        LEFT JOIN Categoria c ON p.codCategoria = c.codCategoria
        WHERE c.Categoria = ?
    `;

    db.query(sql, [categoria], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


// 🔥 MANTIVE sua rota antiga /produtos para não quebrar nada!
app.get("/produtos", (req, res) => {
    const sql = `
        SELECT 
            p.CodigoBarras AS id,
            p.NomeProd AS nome,
            p.ValorUnitario AS preco,
            p.foto AS imagem,
            p.Descricao AS descricao,
            p.qtd,
            p.Genero,
            c.Categoria AS categoria,
            p.home
        FROM Produto p
        LEFT JOIN Categoria c ON p.codCategoria = c.codCategoria
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


// PRODUTOS DA HOME
app.get("/home", (req, res) => {
    const sql = "SELECT * FROM Produto WHERE Home = 1";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar produtos da Home", err });
        res.json(result);
    });
});




/* ===============================================================================================
    CARRINHO
================================================================================================ */

// LISTAR CARRINHO POR USUÁRIO
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

// AUMENTAR QTD
app.put("/carrinho/add/:id", (req, res) => {
    const q = `
        UPDATE Carrinho
        SET Qtd = Qtd + 1,
            ValorTotal = (Qtd + 1) * ValorUnitario
        WHERE IdCarrinho = ?;
    `;

    db.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json("Quantidade aumentada");
    });
});

// DIMINUIR QTD
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

// REMOVER ITEM
app.delete("/carrinho/:id", (req, res) => {
    const q = `DELETE FROM Carrinho WHERE IdCarrinho = ?`;

    db.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json("Item removido");
    });
});

// ADICIONAR ITEM AO CARRINHO
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
        if (err) return res.status(500).json(err);

        const insertedId = result.insertId;
        const qGet = `
            SELECT c.IdCarrinho, c.IdProd, c.Qtd, c.ValorUnitario, c.ValorTotal, 
                   p.NomeProd as nome, p.foto as imagem
            FROM Carrinho c
            LEFT JOIN Produto p ON p.CodigoBarras = c.IdProd
            WHERE c.IdCarrinho = ?
        `;

        db.query(qGet, [insertedId], (err2, rows) => {
            if (err2) return res.status(201).json({ message: 'Item adicionado!', id: insertedId });

            res.status(201).json({ message: 'Item adicionado!', item: rows[0] });
        });
    });
});






/* ===============================================================================================
    LOGIN
================================================================================================ */
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ auth: false, message: "Email e senha são obrigatórios" });
    }

    const sql = "SELECT * FROM Usuario WHERE Email = ? AND Senha = ? AND Ativo = 1";

    db.query(sql, [email.trim(), senha.trim()], (err, result) => {
        if (err) return res.status(500).json({ auth: false, message: "Erro no servidor" });

        if (!result.length) {
            return res.json({ auth: false, message: "Email ou senha incorretos!" });
        }

        const usuario = result[0];

        res.json({
            auth: true,
            id: usuario.IdUser,
            nome: usuario.Nome,
            role: usuario.Role
        });
    });
});






/* ===============================================================================================
    FUNCIONÁRIO
================================================================================================ */

app.post("/Funcionario", (req, res) => {
    const { Nome, Email, Senha } = req.body;

    if (!Nome || !Email || !Senha)
        return res.status(400).json({ error: "Preencha todos os campos." });

    const sql = "INSERT INTO Funcionario (Nome, Email, Senha) VALUES (?, ?, ?)";

    db.query(sql, [Nome, Email, Senha], (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao adicionar funcionário." });

        res.status(201).json({ message: "Funcionário cadastrado!", id: result.insertId });
    });
});

app.get("/Funcionario", (req, res) => {
    db.query("SELECT * FROM Funcionario", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.get("/Funcionario/:id", (req, res) => {
    const sql = "SELECT * FROM Funcionario WHERE IdFun = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (!result.length)
            return res.status(404).json({ message: "Funcionário não encontrado" });

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

app.delete("/Funcionario/:id", (req, res) => {
    const sql = "DELETE FROM Funcionario WHERE IdFun = ?";

    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Funcionário excluído!" });
    });
});






/* ===============================================================================================
    CLIENTE
================================================================================================ */

app.get("/Cliente", (req, res) => {
    db.query("SELECT * FROM Cliente", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.get("/Cliente/:id", (req, res) => {
    const sql = "SELECT * FROM Cliente WHERE IdClient = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
});

app.post("/Cliente", (req, res) => {
    const { Nome, Email, CPF, Senha, CepCli } = req.body;

    if (!Nome || !Email || !CPF)
        return res.status(400).json({ error: "Preencha os campos obrigatórios." });

    const sql = `
        INSERT INTO Cliente (Nome, Email, CPF, Senha, CepCli)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [Nome, Email, CPF, Senha, CepCli], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cliente adicionado!" });
    });
});

app.put("/Cliente/:id", (req, res) => {
    const sql = `
        UPDATE Cliente
        SET Nome=?, Email=?, CPF=?, Senha=?, CepCli=?
        WHERE IdClient=?
    `;

    const { Nome, Email, CPF, Senha, CepCli } = req.body;

    db.query(sql, [Nome, Email, CPF, Senha, CepCli, req.params.id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Cliente atualizado!" });
    });
});

app.delete("/Cliente/:id", (req, res) => {
    db.query("DELETE FROM Cliente WHERE IdClient=?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cliente deletado!" });
    });
});


const PDFDocument = require('pdfkit');
const fs = require('fs'); // opcional

// ROTA: criar pagamento
app.post('/pagamento', (req, res) => {
  const { pedidoId = null, userId = null, metodo, valor, detalhe = null } = req.body;
  if (!metodo || !valor) return res.status(400).json({ error: 'Dados incompletos' });

  const sql = `INSERT INTO Pagamentos (pedidoId, userId, metodo, valor, detalhe, status) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [pedidoId, userId, metodo, valor, JSON.stringify(detalhe), 'pendente'], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: 'Pagamento registrado', id: result.insertId });
  });
});

// ROTA: confirmar pagamento (simulação)
app.put('/pagamento/:id/confirmar', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE Pagamentos SET status='aprovado' WHERE id=?`;
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: 'Pagamento confirmado' });
  });
});

// ROTA: gerar nota PDF e enviar (stream)
app.get('/nota/:id', (req, res) => {
  const id = req.params.id;
  const q = `SELECT * FROM Pagamentos WHERE id = ?`;

  db.query(q, [id], (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows || rows.length === 0) return res.status(404).json({ error: 'Pagamento não encontrado' });

    const pagamento = rows[0];

    // Gera PDF com pdfkit
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    res.setHeader('Content-disposition', `attachment; filename=nota_${id}.pdf`);
    res.setHeader('Content-type', 'application/pdf');

    // Pipe PDF direto para resposta
    doc.pipe(res);

    // Layout estilizado (você pode ajustar fontes/imagens)
    doc
      .fontSize(20)
      .fillColor('#3b2b27')
      .text('LUSTRIOUS SKINCARE', { align: 'left' })
      .moveDown(0.5);

    doc.fontSize(12).fillColor('#6d4f45')
      .text(`Nota Fiscal - Pedido #${pagamento.pedidoId || 'N/D'}`, { align: 'left' })
      .moveDown(0.5);

    doc.fontSize(10).fillColor('#444')
      .text(`ID Pagamento: ${pagamento.id}`)
      .text(`Método: ${pagamento.metodo}`)
      .text(`Valor: R$ ${Number(pagamento.valor).toFixed(2)}`)
      .text(`Status: ${pagamento.status}`)
      .moveDown(0.6);

    doc.text('Detalhes:', { underline: true });
    try {
      const detalhe = JSON.parse(pagamento.detalhe || '{}');
      doc.fontSize(10).text(JSON.stringify(detalhe, null, 2));
    } catch (e) {
      doc.fontSize(10).text(String(pagamento.detalhe || '—'));
    }

    doc.moveDown(1.2);
    doc.fontSize(11).text('Obrigado pela sua compra!', { align: 'center' });

    // finalize
    doc.end();
  });
});






/* ===============================================================================================
    INICIAR SERVIDOR
================================================================================================ */

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
