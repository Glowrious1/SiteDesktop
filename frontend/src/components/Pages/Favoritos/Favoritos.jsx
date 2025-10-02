
import { Heart } from "lucide-react";
import "./favoritos.css";


export default function Favoritos() {
  const favoritos = [
    {
      id: 1,
      nome: "Blush cremoso Lustrous",
      descricao:
        "Com textura macia e fácil de espalhar, entrega cor natural e luminosidade instantânea. Sua fórmula leve garante praticidade na aplicação, podendo ser usada com os dedos ou pincel, deixando a pele com um ar saudável e radiante o dia todo.",
      imagem: "./public/blush.png",
    },
    {
      id: 2,
      nome: "Blush cremoso Lustrous",
      descricao:
        "Com textura macia e fácil de espalhar, entrega cor natural e luminosidade instantânea. Sua fórmula leve garante praticidade na aplicação, podendo ser usada com os dedos ou pincel, deixando a pele com um ar saudável e radiante o dia todo.",
      imagem: "/images/blush2.png",
    },
    {
      id: 3,
      nome: "Blush cremoso Lustrous",
      descricao:
        "Com textura macia e fácil de espalhar, entrega cor natural e luminosidade instantânea. Sua fórmula leve garante praticidade na aplicação, podendo ser usada com os dedos ou pincel, deixando a pele com um ar saudável e radiante o dia todo.",
      imagem: "/images/blush3.png",
    },
    {
      id: 4,
      nome: "Blush cremoso Lustrous",
      descricao:
        "Com textura macia e fácil de espalhar, entrega cor natural e luminosidade instantânea. Sua fórmula leve garante praticidade na aplicação, podendo ser usada com os dedos ou pincel, deixando a pele com um ar saudável e radiante o dia todo.",
      imagem: "/images/blush4.png",
    },
  ];

  return (
    <div className="favoritos-container">
      <div className="favoritos-box">
        <h1 className="favoritos-titulo">Favoritos</h1>

        <div className="favoritos-lista">
          {favoritos.map((produto) => (
            <div key={produto.id} className="favorito-item">
              {/* Imagem */}
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="favorito-img"
              />

              {/* Texto */}
              <div className="favorito-info">
                <p className="favorito-label">Produto</p>
                <h2 className="favorito-nome">{produto.nome}</h2>
                <p className="favorito-desc">{produto.descricao}</p>
              </div>

              {/* Ícone coração */}
              <button className="favorito-heart">
                <Heart size={22} />
              </button>
            </div>
          ))}
        </div>

        {/* Botão voltar */}
        <div className="favoritos-voltar">
            <button>← Voltar</button>
        </div>
      </div>
    </div>
  );
}
