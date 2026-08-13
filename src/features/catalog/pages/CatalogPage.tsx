import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { Header } from "../components/Header";
import { CartDrawer } from "../components/CartDrawer";
import { ProductCustomizerModal } from "../components/ProductCustomizerModal";
import { useCartStore } from "../store/cart.store";
import type { SelectedOptional } from "../store/cart.store";
import { PRATOS_MOCK } from "../data/pratos.mock";
import type { Prato } from "../data/pratos.mock";
import comidaExemplo from "@/assets/comida-exemplo.jfif";

// ── Utilitário de busca ───────────────────────────────────────
// Remove acentos (NFD + strip combining marks U+0300–U+036F)
const normalizeText = (str: string) =>
  str.normalize("NFD").replace(/\p{Mn}/gu, "").toLowerCase();

// ── PratoCard ─────────────────────────────────────────────────
function PratoCard({ prato, onAdd }: { prato: Prato; onAdd: (p: Prato) => void }) {
  const formatPrice = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <article className="group flex flex-col rounded-2xl border border-line/20 bg-surface overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Imagem */}
      <div className="relative h-48 overflow-hidden bg-header shrink-0">
        <img
          src={prato.imagem || comidaExemplo}
          alt={prato.nome}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Corpo */}
      <div className="flex flex-1 flex-col p-md gap-xs">
        {/* Categoria */}
        <span className="text-label-sm font-label-sm text-text-soft uppercase tracking-wider">
          {prato.categoria}
        </span>

        {/* Nome */}
        <h3 className="font-semibold text-text leading-snug">
          {prato.nome}
        </h3>

        {/* Descrição */}
        <p className="text-body-md font-body-md text-text-soft line-clamp-2 flex-1">
          {prato.descricao}
        </p>

        {/* Rodapé do card */}
        <div className="flex items-center justify-between pt-md mt-xs border-t border-line/20">
          <span className="font-bold text-accent text-price-display font-price-display">
            {formatPrice(prato.preco)}
          </span>
          <button
            onClick={() => onAdd(prato)}
            className="flex items-center gap-xs rounded-full bg-accent px-md py-xs text-label-sm font-label-sm text-accent-fg transition-colors hover:bg-accent/90 cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

// ── FilterBar ─────────────────────────────────────────────────
function FilterBar({
  search,
  onSearchChange,
  categorias,
  categoriaAtiva,
  onCategoriaChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  categorias: string[];
  categoriaAtiva: string;
  onCategoriaChange: (v: string) => void;
}) {
  const chip = (active: boolean) =>
    [
      "px-md py-xs rounded-full text-label-sm font-label-sm border transition-all cursor-pointer whitespace-nowrap",
      active
        ? "bg-accent text-accent-fg border-accent"
        : "bg-bg text-text-soft border-line/30 hover:border-accent/50 hover:text-text",
    ].join(" ");

  return (
    <div className="flex flex-col gap-md">
      {/* Campo de busca */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-soft pointer-events-none select-none">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar pratos ou ingredientes..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-line/30 text-text placeholder:text-text-soft focus:border-accent focus:ring-1 focus:ring-accent outline-none text-body-md transition-all"
        />
      </div>

      {/* Badges de categoria — Swiper para scroll horizontal no mobile */}
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={8}
        freeMode
        grabCursor
        className="w-full"
      >
        <SwiperSlide style={{ width: "auto" }}>
          <button className={chip(!categoriaAtiva)} onClick={() => onCategoriaChange("")}>
            Todos
          </button>
        </SwiperSlide>
        {categorias.map((cat) => (
          <SwiperSlide key={cat} style={{ width: "auto" }}>
            <button
              className={chip(categoriaAtiva === cat)}
              onClick={() => onCategoriaChange(cat)}
            >
              {cat}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// ── CatalogPage ───────────────────────────────────────────────
export const CatalogPage: React.FC = () => {
  const {
    items: cartItems,
    isCartOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
  } = useCartStore();

  // Modal de Customização
  const [customizingProduct, setCustomizingProduct] = useState<Prato | null>(null);

  // Filtros do grid (locais — sem store global)
  const [gridSearch, setGridSearch]         = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("");

  // Categorias derivadas do mock (sem duplicatas, ordem de aparição)
  const categorias = useMemo(
    () => [...new Set(PRATOS_MOCK.map((p) => p.categoria))],
    [],
  );

  // Filtro combinado: texto (nome + ingredientes) × categoria
  const pratosFiltrados = useMemo(() => {
    const termo = normalizeText(gridSearch);
    return PRATOS_MOCK.filter((prato) => {
      const matchText =
        !termo ||
        normalizeText(prato.nome).includes(termo) ||
        prato.ingredientes.some((ing) => normalizeText(ing).includes(termo));
      const matchCat = !categoriaAtiva || prato.categoria === categoriaAtiva;
      return matchText && matchCat;
    });
  }, [gridSearch, categoriaAtiva]);

  // Handlers do carrinho
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleAddPrato = (prato: Prato) => {
    setCustomizingProduct(prato);
  };

  const handleConfirmCustomization = (
    prato: Prato,
    quantity: number,
    optionals: SelectedOptional[],
    notes: string
  ) => {
    addItem({
      productId: prato.id,
      name: prato.nome,
      price: prato.preco,
      quantity,
      imageUrl: prato.imagem || comidaExemplo,
      selectedOptionals: optionals,
      notes,
    });
    openCart();
  };

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-accent-fg font-body-md text-body-md">
      {/* Header (sticky, extraído em componente próprio) */}
      <Header cartItemsCount={cartCount} onOpenCart={openCart} />

      {/* Drawer do carrinho */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      {/* Modal de Customização de Prato */}
      <ProductCustomizerModal
        product={customizingProduct}
        isOpen={customizingProduct !== null}
        onClose={() => setCustomizingProduct(null)}
        onConfirm={handleConfirmCustomization}
      />

      {/* Conteúdo principal */}
      <main className="max-w-container-max mx-auto px-lg pb-2xl">
        {/* Barra de filtros */}
        <section className="py-lg border-b border-line/20">
          <FilterBar
            search={gridSearch}
            onSearchChange={setGridSearch}
            categorias={categorias}
            categoriaAtiva={categoriaAtiva}
            onCategoriaChange={setCategoriaAtiva}
          />
        </section>

        {/* Grid de pratos */}
        <section className="py-2xl">
          {pratosFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-2xl gap-md text-center">
              <span
                className="material-symbols-outlined text-text-soft"
                style={{ fontSize: 48 }}
              >
                search_off
              </span>
              <p className="text-body-lg font-body-lg text-text-soft">
                Nenhum prato encontrado
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pratosFiltrados.map((prato) => (
                <PratoCard key={prato.id} prato={prato} onAdd={handleAddPrato} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
