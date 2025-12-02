import { ShoppingCart, Heart, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Duvidas.css";

export default function Duvidas() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSection(true), 200);
  }, []);

  const faqs = [
    {
      id: 1,
      pergunta: "Os produtos são veganos?",
      resposta: "Sim! Nossos produtos são totalmente veganos e cruelty-free.",
    },
    {
      id: 2,
      pergunta: "Os produtos funcionam para qualquer tipo de pele?",
      resposta: "Sim! Temos fórmulas específicas desenvolvidas para vários tipos de pele.",
    },
    {
      id: 3,
      pergunta: "Qual é o prazo de entrega?",
      resposta: "O prazo varia entre 5 a 9 dias úteis.",
    },
    {
      id: 4,
      pergunta: "Posso trocar um produto?",
      resposta: "Sim, você pode solicitar troca em até 7 dias após o recebimento.",
    },
  ];

const depoimentos = [
  { id: 1, nome: "Carla", texto: "MUITO BOM!", foto: "/user1.jpg" },
  { id: 2, nome: "Julia", texto: "AMO ESSE PRODUTO!", foto: "/user2.jpg" },
  { id: 3, nome: "Maria", texto: "RECOMENDO!", foto: "/user3.jpg" },
];


  return (
    <div className="pagina-duvida">

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
        <img src="/banner3.png" alt="banner" />
      </div>

      {/* FAQ */}
      <section className={`faq-container ${showSection ? "show" : ""}`}>
        <h2 className="faq-title">Alguma pergunta?</h2>

        <div className="faq-list">
          {faqs.map((f) => (
            <div
              key={f.id}
              className="faq-item"
              onClick={() => setOpenFAQ(openFAQ === f.id ? null : f.id)}
            >
              <div className="faq-question">
                <p>{f.pergunta}</p>
                <ChevronDown
                  className={openFAQ === f.id ? "arrow open" : "arrow"}
                  size={20}
                />
              </div>

              <div className={`faq-answer ${openFAQ === f.id ? "open" : ""}`}>
                <p>{f.resposta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* AVALIAÇÕES */}
<section className={`avaliacoes-container ${showSection ? "fade-in" : ""}`}>
  <div className="avaliacoes-left">
    <h1>Avaliações dos nossos clientes</h1>
    <p>Nossos cosméticos foram desenvolvidos por especialistas para você.</p>
  </div>

  <div className="avaliacoes-right">
    {depoimentos.map((d, index) => (
      <div
        key={d.id}
        className="card-depoimento"
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        <div className="foto">
          <img
            src={d.foto ? d.foto : "/user1.jpg"}
            alt="foto cliente"
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <strong>{d.nome}</strong>
          <p>{d.texto}</p>
        </div>
      </div>
    ))}
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
            <a href="https://www.instagram.com/lustriousskincare/"><img src="/instagram.png" alt="Instagram" /></a>
            <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a>
            <a href="#"><img src="/whatsapp.png" alt="WhatsApp" /></a>
          </div>
        </div>

        <div className="direitos-autorais">
          <p>&copy;DIREITOS AUTORAIS 2025</p>
        </div>
      </footer>
    </div>
  );
}
