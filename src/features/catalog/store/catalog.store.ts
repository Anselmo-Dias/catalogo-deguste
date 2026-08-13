// Store para controle de estados globais ou locais da feature se necessário.
// Pode ser substituído por Zustand, Jotai, Redux ou React Context.

export type CatalogFilters = {
  category: string;
  search: string;
  page: number;
  limit: number;
};

export const INITIAL_FILTERS: CatalogFilters = {
  category: "",
  search: "",
  page: 1,
  limit: 6,
};
