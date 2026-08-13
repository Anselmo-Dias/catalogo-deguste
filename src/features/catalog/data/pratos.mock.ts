export type Prato = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  ingredientes: string[];
  imagem?: string;
};

export const PRATOS_MOCK: Prato[] = [
  // ── Refeições ───────────────────────────────────────────────
  { id: "1", nome: "Executivo Individual", descricao: "Refeição completa para uma pessoa.", preco: 30.00, categoria: "Refeições", ingredientes: ["arroz", "feijão", "proteína", "acompanhamentos"], imagem: "/imagens/refeicao.jpg" },
  { id: "2", nome: "Comercial para 2", descricao: "Acompanha proteínas e acompanhamentos.", preco: 75.00, categoria: "Refeições", ingredientes: ["arroz", "feijão", "macarrão", "farofa", "salada"], imagem: "/imagens/pratocomercial.jpg" },
  { id: "3", nome: "Comercial para 3", descricao: "Acompanha proteínas e acompanhamentos.", preco: 105.00, categoria: "Refeições", ingredientes: ["arroz", "feijão", "macarrão", "farofa", "salada"], imagem: "/imagens/pratocomercial.jpg" },
  { id: "4", nome: "Comercial para 4", descricao: "Acompanha proteínas e acompanhamentos.", preco: 135.00, categoria: "Refeições", ingredientes: ["arroz", "feijão", "macarrão", "farofa", "salada"], imagem: "/imagens/pratocomercial.jpg" },

  // ── Especiais ─────────────────────────────────────────────
  { id: "moq-1", nome: "Moqueca de Camarão (P)", descricao: "Tamanho pequeno.", preco: 45.00, categoria: "Especiais", ingredientes: ["camarão", "azeite de dendê", "leite de coco", "pimentão"], imagem: "/imagens/moqueca-2.jpg" },
  { id: "moq-2", nome: "Moqueca de Camarão (M)", descricao: "Tamanho médio.", preco: 85.00, categoria: "Especiais", ingredientes: ["camarão", "azeite de dendê", "leite de coco", "pimentão"], imagem: "/imagens/moqueca-2.jpg" },
  { id: "moq-3", nome: "Moqueca de Camarão (G)", descricao: "Tamanho grande.", preco: 123.00, categoria: "Especiais", ingredientes: ["camarão", "azeite de dendê", "leite de coco", "pimentão"], imagem: "/imagens/moqueca-2.jpg" },
  { id: "feij-1", nome: "Feijoada (P)", descricao: "Tamanho pequeno.", preco: 43.00, categoria: "Especiais", ingredientes: ["feijão", "carnes", "couve", "arroz"], imagem: "/imagens/feijoada2.jpg" },
  { id: "feij-2", nome: "Feijoada (M)", descricao: "Tamanho médio.", preco: 80.00, categoria: "Especiais", ingredientes: ["feijão", "carnes", "couve", "arroz"], imagem: "/imagens/feijoada2.jpg" },
  { id: "feij-3", nome: "Feijoada (G)", descricao: "Tamanho grande.", preco: 117.00, categoria: "Especiais", ingredientes: ["feijão", "carnes", "couve", "arroz"], imagem: "/imagens/feijoada2.jpg" },
  { id: "peix-1", nome: "Combo de Peixe Frito", descricao: "Delicioso peixe frito inteiro.", preco: 75.00, categoria: "Especiais", ingredientes: ["peixe frito", "salada", "farofa"], imagem: "/imagens/peixe.jpg" },

  // ── Pizzas ─────────────────────────────────────────────────
  { id: "piz-1", nome: "Pizza Família", descricao: "3 Sabores, 12 Fatias.", preco: 65.00, categoria: "Pizzas", ingredientes: ["massa", "queijo", "molho de tomate", "diversos"], imagem: "/imagens/pizza2.jpg" },
  { id: "piz-2", nome: "Pizza Grande", descricao: "2 Sabores, 8 Fatias.", preco: 55.00, categoria: "Pizzas", ingredientes: ["massa", "queijo", "molho de tomate", "diversos"], imagem: "/imagens/pizza2.jpg" },
  { id: "piz-3", nome: "Pizza Média", descricao: "2 Sabores, 6 Fatias.", preco: 45.00, categoria: "Pizzas", ingredientes: ["massa", "queijo", "molho de tomate", "diversos"], imagem: "/imagens/pizza2.jpg" },
  { id: "piz-4", nome: "Pizza Pequena", descricao: "2 Sabores, 4 Fatias.", preco: 35.00, categoria: "Pizzas", ingredientes: ["massa", "queijo", "molho de tomate", "diversos"], imagem: "/imagens/pizza2.jpg" },

  // ── Burguers ─────────────────────────────────────────────
  { id: "burg-1", nome: "Hamburguer do Deguste", descricao: "Hambúrguer clássico da casa.", preco: 8.00, categoria: "Burguers", ingredientes: ["pão", "carne", "cebola", "tomate", "alface", "batata palha"], imagem: "/imagens/burguer.jpg" },
  { id: "burg-2", nome: "X-Deguste", descricao: "Com queijo e presunto.", preco: 12.00, categoria: "Burguers", ingredientes: ["pão", "carne", "queijo", "presunto", "cebola", "tomate", "alface", "batata palha"], imagem: "/imagens/burguer.jpg" },
  { id: "burg-3", nome: "Deguste Bacon Burguer", descricao: "Com adicional de bacon e ovo.", preco: 18.00, categoria: "Burguers", ingredientes: ["pão", "carne", "queijo", "presunto", "ovo", "bacon", "cebola", "tomate", "alface", "batata palha"], imagem: "/imagens/burguer.jpg" },
  { id: "burg-4", nome: "Deguste Big Burguer", descricao: "Tamanho gigante com duas carnes (bovina e frango).", preco: 25.00, categoria: "Burguers", ingredientes: ["pão", "carne bovina", "frango", "calabresa", "bacon", "queijo", "presunto", "ovo", "cebola", "tomate", "alface", "batata palha"], imagem: "/imagens/burguer.jpg" },

  // ── Petiscos ─────────────────────────────────────────────────
  { id: "pet-1", nome: "Camarão ao Alho e Óleo", descricao: "Porção de camarão no alho e óleo.", preco: 26.00, categoria: "Petiscos", ingredientes: ["camarão", "alho", "óleo"], imagem: "/imagens/camaraoalho.jpg" },
  { id: "pet-2", nome: "Filé com Fritas", descricao: "Tiras de carne acebolada com batata.", preco: 39.00, categoria: "Petiscos", ingredientes: ["filé", "batata frita", "cebola"], imagem: "/imagens/file-fritas.jpg" },
  { id: "pet-3", nome: "Batata Frita Recheada", descricao: "Porção de batata frita especial.", preco: 30.00, categoria: "Petiscos", ingredientes: ["batata frita", "queijo", "bacon"], imagem: "/imagens/batata.jpg" },

  // ── Bebidas e Drinks ────────────────────────────────────────────────
  { id: "beb-1", nome: "Coca Cola 2L", descricao: "Refrigerante.", preco: 17.00, categoria: "Bebidas", ingredientes: [], imagem: "/imagens/refrigerante.jpg" },
  { id: "beb-2", nome: "Heineken 330ml", descricao: "Cerveja long neck.", preco: 12.00, categoria: "Bebidas", ingredientes: [], imagem: "/imagens/heineken.jpg" },
  { id: "beb-3", nome: "Suco 400ml", descricao: "Suco natural.", preco: 10.00, categoria: "Bebidas", ingredientes: [], imagem: "/imagens/suco.jpg" },
  { id: "drk-1", nome: "Céu de Morango", descricao: "Drink refrescante de morango.", preco: 17.00, categoria: "Bebidas", ingredientes: ["ice drink blue", "gim", "suco de limão", "morangos"], imagem: "/imagens/drink1.jpg" },
  { id: "drk-2", nome: "Smirnoff Cream", descricao: "Drink cremoso de vodka.", preco: 18.00, categoria: "Bebidas", ingredientes: ["smirnoff", "leite condensado", "morango"], imagem: "/imagens/drink2.jpg" },

  // ── Doces ────────────────────────────────────────────────
  { id: "doc-1", nome: "Pudim", descricao: "Pudim caseiro.", preco: 6.00, categoria: "Doces", ingredientes: ["leite condensado", "ovos", "leite"], imagem: "/imagens/pudim.jpg" },
  { id: "doc-2", nome: "Brigadeiro", descricao: "Brigadeiro tradicional.", preco: 10.00, categoria: "Doces", ingredientes: ["chocolate", "leite condensado", "manteiga"], imagem: "/imagens/brigadeiro.jpg" }
];
