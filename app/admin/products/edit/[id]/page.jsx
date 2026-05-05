import UpdateProductForm from "@/Components/ApdateProductForm"; // Hinweis: Tippfehler in deinem Import (Apdate -> Update)
import connectDB from "@/config/connectDB";
import ProductsData from "@/models/ProductsData";
import { notFound } from "next/navigation";

/**
 * Server-Seite zum Bearbeiten eines bestehenden Produkts.
 * Ruft die Produktdaten basierend auf der ID in der URL ab.
 */
export default async function EditProductPage({ params }) {
  // 1. Die ID aus den URL-Parametern extrahieren (in Next.js 15 asynchron)
  const { id } = await params;

  // 2. Datenbankverbindung herstellen
  await connectDB();

  /**
   * 3. Produkt in der Datenbank suchen.
   * .lean() konvertiert das Mongoose-Dokument in ein einfaches Objekt.
   */
  const product = await ProductsData.findById(id).lean();

  // 4. Falls kein Produkt gefunden wurde, die 404-Seite anzeigen
  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen p-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header-Sektion mit dem aktuellen Produktnamen */}
          <h1 className="text-3xl font-black mb-8 dark:text-white text-center">
            <span className="text-slate-600">Bearbeite: {product.name}</span>
          </h1>
          
          
            {/* 5. Das Formular zum Aktualisieren laden. */}
          
          <UpdateProductForm product={JSON.parse(JSON.stringify(product))} />
        </div>
      </div>
    </>
  );
}