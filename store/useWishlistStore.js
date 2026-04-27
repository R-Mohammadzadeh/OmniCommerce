import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      
// Toggle: If exists remove it, if not add it
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const isExist = currentWishlist.find((item) => item._id === product._id);

        if (isExist) {
          set({
            wishlist: currentWishlist.filter((item) => item._id !== product._id),
          });
        } else {
          set({ wishlist: [...currentWishlist, product] });
        }
      },
    }),
    { name: "wishlist-storage" }
  )
);