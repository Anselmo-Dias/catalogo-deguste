import { create } from "zustand";

export type SelectedOptional = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selectedOptionals: SelectedOptional[];
  notes?: string;
};

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

// Gera um ID estável combinando o ID do produto, os opcionais ordenados e as observações
const generateUniqueCartItemId = (
  productId: string,
  optionals: SelectedOptional[],
  notes: string = ""
): string => {
  const sortedOptionalIds = [...optionals]
    .map((o) => o.id)
    .sort()
    .join("-");
  
  // Limpa as observações de espaços para evitar hashes diferentes para o mesmo texto
  const sanitizedNotes = notes.trim().toLowerCase();
  
  return `${productId}_${sortedOptionalIds}_${sanitizedNotes}`;
};

export const useCartStore = create<CartState>((set) => ({
  items: [
    {
      id: "1__",
      productId: "1",
      name: "Bruschetta Caprese",
      price: 28.90,
      quantity: 1,
      imageUrl: "",
      selectedOptionals: [],
      notes: "",
    },
    {
      id: "4__",
      productId: "4",
      name: "Filé Mignon ao Poivre",
      price: 98.00,
      quantity: 1,
      imageUrl: "",
      selectedOptionals: [],
      notes: "",
    },
    {
      id: "7__",
      productId: "7",
      name: "Nhoque de Mandioquinha",
      price: 64.50,
      quantity: 2,
      imageUrl: "",
      selectedOptionals: [],
      notes: "",
    }
  ],
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  
  addItem: (newItem) =>
    set((state) => {
      const cartItemId = generateUniqueCartItemId(
        newItem.productId,
        newItem.selectedOptionals,
        newItem.notes
      );

      const existingIndex = state.items.findIndex((item) => item.id === cartItemId);

      if (existingIndex > -1) {
        // Se já existe um item idêntico, apenas incrementa a quantidade
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += newItem.quantity;
        return { items: updatedItems };
      }

      // Se não existe, adiciona na lista
      return {
        items: [...state.items, { ...newItem, id: cartItemId }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ),
    })),

  clearCart: () => set({ items: [] }),
}));
