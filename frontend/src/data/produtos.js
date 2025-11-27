
const produtos = [
  {
    id: 1,
    nome: "Blush Compacto 4g - pêssego-terroso",
    preco: "39,90",
    imagem: "/blush.png",
    avaliacao: 4,
    categoria: "Maquiagem",
    home: true, 
    descricao: "Um tom pêssego-terroso sofisticado que ilumina naturalmente a pele. Sua textura ultrafina desliza com suavidade, garantindo um esfumado impecável e acabamento aveludado. Desenvolvido para realçar a beleza com elegância, proporciona um rubor saudável e duradouro, perfeito para qualquer ocasião. A escolha ideal para quem busca um toque de cor refinado e irresistível no dia a dia."
  },
  {
    id: 2,
    nome: "Creme Facial",
    preco: 130,
    imagem: "/cremefacial.jpg",
    avaliacao: 4,
     categoria: "Maquiagem",
    descricao: "Gloss com efeito espelhado que hidrata e realça os lábios com um tom rosé suave."
  },
  {
    id: 3,
    nome: "Prime",
    preco: 120,
    imagem: "/Prime1.png",
    avaliacao: 3,
    categoria: "Maquiagem",
    descricao: "Gloss com efeito espelhado que hidrata e realça os lábios com um tom rosé suave."
  },

  {
  id: 4,
  nome: "Rouge Royale – 6 ml",
  preco: "49",
  imagem: "/gloss1.png",
  avaliacao: 5,
  categoria: "Maquiagem",
  descricao: "Rouge Royale é um gloss criado para quem deseja dominar os holofotes. Seu tom vermelho profundo, luxuoso e intenso, confere aos lábios um brilho envolvente que traduz confiança e elegância em cada movimento. A fórmula cremosa proporciona uma aplicação uniforme, enquanto o acabamento luminoso cria um efeito volumoso e irresistível. Perfeito para ocasiões especiais ou para quem ama destacar-se com classe, Rouge Royale é a definição de um vermelho real — majestosamente sofisticado e eternamente marcante."
},
{
  id: 5,
  nome: "Crystal Frost – 6 ml",
  preco: "49",
  imagem: "/gloss2.png",
  avaliacao: 2,
  categoria: "Maquiagem",
  descricao: "Crystal Frost é o gloss perfeito para quem deseja um efeito glamouroso e etéreo, sem pesar. Sua fórmula translúcida com microbrilhos prateados cria um reflexo espelhado que ilumina instantaneamente os lábios, proporcionando um acabamento radiante e sofisticado. Leve e confortável, ele desliza suavemente, criando um véu cristalino que realça a beleza natural da boca. Ideal para ser usado sozinho para um look minimalista luxuoso ou sobre qualquer batom para acrescentar profundidade e luminosidade. Crystal Frost é a assinatura do brilho refinado – puro, elegante e atemporal."
},
{
  id: 6,
  nome: "Pink Velvet – 6 ml",
  preco: "47",
  imagem: "/gloss3.png",
  avaliacao: 5,
  categoria: "Maquiagem",
  home: true, 
  descricao: "Pink Velvet é a combinação ideal entre feminilidade e brilho. Seu tom rosa vibrante, delicado e moderno, oferece um acabamento luminoso que deixa os lábios com aspecto macio, volumoso e irresistível. Com textura confortável e não pegajosa, o gloss desliza facilmente, entregando cor suave com brilho elegante na medida certa. Pink Velvet é perfeito para quem ama um visual jovial, encantador e ao mesmo tempo sofisticado — um gloss que encanta à primeira aplicação."
},
{
  id: 7,
  nome: "Bronze Amour – 6 ml",
  preco: "47",
  imagem: "/gloss4.png",
  avaliacao: 4,
  categoria: "Maquiagem",
  descricao: "Bronze Amour traz a intensidade e o calor dos tons terrosos transformados em um gloss luxuoso e irresistível. Sua tonalidade bronze quente, enriquecida com partículas douradas, cria um efeito radiante que valoriza todos os tons de pele.Com textura cremosa e confortável, ele envolve os lábios em um acabamento luminoso que reflete a luz com perfeição, garantindo um visual sofisticado e marcante. Bronze Amour é perfeito para quem deseja um brilho elegante, com personalidade e presença — um verdadeiro convite para se apaixonar por cada detalhe."
},
{
  id: 8,
  nome: "Cocoa Glow – 6 ml",
  preco: "54,90",
  imagem: "/gloss5.png",
  avaliacao: 5,
  categoria: "Maquiagem",
  descricao: "Cocoa Glow foi desenvolvido para quem busca naturalidade com um toque de luxo. Seu tom marrom suave, inspirado no cacau refinado, cria um efeito acolhedor e sofisticado que realça a tonalidade natural dos lábios com elegância. Com textura leve e sensação hidratante, o gloss oferece um brilho sutil e uniforme, perfeito para o dia a dia ou para compor makes neutras e elegantes. Cocoa Glow é o equilíbrio perfeito entre simplicidade e refinamento — um gloss que transforma o natural em extraordinário."
},

{
  id: 10,
  nome: "15N – Ivory Glow",
  preco: "89,90",
  imagem: "/base1.png",
  avaliacao: 4,
  categoria: "Maquiagem",
  descricao: "A base 15N – Ivory Glow combina equilíbrio e suavidade para revelar uma pele clara com viço natural e aparência perfeitamente uniforme. Sua textura aveludada desliza facilmente, proporcionando cobertura média com aspecto de segunda pele. Ideal para quem busca corrigir pequenas imperfeições sem pesar, oferecendo um brilho saudável e um acabamento limpo e refinado. Uma escolha clássica e atemporal para quem ama elegância com naturalidade."
},
{
  id: 11,
  nome: "20W – Golden Radiance",
  preco: "89,90",
  imagem: "/base2.png",
  avaliacao: 5,
  categoria: "Maquiagem",
  home: true, 
  descricao: "A base 20W – Golden Radiance realça a beleza das peles claras com fundo quente, trazendo aquele toque dourado irresistível. Sua fórmula luxuosa ilumina suavemente, proporcionando viço sofisticado e uniformidade impecável. Com acabamento radiante e textura confortável, essa base valoriza a luminosidade natural da pele, entregando um visual refinado, quente e cheio de personalidade. A escolha perfeita para quem ama uma pele com brilho elegante e acabamento profissional."
},
{
  id: 12,
  nome: "10N – Pearl Porcelain",
  preco: "89,90",
  imagem: "/base3.png",
  avaliacao: 4,
  categoria: "Maquiagem",
  descricao: "A base 10N – Pearl Porcelain foi criada para quem busca luminosidade na medida certa, entregando um acabamento impecável em peles extremamente claras. Sua fórmula leve e moderna se adapta ao tom natural da pele, realçando sua pureza sem acinzentar ou amarelar. Proporciona cobertura uniforme, toque sedoso e um efeito “pele realçada”, perfeito para quem deseja um visual sofisticado, fresco e naturalmente radiante. Ideal para criar um look elegante no dia a dia ou um acabamento profissional para ocasiões especiais."
},
{
  id: 13,
  nome: "40W – Caramel Essence",
  preco: "89,90",
  imagem: "/base4.png",
  avaliacao: 5,
  categoria: "Maquiagem",
  descricao: "A base 40W – Caramel Essence envolve a pele em um toque caramelizado quente e vibrante. Sua textura cremosa e macia se funde perfeitamente à pele, proporcionando cobertura uniforme, viço natural e efeito luminoso elegante. Projetada para realçar a profundidade e a riqueza do subtom quente, ela entrega um acabamento luxuoso, luminoso e naturalmente marcante. Uma base pensada para quem quer destacar sua presença com sofisticação."
},
{
  id: 14,
  nome: "30N – Nude Harmony",
  preco: "89,90",
  imagem: "/base5.png",
  avaliacao: 4,
  categoria: "Maquiagem",
  descricao: "A base 30N – Nude Harmony é o equilíbrio perfeito entre naturalidade e cobertura. Desenvolvida para peles médias com fundo neutro, ela cria uma harmonia impecável, uniformizando o tom da pele com sutileza e luxo. Sua fórmula moderna oferece longa duração, conforto absoluto e um acabamento semi-matte sofisticado. Ideal para quem busca um visual polido, elegante e versátil — desde a rotina até produções mais elaboradas."
},
{
  id: 15,
  nome: "50C – Mocha Deep",
  preco: "89,90",
  imagem: "/base6.png",
  avaliacao: 5,
  categoria: "Maquiagem",
  home: true, 
  descricao: "A base 50C – Mocha Deep foi formulada para valorizar a beleza das peles profundas com fundo frio, oferecendo intensidade, profundidade e elegância. Sua textura rica e confortável proporciona cobertura uniforme, garantindo uma pele impecável sem oxidar ou perder o viço natural. Com acabamento profissional e luxuoso, ela realça cada traço com suavidade e precisão, entregando um visual poderoso, refinado e verdadeiramente marcante."
},


{
    id: 17,
    nome: "Shampoo de Banana",
    preco: "40,00",
    imagem: "/Shampoo.png",
    avaliacao: 4,
    categoria: "Cabelo",
    home: true, 
    descricao: "Hidratação suave e maciez imediata para fios radiantes."
},

{
    id: 18,
    nome: "Condicionador de Banana",
    preco: "40,00",
    imagem: "/Condicionador.png",
    avaliacao: 4,
    categoria: "Cabelo",
    descricao: "Hidratação profunda e nutrição imediata para fios mais fortes e macios."
},

{
    id: 19,
    nome: "Hidratante Capilar de Banana",
    preco: "40,00",
    imagem: "/Capilar.png",
    avaliacao: 4,
    categoria: "Cabelo",
    home: true, 
    descricao: "Hidratação profunda e nutrição imediata."
},


];

export default produtos;
