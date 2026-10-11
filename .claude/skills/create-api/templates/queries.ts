import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { productKeys } from './keys';
import { getProductById, getProducts } from './service';
import type { ProductListParams } from './types';

export function useProductsQuery(params: ProductListParams = {}) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    // Saat pindah halaman, data lama tetap tampil sampai data baru datang.
    placeholderData: keepPreviousData,
  });
}

export function useProductDetailQuery(id: number | undefined) {
  return useQuery({
    queryKey: productKeys.detail(id ?? 0),
    queryFn: () => getProductById(id as number),
    enabled: Boolean(id),
  });
}
