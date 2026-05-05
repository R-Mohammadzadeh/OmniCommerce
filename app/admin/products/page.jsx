import ProductActions from "@/Components/Admin-productActions";
import connectDB from "@/config/connectDB";
import ProductsData from "@/models/ProductsData";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default async function InventoryPage() {
  // Datenbankverbindung herstellen
  await connectDB();
  
  // Produkte abrufen, sortiert nach den neuesten zuerst. 
  // .lean() wird hier für eine bessere Performance verwendet, da wir die Daten nur für die UI benötigen.
  const products = await ProductsData.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="pb-12">
      {/* Navigations-Header */}
      <div className="mt-32 flex justify-center ">
        <Link 
          href="/admin" // Angenommen, /admin ist das Dashboard-Root
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl hover:scale-105 transition-all font-bold shadow-lg shadow-blue-500/20"
        >
          <HiOutlineArrowLeft />
          Mein Dashboard
        </Link>
      </div>

      <div className="bg-white mt-10 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Tabellenkopf-Zeile (auf mobilen Geräten ausgeblendet) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800 text-xs font-bold uppercase text-slate-400">
          <div className="col-span-5">Produkt</div>
          <div className="col-span-2">Kategorie</div>
          <div className="col-span-2">Preis</div>
          <div className="col-span-1">Lagerbestand</div>
          <div className="col-span-2 text-right">Aktionen</div>
        </div>

        {/* Prüfung auf leeren Zustand (Empty State) */}
        {products.length === 0 ? (
          <div className="p-10 text-center text-slate-500 font-medium">
            Keine Produkte im Inventar gefunden.
          </div>
        ) : (
          /* Produktzeilen */
          <div className="divide-y dark:divide-slate-800">
            {products.map((product) => (
              <div 
                key={product._id.toString()} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-8 py-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all"
              >
                {/* Name & Bild */}
                <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                  {/* Sichere Prüfung, ob das Bild existiert, um Rendering-Abstürze zu verhindern */}
                  <img 
                    src={product.image?.[0]?.startsWith('http') ? product.image[0] : `/image/${product.category?.toLowerCase()}s/${product.image?.[0] || 'placeholder.png'}`} 
                    className="w-12 h-12 rounded-xl object-contain bg-slate-100 dark:bg-slate-800 p-1 shrink-0"
                    alt={product.name}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 dark:text-white truncate pr-4">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium md:hidden uppercase mt-1">
                      {product.category}
                    </p>
                  </div>
                </div>

                {/* Kategorie-Badge (nur Desktop) */}
                <div className="hidden md:block col-span-2">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[11px] font-bold capitalize">
                    {product.category}
                  </span>
                </div>

                {/* Preisformatierung sicher auf de-DE gesetzt für konsistentes Server-Rendering */}
                <div className="col-span-1 md:col-span-2">
                  <span className="text-sm md:text-base font-black text-slate-700 dark:text-slate-200">
                    €{Number(product.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Bestandsanzeige mit dynamischer UI für niedrigen Lagerbestand */}
                <div className="col-span-1 md:col-span-1">
                  <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${
                    product.stock < 5 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600' 
                    : 'bg-green-50 dark:bg-green-900/20 text-green-600'
                  }`}>
                    
                    {/* Ping-Animations-Wrapper */}
                    <span className="relative flex h-2 w-2">
                      {product.stock < 5 && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${product.stock < 5 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    </span>

                    <span className="text-xs font-black uppercase">
                      {product.stock}
                    </span>
                  </div>
                </div>

                {/* Client-Komponente für Aktionen (z. B. Löschen/Bearbeiten) */}
                <div className="col-span-1 md:col-span-2 flex md:justify-end">
                  <ProductActions 
                    productId={product._id.toString()} 
                    productName={product.name} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}