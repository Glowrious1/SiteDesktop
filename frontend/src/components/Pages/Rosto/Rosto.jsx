import { ShoppingCart, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Avaliacao from "../../Avaliacao.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Rosto.css";

export default function Rosto() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  // ---- FILTRAR APENAS OS PRODUTOS DE ROSTO ----
  const produtosRosto = produtos.filter((p) => p.categoria === "Maquiagem");

  // dentro do componente (já com useNavigate e outras coisas)
const userId = 1; // trocar depois pelo usuário logado

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

    // notify other components (Carrinho) to refresh
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { item: data.item } }));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Produto adicionado ao carrinho' } }));
  } catch (error) {
    console.log("Erro ao adicionar:", error);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Erro ao adicionar ao carrinho' } }));
  }
};



  // ---- ABRIR O PRODUTO CORRETO ----
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
        <img src="/banner2.png" alt="Banner" />
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

      {/* PRODUTOS DE ROSTO */}
      <section className="produtos">
        <h2>Produtos para o Rosto</h2>

        <div className="lista-produtos">
        {produtosRosto.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => irParaProduto(item.id)} // abre página do produto
            style={{ cursor: "pointer" }}
          >
            {/* Conteúdo clicável que leva ao produto */}
            <div style={{ pointerEvents: "none" }}>
              <img src={item.imagem} alt={item.nome} />
              <h3>{item.nome}</h3>
              <Avaliacao rating={item.avaliacao} />
              <p>R$ {item.preco}</p>
            </div>

            {/* Botão separado que não ativa o onClick do card */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // impede ir para tela do produto
                adicionarCarrinho(item);
              }}
            >
              Adicionar ao Carrinho
            </button>

          </div>
        ))}

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
