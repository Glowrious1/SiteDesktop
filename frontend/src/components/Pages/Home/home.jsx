import { ShoppingCart, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((res) => {
        setProdutos(res.data);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  // ---- FILTRAR PRODUTOS QUE APARECEM NA HOME ----
const produtosHome = produtos
  .filter((p) => p.home === 1 || p.home === true)
  .slice(0, 6);

  const irParaProduto = (id) => {
    navigate(`/produto/${id}`);
  };



  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        <nav>
          <ul className="menu">
            <li>
              <Link to="/">INÍCIO</Link>
            </li>
            <li>
              <Link to="/produtos">PRODUTOS</Link>
            </li>
            <li>
              <Link to="/duvidas">DÚVIDAS</Link>
            </li>
          </ul>
        </nav>

        <div className="icons">
          <Link to="/favoritos">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <Link to="/carrinho">
            <ShoppingCart size={22} strokeWidth={1.5} />
          </Link>
          <Link to="/login">
            <User size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* BANNER */}
      <div className="banner">
        <img src="/banner1.png" alt="banner" />
      </div>

      {/* SOBRE */}
      <section className="sobre">
        <img src="/image4.png" alt="produtos" />
        <div className="sobre-texto">
          <p>
            Fórmulas de alta performance, perfeitas para potencializar seus
            cuidados diários. <br />
            Beleza com resultado de clínica, direto na sua casa.
          </p>
          <button>Saiba-Mais</button>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="produtos">
        <h2>Alguns Produtos</h2>

        <div className="lista-produtos">
          {produtosHome.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() => irParaProduto(item.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.imagem} alt={item.nome} />
              <h3>{item.nome}</h3>

              {/* Avaliação nova */}
              <Avaliacao rating={item.rating} />

              <p>R$ {item.preco}</p>

              {/* Botão do carrinho atualizado */}
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  try {
                    const resp = await fetch(
                      "http://localhost:3001/carrinho/addItem",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          IdUser: 1,
                          IdProd: item.id,
                          Qtd: 1,
                          ValorUnitario: Number(
                            String(item.preco).replace(",", ".")
                          ),
                        }),
                      }
                    );

                    const data = await resp.json();

                    window.dispatchEvent(
                      new CustomEvent("cart-updated", {
                        detail: { item: data.item },
                      })
                    );

                    window.dispatchEvent(
                      new CustomEvent("show-toast", {
                        detail: {
                          message: "Produto adicionado ao carrinho",
                        },
                      })
                    );
                  } catch (err) {
                    console.error(err);
                    window.dispatchEvent(
                      new CustomEvent("show-toast", {
                        detail: {
                          message: "Erro ao adicionar ao carrinho",
                        },
                      })
                    );
                  }
                }}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* VANTAGENS */}
      <section className="vantagens">
        <div className="vanta-container">
          <div className="vanta-img">
            <img src="/image5.png" alt="vantagens" />
          </div>

          <div className="vanta-textos">
            <h2>
              VANTAGENS DE GARANTIR <br /> NOSSOS PRODUTOS
            </h2>

            <ul>
              <li>
                <span className="numero">1</span>
                <div>
                  <strong>Segurança e Confiança na Compra</strong>
                  <p>
                    Garantia oferece tranquilidade caso o produto apresente
                    algum problema.
                  </p>
                </div>
              </li>

              <li>
                <span className="numero">2</span>
                <div>
                  <strong>Economia a Longo Prazo</strong>
                  <p>
                    Evita gastos futuros com manutenção ou troca do produto.
                  </p>
                </div>
              </li>

              <li>
                <span className="numero">3</span>
                <div>
                  <strong>Valorização do Investimento</strong>
                  <p>
                    Um produto garantido demonstra qualidade e durabilidade.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* EXTRA */}
      <section className="extra">
        <div className="bloco">
          <img src="/image6.png" alt="extra" />
          <p>
            Cuidar da sua pele é um ritual de amor-próprio. Fórmulas exclusivas
            criadas por especialistas para resultados visíveis.
          </p>
        </div>

        <div className="bloco reverse">
          <img src="/image7.png" alt="extra" />
          <p>
            Ingredientes de alta performance que realçam sua beleza com
            naturalidade e eficiência.
          </p>
        </div>

        <div className="bloco">
          <img src="/image8.png" alt="extra" />
          <p>
            Produtos pensados para todos os tipos de pele, com resultados de
            clínica no conforto da sua casa.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="lado-esquerdo">
            <p>(55) 11 14323-2342</p>
            <p>LUSTRIOUS@GMAIL.COM</p>
          </div>

          <div className="footer-icons">
            <a href="https://www.instagram.com/lustriousskincare/">
              <img src="/instagram.png" alt="Instagram" />
            </a>
            <a href="#">
              <img src="/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="#">
              <img src="/whatsapp.png" alt="WhatsApp" />
            </a>
          </div>
        </div>

        <div className="direitos-autorais">
          <p>&copy;DIREITOS AUTORAIS 2025</p>
        </div>
      </footer>
    </div>
  );
}
