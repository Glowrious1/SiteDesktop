import { ShoppingCart, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import produtos from "../../../data/produtos.js";
import "./Home.css";


export default function Home() {
  const navigate = useNavigate();

// ---- FILTRAR APENAS PRODUTOS QUE DEVEM APARECER NA HOME ----
const produtosHome = produtos
  .filter((p) => p.home === true) // só os que têm home:true
  .slice(0, 6); // pega apenas os 6 primeiros


    const irParaProduto = () => {
      navigate("/produto");
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
              <Link to="/produtos" >PRODUTOS</Link>
            </li>
            <li>
              <Link to="/duvidas">DÚVIDAS</Link>  </li>
          </ul>
        </nav>

        <div className="icons">
          <Link to="/favoritos">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <ShoppingCart size={22} strokeWidth={1.5} />
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
            Fórmulas de alto performance, perfeitas para potencializar seus
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
              <Avaliacao rating={item.avaliacao} />
              <p>R$ {item.preco}</p>
              <button>Adicionar à bolsa</button>
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
                      Garantir o produto oferece ao cliente a tranquilidade de saber que,
                      caso haja algum tipo de problema, ele terá suporte ou substituição
                      sem custos adicionais.
                    </p>
                  </div>
                </li>

                <li>
                  <span className="numero">2</span>
                  <div>
                    <strong>Economia a Longo Prazo</strong>
                    <p>
                      Com a garantia, o cliente evita gastos futuros com manutenção ou
                      troca do produto, o que representa um bom custo-benefício.
                    </p>
                  </div>
                </li>

                <li>
                  <span className="numero">3</span>
                  <div>
                    <strong>Valorização do Investimento</strong>
                    <p>
                      Um produto garantido e de qualidade se mantém valorizado e
                      confiável, o que demonstra que o cliente aposta em um investimento
                      sólido e duradouro.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SEÇÃO EXTRA */}
      <section className="extra">
        <div className="bloco">
          <img src="/image6.png" alt="extra" />
          <p>
         Cuidar da sua pele é um ritual de amor-próprio.
         Nossas fórmulas exclusivas foram criadas por especialistas para oferecer resultados visíveis, com eficácia e segurança.
         Beleza que nasce do cuidado diário.
          </p>
        </div>
   
        <div className="bloco reverse">
          <img src="/image7.png" alt="extra" />
          <p>
            Ingredientes de alta performance que realçam o que há de melhor em você.
            Texturas leves, sensoriais e desenvolvidas para potencializar sua rotina de beleza.
            Sinta-se confiante em cada detalhe.
          </p>
        </div>

        <div className="bloco">
          <img src="/image8.png" alt="extra" />
          <p>A beleza está em compartilhar o bem-estar.
            Produtos pensados para todos os tipos de pele, com resultados de clínica no conforto da sua casa.
            Cuidar de si é um gesto que transforma.
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
