import { api } from "@/services/api";
import type { 
  GetProductsRequest, 
  GetProductsResponse, 
  GetCategoriesResponse 
} from "../types/catalog.types";

export const catalogService = {
  async getProducts(params: GetProductsRequest): Promise<GetProductsResponse> {
    const response = await api.get("/catalog/products", { params });
    return response.data;
  },

  async getCategories(): Promise<GetCategoriesResponse> {
    const response = await api.get("/catalog/categories");
    return response.data;
  }
};
