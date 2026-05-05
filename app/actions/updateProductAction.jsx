'use server'

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"
import { revalidatePath } from "next/cache"

/**
 * Serveraktion: updateProductAction * Aktualisiert die Produktinformationen in MongoDB und validiert den Cache neu.
 **/
export async function updateProductAction(formData) {
  try {
    await connectDB()

    const id = formData.get('id')

    if (!id) {
      return { error: true, message: "Ungültige Produkt-ID" }
    }

    const existingProduct = await ProductsData.findById(id)
    if (!existingProduct) {
      return { error: true, message: "Produkt nicht gefunden!" }
    }

    const name = formData.get("name")?.toString().trim()
    const price = Number(formData.get("price"))
    const stock = Number(formData.get("stock"))
    const description = formData.get("description")?.toString().trim() || ''

   // Serverseitige Validierung
    if (!name || isNaN(price) || isNaN(stock)) {
      return { error: true, message: "Ungültige Eingabedaten" }
    }

    if (price < 0 || stock < 0) {
      return { error: true, message: "Werte müssen positiv sein" }
    }

    const updatedFields = {
      name,
      price,
      stock,
      description,
      category: existingProduct.category // Sicherheit: Originalkategorie beibehalten
    }

   // Atomare Aktualisierung in der Datenbank
    const result = await ProductsData.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    )

    if (!result) {
      return { error: true, message: "Update in der Datenbank fehlgeschlagen!" }
    }

    // Aktualisieren Sie die Produktlistenseite
    revalidatePath('/admin/products')

    return { error: false, message: "Produkt erfolgreich aktualisiert!" }

  } catch (error) {
    console.error("Update Error:", error)
    return { error: true, message: "Update fehlgeschlagen!" }
  }
}