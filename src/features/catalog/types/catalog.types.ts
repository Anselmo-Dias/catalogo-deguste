export type ProductListItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  available: boolean;
  rating: number;
};

export type GetProductsRequest = {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
};

export type GetProductsResponse = {
  status: number;
  token: string | null;
  err: number;
  data: {
    items: ProductListItem[];
    total: number;
    page: number;
    limit: number;
  };
  msg: string;
};

export type GetCategoriesResponse = {
  status: number;
  token: string | null;
  err: number;
  data: string[];
  msg: string;
};
