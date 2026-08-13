import React, { useState, useEffect } from "react";
import { X, Minus, Plus, Check } from "lucide-react";
import type { Prato } from "../data/pratos.mock";
import type { SelectedOptional } from "../store/cart.store";
import comidaExemplo from "@/assets/comida-exemplo.jfif";

interface ProductCustomizerModalProps {
  product: Prato | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    product: Prato,
    quantity: number,
    optionals: SelectedOptional[],
    notes: string
  ) => void;
}

type OptionalItem = {
  id: string;
  name: string;
  price: number;
};

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<OptionalItem | null>(null);
  const [selectedAdditionals, setSelectedAdditionals] = useState<OptionalItem[]>([]);
  const [notes, setNotes] = useState("");

  // Reseta estados quando o modal abre/muda de produto
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setNotes("");
      setSelectedAdditionals([]);
      
      // Se for café, pré-seleciona o tamanho Pequeno
      if (product.categoria.toLowerCase().includes("café")) {
        setSelectedSize({ id: "size-peq", name: "Pequeno (30ml)", price: 0 });
      } else {
        setSelectedSize(null);
      }
    }
  }, [product, isOpen]);

  // Fechar no Esc
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!product || !isOpen) return null;

  // Definição dos opcionais dinâmicos com base na categoria
  const sizes: OptionalItem[] = product.categoria.toLowerCase().includes("café")
    ? [
        { id: "size-peq", name: "Pequeno (30ml)", price: 0 },
        { id: "size-med", name: "Médio (150ml)", price: 3.5 },
        { id: "size-gde", name: "Grande (300ml)", price: 5.5 },
      ]
    : [];

  const additionals: OptionalItem[] = product.categoria.toLowerCase().includes("café")
    ? [
        { id: "add-esp", name: "Espresso Extra", price: 4.5 },
        { id: "add-chan", name: "Chantilly Cremoso", price: 3.0 },
        { id: "add-aveia", name: "Leite de Aveia", price: 3.0 },
      ]
    : product.categoria.toLowerCase().includes("doce") || product.categoria.toLowerCase().includes("folhado")
    ? [
        { id: "add-calda", name: "Calda Extra de Frutas Vermelhas", price: 4.0 },
        { id: "add-sorv", name: "Bola de Sorvete de Creme", price: 7.5 },
        { id: "add-mel", name: "Fio de Mel Silvestre", price: 2.0 },
      ]
    : [
        { id: "add-queijo", name: "Queijo Tulha Ralado", price: 3.5 },
        { id: "add-torrada", name: "Torradas Extras de Sourdough", price: 6.0 },
      ];

  // Handlers
  const handleToggleAdditional = (item: OptionalItem) => {
    setSelectedAdditionals((prev) =>
      prev.some((x) => x.id === item.id)
        ? prev.filter((x) => x.id !== item.id)
        : [...prev, item]
    );
  };

  const handleConfirm = () => {
    const optionals: SelectedOptional[] = [];
    if (selectedSize) optionals.push(selectedSize);
    optionals.push(...selectedAdditionals);
    
    onConfirm(product, quantity, optionals, notes);
    onClose();
  };

  // Preço total dos opcionais selecionados
  const optionalsTotal =
    (selectedSize?.price || 0) +
    selectedAdditionals.reduce((acc, item) => acc + item.price, 0);

  // Preço total unitário (Preço base + opcionais)
  const unitPrice = product.preco + optionalsTotal;
  
  // Preço final (Unitário * Quantidade)
  const totalPrice = unitPrice * quantity;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center p-0 md:p-4 overflow-hidden">
      {/* Overlay escurecido */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
        onClick={onClose} 
      />

      {/* Caixa do Modal */}
      <div className="bg-surface text-text w-full max-h-[90vh] md:max-h-[85vh] md:max-w-[500px] rounded-t-3xl md:rounded-3xl border-t md:border border-line flex flex-col shadow-2xl transition-all relative z-10 overflow-hidden">
        
        {/* Banner de Imagem Superior */}
        <div className="relative h-44 md:h-48 w-full bg-bg flex-shrink-0">
          <img
            src={comidaExemplo}
            alt={product.nome}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30" />
          
          {/* Botão de Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/45 hover:bg-black/60 text-white backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Informações Básicas do Produto */}
        <div className="px-6 pb-2 pt-1 border-b border-line/20 flex-shrink-0">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {product.categoria}
          </span>
          <h2 className="text-xl font-bold mt-0.5">{product.nome}</h2>
          <p className="text-sm text-text-soft mt-1 leading-relaxed line-clamp-2">
            {product.descricao}
          </p>
        </div>

        {/* Opções Personalizáveis (Conteúdo com Scroll) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          
          {/* SEÇÃO 1: Escolha do tamanho (Se houver) */}
          {sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wider">Tamanho</h3>
                <span className="text-xs text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-full">
                  Obrigatório
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => {
                  const isSelected = selectedSize?.id === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-accent bg-accent/5 text-text font-bold shadow-[0_2px_8px_rgba(194,65,12,0.15)]"
                          : "border-line/30 bg-bg text-text hover:border-line/60"
                      }`}
                    >
                      <span className="text-xs">{size.name}</span>
                      <span className="text-xs text-accent font-bold mt-1">
                        {size.price > 0 ? `+ ${formatPrice(size.price)}` : "Grátis"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEÇÃO 2: Adicionais (Se houver) */}
          {additionals.length > 0 && (
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider">Adicionais</h3>
                <p className="text-xs text-text-soft mt-0.5">Selecione as opções que deseja acrescentar.</p>
              </div>
              <div className="space-y-2">
                {additionals.map((item) => {
                  const isChecked = selectedAdditionals.some((x) => x.id === item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleToggleAdditional(item)}
                      className={`flex items-center justify-between w-full p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                        isChecked
                          ? "border-accent bg-accent/5 text-text"
                          : "border-line/30 bg-bg text-text hover:border-line/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-5 w-5 rounded-lg border flex items-center justify-center transition-all ${
                            isChecked
                              ? "bg-accent border-accent text-accent-fg"
                              : "border-line/40 bg-surface"
                          }`}
                        >
                          {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold">{item.name}</span>
                      </div>
                      <span className="text-xs font-bold text-accent">
                        + {formatPrice(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEÇÃO 3: Observações */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider">Observações</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem açúcar, bem quente, sem gelo, etc..."
              maxLength={140}
              className="w-full rounded-xl border border-line/30 bg-bg p-3 text-xs text-text placeholder-text-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all h-20 resize-none"
            />
            <div className="text-right text-[10px] text-text-soft">
              {notes.length}/140 caracteres
            </div>
          </div>
        </div>

        {/* Rodapé Fixo */}
        <div className="px-6 py-5 border-t border-line bg-surface flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 flex-shrink-0 rounded-b-3xl md:rounded-b-none">
          {/* Seletor de Quantidade do Prato */}
          <div className="flex items-center justify-between sm:justify-start gap-3 bg-bg border border-line rounded-xl p-1.5 w-full sm:w-auto">
            <span className="text-xs font-semibold text-text-soft sm:hidden pl-2">Quantidade</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-text-soft hover:text-text hover:bg-surface transition-colors disabled:opacity-30 cursor-pointer"
                aria-label="Reduzir quantidade"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-black w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-text-soft hover:text-text hover:bg-surface transition-colors cursor-pointer"
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Botão de Confirmação */}
          <button
            onClick={handleConfirm}
            className="flex-1 bg-accent text-accent-fg hover:bg-accent/90 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md active:scale-[0.98] cursor-pointer flex justify-between items-center w-full sm:w-auto"
          >
            <span>Adicionar ao pedido</span>
            <span>{formatPrice(totalPrice)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
