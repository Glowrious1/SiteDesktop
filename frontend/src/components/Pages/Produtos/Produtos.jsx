import { ShoppingCart, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import "./Produtos.css"

export default function Produtos() {
  const navigate = useNavigate();
  const irParaProduto = () => navigate("/produto");

  return (
    <div className="pagina-produtos">
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
            <li>DUVIDAS</li>
            <li>CONTATO</li>
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
      <section className="banner-produtos">
        <img src="/image9.jpg" alt="Banner" />
      </section>

      {/* SEÇÃO INTRODUTÓRIA */}
      <section className="introducao-produtos">
        <h1>Produtos</h1>
        <p>
          Nossos produtos foram desenvolvidos com tecnologia de ponta e fórmulas exclusivas,
          criadas para transformar cada momento do seu autocuidado em uma verdadeira
          experiência de beleza.
        </p>

        <hr />

        <p>
          Texturas inovadoras, ativos potentes e resultados visíveis que se adaptam às
          necessidades reais da sua pele, garantindo eficácia sem abrir mão do prazer de cuidar
          de si. <br />
          Mais do que produtos, oferecemos uma rotina completa que une sofisticação, ciência e
          bem-estar, levando até você resultados dignos de clínica, direto no conforto da sua
          casa.
        </p>

        <h3>Escolha seu tratamento</h3>

        <div className="categorias">
          <div className="categoria">
            <img src="/image10.jpg" alt="Rosto" />
            <span>ROSTO</span>
          </div>
          <div className="categoria">
            <img src="/image11.jfif" alt="Cabelo" />
            <span>CABELO</span>
          </div>
          <div className="categoria">
            <img src="/perfumes.jpg" alt="Pele" />
            <span>PELE</span>
          </div>
          <div className="categoria">
            <img src="/image12.jpg" alt="Corpo" />
            <span>CORPO</span>
          </div>
        </div>
      </section>

  <section className="produtos">
         <h2>Preferidos em Skincare</h2>
          <div className="lista-produtos">
            <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={2} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>
  
            <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={2} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>
  
              <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={3} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>
  
             <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={5} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>
  
              <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={2} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>
  
             <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={2} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>

            <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={2} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>
            <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={2} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>
            <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
              <img src="/blush.png" alt="produto" />
              <h3>Maquiagem sol (5g)</h3>
              <Avaliacao rating={2} />
              <p>R$ 120,00</p>
              <button>Adicione a bolsa</button>
            </div>
            
          </div>
        </section>

      {/* OUTROS PRODUTOS */}
      <section className="outros-produtos">
        <div className="topo-outros">
          <h2>Outros Produtos</h2>
          <a href="#">VER MAIS</a>
        </div>

        <div className="lista-outros">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card-outro">
              <img src="/cremefacial.jpg" alt="Produto" />
              <h3>Creme Facial</h3>
              <Avaliacao rating={4} />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
         <footer className="footer3">
        <div className="footer-container3">
          <div className="lado-esquerdo23">
            <p>(55) 11 14323-2342</p>
            <p>LUSTRIOUS@GMAIL.COM</p>
          </div>

          <div className="footer-icons3">
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

        <div className="direitos-autorais3">
          <p>&copy; DIREITOS AUTORAIS 2025</p>
        </div>
      </footer>
    </div>
  );
}
