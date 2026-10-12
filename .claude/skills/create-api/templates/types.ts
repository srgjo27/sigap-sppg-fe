// TEMPLATE: salinan src/api/products. Ganti "product"/"Product" dengan nama domain baru.

/** Bentuk data produk dari server (DTO) */
export type ProductDto = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
  thumbnail: string;
};

export type ProductListResponse = {
  products: ProductDto[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductListParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type CreateProductPayload = Pick<ProductDto, 'title' | 'description' | 'price' | 'category'>;

/** Bentuk data yang dipakai UI (hasil helpers.toProduct) */
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  originalPrice: number;
  finalPrice: number;
  hasDiscount: boolean;
};

export type ProductList = {
  items: Product[];
  total: number;
};
