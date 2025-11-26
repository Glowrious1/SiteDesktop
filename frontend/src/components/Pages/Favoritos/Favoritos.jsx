
import React from "react";
import { Heart } from "lucide-react";
import "./favoritos.css";

export default function Favoritos() {
  const favoritos = [
    {
      id: 1,
      nome: "Sérum Lustrious GlowBlush Compacto 4g - pêssego-terroso",
      descricao:
        "Um blush em sérum com acabamento aveludado que realça a beleza natural. O tom pêssego-terroso adiciona um rubor elegante, enquanto a fórmula leve garante um toque luminoso e duradouro. Perfeito para quem busca um brilho saudável com sofisticação.",
      imagem: "/blush.png",
    },
    {
      id: 2,
      nome: "Creme Facial",
      descricao:
        "Tratamento diário que nutre profundamente a pele, promovendo maciez imediata. Sua fórmula hidratante deixa o rosto radiante e revitalizado, reforçando a barreira natural e mantendo o equilíbrio ideal ao longo do dia.",
      imagem: "/blush.png",
    },
    {
      id: 3,
      nome: "Prime",
      descricao:
        "Primer com textura ultraleve que suaviza a aparência dos poros e linhas finas, preparando a pele para uma maquiagem impecável e de longa duração. Proporciona um toque aveludado e um acabamento perfeitamente uniforme.",
      imagem: "/blush.png",
    },
    {
      id: 4,
      nome: "Blush Cremoso Rouge Royale – 6 ml",
      descricao:
        "Cor vibrante com efeito natural que se funde à pele sem esforço. Sua textura cremosa garante fácil aplicação e um acabamento luminoso, trazendo frescor e elegância para qualquer look.",
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

              <button
                type="button"
                className="coracao"
                aria-label={`Remover ${produto.nome} dos favoritos`}
              >
                <Heart size={22} />
              </button>
            </div>
          ))}
        </div>

        <div className="botao">
          <button type="button" onClick={() => window.history.back()}>
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
}