export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  status: 'active' | 'inactive' | 'archived';
  price: string;
  stock: number;
  availableAt: Date;
}

export interface FilterParams {
  minPrice?: string;
  maxPrice?: string;
  name?: string;
  offset: number;
}

export interface GetProductsParams {
  filters?: FilterParams;
  limit: number;
  offset: number;
}
