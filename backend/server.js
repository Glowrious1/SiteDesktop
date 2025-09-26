// Declarando as dependencias que serão utilizadas no projeto
const express = require("express");
const cors = require("cors");

// App recebe a função do express para realizar as operações
const app = express()
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
})


// executando o servidor
app.listen(port,()=>{
    console.log(`Servidor Rodando na Porta:${port}`)
})