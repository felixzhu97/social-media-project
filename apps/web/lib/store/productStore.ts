import { create } from 'zustand';
import * as api from '../api';
import type { Product } from '../types';

interface ProductStore {
  productsByCategory: Record<string, Product[]>;
  productsLoadedByCategory: Record<string, boolean>;
  productsLoadingByCategory: Record<string, boolean>;
  product: Product | null;
  productLoadedId: string | null;
  relatedProducts: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: (category?: string) => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  fetchRelatedProducts: (category: string, excludeId: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  productsByCategory: {},
  productsLoadedByCategory: {},
  productsLoadingByCategory: {},
  product: null,
  productLoadedId: null,
  relatedProducts: [],
  isLoading: false,
  error: null,

  fetchProducts: async (category = 'all') => {
    const loadedMap = get().productsLoadedByCategory;
    const loadingMap = get().productsLoadingByCategory;
    if (loadedMap[category] || loadingMap[category]) return;
    set(state => ({
      isLoading: true,
      error: null,
      productsLoadingByCategory: { ...state.productsLoadingByCategory, [category]: true },
    }));
    try {
      const products = await api.getProducts(category === 'all' ? undefined : category);
      set(state => ({
        productsByCategory: { ...state.productsByCategory, [category]: products },
        productsLoadedByCategory: { ...state.productsLoadedByCategory, [category]: true },
        productsLoadingByCategory: { ...state.productsLoadingByCategory, [category]: false },
      }));
    } catch (err) {
      set(state => ({
        error: '获取产品列表失败',
        productsLoadingByCategory: { ...state.productsLoadingByCategory, [category]: false },
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProduct: async id => {
    if (get().productLoadedId === id) return;
    set({ isLoading: true, error: null });
    try {
      const product = await api.getProduct(id);
      set({ product, productLoadedId: id });
    } catch (err) {
      set({ error: '获取产品详情失败' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchRelatedProducts: async (category, excludeId) => {
    set({ isLoading: true, error: null });
    try {
      const products = await api.getProducts(category);
      set({ relatedProducts: products.filter((p: Product) => p.id !== excludeId).slice(0, 4) });
    } catch (err) {
      set({ error: '获取相关产品失败' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
