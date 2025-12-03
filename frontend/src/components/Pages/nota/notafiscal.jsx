import React from "react";
import { useLocation, Link } from "react-router-dom";
import QRCode from "react-qr-code";
import "./notafiscal.css";

export default function NotaFiscal() {
  const { state } = useLocation();

  // Dados de teste caso ninguém tenha passado props
  const dados = state || {
    id: "NF-000457",
    nome: "Cliente Exemplo",
    produto: "Kit Skincare Lustrious",
    total: 129.90,
    data: new Date().toLocaleDateString("pt-BR"),
    pagamento: "Cartão de Débito",
  };

  return (
    <div className="nf-container">

      {/* CARD PRINCIPAL */}
      <div className="nf-card">

        <h1 className="nf-titulo">NOTA FISCAL</h1>
        <p className="nf-id">{dados.id}</p>

        <div className="nf-info">
          <p><strong>Cliente:</strong> {dados.nome}</p>
          <p><strong>Produto:</strong> {dados.produto}</p>
          <p><strong>Total Pago:</strong> R$ {dados.total}</p>
          <p><strong>Forma de Pagamento:</strong> {dados.pagamento}</p>
          <p><strong>Data:</strong> {dados.data}</p>
        </div>

        {/* QR CODE */}
        <div className="nf-qrcode">
          <QRCode
            value={`NF-e ${dados.id} | Cliente: ${dados.nome} | Total: ${dados.total}`}
            size={128}
          />
          <p className="nf-qrcode-texto">VALIDAÇÃO DIGITAL</p>
        </div>

        <Link to="/" className="nf-botao">Voltar ao Início</Link>
      </div>
    </div>
  );
}
