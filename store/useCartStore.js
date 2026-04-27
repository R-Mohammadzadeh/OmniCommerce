import { create } from "zustand";
import { persist } from "zustand/middleware";




export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

// addToCart now handles both adding new items and increasing quantity if the item already exists     
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },
      
// decreaseQuantity now decreases the quantity or removes the item if quantity goes to 0
      decreaseQuantity: (productId) => {
        const currentCart = get().cart;
        const item = currentCart.find((i) => i._id === productId);

        if (item?.quantity > 1) {
          set({
            cart: currentCart.map((i) =>
              i._id === productId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          get().removeFromCart(productId);
        }
      },

      //delete item from cart
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item._id !== productId) });
      },

      // clear entire cart
      clearCart: () => set({ cart: [] }),
 
      //Calculate total price of items in the cart for checkout page 
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * (item.quantity || 1),
          0
        );
      },

      //Calculate total number of items in the cart
        getTotalItems: () => {
        return get().cart.reduce((total, item) => total + (item.quantity || 1), 0);
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);