import { ShoppingCart, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import "./App.css";


export default function Home() {
  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src="src/public/logo.png" alt="Logo" />
        </div>

        <nav>
          <ul className="menu">
            <li>INÍCIO</li>
            <li>PRODUTOS</li>
            <li>DUVIDAS</li>
            <li>CONTATO</li>
            <li>REVIEWS</li>
          </ul>
        </nav>

        <div className="icons">
          <Link to="/favoritos">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <ShoppingCart size={22} strokeWidth={1.5} />
          <User size={22} strokeWidth={1.5} />
        </div>
      </header>

      {/* BANNER */}
      <div className="banner">
        <img src="src/public/banner1.png" alt="banner" />
      </div>

      {/* SOBRE */}
      <section className="sobre">
        <img src="src/public/image4.png" alt="produtos" />
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
        <h2>Preferidos em Skincare</h2>
        <div className="lista-produtos">
          <div className="card">
            <img src="src/public/blush.png" alt="produto" />
            <h3>Maquiagem sol (5g)</h3>
            <Avaliacao rating={2} />
            <p>R$ 120,00</p>
            <button>Adicione a bolsa</button>
          </div>
          <div className="card">
            <img src="src/public/blush.png" alt="produto" />
            <h3>Maquiagem sol (5g)</h3>
            <Avaliacao rating={2} />
            <p>R$ 120,00</p>
            <button>Adicione a bolsa</button>
          </div>
          <div className="card">
            <img src="src/public/blush.png" alt="produto" />
            <h3>Maquiagem sol (5g)</h3>
            <Avaliacao rating={2} />
            <p>R$ 120,00</p>
            <button>Adicione a bolsa</button>
          </div>
          <div className="card">
            <img src="src/public/blush.png" alt="produto" />
            <h3>Maquiagem sol (5g)</h3>
            <Avaliacao rating={2} />
            <p>R$ 120,00</p>
            <button>Adicione a bolsa</button>
          </div>
          <div className="card">
            <img src="src/public/blush.png" alt="produto" />
            <h3>Maquiagem sol (5g)</h3>
            <Avaliacao rating={2} />
            <p>R$ 120,00</p>
            <button>Adicione a bolsa</button>
          </div>
                   <div className="card">
            <img src="src/public/blush.png" alt="produto" />
            <h3>Maquiagem sol (5g)</h3>
            <Avaliacao rating={2} />
            <p>R$ 120,00</p>
            <button>Adicione a bolsa</button>
          </div>
          
        </div>
      </section>

      {/* VANTAGENS */}
        <section className="vantagens">
          <div className="vanta-container">
            <div className="vanta-img">
              <img src="src/public/image5.png" alt="vantagens" />
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
          <img src="src/public/image6.png" alt="extra" />
          <p>
            Nossos cosméticos foram desenvolvidos por especialistas para tratar
            sua pele com eficácia e segurança. Beleza com resultado de clínica.
          </p>
        </div>
        <div className="bloco">
          <img src="src/public/image7.png" alt="extra" />
          <p>
            Fórmulas de alta performance, perfeitas para potencializar seus
            cuidados diários.
          </p>
        </div>
        <div className="bloco">
          <img src="src/public/image8.png" alt="extra" />
          <p>Beleza com resultado de clínica, direto na sua casa.</p>
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
            <img src="src/public/instagram.png" alt="Instagram" />
          </a>
          <a href="#">
            <img src="src/public/linkedin.png" alt="LinkedIn" />
          </a>
          <a href="#">
            <img src="src/public/whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
      </div>

        <div className="direitos-autorais">
          <p>&copy;DIREITOS AUTORAIS</p>
        </div>
      </footer>
    </div>
  );
}
