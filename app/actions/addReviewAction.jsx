"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData";
import { revalidatePath } from "next/cache";

/**
 * Fügt einem Produkt eine neue Bewertung hinzu und aktualisiert die Gesamtbewertung.
 * @param {string} productId - Die ID des Produkts.
 * @param {Object} reviewData - Enthält user (muss eine gültige MongoDB ID sein), rating und comment.
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
    // WICHTIG: .toString() nutzen, um die IDs sicher zu vergleichen
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === user.toString()
    );
    
    if (alreadyReviewed) {
      return { success: false, message: "Du hast dieses Produkt bereits bewertet." };
    }

    // 3. Neue Bewertung erstellen
    // FEHLERBEHEBUNG: Stelle sicher, dass 'user' eine gültige ID ist, 
    // die zu deinem Schema (ObjectId) passt.
    const newReview = {
      user, // Hier muss die technische User-ID aus der Datenbank stehen
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    // 4. Bewertung zum Array hinzufügen und Zähler aktualisieren
    // Der Fehler 'BSONError' passierte hier, wenn 'user' kein gültiges ID-Format hatte.
    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;
    
    // 5. Durchschnittliche Bewertung (Rating) neu berechnen
    const totalRating = product.reviews.reduce((acc, item) => item.rating + acc, 0);
    
    // Berechnung des Durchschnitts, gerundet auf eine Nachkommastelle
    product.rating = Math.round((totalRating / product.reviews.length) * 10) / 10;

    // 6. Änderungen in der Datenbank speichern
    await product.save();

    // Cache löschen, damit die Änderung sofort auf der Produktseite sichtbar ist
    revalidatePath(`/product/${productId}`);

    return { success: true, message: "Bewertung erfolgreich hinzugefügt!" };

  } catch (error) {
    // Detaillierte Fehlerausgabe in der Konsole
    console.error('Fehler beim Hinzufügen der Bewertung:', error);
    return { success: false, message: "Fehler beim Speichern der Bewertung. Bitte prüfe das ID-Format." };
  }
}