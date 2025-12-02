-- Criando a Data Base
create database dbilumina;
-- Usando a Data Base
use dbilumina;

-- Criação de tabelas

create table Usuario (
IdUser int primary key auto_increment ,
Nome varchar(155) ,
Foto varchar(255), 
Email varchar(155) ,
Senha varchar(150) ,
Sexo enum('Masculino','Feminino','Outro'),
CPF varchar(14) not null,
Role enum('Admin','Cliente','Funcionario'),
IdEndereco  int null,
Ativo char(1)  default '1'
);





INSERT INTO Usuario (Nome, Email, Senha, CPF, Role)
VALUES ('Administrador Master', 'admin@site.com', 'admin123', '000.000.000-00', 'Admin');


/*
create table Funcionario (
IdFun int primary key auto_increment
foreing key (IdFun) references Login(IdLogin) on delete cascade
Fica a critério de vocês adicionar mais colunas.
Sugestões de colunas:
Salario decimal(9,2) not null,
Status ENUM("Ativo", "Inativo") default "Ativo"
);
*/

Create table Cliente(
IdClient int primary key auto_increment,
Nome varchar(200) not null,
Email varchar(150) not null,
CPF varchar(14) unique not null, -- Estava 12 mudei pra 14 pq ia dar erro.
Senha varchar(250),
CepCli int -- CEP vai no endereço, da pra fazer integração com API legal, bem facil de fazer
);

SELECT * FROM Cliente;

create table Funcionario (
IdFun int primary key auto_increment,
Nome varchar(200) not null,
Email varchar(150) not null,
Senha varchar(250) not null
);

SELECT * FROM Funcionario;

create table Bairro (
IdBairro int primary key auto_increment,
Bairro varchar(200) not null
);

create table Cidade (
IdCidade int primary key auto_increment,
Cidade varchar(200) not null
);

create table Estado (
IdUF int primary key auto_increment,
UF char(2) not null
);

create table Endereco (
IdEndereco int primary key auto_increment,
CEP varchar(9) ,
Logradouro varchar(200) not null,
numero varchar(11) ,
complemento varchar(155),
IdBairro int not null,
IdCidade int not null,
IdEstado int not null,
IdUser int  null
);

create table Entrega(
IdEntrega int primary key auto_increment,
IdEndereco int not null,
DataEntrega dateTime,
ValorFrete decimal(7,2),
DataPrevista date,
 Status enum ('Pedido enviado','Produto saiu para entrega', 'Seu Produto Chegou'),
foreign key (IdEndereco) references Endereco(IdEndereco)
);

create table Produto(
CodigoBarras bigint primary key,
NomeProd varchar(200) not null,
qtd int,
foto varchar(255),
Genero Enum('Masculino','Feminino','Unissex'),
Descricao varchar(250),
ValorUnitario decimal(9,2)
);

DESCRIBE Produto;

ALTER TABLE Produto
ADD COLUMN Home TINYINT(1) DEFAULT 0;

UPDATE Produto
SET Home = 1
WHERE CodigoBarras = 19;

UPDATE Produto SET Home = 1 WHERE CodigoBarras IN (17, 18);
UPDATE Produto SET Home = 1 WHERE CodigoBarras IN (11, 15,6);
SELECT * FROM Produto WHERE Home = 1;





create table Favoritos(
IdFav int primary key auto_increment,
IdUser int not null,
IdProd bigint not null,
foreign key (IdUser) references Usuario(IdUser) on delete cascade,
foreign key (IdProd) references Produto(CodigoBarras) on delete cascade
);

create table Carrinho(
IdCarrinho int primary key auto_increment,
IdProd int not null,
Qtd int not null,
ValorUnitario decimal(9,2),
ValorTotal decimal(9,2),
IdUser int not null,
foreign key (IdUser) references Usuario(IdUser) on delete cascade
-- Se for ter promoção colocar uma coluna pro preço do produto.
);

create table Categoria(
codCategoria int primary key auto_increment,
Categoria varchar(155)
);

SELECT * FROM Categoria;


UPDATE Categoria SET Categoria = 'Maquiagem' WHERE codCategoria = 1;
UPDATE Categoria SET Categoria = 'Cabelo' WHERE codCategoria = 2;
UPDATE Categoria SET Categoria = 'Perfumes' WHERE codCategoria = 3;
UPDATE Categoria SET Categoria = 'Corpo' WHERE codCategoria = 4;

UPDATE Produto SET codCategoria = 1 WHERE CodigoBarras = 123456;


UPDATE Produto SET codCategoria = 1 WHERE CodigoBarras IN (
1,2,3,4,5,6,7,8,10,11,12,13,14,15,
24,25,26,27,28,29
);

UPDATE Produto SET codCategoria = 3 WHERE CodigoBarras IN (
30,31,32,33,34,35,36,37,38
);

UPDATE Produto SET codCategoria = 2 WHERE CodigoBarras IN (
17,18,19,
39,40,
48,49,50,
51,52,53
);

UPDATE Produto SET codCategoria = 4 WHERE CodigoBarras IN (
20,21,22,23,
41,42,43,44,45,46,47,58
);


SELECT CodigoBarras, NomeProd, codCategoria FROM Produto;


SELECT CodigoBarras, NomeProd FROM Produto;


create table tipoProduto(
codTipoProduto int primary key auto_increment,
TipoProduto varchar(255) not null,
codCategoria int, -- fk
foreign key (codCategoria) references Categoria(codCategoria)
);
 
 create table Venda(
IdVenda int primary key auto_increment,
NomeProd varchar(250) not null,
ValorTotal decimal(9,2) not null,
DataVenda Datetime,
IdUser int,
NF int,
IdEntrega int
);
 
 create table VendaProduto(
 valorItem decimal(9,2),
 Qtd int,
 CodigoBarras bigint,
 IdVenda int
 );
 
 create table NotaFiscal (
 NF int primary key auto_increment,
 TotalNota decimal(9,2),
 DataEmissao date not null
);

SHOW COLUMNS FROM Produto;

 
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

 
 
 
 
 
 
 

ALTER TABLE Produto 
ADD COLUMN codCategoria INT,
ADD COLUMN codTipoProduto INT,
ADD CONSTRAINT fk_Produto_Categoria FOREIGN KEY (codCategoria) REFERENCES Categoria(codCategoria),
ADD CONSTRAINT fk_Produto_TipoProduto FOREIGN KEY (codTipoProduto) REFERENCES tipoProduto(codTipoProduto);

 
 -- Criando as chaves  Foreign key 
 
 Alter table Endereco
 add Constraint fk_IdBairro_Endereco foreign key (IdBairro) references Bairro(IdBairro),
 add Constraint fk_IdCidade_Endereco foreign key (IdCidade) references Cidade(IdCidade),
 add Constraint fk_IdEstado_Endereco foreign key (IdEstado) references Estado(IDUF),
 add Constraint fk_IdUser_Endereco foreign key (IdUser) References Usuario(IdUser) on delete set null;
 
 alter table Usuario add constraint fk_IdEndereco_Usuario foreign key(IdEndereco) references Endereco(IdEndereco);
 
 alter table VendaProduto add constraint fk_Codigobarras_Vendaproduto foreign key(CodigoBarras) references Produto(CodigoBarras),
 add constraint fk_IdVenda_Vendaproduto foreign key (IdVenda) references Venda(IdVenda);
 
 alter table Venda 
 add Constraint fk_IdUser_Venda foreign key (IdUser) references Usuario(IdUser),
 add Constraint fk_NF_Venda foreign key (NF) references NotaFiscal(NF),
 add Constraint fk_IdEntrega_Venda foreign key (IdEntrega) references Entrega(IdEntrega);
 
 
 -- Criando as Procedures
 delimiter $$
 create  procedure InsertCidade(
 in vCidade varchar(200)
 )
 begin 
  if not exists(select Cidade from Cidade where Cidade = vCidade) then
  
   insert into Cidade (Cidade) values (vCidade);
	else select("essa cidade ja está registrada");
   end if ;
   
 end  
 
 $$
 
 
 
  delimiter $$
 create  procedure InsertBairro(
 in vBairro varchar(200)
 )
 begin 
  if not exists(select Bairro from Bairro where Bairro = vBairro) then
  
   insert into Bairro (Bairro) values (vBairro);
	else select("esse Bairro ja está registrado");
   end if ;
   
 end  ;
 
 $$
 
 call InsertBairro ("Novo Horizonte");
 
 
 
  delimiter $$

-- Nessa parte é legal colocar todos os UFs, para colocar num selectzão que fica legal. Vou colocar o código com os inserts aqui, fica a critério de vocês utilizar ou não.
-- É melhor hard codar essa parte pq o usuário é burro.

INSERT INTO Estado (UF) VALUES ('AC');
INSERT INTO Estado (UF) VALUES ('AL');
INSERT INTO Estado (UF) VALUES ('AP');
INSERT INTO Estado (UF) VALUES ('AM');
INSERT INTO Estado (UF) VALUES ('BA');
INSERT INTO Estado (UF) VALUES ('CE');
INSERT INTO Estado (UF) VALUES ('DF');
INSERT INTO Estado (UF) VALUES ('ES');
INSERT INTO Estado (UF) VALUES ('GO');
INSERT INTO Estado (UF) VALUES ('MA');
INSERT INTO Estado (UF) VALUES ('MT');
INSERT INTO Estado (UF) VALUES ('MS');
INSERT INTO Estado (UF) VALUES ('MG');
INSERT INTO Estado (UF) VALUES ('PA');
INSERT INTO Estado (UF) VALUES ('PB');
INSERT INTO Estado (UF) VALUES ('PR');
INSERT INTO Estado (UF) VALUES ('PE');
INSERT INTO Estado (UF) VALUES ('PI');
INSERT INTO Estado (UF) VALUES ('RJ');
INSERT INTO Estado (UF) VALUES ('RN');
INSERT INTO Estado (UF) VALUES ('RS');
INSERT INTO Estado (UF) VALUES ('RO');
INSERT INTO Estado (UF) VALUES ('RR');
INSERT INTO Estado (UF) VALUES ('SC');
INSERT INTO Estado (UF) VALUES ('SP');
INSERT INTO Estado (UF) VALUES ('SE');
INSERT INTO Estado (UF) VALUES ('TO');
INSERT INTO Categoria (Categoria) values ('Maquiagens');
INSERT INTO Categoria (Categoria) values ('Skincare');
INSERT INTO Categoria (Categoria) values ('Cabelo');
INSERT INTO Categoria (Categoria) values ('Corpo');
insert into tipoProduto  (TipoProduto,codCategoria) values ('Gloss',1);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Corretivo',1);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Base',1);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Rimel',1);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Batom',1);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Blush',1);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Hidratante fácial',2);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Prime',2);
insert into tipoProduto  (TipoProduto,codCategoria) values ('esfoliante facial',2);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Protetor',2);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Shampoo',3);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Condicionador',3);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Óleo',3);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Hidratante capilar',3);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Creme hidratante',4);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Desodorante',4);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Esfoliante',4);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Perfume',4);
insert into tipoProduto  (TipoProduto,codCategoria) values ('Creme de Barbear',4);


 create  procedure InsertEstado(
 in vUF char(2)
 )
 begin 
  if not exists(select UF from Estado where UF = vUF) then
  
   insert into Estado (UF) values (vUF);
	else select("esse Estado ja está registrado");
   end if ;
   
 end  ;
 
 $$
 
 call InsertEstado ("SP");
 
 CEP varchar(9) ,
Logradouro varchar(200) not null,
numero varchar(11) ,
complemento varchar(155),
IdBairro int not null,
IdCidade int not null,
IdEstado int not null,
IdUser int not null
 
 delimiter $$
  create  procedure insertEndereco(
  in vCEP varchar(9),
  in vLogradouro varchar(200),
  in vNumero int ,
  in vComplemento varchar(155),
  in vCidade varchar(200),
  in vBairro varchar(200),
    in vUF char(2)
  )
  begin
    Declare dBairro int ;
    Declare dCidade int ;
    Declare dEstado int ;
    
    
    if not exists(select CEP from endereco where CEP = vCEP) then
	-- verifica ao registra um endereço se existe as informações das colunas foreign keys
    -- Bairro  
    if not exists(select IdBairro from bairro where Bairro = vBairro) then
    insert into Bairro(Bairro) values (vBairro);
     end if;
     set dBairro := (select IdBairro From Bairro where Bairro = vBairro);
     
      if not exists(select IdCidade from Cidade where Cidade = vCidade) then
    insert into Cidade(Cidade) values (vCidade);
     end if;
     set dCidade := (select IdCidade From Cidade where Cidade = vCidade);
     
      if not exists(select IdUF from Estado where UF = vUF) then
    insert into Estado(UF) values (vUF);
     end if;
     set dEstado := (select IdUF From Estado where UF = vUF);
     insert into Endereco (CEP,Logradouro,numero,complemento,IdBairro,IdCidade,IdEstado) values (vCEP,vLogradouro,vNumero,vComplemento,dBairro,dCidade,dEstado);
      else select("esse Endereço já está registrado!");
   end if ;
  end ;
   $$
   
   delimiter ;
 
 call insertEndereco ('06340250','Rua Do Jão','12','A','Lapa','Morro Salgado','sp');
 delimiter $$
 create procedure InsertFuncionario(
 in vNome varchar(250),
 in vEmail varchar(150),
 in vSenha varchar(2250)
 )
 begin
    if not exists (select IdFun from funcionario where Email = vEmail) then
    insert into Funcionario (Nome,Email,Senha)values (vNome,vEmail,vSenha);
    else select("Este Funcionario já está registrado, por favor use outro email não registrado");
    end if ;
 end ;
 $$
 
 call InsertFuncionario ('Daniel','Daniel.Admin@email.com','1234');
 select * from Funcionario ;
 
 

-- Usuario
 
 delimiter $$
 create  procedure insertUsuario (
 in vNome varchar(250),
 in vEmail varchar(150),
 in vCPF varchar(12),
 in vSenha varchar(250),
 in vRole varchar(20),
 in vSexo varchar(20),
 in vFoto varchar(255)
 )
begin
 
   if not exists (select IdUser from Usuario where CPF = vCPF ) then
   
     insert into Usuario (Nome,Email,Foto,CPF,Senha,Sexo,Role,Ativo) values (vNome,vEmail,vFoto,vCPF,vSenha,vSexo,vRole,1);
     else select("Esse Usuario já está registrado");
     end if;
end ;
$$

call insertCliente("Daniel","Daniel@email.com","124-574-242-21","12345","Admin","Masculino");


Usuario
delimiter $$
create procedure selectUsuario()
begin
 
select IdUser, Nome,Email,Senha,Sexo,CPF,Role from Usuario order by Nome; 
end $$

call selectUsuario;





create procedure obterUsuario (in vId int)
begin
  select IdUser,Nome,Email,Senha,Sexo,CPF from Usuario where IdUser = vId;
end $$	

	
create procedure updateUsuario(
in vIdUser int, in vNome varchar(200), in vEmail varchar(150),in vSenha varchar(250),vSexo varchar(20),vCEP int
)
begin
    update Usuario set Nome = vNome, Email = vEmail, Senha = vSenha, Sexo = vSexo, CPF = vCPF,CEP = vCEP  where IdUser = vIdUser;
end $$




create procedure DeleteUsuario(in vIdUser int)
begin
  if exists (select IdUser from Usuario where IdUser = vIdUser)then
	 delete  from Usuario  where IdUser = vIdUser ;
     else select('Não existe este Usuario');
     end if ;
end $$

-- Produtos

delimiter $$
create   procedure selectProdutos()
begin
  select 
    p.CodigoBarras,
    p.NomeProd,
    p.qtd,
    p.Descricao,
    p.ValorUnitario,
    p.Foto,
    p.Genero,
    c.Categoria as NomeCategoria,
    t.TipoProduto as NomeTipoProduto
  from Produto p
  left join Categoria c on p.codCategoria = c.codCategoria
  left join tipoProduto t on p.codTipoProduto = t.codTipoProduto
  order by p.NomeProd;
end$$
delimiter ;

delimiter $$ 
create  procedure updateProduto(
  in vCodigo bigint,
  in vNome varchar(200),
  in vQtd int,
  in vDesc varchar(250),
  in vValor decimal(9,2),
  in vRole enum('Masculino','Feminino','Unissex'),
  in vCodCategoria int,
  in vCodTipoProduto int,
   in vFoto varchar(255)
)
begin
  if exists(select CodigoBarras from Produto where CodigoBarras = vCodigo) then
  
    update Produto 
    set NomeProd = vNome,
        qtd = vQtd,
        Descricao = vDesc,
        ValorUnitario = vValor,
        Foto = vFoto,
        Genero = vRole,
        codCategoria = vCodCategoria,
        codTipoProduto = vCodTipoProduto
    where CodigoBarras = vCodigo;
    
  else
    select 'Produto não encontrado' as Mensagem;
  end if;
end$$
delimiter ;


delimiter $$
create procedure deleteProduto(in vCodigo bigint)
begin
  if exists(select CodigoBarras from Produto where CodigoBarras = vCodigo) then
    delete from Produto where CodigoBarras = vCodigo;
  else
    select 'Produto não encontrado';
  end if;
end$$
delimiter ;

delimiter $$
create  procedure selectProdutosPorCategoria(in vCodCategoria int)
begin
  select 
    p.CodigoBarras, p.NomeProd, p.qtd, p.Descricao, p.ValorUnitario, p.Foto, p.Genero,
    c.Categoria, t.TipoProduto
  from Produto p
  join Categoria c on p.codCategoria = c.codCategoria
  join tipoProduto t on p.codTipoProduto = t.codTipoProduto
  where p.codCategoria = vCodCategoria
  order by p.NomeProd;
end$$
delimiter ;

delimiter $$
create  procedure selectProdutosPorTipo(in vCodTipoProduto int)
begin
  select 
    p.CodigoBarras, p.NomeProd, p.qtd, p.Descricao, p.ValorUnitario, p.Foto, p.Genero,
    c.Categoria, t.TipoProduto
  from Produto p
  join Categoria c on p.codCategoria = c.codCategoria
  join tipoProduto t on p.codTipoProduto = t.codTipoProduto
  where p.codTipoProduto = vCodTipoProduto
  order by p.NomeProd;
end$$
delimiter ;





delimiter $$ 
create  procedure insertProduto(
  in vCodigoBarras bigint,
  in vNomeProd varchar(200),
  in vQtd int,
  in vFoto varchar(255),
  in vDescricao varchar(250),
  in vValorUnitario decimal(7,2),
  in vRole enum('Masculino','Feminino','Unissex'),
  in vCodCategoria int,
  in vCodTipoProduto int
)
begin
  if not exists(select CodigoBarras from Produto where CodigoBarras = vCodigoBarras) then
  
    if exists(select codCategoria from Categoria where codCategoria = vCodCategoria)
       and exists(select codTipoProduto from tipoProduto where codTipoProduto = vCodTipoProduto) then
    
      insert into Produto 
      (CodigoBarras, NomeProd, qtd, Descricao, ValorUnitario, Genero, codCategoria, codTipoProduto,Foto)
      values 
      (vCodigoBarras, vNomeProd, vQtd, vDescricao, vValorUnitario, vRole, vCodCategoria, vCodTipoProduto,vFoto);
      
    else 
      select 'Categoria ou Tipo de Produto inválido' as Mensagem;
    end if;
    
  else 
    select 'Produto já está registrado' as Mensagem;
  end if;
end$$
delimiter ;

call insertProduto (254932837248,'Pergume Lavuar',25,'Pergume lAVOUAR',12.2)


delimiter $$
create procedure addCarrinho(
  in vIdUser int,
  in vCodigo bigint,
  in vQtd int
)
begin
  if exists(select CodigoBarras from Produto where CodigoBarras = vCodigo) then
    if exists(select IdCarrinho from Carrinho where IdUser = vIdUser and IdProd = vCodigo) then
      update Carrinho set Qtd = Qtd + vQtd 
      where IdUser = vIdUser and IdProd = vCodigo;
    else
      insert into Carrinho (IdUser, IdProd, Qtd) values (vIdUser, vCodigo, vQtd);
    end if;
  else
    select 'Produto inexistente';
  end if;
end$$
delimiter ;

delimiter $$
create procedure selectCarrinho(in vIdUser int)
begin
  select c.IdCarrinho, p.NomeProd,p.Foto, c.Qtd, p.ValorUnitario, (p.ValorUnitario * c.Qtd) as Subtotal
  from Carrinho c
  join Produto p on c.IdProd = p.CodigoBarras
  where c.IdUser = vIdUser;
end$$
delimiter ;

delimiter $$
create procedure deleteCarrinhoItem(in vIdCarrinho int)
begin
  delete from Carrinho where IdCarrinho = vIdCarrinho;
end$$
delimiter ;


 use dbilumina ;

flush privileges;
