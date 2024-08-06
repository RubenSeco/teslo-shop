import { create } from 'zustand';
import type { CartProduct } from "@/interfaces";
import { persist } from 'zustand/middleware';


interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    total: number;
    itemsInCart: number;
    tax: number;
    subTotal: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}


export const useCartStore = create<State>()(

  persist(

    (set, get) => ({

      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);

      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price) + subTotal, 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          total,
          itemsInCart,
          tax,
          subTotal,
        };

      },

      addProductToCart: (product: CartProduct) => {

        const { cart } = get();

        // 1. Revisar si existe el producto con la talla seleccionada

        const productInCart = cart.some((item) => item.id === product.id && item.size === product.size);

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla...tengo que incrementarlo

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.quantity === product.quantity) {
            return { ...item, quantity: product.quantity + item.quantity };
          }

          return item;
        }) as CartProduct[];

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }

          return item;
        }) as CartProduct[];

        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const removeCartProduct = cart.filter((item) => (item.id !== product.id || item.size !== product.size));

        set({ cart: removeCartProduct });

      },

      clearCart: () => {
        set({ cart: [] });
      },

    }),
    {
      name: "shopping-cart",
    }
  )
);
