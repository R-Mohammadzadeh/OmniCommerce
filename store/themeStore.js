import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useThemeStore = create(
  persist(
    (set) => ({
      // --- BASIS ZUSTAND ---
      theme: "light",         // Standard-Modus (light oder dark)
      hasHydrated: false,     // Status, ob der Store bereits aus dem localStorage geladen wurde

      /**
       * Setzt das Theme manuell auf einen bestimmten Wert.
       * @param {string} theme - 'light' oder 'dark'
       */
      setTheme: (theme) => set({ theme }),

      /**
       * Wechselt zwischen dem hellen und dunklen Modus.
       */
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        })),

      /**
       * Aktualisiert den Hydratationsstatus.
       * Wichtig für Next.js, um Server-Client-Diskrepanzen (Hydration Errors) zu vermeiden.
       */
      setHasHydrated: (state) => {
        set({ hasHydrated: state });
      }
    }),
    {
      // Name des Keys im LocalStorage
      name: "theme-storage",
      
      /**
       * Filtert den Zustand, der gespeichert werden soll.
       * Hier wird NUR das 'theme' gespeichert, 'hasHydrated' bleibt flüchtig.
       */
      partialize: (state) => ({ theme: state.theme }),
      
      /**
       * onRehydrateStorage wird aufgerufen, wenn der Store geladen wird.
       * Sobald die Daten aus dem localStorage verfügbar sind, setzen wir hasHydrated auf true.
       */
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      }
    }
  )
);