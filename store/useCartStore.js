import { create } from "zustand";
import { persist } from "zustand/middleware";


  // Zustand-Store für die Warenkorb-Verwaltung.
  // Übernimmt die Speicherung (Persistenz), Mengenverwaltung und Preisberechnungen.

export const useCartStore = create(
  persist(
    (set, get) => ({
      // Der aktuelle Inhalt des Warenkorbs
      cart: [],

      /**
       * Fügt ein Produkt zum Warenkorb hinzu oder erhöht die Menge, falls es bereits existiert.
       * @param {Object} product - Das hinzuzufügende Produkt.
       */
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item._id === product._id);

        if (existingItem) {
          // Falls Artikel existiert: Menge erhöhen
          set({
            cart: currentCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
            ),
          });
        } else {
          // Falls neuer Artikel: Mit Menge 1 zum Array hinzufügen
          set({ 
            cart: [...currentCart, { 
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1
            }] 
          });
        }
      },
      
      /**
       * Verringert die Menge eines Artikels. Entfernt ihn ganz, wenn die Menge 0 erreicht.
       * @param {string} productId - Die ID des zu aktualisierenden Produkts.
       */
      decreaseQuantity: (productId) => {
        const currentCart = get().cart;
        const item = currentCart.find((i) => i._id === productId);

        if (item && item.quantity > 1) {
          // Menge um 1 reduzieren
          set({
            cart: currentCart.map((i) =>
              i._id === productId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          // Wenn nur noch 1 Stück vorhanden ist: Komplett entfernen
          get().removeFromCart(productId);
        }
      },

      /**
       * Entfernt einen Artikel unabhängig von der Menge komplett aus dem Warenkorb.
       * @param {string} productId - Die ID des zu entfernenden Produkts.
       */
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item._id !== productId) });
      },

      /**
       * Leert den gesamten Warenkorb.
       */
      clearCart: () => set({ cart: [] }),
 
      /**
       * Berechnet den Gesamtpreis aller Artikel im Warenkorb.
       * @returns {number} Die Summe aller Preise.
       */
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * (item.quantity || 1),
          0
        );
      },

      /**
       * Berechnet die Gesamtzahl aller Artikel im Warenkorb (Summe der Mengen).
       * @returns {number} Die Gesamtzahl.
       */
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + (item.quantity || 1), 0);
      },
    }),
    {
      // Name des Keys im LocalStorage für die Persistenz
      name: "shopping-cart",
    }
  )
);