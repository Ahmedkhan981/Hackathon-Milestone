// store/store.ts (Basket Store Implementation)
import { Product, Sale } from "../../sanity.types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface BasketItem {
  product: Product;
  sale:Sale|null;
  quantity: number;
}

export interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id,
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return { items: [...state.items, { product, sale: null, quantity: 1 }] };
          }
        });
      },
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        }));
      },
      clearBasket: () => {
        set({ items: [] });
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + (item.product.price ?? 0) * item.quantity,
          0,
        );
      },
      getItemCount: (productId: string) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => {
        const items = get().items;
        return items.reduce((acc: BasketItem[], item) => {
          const existing = acc.find(
            (groupedItem) => groupedItem.product._id === item.product._id,
          );
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, []);
      },
    }),
    {
      name: "basket-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useBasketStore;
