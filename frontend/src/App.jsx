import React from "react";
import { ShoppingCart, Heart, Instagram, Linkedin, Music2 } from "lucide-react";

export default function App() {
  return (
    <div className="font-sans bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white fixed top-0 w-full z-50">
        <h1 className="text-xl font-bold tracking-wide text-[#b68c5a]">LUSTRIOUS</h1>
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li className="cursor-pointer hover:text-[#b68c5a]">Início</li>
          <li className="cursor-pointer hover:text-[#b68c5a]">Produtos</li>
          <li className="cursor-pointer hover:text-[#b68c5a]">Serviços</li>
          <li className="cursor-pointer hover:text-[#b68c5a]">Contato</li>
          <li className="cursor-pointer hover:text-[#b68c5a]">Dúvidas</li>
        </ul>
        <div className="flex gap-4">
          <Heart className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />
        </div>
      </nav>

      {/* BANNER*/}
      <section className="relative w-full h-[90vh] mt-[64px]">
        <div className="absolute inset-0 flex">
          <img src="/img/hero1.jpg" className="w-1/5 object-cover" alt="" />
          <img src="/img/hero2.jpg" className="w-1/5 object-cover" alt="" />
          <img src="/img/hero3.jpg" className="w-1/5 object-cover" alt="" />
          <img src="/img/hero4.jpg" className="w-1/5 object-cover" alt="" />
          <img src="/img/hero5.jpg" className="w-1/5 object-cover" alt="" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="text-white text-5xl md:text-7xl font-light">Lustrious <span 
          className="block text-2xl md:text-3xl">skincare</span>
          </h1>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="py-16 px-8">
        <h2 className="text-xl font-bold mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map((id) => (
            <div key={id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <img src="/img/product.jpg" alt="produto" className="rounded-lg mb-4" />
              <h3 className="font-semibold">Maquiagem sei lá oq</h3>
              <p className="text-gray-600">R$ 120,00</p>
              <button className="mt-3 w-full py-2 bg-[#b68c5a] text-white rounded-lg hover:bg-[#9c7343] transition">
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-[#f4e5e2] py-16 px-8">
        <h2 className="text-2xl font-bold mb-8 uppercase">Vantagens de Garantir Nossos Produtos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold">1. Segurança e Confiança na Compra</h3>
            <p className="text-gray-700">Garantia e suporte ao cliente em caso de problemas.</p>
          </div>
          <div>
            <h3 className="font-semibold">2. Economia a Longo Prazo</h3>
            <p className="text-gray-700">Redução de custos futuros com manutenção.</p>
          </div>
          <div>
            <h3 className="font-semibold">3. Valorização do Investimento</h3>
            <p className="text-gray-700">Qualidade que gera confiança e durabilidade.</p>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-16 px-8 grid md:grid-cols-2 gap-8 items-center">
        <img src="/img/about.jpg" alt="sobre nós" className="rounded-xl" />
        <div>
          <h2 className="text-xl font-bold mb-4">Sobre nossos produtos</h2>
          <p className="text-gray-700 leading-relaxed">
            Nossos cosméticos foram desenvolvidos por especialistas para tratar sua pele com eficácia e segurança.
            Fórmulas de alta performance, perfeitas para potencializar seus cuidados diários.
            Beleza com resultado de clínica, direto na sua casa.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#cbb2a1] text-white py-6 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p>(55) 11 14323-2342</p>
            <p>LUSTRIOUS@GMAIL.COM</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Instagram className="cursor-pointer" />
            <Linkedin className="cursor-pointer" />
            <Music2 className="cursor-pointer" /> {/* TikTok */}
          </div>
        </div>
        <p className="text-center text-sm mt-4">Direitos Autorais © 2025</p>
      </footer>

    </div>
  );
}
