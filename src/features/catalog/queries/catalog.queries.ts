import { useQuery } from "@tanstack/react-query";
import { catalogService } from "../services/catalog.service";
import { catalogKeys } from "../keys/catalog.keys";
import type { GetProductsRequest } from "../types/catalog.types";

export function useCatalogGetProducts(params: GetProductsRequest) {
  return useQuery({
    queryKey: catalogKeys.getProducts(params),
    queryFn: () => catalogService.getProducts(params),
  });
}

export function useCatalogGetCategories() {
  return useQuery({
    queryKey: catalogKeys.getCategories(),
    queryFn: () => catalogService.getCategories(),
  });
}
