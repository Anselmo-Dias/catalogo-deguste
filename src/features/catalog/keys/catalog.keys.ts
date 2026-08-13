import type { GetProductsRequest } from "../types/catalog.types";

export const catalogKeys = {
  all: ["catalog"] as const,
  getProducts: (params: GetProductsRequest) => ["catalog", "getProducts", params] as const,
  getCategories: () => ["catalog", "getCategories"] as const,
};
