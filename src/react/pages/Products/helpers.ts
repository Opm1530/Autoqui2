// Tipos e utilitários da página de Produtos (portados da versão vanilla).
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/config';

export interface Product {
  id: string;
  name: string;
  price: number;
  active: boolean;
  storeIds?: string[];
  storeId?: string;
  companyId: string;
  imageUrl?: string;
  imagemPath?: string;
  downloadToken?: string;
  promotionalActive?: boolean;
  promotionalName?: string;
  promotionalPrice?: number;
  categoryId?: string;
  stock?: number | null;
  duration?: number | null;
  observation?: string;
  variations?: string[];
  priceOnRequest?: boolean;
  gallery?: { imagemPath: string; downloadToken: string }[]; // fotos extras (modo vitrine)
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  companyId: string;
  coverImagemPath?: string;
  coverDownloadToken?: string;
}

export const getCategoryCover = (c: Category): string | null =>
  c.coverImagemPath && c.coverDownloadToken ? storageUrl(c.coverImagemPath, c.coverDownloadToken) : null;

export interface Combo {
  id: string;
  nome: string;
  preco: number;
  lojaId: string;
  empresaId: string;
  produtos: { id: string; name: string; price: number }[];
  imagemPath?: string;
  downloadToken?: string;
  ativo?: boolean;
}

export const getProductImageUrl = (p: Product): string | null => {
  if (p.imageUrl) return p.imageUrl;
  if (p.imagemPath && p.downloadToken) {
    return `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(p.imagemPath)}?alt=media&token=${p.downloadToken}`;
  }
  return null;
};

const storageUrl = (imagemPath: string, downloadToken: string) =>
  `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(imagemPath)}?alt=media&token=${downloadToken}`;

// Todas as fotos do produto: a principal + a galeria (modo vitrine).
export const getProductImages = (p: Product): string[] => {
  const urls: string[] = [];
  const main = getProductImageUrl(p);
  if (main) urls.push(main);
  (p.gallery || []).forEach((g) => { if (g?.imagemPath && g?.downloadToken) urls.push(storageUrl(g.imagemPath, g.downloadToken)); });
  return urls;
};

export const getGalleryUrls = (p: Product): string[] =>
  (p.gallery || []).filter((g) => g?.imagemPath && g?.downloadToken).map((g) => storageUrl(g.imagemPath, g.downloadToken));

export const getComboImageUrl = (c: Combo): string | null => {
  if (c.imagemPath && c.downloadToken) {
    return `https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(c.imagemPath)}?alt=media&token=${c.downloadToken}`;
  }
  return null;
};

export async function uploadImage(file: File, companyId: string): Promise<{ imagemPath: string; downloadToken: string }> {
  const tempId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const storageRef = ref(storage, `products/${companyId}/${tempId}_${file.name}`);
  await uploadBytes(storageRef, file);
  const fullUrl = await getDownloadURL(storageRef);
  const urlObj = new URL(fullUrl);
  return { imagemPath: storageRef.fullPath, downloadToken: urlObj.searchParams.get('token') || '' };
}

export const availableIcons = [
  'fa-utensils', 'fa-burger', 'fa-pizza-slice', 'fa-ice-cream', 'fa-coffee', 'fa-beer', 'fa-wine-glass',
  'fa-apple-whole', 'fa-carrot', 'fa-bowl-food', 'fa-cake-candles', 'fa-candy-cane', 'fa-cookie',
  'fa-glass-water', 'fa-mug-hot', 'fa-bag-shopping', 'fa-shirt', 'fa-shoe-prints', 'fa-glasses',
  'fa-watch', 'fa-laptop', 'fa-mobile-screen', 'fa-gamepad', 'fa-headphones', 'fa-camera', 'fa-tv',
  'fa-microchip', 'fa-car', 'fa-bicycle', 'fa-plane', 'fa-bus', 'fa-train', 'fa-ship', 'fa-anchor',
  'fa-heart', 'fa-star', 'fa-bolt', 'fa-fire', 'fa-leaf', 'fa-tree', 'fa-sun', 'fa-moon', 'fa-droplet',
  'fa-cloud', 'fa-music', 'fa-film', 'fa-book', 'fa-pencil', 'fa-palette', 'fa-briefcase', 'fa-home',
  'fa-medkit', 'fa-dumbbell', 'fa-basketball', 'fa-soccer-ball', 'fa-baseball', 'fa-volleyball', 'fa-tag',
];
