import { ShoppingCart, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Perfumes() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  // ---- FILTRAR APENAS PERFUMES ----
  const produtosPerfumes = produtos.filter((p) => p.categoria === "Perfumes");

  // usuário fixo (trocar depois)
  const userId = 1;

  const adicionarCarrinho = async (item) => {
    try {
      const response = await fetch("http://localhost:3001/carrinho/addItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          IdUser: userId,
          IdProd: item.id,
          Qtd: 1,
          ValorUnitario: Number(String(item.preco).replace(",", ".")),
        }),
      });

      const data = await response.json();
      console.log("Adicionado:", data);

      window.dispatchEvent(new CustomEvent("cart-updated", { detail: { item: data.item } }));
      window.dispatchEvent(new CustomEvent("show-toast", { detail: { message: "Produto adicionado ao carrinho" } }));
    } catch (error) {
      console.log("Erro ao adicionar:", error);
      window.dispatchEvent(new CustomEvent("show-toast", { detail: { message: "Erro ao adicionar ao carrinho" } }));
    }
  };

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
            <li>DUVIDAS</li>
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
      <section className="banner-maquiagem">
        <img src="/perfumes.jpg" alt="Banner" />
      </section>

      {/* CATEGORIAS */}
      <section className="categorias-tudo">
        <div className="categorias">
          <div className="categoria" onClick={() => navigate("/rosto")}>
            <img src="/image10.jpg" alt="Rosto" />
            <span>ROSTO</span>
          </div>

          <div className="categoria" onClick={() => navigate("/cabelo")}>
            <img src="/image11.jfif" alt="Cabelo" />
            <span>CABELO</span>
          </div>

          <div className="categoria" onClick={() => navigate("/perfumes")}>
            <img src="/perfumes.jpg" alt="Perfumes" />
            <span>PERFUMES</span>
          </div>

          <div className="categoria" onClick={() => navigate("/corpo")}>
            <img src="/image12.jpg" alt="Corpo" />
            <span>CORPO</span>
          </div>
        </div>
      </section>

      {/* PRODUTOS PERFUMES */}
      <section className="produtos">
        <h2>Perfumes & BodySplash</h2>

        <div className="lista-produtos">
          {produtosPerfumes.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() => irParaProduto(item.id)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ pointerEvents: "none" }}>
                <img src={item.imagem} alt={item.nome} />
                <h3>{item.nome}</h3>
                <Avaliacao rating={item.avaliacao} />
                <p>R$ {item.preco}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  adicionarCarrinho(item);
                }}
              >
                Adicionar ao Carrinho
              </button>
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
