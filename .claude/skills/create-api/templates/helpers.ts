// Helper KHUSUS domain produk. Fungsi generik (format, string) ada di src/utils/.
import type { Product, ProductDto } from './types';

/** Harga setelah diskon, dibulatkan 2 desimal. calculateFinalPrice(100, 15) → 85 */
export function calculateFinalPrice(price: number, discountPercentage: number): number {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100;
}

/** Ubah DTO dari server menjadi model yang dipakai UI. */
export function toProduct(dto: ProductDto): Product {
  const finalPrice = calculateFinalPrice(dto.price, dto.discountPercentage);
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    category: dto.category,
    imageUrl: dto.thumbnail,
    rating: dto.rating,
    originalPrice: dto.price,
    finalPrice,
    hasDiscount: finalPrice < dto.price,
  };
}

/** Mata uang harga dari API demo (dummyjson memakai USD). Ganti ke 'IDR' bila API Anda Rupiah. */
export const PRODUCT_PRICE_CURRENCY = 'USD';
