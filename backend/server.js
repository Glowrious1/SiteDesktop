// Declarando as dependencias que serão utilizadas no projeto
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

// App recebe a função do express para realizar as operações
const app = express()

//Declanrando o banco de dados
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "dbilumina",
    insecureAuth: true
});
//Usando o  express para converte os dados em JSON
app.use(express.json()); // converte todo hmtl em  json
// Usando o cors
app.use(cors());
//declarando  a porta do servidor
const port = 3001;

//Tabela de precos por tipo de transporte

const precos ={
    bicicleta:0.80,
    carro:0.90,
    drone:1.00
}

//rota para calcular  o frete
app.post("/calcularfrete",(req,res)=>{
    //declarando as variaveis que serão utilizadas na requisição
    const {distancia,tipoTransporte}= req.body;

    if(distancia === undefined || tipoTransporte === undefined){
        return res.status(400).json({error:'Distancia e tipo de transporte obrigatorios'});
    }
    
    const precoPorKm = precos [tipoTransporte.toLowerCase()];//convert  o que o usuario digitar para minuscula

    if(precoPorKm ===undefined){
          return res.status(400).json({error:'Distancia e tipo de transporte inválido'});
    }
    const valorTotal = distancia * precoPorKm;
    res.json({valorTotal:valorTotal.toFixed(2)})// retorna o valor com 2 casas decimais
});

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


// executando o servidor
app.listen(port,()=>{
    console.log(`Servidor Rodando na Porta:${port}`)
});

//mano bugo legal

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const sql = `
        SELECT * FROM Usuario 
        WHERE Email = ? AND Senha = ? AND Ativo = '1'
    `;

    db.query(sql, [email, senha], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) {
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
