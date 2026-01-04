import { create } from "zustand";

const useStore = create((set) => ({
  cart: [],
  theme: "light",

  // ✅ ADD TO CART
  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, qty: 1 }],
      };
    }),

  // ✅ REMOVE ITEM
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // ✅ INCREASE QUANTITY
  increaseQty: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      ),
    })),

  // ✅ DECREASE QUANTITY
  decreaseQty: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      ),
    })),

  // THEME
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

export default useStore;
