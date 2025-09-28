import { Star } from "lucide-react";

export default function Avaliacao({ rating }) {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={20}
          fill={i < rating ? "#FFD700" : "none"}  // dourado quando ativo
          stroke="#FFD700" // contorno dourado
        />
      ))}
    </div>
  );
}
