import React from "react";
import type { ProductListItem } from "../types/catalog.types";

interface ProductCardProps {
  product: ProductListItem;
  onAddToCart?: (product: ProductListItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line/20 bg-surface/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface/60 hover:shadow-[0_12px_30px_-15px_rgba(194,65,12,0.15)]">
      {/* Imagem do Produto */}
      <div className="relative aspect-square overflow-hidden bg-header">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-header via-transparent to-transparent opacity-80" />

        {/* Categoria tag */}
        <span className="absolute top-3 left-3 rounded-full bg-header/80 px-3 py-1 text-xs font-medium text-accent-fg/90 backdrop-blur-md border border-line/20">
          {product.category}
        </span>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-header/80 px-2 py-1 text-xs font-semibold text-accent backdrop-blur-md border border-line/20">
          <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {product.rating.toFixed(1)}
        </div>

        {/* Disponibilidade */}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-header/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-error/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-error-fg shadow-lg border border-error/20">
              Esgotado
            </span>
          </div>
        )}
      </div>

      {/* Detalhes do Produto */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-text-soft leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Preço e Ação */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-line/20">
          <span className="text-xl font-black text-accent">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => product.available && onAddToCart?.(product)}
            disabled={!product.available}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              product.available
                ? "bg-accent text-accent-fg hover:bg-accent/90 hover:shadow-[0_0_15px_rgba(194,65,12,0.4)] cursor-pointer"
                : "bg-surface text-text-soft cursor-not-allowed"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
