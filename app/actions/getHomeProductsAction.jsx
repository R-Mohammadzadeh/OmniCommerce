"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"

/**
 * Ruft eine Auswahl an Produkten für die Startseite ab.
 * Filtert nach bestimmten Kategorien und optimiert die Datenmenge für eine schnelle Anzeige.
 */
export async function getHomeProducts() {
  try {
    // 1. Verbindung zur MongoDB herstellen
    await connectDB()

    /**
     * 2. Definition der Ziel-Kategorien für die Homepage.
     * Nur Produkte aus diesen Bereichen werden geladen.
     */
    const targetCategory = ["camera", "playstation", "tablet", "laptop", "mobile"]

    // 3. Datenbankabfrage mit Optimierungen
    const products = await ProductsData.find({ category: { $in: targetCategory } })
      .select('name price image category rating numReviews stock')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    // 4. Fallback, falls keine Produkte gefunden wurden
    if (!products || products.length === 0) {
      console.warn("Keine Produkte für die Homepage-Kategorien gefunden.")
      return {
        success: false,
        products: [],
        message: "Aktuell sind keine Produkte verfügbar."
      }
    }

// 5. Datenbereinigung:
    
    return {
      success: true,
      products: JSON.parse(JSON.stringify(products)),
    }

  } catch (error) {
    // Fehlerprotokollierung bei Verbindungsproblemen oder Datenbankfehlern
    console.error('Fehler beim Abrufen der Homepage-Produkte:', error)
    return {
      success: false,
      products: [],
      error: "Produkte konnten nicht geladen werden. Bitte prüfe deine Verbindung."
    }
  }
}