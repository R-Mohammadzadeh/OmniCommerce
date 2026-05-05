import CategoryToolbar from "@/Components/CategoryToolbar";
import ProductCard from "@/Components/ProductCard";
import connectDB from "@/config/connectDB";
import ProductsData from "@/models/ProductsData";

/**
 * Hilfsfunktion zum Escapen von Sonderzeichen in Strings,
 * die in regulären Ausdrücken verwendet werden.
 * Schützt vor Fehlern und ReDoS-Angriffen.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function BrandPage({ params, searchParams }) {

  // Parameter aus der URL extrahieren (Next.js 15 async Pattern)
  const { slug } = await params;
  const { brand, sort } = await searchParams;

  // Datenbankverbindung herstellen
  await connectDB();

  /**
   * 1. Erstellung der Datenbankabfrage (Query)
   * Wir nutzen Regex mit dem "i"-Flag für Case-Insensitivity (Groß-/Kleinschreibung ignorieren).
   */
  const safeSlug = escapeRegex(slug);
  const query = {
    category: { $regex: new RegExp(`^${safeSlug}$`, "i") },
  };

  // Falls ein Marken-Filter aktiv ist, wird die Query erweitert
  if (brand) {
    const safeBrand = escapeRegex(brand);
    query.brand = { $regex: new RegExp(`^${safeBrand}$`, "i") };
  }

  /**
   * 2. Sortier-Logik festlegen
   * Standardmäßig werden die neuesten Produkte zuerst angezeigt (createdAt: -1).
   */
  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };

  /**
   * 3. Paralleler Datenabruf
   * Wir holen gleichzeitig die gefilterten Produkte UND eine Liste aller 
   * verfügbaren Marken dieser Kategorie für die Filterleiste.
   */
  const [productsRaw, allBrands] = await Promise.all([
    ProductsData.find(query).sort(sortOption).lean(),
    ProductsData.find({ category: { $regex: new RegExp(`^${safeSlug}$`, "i") } }).distinct("brand")
  ]);

  // MongoDB-Dokumente für die Client-Komponenten in einfaches JSON umwandeln
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 p-8 pt-24">
      <div className="max-w-7xl mx-auto">

        {/* Dynamischer Header basierend auf Kategorie und gewählter Marke */}
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 capitalize">
            {brand ? `${brand} ` : ""}
            {slug}
          </h1>
          {/* Dynamische Anzeige der gefundenen Artikel (Singular/Plural) */}
          <p className="text-gray-500">
            {products.length === 1
              ? "1 Artikel gefunden"
              : `${products.length} Artikel gefunden`}
          </p>
        </header>

        {/* Werkzeugleiste für Filter (Marken) und Sortierung */}
        <CategoryToolbar slug={slug} brand={brand} sort={sort} allBrands={allBrands} />

        {/* Produkt-Anzeige-Bereich */}
        {products.length === 0 ? (
          /* Leerzustand, falls keine Produkte den Filtern entsprechen */
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed dark:border-slate-800 text-gray-500">
            Keine Produkte gefunden, die Ihren Kriterien entsprechen.
          </div>
        ) : (
          /* Responsives Grid für die Produktkarten */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}