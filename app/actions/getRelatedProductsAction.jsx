"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"


export async function getRelatedProducts(category, currentProductId) {
  try {
    // 1. Datenbankverbindung herstellen
    await connectDB()

    
    // 2. Suche nach verwandten Produkten:
    
    const related = await ProductsData.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
      _id: { $ne: currentProductId }
    })
      
    // 3. Optimierung der Abfrage:
      
      .select('name price image category rating numReviews stock')
      .limit(4)
      .lean()

   
    // 4. Serialisierung der Daten:
    
    return JSON.parse(JSON.stringify(related))

  } catch (error) {
    // Fehlerprotokollierung im Server-Log
    console.error("Related Products Fehler:", error)
    // Rückgabe eines leeren Arrays als Fallback, damit die UI nicht abstürzt
    return []
  }
}