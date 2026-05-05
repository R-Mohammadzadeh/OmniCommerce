"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"
import { revalidatePath } from "next/cache"


export async function deleteProduct(id) {
  try {
    // 1. Verbindung zur MongoDB herstellen
    await connectDB()

    // 2. Produkt anhand der ID suchen und löschen
    const deleted = await ProductsData.findByIdAndDelete(id)

    // 3. Fehlerprüfung: Falls die ID nicht existiert
    if (!deleted) {
      return { success: false, error: "Produkt nicht gefunden" }
    }

    /**
     * 4. Cache-Aktualisierung:
     * revalidatePath weist Next.js an, die Daten für die Admin-Produktliste
     * im Hintergrund neu zu laden, damit das gelöschte Produkt sofort verschwindet.
     */
    revalidatePath('/admin/products')

    // Erfolgsrückmeldung an das Frontend
    return { success: true }
  } catch (error) {
    // Fehlerbehandlung: Gibt die Fehlermeldung für die UI zurück
    return { success: false, error: error.message }
  }
}