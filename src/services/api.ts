// Mock de API local para simular chamadas de rede com delay e respostas envelopadas
import type { ProductListItem } from '@/features/catalog/types/catalog.types';

// Banco de dados em memória de exemplo para o catálogo
const MOCK_PRODUCTS: ProductListItem[] = [
  // Refeições
  { id: 'prod-1', name: 'Executivo Individual', description: 'Refeição completa para uma pessoa.', price: 30.00, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80', category: 'Refeições', available: true, rating: 5.0 },
  { id: 'prod-2', name: 'Comercial para 2', description: 'Acompanha proteínas, arroz, feijão, macarrão, farofa e salada.', price: 75.00, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80', category: 'Refeições', available: true, rating: 4.8 },
  { id: 'prod-3', name: 'Comercial para 3', description: 'Acompanha proteínas, arroz, feijão, macarrão, farofa e salada.', price: 105.00, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80', category: 'Refeições', available: true, rating: 4.9 },
  { id: 'prod-4', name: 'Comercial para 4', description: 'Acompanha proteínas, arroz, feijão, macarrão, farofa e salada.', price: 135.00, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80', category: 'Refeições', available: true, rating: 5.0 },

  // Moquecas e Feijoada
  { id: 'moq-1', name: 'Moqueca de Camarão (P)', description: 'Deliciosa moqueca de camarão, tamanho pequeno.', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1559841644-08984562005a?w=600&auto=format&fit=crop&q=80', category: 'Especiais', available: true, rating: 4.9 },
  { id: 'moq-2', name: 'Moqueca de Camarão (M)', description: 'Deliciosa moqueca de camarão, tamanho médio.', price: 85.00, imageUrl: 'https://images.unsplash.com/photo-1559841644-08984562005a?w=600&auto=format&fit=crop&q=80', category: 'Especiais', available: true, rating: 4.9 },
  { id: 'moq-3', name: 'Moqueca de Camarão (G)', description: 'Deliciosa moqueca de camarão, tamanho grande.', price: 123.00, imageUrl: 'https://images.unsplash.com/photo-1559841644-08984562005a?w=600&auto=format&fit=crop&q=80', category: 'Especiais', available: true, rating: 5.0 },
  { id: 'feij-1', name: 'Feijoada (P)', description: 'Feijoada completa, tamanho pequeno.', price: 43.00, imageUrl: 'https://images.unsplash.com/photo-1582879304171-82fd42cb4cb4?w=600&auto=format&fit=crop&q=80', category: 'Especiais', available: true, rating: 4.8 },
  { id: 'feij-2', name: 'Feijoada (M)', description: 'Feijoada completa, tamanho médio.', price: 80.00, imageUrl: 'https://images.unsplash.com/photo-1582879304171-82fd42cb4cb4?w=600&auto=format&fit=crop&q=80', category: 'Especiais', available: true, rating: 4.9 },
  { id: 'feij-3', name: 'Feijoada (G)', description: 'Feijoada completa, tamanho grande.', price: 117.00, imageUrl: 'https://images.unsplash.com/photo-1582879304171-82fd42cb4cb4?w=600&auto=format&fit=crop&q=80', category: 'Especiais', available: true, rating: 5.0 },
  { id: 'peix-1', name: 'Combo de Peixe Frito', description: 'Delicioso peixe frito com acompanhamentos.', price: 75.00, imageUrl: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600&auto=format&fit=crop&q=80', category: 'Especiais', available: true, rating: 4.8 },

  // Pizzas
  { id: 'piz-1', name: 'Pizza Família (12 fatias)', description: 'Até 3 sabores. Consulte as opções no cardápio de pizzas.', price: 65.00, imageUrl: 'https://images.unsplash.com/photo-1513104890d38-7c0f474c31e8?w=600&auto=format&fit=crop&q=80', category: 'Pizzas', available: true, rating: 4.9 },
  { id: 'piz-2', name: 'Pizza Grande (8 fatias)', description: 'Até 2 sabores. Consulte as opções.', price: 55.00, imageUrl: 'https://images.unsplash.com/photo-1513104890d38-7c0f474c31e8?w=600&auto=format&fit=crop&q=80', category: 'Pizzas', available: true, rating: 4.8 },
  { id: 'piz-3', name: 'Pizza Média (6 fatias)', description: 'Até 2 sabores. Consulte as opções.', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1513104890d38-7c0f474c31e8?w=600&auto=format&fit=crop&q=80', category: 'Pizzas', available: true, rating: 4.7 },
  { id: 'piz-4', name: 'Pizza Pequena (4 fatias)', description: 'Até 2 sabores. Consulte as opções.', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1513104890d38-7c0f474c31e8?w=600&auto=format&fit=crop&q=80', category: 'Pizzas', available: true, rating: 4.6 },

  // Burguers
  { id: 'burg-1', name: 'Hamburguer do Deguste', description: 'Pão, carne, cebola, tomate, alface, batata palha', price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', category: 'Burguers', available: true, rating: 4.5 },
  { id: 'burg-2', name: 'X-Deguste', description: 'Pão, carne, queijo, presunto, cebola, tomate, alface, batata palha', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', category: 'Burguers', available: true, rating: 4.8 },
  { id: 'burg-3', name: 'Deguste Bacon Burguer', description: 'Pão, carne, queijo, presunto, ovo, bacon, cebola, tomate, alface, batata palha', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80', category: 'Burguers', available: true, rating: 4.9 },
  { id: 'burg-4', name: 'Deguste Big Burguer', description: 'Pão, carne, frango, calabresa, bacon, queijo, presunto, ovo, cebola, tomate, alface, batata palha', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80', category: 'Burguers', available: true, rating: 5.0 },

  // Petiscos
  { id: 'pet-1', name: 'Camarão ao Alho e Óleo', description: 'Porção deliciosa de camarão frito.', price: 26.00, imageUrl: 'https://images.unsplash.com/photo-1625944230945-1b7dd1246ee5?w=600&auto=format&fit=crop&q=80', category: 'Petiscos', available: true, rating: 4.8 },
  { id: 'pet-2', name: 'Filé com Fritas', description: 'Tiras de filé acebolado com batata frita.', price: 39.00, imageUrl: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=600&auto=format&fit=crop&q=80', category: 'Petiscos', available: true, rating: 4.9 },
  { id: 'pet-3', name: 'Batata Frita Recheada', description: 'Porção inteira de batata frita com complementos.', price: 30.00, imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80', category: 'Petiscos', available: true, rating: 4.7 },

  // Bebidas
  { id: 'beb-1', name: 'Coca Cola 2L', description: 'Refrigerante 2 litros', price: 17.00, imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80', category: 'Bebidas', available: true, rating: 4.5 },
  { id: 'beb-2', name: 'Heineken 330ml', description: 'Cerveja long neck', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1614316719525-4a2588385d34?w=600&auto=format&fit=crop&q=80', category: 'Bebidas', available: true, rating: 4.8 },
  { id: 'beb-3', name: 'Suco 400ml', description: 'Suco natural feito na hora', price: 10.00, imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80', category: 'Bebidas', available: true, rating: 4.6 },

  // Drinks
  { id: 'drk-1', name: 'Céu de Morango', description: 'Ice drink blue, Gim, Suco de limão, Morangos', price: 17.00, imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', category: 'Drinks', available: true, rating: 4.9 },
  { id: 'drk-2', name: 'Smirnoff Cream', description: 'Smirnoff, Leite condensado, Morango', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?w=600&auto=format&fit=crop&q=80', category: 'Drinks', available: true, rating: 4.8 },

  // Doces
  { id: 'doc-1', name: 'Pudim', description: 'Pudim caseiro delicioso', price: 6.00, imageUrl: 'https://images.unsplash.com/photo-1590080874088-eec64895b423?w=600&auto=format&fit=crop&q=80', category: 'Doces', available: true, rating: 4.7 },
  { id: 'doc-2', name: 'Brigadeiro', description: 'Brigadeiro tradicional', price: 10.00, imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600&auto=format&fit=crop&q=80', category: 'Doces', available: true, rating: 4.8 }
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async get(url: string, config?: { params?: any }): Promise<{ data: any }> {
    await sleep(800); // Simula o delay da rede

    if (url.startsWith('/catalog/products')) {
      const params = config?.params || {};
      const page = parseInt(params.page || '1', 10);
      const limit = parseInt(params.limit || '6', 10);
      const category = params.category || '';
      const search = params.search || '';

      let filteredItems = [...MOCK_PRODUCTS];

      if (category) {
        filteredItems = filteredItems.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }

      if (search) {
        filteredItems = filteredItems.filter(p => 
          p.name.toLowerCase().includes(search.toLowerCase()) || 
          p.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      const total = filteredItems.length;
      const startIndex = (page - 1) * limit;
      const items = filteredItems.slice(startIndex, startIndex + limit);

      return {
        data: {
          status: 200,
          token: null,
          err: 0,
          msg: '',
          data: {
            items,
            total,
            page,
            limit
          }
        }
      };
    }

    if (url.startsWith('/catalog/categories')) {
      const categories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));
      return {
        data: {
          status: 200,
          token: null,
          err: 0,
          msg: '',
          data: categories
        }
      };
    }

    throw new Error(`404 Not Found: ${url}`);
  },

  async post(_url: string, data?: any): Promise<{ data: any }> {
    await sleep(800);
    // Para mutações e criações futuras
    return {
      data: {
        status: 200,
        token: null,
        err: 0,
        msg: 'Operação realizada com sucesso!',
        data: data
      }
    };
  }
};
