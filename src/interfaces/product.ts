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
  page: number;
  pageSize: number;
}

export interface GetProductsParams {
  filters?: FilterParams;
  page: number;
  pageSize: number;
}

export interface ProductPaginationInterface {
  totalPages: number;
}
