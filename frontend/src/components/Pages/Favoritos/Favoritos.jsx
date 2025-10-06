
import { Heart } from "lucide-react";
import "./favoritos.css";


export default function Favoritos() {
  const favoritos = [
    {
      id: 1,
      nome: "Blush cremoso Lustrous",
      descricao:
        "Com textura macia e fácil de espalhar, entrega cor natural e luminosidade instantânea. Sua fórmula leve garante praticidade na aplicação, podendo ser usada com os dedos ou pincel, deixando a pele com um ar saudável e radiante o dia todo.",
      imagem: "/blush.png",
    },
    {
      id: 2,
      nome: "Blush cremoso Lustrous",
      descricao:
        "Com textura macia e fácil de espalhar, entrega cor natural e luminosidade instantânea. Sua fórmula leve garante praticidade na aplicação, podendo ser usada com os dedos ou pincel, deixando a pele com um ar saudável e radiante o dia todo.",
      imagem: "/blush.png", 
    },
    {
      id: 3,
      nome: "Blush cremoso Lustrous",
      descricao:
        "Com textura macia e fácil de espalhar, entrega cor natural e luminosidade instantânea. Sua fórmula leve garante praticidade na aplicação, podendo ser usada com os dedos ou pincel, deixando a pele com um ar saudável e radiante o dia todo.",
      imagem: "/blush.png",
    },
    {
      id: 4,
      nome: "Blush cremoso Lustrous",
      descricao:
        "Com textura macia e fácil de espalhar, entrega cor natural e luminosidade instantânea. Sua fórmula leve garante praticidade na aplicação, podendo ser usada com os dedos ou pincel, deixando a pele com um ar saudável e radiante o dia todo.",
       imagem: "/blush.png",
    },
  ];

  return (
    <div className="container">
      <div className="favoritos-caixa">
        <h1 className="titulo-favoritos">Favoritos</h1>

        <div className="favoritos-lista">
          {favoritos.map((produto) => (
            <div key={produto.id} className="item">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="imgfav"
              />

              <div className="info">
                <p className="label">Produto</p>
                <h2 className="nomefav">{produto.nome}</h2>
                <p className="descricao">{produto.descricao}</p>
              </div>

              <button className="coracao">
                <Heart size={22} />
              </button>
            </div>
          ))}
        </div>

        <div className="botao">
            <button>← Voltar</button>
        </div>
      </div>
    </div>
  );
}
