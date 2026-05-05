"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData";
import { revalidatePath } from "next/cache";

/**
 * Fügt einem Produkt eine neue Bewertung hinzu und aktualisiert die Gesamtbewertung.
 * @param {string} productId - Die ID des Produkts.
 * @param {Object} reviewData - Enthält user, rating und comment.
 */
export async function addReviewAction(productId, reviewData) {
  try {
    // Verbindung zur Datenbank herstellen
    await connectDB();

    const { user, rating, comment } = reviewData;

    // 1. Produkt in der Datenbank suchen
    const product = await ProductsData.findById(productId);
    if (!product) {
      return { success: false, message: "Produkt nicht gefunden." };
    }

    // 2. Doppelte Bewertungen verhindern
    // Prüft, ob der Benutzer bereits eine Rezension für dieses Produkt hinterlassen hat
    const alreadyReviewed = product.reviews.find(r => r.user === user);
    if (alreadyReviewed) {
      return { success: false, message: "Du hast dieses Produkt bereits bewertet." };
    }

    // 3. Neue Bewertung erstellen
    const newReview = {
      user,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    // 4. Bewertung zum Array hinzufügen und Zähler aktualisieren
    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;
    
    // 5. Durchschnittliche Bewertung (Rating) neu berechnen
    // Summiert alle Sterne und teilt sie durch die Anzahl der Bewertungen
    const totalRating = product.reviews.reduce((acc, item) => item.rating + acc, 0);
    // Rundet auf eine Nachkommastelle (z.B. 4.5)
    product.rating = Math.round((totalRating / product.reviews.length) * 10) / 10;

    // 6. Änderungen speichern
    await product.save();

    // Cache für die spezifische Produktseite löschen, damit die neue Bewertung sofort erscheint
    revalidatePath(`/product/${productId}`);

    return { success: true, message: "Bewertung erfolgreich hinzugefügt!" };

  } catch (error) {
    console.error('Fehler beim Hinzufügen der Bewertung:', error);
    return { success: false, message: "Etwas ist schiefgelaufen." };
  }
}