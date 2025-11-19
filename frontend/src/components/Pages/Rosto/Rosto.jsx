import { ShoppingCart, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import "./Rosto.css"


export default function Rosto() {
     const navigate = useNavigate();

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
            <li>DUVIDAS</li>
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
        <section className="banner-maquiagem">
        <img src="/banner2.png" alt="Banner" />
      </section>

     <section className="categorias-tudo">
             <div className="categorias">
          <div className="categoria" onClick={() => navigate("/rosto")}>
            <img src="/image10.jpg" alt="Rosto" />
            <span>ROSTO</span>
          </div>
          <div className="categoria">
            <img src="/image11.jfif" alt="Cabelo" />
            <span>CABELO</span>
          </div>
          <div className="categoria">
            <img src="/perfumes.jpg" alt="Pele" />
            <span>PERFUMES</span>
          </div>
          <div className="categoria">
            <img src="/image12.jpg" alt="Corpo" />
            <span>CORPO</span>
          </div>
        </div>
      </section>
       <section className="produtos">
               <h2>Produtos para o Rosto</h2>
                <div className="lista-produtos">
                  <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
                    <img src="/blush.png" alt="produto" />
                    <h3>Blush em pó (6g)</h3>
                    <Avaliacao rating={4} />
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
                    <img src="/gloss1.png" alt="produto" />
                    <h3>Gloss Rouge Royale – 6 ml</h3>
                    <Avaliacao rating={5} />
                    <p>R$ 120,00</p>
                    <button>Adicione a bolsa</button>
                  </div>
        
                    <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
                    <img src="/gloss2.png" alt="produto" />
                    <h3>Gloss Crystal Frost - 6ml</h3>
                    <Avaliacao rating={2} />
                    <p>R$ 120,00</p>
                    <button>Adicione a bolsa</button>
                  </div>
        
                   <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
                    <img src="/gloss3.png" alt="produto" />
                    <h3>Gloss Pink Velvet – 6 ml</h3>
                    <Avaliacao rating={2} />
                    <p>R$ 120,00</p>
                    <button>Adicione a bolsa</button>
                  </div>
      
                  <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
                    <img src="/gloss4.png" alt="produto" />
                    <h3>Gloss Bronze Amour - 6ml</h3>
                    <Avaliacao rating={2} />
                    <p>R$ 120,00</p>
                    <button>Adicione a bolsa</button>
                  </div>
                  <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
                    <img src="/gloss5.png" alt="produto" />
                    <h3>Gloss Cocoa Glow – 6 ml </h3>
                    <Avaliacao rating={2} />
                    <p>R$ 120,00</p>
                    <button>Adicione a bolsa</button>
                  </div>
                  <div className="card" onClick={irParaProduto} style={{ cursor: "pointer" }}>
                    <img src="/base4.png" alt="produto" />
                    <h3>Base (5g)</h3>
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