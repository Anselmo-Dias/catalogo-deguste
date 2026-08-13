import React, { useEffect } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import comidaExemplo from "@/assets/comida-exemplo.jfif";

import type { CartItem } from "../store/cart.store";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  // Fechar ao pressionar a tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Formatação de preço em padrão pt-BR
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Cálculo dos totais
  const subtotal = items.reduce((acc, item) => {
    const optionalsPrice = item.selectedOptionals.reduce((sum, opt) => sum + opt.price, 0);
    return acc + (item.price + optionalsPrice) * item.quantity;
  }, 0);
  const total = subtotal; // Conforme especificação, total é por enquanto igual ao subtotal

  const handleCheckout = () => {
    const phoneNumber = "5579981521137";
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";

    items.forEach((item) => {
      message += `*${item.quantity}x ${item.name}*\n`;
      if (item.selectedOptionals && item.selectedOptionals.length > 0) {
        message += `  Opcionais: ${item.selectedOptionals.map(opt => opt.name).join(", ")}\n`;
      }
      if (item.notes) {
        message += `  Obs: ${item.notes}\n`;
      }
    });

    message += `\n*Total: ${formatPrice(total)}*`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay escurecido por trás */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
        onClick={onClose} 
      />

      {/* Painel do Carrinho (Drawer) */}
      <div
        className={`fixed bg-surface text-text flex flex-col transition-transform duration-300 ease-out 
          /* Mobile: Bottom Sheet vindo de baixo */
          bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl border-t border-line shadow-2xl
          /* Desktop/Tablet: Drawer deslizante vindo da direita */
          md:top-0 md:right-0 md:left-auto md:bottom-0 md:w-[450px] md:h-screen md:rounded-l-3xl md:rounded-t-none md:border-l md:border-t-0
          ${isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0"}`}
      >
        {/* Cabeçalho do Carrinho */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold uppercase tracking-wider">Seu pedido</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-bg transition-colors text-text-soft hover:text-text cursor-pointer"
            aria-label="Fechar carrinho"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Lista de Itens (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="h-16 w-16 rounded-full bg-bg border border-line flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-text-soft" />
              </div>
              <p className="text-text font-bold">Seu carrinho está vazio</p>
              <p className="text-text-soft text-sm mt-1 max-w-[250px]">
                Navegue pelo menu e adicione seus pratos favoritos.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-3 border-b border-line/40 last:border-b-0"
              >
                {/* Imagem (Miniatura) */}
                <div className="h-16 w-16 rounded-xl overflow-hidden bg-bg border border-line flex-shrink-0">
                  <img
                    src={comidaExemplo}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Detalhes e Controles */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-bold truncate pr-1">{item.name}</h3>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-text-soft hover:text-error transition-colors p-1 rounded-lg hover:bg-bg cursor-pointer"
                      aria-label={`Remover ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-text-soft mt-0.5">
                    {formatPrice(item.price + item.selectedOptionals.reduce((sum, opt) => sum + opt.price, 0))}
                  </p>

                  {/* Opcionais Selecionados */}
                  {item.selectedOptionals.length > 0 && (
                    <p className="text-[10px] text-text-soft mt-1 leading-tight flex flex-wrap gap-x-1 bg-bg/50 px-2 py-1 rounded border border-line/10">
                      {item.selectedOptionals.map((opt, index) => (
                        <span key={opt.id} className="inline">
                          {opt.name}
                          {index < item.selectedOptionals.length - 1 && " •"}
                        </span>
                      ))}
                    </p>
                  )}

                  {/* Observações */}
                  {item.notes && (
                    <p className="text-[10px] italic text-text-soft/80 mt-1">
                      Obs: "{item.notes}"
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {/* Controle de quantidade: - [qtd] + */}
                    <div className="flex items-center gap-2 bg-bg border border-line rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 text-text-soft hover:text-text hover:bg-surface rounded transition-colors disabled:opacity-30 cursor-pointer"
                        disabled={item.quantity <= 1}
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 text-text-soft hover:text-text hover:bg-surface rounded transition-colors cursor-pointer"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Subtotal da linha */}
                    <span className="text-sm font-bold text-accent">
                      {formatPrice((item.price + item.selectedOptionals.reduce((sum, opt) => sum + opt.price, 0)) * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé Fixo */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-line bg-surface rounded-b-3xl md:rounded-b-none">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-text-soft">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-text">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-accent text-accent-fg hover:bg-accent/90 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
