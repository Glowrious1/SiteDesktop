import { ShoppingCart, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Carrinho.css";

export default function Carrinho() {

  const navigate = useNavigate();
  const userId = 1;
  const [itens, setItens] = useState([]);

  useEffect(() => {
    atualizarCarrinho();
    function onCartUpdated() {
      atualizarCarrinho();
      // optional: could append item from event detail for instant update
    }

    window.addEventListener('cart-updated', onCartUpdated);
    return () => window.removeEventListener('cart-updated', onCartUpdated);
  }, []);

  const atualizarCarrinho = () => {
    fetch(`http://localhost:3001/carrinho/${userId}`)
      .then((res) => res.json())
      .then((data) => setItens(data));
  };

  const aumentar = (idCarrinho) => {
    fetch(`http://localhost:3001/carrinho/add/${idCarrinho}`, { method: "PUT" })
      .then(() => atualizarCarrinho());
  };

  const diminuir = (idCarrinho) => {
    fetch(`http://localhost:3001/carrinho/remove/${idCarrinho}`, { method: "PUT" })
      .then(() => atualizarCarrinho());
  };

  const remover = (idCarrinho) => {
    fetch(`http://localhost:3001/carrinho/${idCarrinho}`, { method: "DELETE" })
      .then(() => atualizarCarrinho());
  };

  const total = itens.reduce(
    (acum, item) => acum + Number(item.ValorTotal),
    0
  );

// dentro do componente (já com useNavigate e outras coisas)
const adicionarAoCarrinho = async (produto) => {
  try {
    // opcional: bloquear múltiplos cliques se quiser (implementar estado se necessário)
    const resp = await fetch("http://localhost:3001/carrinho/addItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        IdUser: 1,               // substitua pelo id do usuário logado
        IdProd: produto.id,
        Qtd: 1,
        ValorUnitario: Number(String(produto.preco).replace(',', '.'))
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.error("Erro ao adicionar:", err);
      return;
    }

    // opcional: mostrar uma notificação aqui
    navigate("/carrinho"); // envia para a página do carrinho/sacola
  } catch (error) {
    console.error("Falha ao adicionar ao carrinho:", error);
  }
};


  return (
    <>

      {/* HEADER (FORA DO FLEX!) */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        <nav>
          <ul className="menu">
            <li><Link to="/">INÍCIO</Link></li>
            <li><Link to="/produtos">PRODUTOS</Link></li>
            <li><Link to="/duvidas">DÚVIDAS</Link></li>
          </ul>
        </nav>

        <div className="icons">
          <Link to="/favoritos"><Heart size={22} strokeWidth={1.5} /></Link>
          <Link to="/carrinho"><ShoppingCart size={22} strokeWidth={1.5} /></Link>
          <Link to="/login"><User size={22} strokeWidth={1.5} /></Link>
        </div>
      </header>

      {/* AGORA SIM: O CONTAINER FLEX */}
      <div className="carrinho-container">

        {/* LISTA DE ITENS */}
        <div className="itens-carrinho">
          <h2 className="titulo-sacola">Minha sacola</h2>

          {itens.map((item) => (
            <div key={item.IdCarrinho} className="item">
              <img src={item.imagem} alt={item.nome} />

              <div className="info">
                <h3>{item.nome}</h3>

                <div className="controle">
                  <button onClick={() => diminuir(item.IdCarrinho)}>-</button>
                  <span>{item.Qtd}</span>
                  <button onClick={() => aumentar(item.IdCarrinho)}>+</button>
                </div>
              </div>

              <p className="preco">R$ {Number(item.ValorUnitario).toFixed(2)}</p>
              <button className="remove" onClick={() => remover(item.IdCarrinho)}>X</button>
            </div>
          ))}

          <button className="voltar" onClick={() => navigate(-1)}>← voltar</button>
        </div>

        {/* FINALIZAR */}
        <div className="finalizar">
          <h3>Finalizar compra</h3>

          <p>Itens: {itens.length}</p>

          <label>Endereço</label>
          <input placeholder="Rua..." />

          <label>CEP</label>
          <input placeholder="00000-000" />

          <label>Complemento</label>
          <input placeholder="Apartamento..." />

          <label>Código de desconto</label>
          <input placeholder="BRU190" />

          <h4 className="total">
            Preço total: <span>R$ {total.toFixed(2)}</span>
          </h4>

          <button className="confirmar">Confirmar</button>
        </div>

      </div>

      {/* FOOTER (FORA DO FLEX TAMBÉM!) */}
      <footer className="footer">
        <div className="footer-container">
          <div className="lado-esquerdo">
            <p>(55) 11 14323-2342</p>
            <p>LUSTRIOUS@GMAIL.COM</p>
          </div>

          <div className="footer-icons">
            <a href="#"><img src="/instagram.png" alt="Instagram" /></a>
            <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a>
            <a href="#"><img src="/whatsapp.png" alt="WhatsApp" /></a>
          </div>
        </div>

        <div className="direitos-autorais">
          <p>&copy;DIREITOS AUTORAIS 2025</p>
        </div>
      </footer>

    </>
  );
}
