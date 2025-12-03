import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, CheckCircle, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import "./pagamento.css";

export default function Pagamento({ precoTotal = 94.00 }) {

  const [etapa, setEtapa] = useState('selecao');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [copiado, setCopiado] = useState(false);

  const chavePix = "11975345659";
  const codigoCopiaECola =
    "pix.copy.e.cola." + chavePix + ".R$" + precoTotal.toFixed(2);

  const navigate = useNavigate();

  const handleSelecionarPagamento = (metodo) => {
    setFormaPagamento(metodo);
  };

  const handleConfirmarPagamento = () => {
    if (!formaPagamento) return;

    if (formaPagamento === "pix") {
      setEtapa("pix_aguardando");
    } else if (formaPagamento === "debito") {
      if (cartao.nome === "") {
        setShowModalCartao(true);
        return;
      }
      setEtapa("debito_processando");
      setTimeout(() => setEtapa("concluido"), 3000);
    }
  };

  const handleCopiarPix = () => {
    navigator.clipboard.writeText(codigoCopiaECola);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // ========== ESTADOS DO MODAL DO CARTÃO ==========
  const [showModalCartao, setShowModalCartao] = useState(false);

  const [cartao, setCartao] = useState({
    nome: "",
    numero: "",
    validade: "",
    cvv: "",
  });






  // ============================================================
  //         RENDER DOS PASSOS
  // ============================================================

  const renderizarTela = () => {
    switch (etapa) {

      case "selecao":
        return (
          <div className="cartao fade-in">
            <h2 className="titulo-secao">Escolha o Método de Pagamento</h2>

            {/* PIX */}
            <label
              className={`opcao ${formaPagamento === "pix" ? "ativa" : ""}`}
              onClick={() => handleSelecionarPagamento("pix")}
            >
              <input type="radio" readOnly checked={formaPagamento === "pix"} />
              <div className="icone-metodo">💰</div>
              <div>
                <h3>PIX</h3>
                <p>Pagamento instantâneo</p>
              </div>
            </label>

            {/* DEBITO */}
            <label
              className={`opcao ${formaPagamento === "debito" ? "ativa" : ""}`}
              onClick={() => handleSelecionarPagamento("debito")}
            >
              <input type="radio" readOnly checked={formaPagamento === "debito"} />
              <div className="icone-metodo">💳</div>
              <div>
                <h3>Cartão de Débito</h3>
                <p>Confirmação imediata</p>
              </div>
            </label>

            {/* BOTÃO PARA CADASTRAR CARTÃO */}
            {formaPagamento === "debito" && (
              <button
                className="btn-cadastrar-cartao"
                onClick={() => setShowModalCartao(true)}
              >
                {cartao.nome ? "Editar Cartão" : "Cadastrar Cartão"}
              </button>
            )}

            {cartao.nome && formaPagamento === "debito" && (
              <div className="cartao-salvo">
                <p><strong>Cartão:</strong> {cartao.nome}</p>
                <p>•••• •••• •••• {cartao.numero.slice(-4)}</p>
              </div>
            )}

            <button
              disabled={!formaPagamento}
              className="botao-confirmar"
              onClick={handleConfirmarPagamento}
            >
              Pagar R$ {precoTotal.toFixed(2).replace(".", ",")}
            </button>

            <button className="botao-voltar" onClick={() => navigate("/carrinho")}>
              ← Voltar ao Carrinho
            </button>
          </div>
        );

      case "pix_aguardando":
        return (
          <div className="cartao fade-in">
            <h2>Pagamento via PIX</h2>
            <p>Aguardando pagamento de <strong>R$ {precoTotal.toFixed(2)}</strong></p>

            <div className="pix-box">
              <p>Chave PIX:</p>
              <div className="pix-chave">{chavePix}</div>
            </div>

            <div className="qr-area">
              <QRCodeSVG value={codigoCopiaECola} size={190} />
            </div>

            <p>PIX Copia e Cola:</p>
            <div className="copia-area">
              <span>{codigoCopiaECola.substring(0, 30)}...</span>
              <button className="copiar-btn" onClick={handleCopiarPix}>
                <Copy size={16} /> {copiado ? "Copiado!" : "Copiar"}
              </button>
            </div>

            <button className="botao-voltar" onClick={() => setEtapa("selecao")}>
              Mudar forma de pagamento
            </button>
          </div>
        );

      case "debito_processando":
        return (
          <div className="cartao fade-in-loading">
            <h2>Processando Pagamento...</h2>
            <div className="spinner"></div>
            <p>Aguarde um instante.</p>
          </div>
        );

      case "concluido":
        return (
          <div className="cartao fade-in">
            <CheckCircle size={70} className="icon-sucesso" />
            <h2 className="sucesso">Pagamento Aprovado!</h2>
            <p>Total Pago: <strong>R$ {precoTotal.toFixed(2)}</strong></p>

            <Link
  to="/nota"
  state={{
    id: "NF-" + Math.floor(Math.random() * 90000 + 10000),
    total: precoTotal,
    data: new Date().toLocaleDateString("pt-BR"),
    pagamento: formaPagamento,
  }}
>
  <button className="botao-confirmar">
    Ver Nota Fiscal
  </button>
</Link>


            <Link to="/">
              <button className="botao-voltar">
                Continuar Comprando
              </button>
            </Link>
          </div>
        );
    }
  };


  // ============================================================
  //                        RETORNO FINAL
  // ============================================================

  return (
    <div className="pagina-pagamento">

      {/* HEADER */}
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
          <Link to="/favoritos"><Heart size={22} /></Link>
          <Link to="/carrinho"><ShoppingCart size={22} /></Link>
          <Link to="/login"><User size={22} /></Link>
        </div>
      </header>

      <main className="main">{renderizarTela()}</main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="lado-esquerdo">
            <p>(55) 11 14323-2342</p>
            <p>LUSTRIOUS@GMAIL.COM</p>
          </div>

          <div className="footer-icons">
            <a href="https://www.instagram.com/lustriousskincare/"><img src="/instagram.png" /></a>
            <a href="#"><img src="/linkedin.png" /></a>
            <a href="#"><img src="/whatsapp.png" /></a>
          </div>
        </div>

        <div className="direitos-autorais">
          <p>&copy;DIREITOS AUTORAIS 2025</p>
        </div>
      </footer>

      {/* ================= MODAL DO CARTÃO ================= */}
      {showModalCartao && (
        <div className="modal-overlay" onClick={() => setShowModalCartao(false)}>
          <div className="modal-cartao" onClick={(e) => e.stopPropagation()}>
            <h2>Cadastrar Cartão</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowModalCartao(false);
              }}
            >

              <label>Nome do titular</label>
              <input
                type="text"
                required
                value={cartao.nome}
                onChange={(e) =>
                  setCartao({ ...cartao, nome: e.target.value })
                }
              />

              <label>Número do cartão</label>
              <input
                type="text"
                maxLength="19"
                required
                placeholder="0000 0000 0000 0000"
                value={cartao.numero}
                onChange={(e) =>
                  setCartao({ ...cartao, numero: e.target.value })
                }
              />

              <div className="linha">
                <div>
                  <label>Validade</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    maxLength="5"
                    required
                    value={cartao.validade}
                    onChange={(e) =>
                      setCartao({ ...cartao, validade: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>CVV</label>
                  <input
                    type="password"
                    maxLength="3"
                    required
                    value={cartao.cvv}
                    onChange={(e) =>
                      setCartao({ ...cartao, cvv: e.target.value })
                    }
                  />
                </div>
              </div>

              <button className="btn-salvar-cartao" type="submit">
                Salvar Cartão
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
