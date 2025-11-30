-- Seed de produtos extraída de frontend/src/data/produtos.js
-- Use: mysql -u <user> -p dbilumina < backend/seed_produtos.sql

USE dbilumina;

-- Criar categorias necessárias se não existirem
INSERT INTO Categoria (Categoria)
SELECT 'Maquiagem' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM Categoria WHERE Categoria = 'Maquiagem');

INSERT INTO Categoria (Categoria)
SELECT 'Cabelo' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM Categoria WHERE Categoria = 'Cabelo');

-- Opcional: outras categorias usadas pelo projeto
INSERT INTO Categoria (Categoria)
SELECT 'Skincare' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM Categoria WHERE Categoria = 'Skincare');

-- Inserir produtos (CodigoBarras é a PK). Ajuste os valores se já existirem.
-- Observação: ValorUnitario usa ponto decimal. Foto armazena o caminho relativo conforme as imagens em /public

INSERT INTO Produto (CodigoBarras, NomeProd, qtd, foto, Genero, Descricao, ValorUnitario, codCategoria)
VALUES
(1, 'Blush Compacto 4g - pêssego-terroso', 50, '/blush.png', 'Unissex', 'Um tom pêssego-terroso sofisticado que ilumina naturalmente a pele. Sua textura ultrafina desliza com suavidade, garantindo um esfumado impecável e acabamento aveludado.', 39.90, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(2, 'Creme Facial', 50, '/cremefacial.jpg', 'Unissex', 'Creme facial hidratante e restaurador.', 130.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(3, 'Prime', 50, '/Prime1.png', 'Unissex', 'Prime para preparação da pele, melhora a durabilidade da maquiagem.', 120.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(4, 'Rouge Royale – 6 ml', 50, '/gloss1.png', 'Unissex', 'Rouge Royale é um gloss criado para quem deseja dominar os holofotes. Seu tom vermelho profundo e acabamento luminoso.', 49.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(5, 'Crystal Frost – 6 ml', 50, '/gloss2.png', 'Unissex', 'Crystal Frost com microbrilhos prateados para um reflexo espelhado.', 49.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(6, 'Pink Velvet – 6 ml', 50, '/gloss3.png', 'Unissex', 'Pink Velvet tom rosa vibrante com acabamento luminoso.', 47.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(7, 'Bronze Amour – 6 ml', 50, '/gloss4.png', 'Unissex', 'Bronze Amour tonalidade bronze quente com partículas douradas.', 47.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(8, 'Cocoa Glow – 6 ml', 50, '/gloss5.png', 'Unissex', 'Cocoa Glow tom marrom suave com acabamento sofisticado.', 54.90, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(10, '15N – Ivory Glow', 50, '/base1.png', 'Unissex', 'Base 15N – Ivory Glow com cobertura média e acabamento aveludado.', 89.90, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(11, '20W – Golden Radiance', 50, '/base2.png', 'Unissex', 'Base 20W – Golden Radiance com acabamento radiante.', 89.90, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(12, '10N – Pearl Porcelain', 50, '/base3.png', 'Unissex', 'Base 10N – Pearl Porcelain entrega luminosidade e acabamento impecável.', 89.90, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(13, '40W – Caramel Essence', 50, '/base4.png', 'Unissex', 'Base 40W – Caramel Essence tonalidade caramelizada e acabamento luminoso.', 89.90, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(14, '30N – Nude Harmony', 50, '/base5.png', 'Unissex', 'Base 30N – Nude Harmony equilíbrio entre naturalidade e cobertura.', 89.90, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(15, '50C – Mocha Deep', 50, '/base6.png', 'Unissex', 'Base 50C – Mocha Deep formulada para peles profundas.', 89.90, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Maquiagem')),
(17, 'Shampoo de Banana', 100, '/Shampoo.png', 'Unissex', 'Hidratação suave e maciez imediata para fios radiantes.', 40.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Cabelo')),
(18, 'Condicionador de Banana', 100, '/Condicionador.png', 'Unissex', 'Hidratação profunda e nutrição imediata para fios mais fortes e macios.', 40.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Cabelo')),
(19, 'Hidratante Capilar de Banana', 100, '/Capilar.png', 'Unissex', 'Hidratação profunda e nutrição imediata.', 40.00, (SELECT codCategoria FROM Categoria WHERE Categoria = 'Cabelo'));

-- Commit explícito
COMMIT;
