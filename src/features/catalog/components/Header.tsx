import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import logoDeguste from "@/assets/logo deguste.jpg";

interface HeaderProps {
  cartItemsCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemsCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para adicionar sombra sutil ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header Principal */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-surface border-b border-line/30 ${
          isScrolled ? "shadow-md py-2 md:py-3" : "py-3 md:py-5"
        }`}
      >
        <div className="mx-auto max-w-container-max px-lg flex items-center justify-between h-14 md:h-16 relative">
          
          {/* MOBILE LAYOUT (Linha única: hambúrguer à esquerda, logo ao centro, carrinho à direita) */}
          <div className="grid grid-cols-3 items-center w-full md:hidden">
            {/* Hambúrguer (Removido) */}
            <div className="flex justify-start">
            </div>

            {/* Logo */}
            <div className="flex justify-center">
              <img
                src={logoDeguste}
                alt="Deguste Logo"
                className="h-10 w-10 rounded-full object-cover border border-line/20 shadow-sm"
              />
            </div>

            {/* Carrinho */}
            <div className="flex justify-end">
              <button
                onClick={onOpenCart}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl text-text hover:bg-bg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
                aria-label={`Carrinho de compras, ${cartItemsCount} itens`}
              >
                <ShoppingBag className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-fg text-[9px] font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* DESKTOP/TABLET LAYOUT */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Logo à esquerda */}
            <div className="flex items-center gap-3">
              <img
                src={logoDeguste}
                alt="Deguste Logo"
                className="h-12 w-12 rounded-full object-cover border border-line/20 shadow-sm"
              />
              <span className="text-xl font-bold tracking-wider uppercase text-text font-display-lg">
                Deguste
              </span>
            </div>

            {/* Slogan ao centro */}
            <div className="absolute left-1/2 -translate-x-1/2 flex justify-center text-center px-4 w-full max-w-[50%] pointer-events-none">
              <span className="text-sm font-semibold text-white italic drop-shadow-md">
                "Sempre Produzindo o Melhor Sabor Feito Para Você!"
              </span>
            </div>

            {/* Carrinho à direita */}
            <div>
              <button
                onClick={onOpenCart}
                className="relative flex h-12 w-12 items-center justify-center rounded-xl text-text hover:bg-bg border border-line/20 transition-all hover:border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
                aria-label={`Carrinho de compras, ${cartItemsCount} itens`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-fg text-[9px] font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
        
        {/* Slogan Mobile */}
        <div className="md:hidden w-full bg-surface border-t border-line/30 py-2 flex justify-center items-center px-4">
          <span className="text-xs font-semibold text-white italic drop-shadow-md text-center">
            "Sempre Produzindo o Melhor Sabor Feito Para Você!"
          </span>
        </div>
      </header>

      {/* Menu Mobile Drawer Removido */}
    </>
  );
};
