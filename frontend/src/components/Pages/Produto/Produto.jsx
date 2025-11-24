import { Heart, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import produtos from "../../../data/produtos.js";
import "./Produto.css";

export default function Produto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const produto = produtos.find((p) => p.id === Number(id));

  if (!produto) return <h2>Produto não encontrado...</h2>;

  return (
    <div className="produto-pagina">
      
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
          <Link to="/favoritos">
            <Heart size={22} strokeWidth={1.5} />
          </Link>

          <Link to="/sacola">
            <ShoppingCart size={22} strokeWidth={1.5} />
          </Link>

          <Link to="/login">
            <User size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* BOTÃO DE VOLTAR */}
      <button className="btn-voltar-produto" onClick={() => navigate(-1)}>
        ⟵ Voltar
      </button>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="produto-container">
        <div className="produto-principal">
          
          {/* IMAGEM */}
          <div className="produto-imagem">
            <img src={produto.imagem} alt={produto.nome} />
          </div>

          {/* INFORMAÇÕES */}
          <div className="produto-info">
            <h2>{produto.nome}</h2>

            <p className="preco">R$ {produto.preco}</p>

            <Avaliacao rating={produto.avaliacao} />

            <p className="estoque">(em até 3x sem juros)</p>

            {/* QUANTIDADE */}
            <div className="quantidade-container">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            {/* BOTÃO ADICIONAR */}
            <button className="btn-adicionar" onClick={() => navigate("/sacola")}>
              Adicionar à Sacola
            </button>

            <p className="categoria">Categoria: {produto.categoria || "Skincare"}</p>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <section className="descricao">
          <h3>Descrição</h3>
          <p>{produto.descricao || "Esse produto é maravilhoso para cuidados diários da pele."}</p>
        </section>

        {/* OUTROS PRODUTOS */}
        <section className="outros-produtos">
          <h3>Outros Produtos</h3>
          <div className="lista-produtos2">
            {produtos.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="card2"
                onClick={() => navigate(`/produto/${item.id}`)}
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
