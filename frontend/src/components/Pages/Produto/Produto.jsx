import { Heart, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import "./Produto.css";

export default function Produto() {
  return (
    <div className="produto-pagina">
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
          <Link to="/login">
          <User size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="produto-container">
        <div className="produto-principal">
          <div className="produto-imagem">
            <img src="/blush.png" alt="Produto" />
          </div>
            
          <div className="produto-info">
            <h2>Creme facial para rosto que limpa e purifica</h2>
            <p className="preco">R$ 130,00</p>
            <Avaliacao rating={4} />
            <p className="estoque">(em até 3x sem juros)</p>

            <div className="quantidade-container">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="btn-adicionar">Adicionar a Sacola</button>
            <p className="categoria">Categoria: Skincare</p>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <section className="descricao">
          <h3>Descrição</h3>
          <p>
            Descubra o toque de cor ideal para realçar sua beleza natural. O
            Blush Cremoso Lustrous possui uma textura leve, macia e sedosa que
            desliza facilmente sobre a pele, proporcionando um acabamento
            luminoso e uniforme. Sua fórmula é fácil de espalhar e permite
            controlar a intensidade desejada — do look natural ao mais marcante.
          </p>
        </section>

        {/* OUTROS PRODUTOS */}
        <section className="outros-produtos">
          <h3>Outros Produtos</h3>
          <div className="lista-produtos2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card2" style={{ cursor: "pointer" }}>
                <img src="/blush.png" alt="produto" />
                <h3>Maquiagem sol (5g)</h3>
                <Avaliacao rating={4} />
                <p>R$ 120,00</p>
                <button>Adicione à bolsa</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer2">
        <div className="footer-container2">
          <div className="lado-esquerdo2">
            <p>(55) 11 14323-2342</p>
            <p>LUSTRIOUS@GMAIL.COM</p>
          </div>

          <div className="footer-icons2">
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

        <div className="direitos-autorais2">
          <p>&copy; DIREITOS AUTORAIS 2025</p>
        </div>
      </footer>
    </div>
  );
}
