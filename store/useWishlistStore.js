import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useWishlistStore = create(
  persist(
    (set, get) => ({
      // Array der gespeicherten Produkte in der Wunschliste
      wishlist: [],
      
      /**
       * Schaltet ein Produkt in der Wunschliste um (Hinzufügen oder Entfernen).
       * @param {Object} product - Das Produkt-Objekt.
       */
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        // Prüfen, ob das Produkt bereits in der Liste existiert
        const isExist = currentWishlist.find((item) => item._id === product._id);

        if (isExist) {
          // Falls es existiert: Aus der Liste filtern (entfernen)
          set({
            wishlist: currentWishlist.filter((item) => item._id !== product._id),
          });
        } else {
          // Falls es nicht existiert: Zum Array hinzufügen
          set({ 
            wishlist: [...currentWishlist, {
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
            }] 
          });
        }
      },

      /**
       * Nützlich für die Anzeige von Herz-Icons (gefüllt/leer).
       * @param {string} productId - Die ID des Produkts.
       */
      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item._id === productId);
      },
    }),
    { 
      // Name des Speicherschlüssels im Browser (LocalStorage)
      name: "wishlist-storage" 
    }
  )
);