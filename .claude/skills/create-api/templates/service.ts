import { PAGE_SIZE } from '@/constants/config';
import { api } from '@/lib/axios';

import { toProduct } from './helpers';
import type {
  CreateProductPayload,
  Product,
  ProductDto,
  ProductList,
  ProductListParams,
  ProductListResponse,
} from './types';

const ENDPOINT = '/products';

export async function getProducts({
  page = 1,
  limit = PAGE_SIZE,
  search,
}: ProductListParams = {}): Promise<ProductList> {
  const path = search ? `${ENDPOINT}/search` : ENDPOINT;
  const { data } = await api.get<ProductListResponse>(path, {
    params: { limit, skip: (page - 1) * limit, q: search || undefined },
  });
  return { items: data.products.map(toProduct), total: data.total };
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get<ProductDto>(`${ENDPOINT}/${id}`);
  return toProduct(data);
}

export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const { data } = await api.post<ProductDto>(`${ENDPOINT}/add`, payload);
  return toProduct(data);
}
