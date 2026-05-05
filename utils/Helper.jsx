/**
 * Ermittelt die korrekte Bild-URL für ein Produkt.
 * Berücksichtigt Platzhalter, externe Cloudinary-Links und lokale Dateipfade.
 * 
 * @param {Object} product - Das Produkt-Objekt aus der Datenbank.
 * @returns {string} Die finale URL oder der Pfad zum Bild.
 */
export function getProductImage(product) {
  // 1. Fallback: Falls kein Bild vorhanden ist, einen Platzhalter zurückgeben
  if (!product?.image || product.image.length === 0) {
    return '/image/placeholder.jpg';
  }

  // Das erste Bild aus dem Array nehmen
  const firstImage = product.image[0];

  // 2. Fall: Wenn es sich um eine externe URL handelt (z.B. Cloudinary oder HTTP)
  if (firstImage.startsWith('http')) {
    return firstImage;
  }

  /**
   * 3. Fall: Lokale Bilder
   * Erstellt einen Ordnernamen basierend auf der Kategorie im Plural (z.B. "laptops").
   * Falls keine Kategorie vorhanden ist, wird der Standardordner "products" verwendet.
   */
  const folder = (product.category?.toLowerCase() || 'product') + 's';
  
  // Rückgabe des Pfades, z.B.: /image/laptops/mein-bild.jpg
  return `/image/${folder}/${firstImage}`;
}