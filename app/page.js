import HomeSlider from '@/Components/HomeSlider'
import { getHomeProducts } from "./actions/getHomeProductsAction";
import Link from "next/link";
import { de } from '@/dictionaries/de'

/**
 * Startseite der Anwendung (Home Page)
 * Holt Produkte vom Server und zeigt sie kategorisiert in Slidern an.
 */
export default async function HomePage() {

  // Zugriff auf die deutschen Übersetzungen für den Home-Bereich
  const dict = de.home

  // 1. Daten abrufen mit der Server Action
  const { success, products } = await getHomeProducts();

  // 2. Fehlerbehandlung: Falls der API-Aufruf fehlschlägt
  if (!success) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center text-red-500 font-bold'>
       {de?.common?.error || "Ein Fehler ist aufgetreten"}
      </div>
    )
  }

  // 3. Behandlung des leeren Zustands: Falls keine Produkte vorhanden sind
  if (!products || products.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center p-10 text-center'>
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
          {dict.empty.message}
        </h2>
        <Link 
          href='/products' 
          className='bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg'
        >
          {dict.empty.link}
        </Link>
      </div>
    )
  }

  // 4. Produkte effizient nach Kategorien filtern
  // Hinweis: .toLowerCase() stellt sicher, dass der Vergleich unabhängig von der Schreibweise ist.
  const cameras = products.filter(p => p.category?.toLowerCase() === 'camera');
  const laptops = products.filter(p => p.category?.toLowerCase() === 'laptop');
  const mobiles = products.filter(p => p.category?.toLowerCase() === 'mobile');
  const tablets = products.filter(p => p.category?.toLowerCase() === 'tablet');
  const playstations = products.filter(p => p.category?.toLowerCase() === 'playstation');

  return (
    <main className="min-h-screen pb-20 p-4 md:p-8">
      
      {/* Hero-Bereich: Blickfang der Startseite */}
      <section className="bg-slate-900 text-white py-20 px-6 mt-24 lg:mt-32 text-center mb-16 rounded-[2.5rem] shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">
          {dict.hero.title}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          {dict.hero.subtitle}
        </p>
      </section>

      {/* Produkt-Kategorien: Slider werden nur gerendert, wenn Produkte vorhanden sind */}
      <div className="max-w-7xl mx-auto space-y-24">
        {cameras.length > 0 && <HomeSlider products={cameras} title={dict.category.cameras}/>}
        {laptops.length > 0 && <HomeSlider products={laptops} title={dict.category.laptops} />}
        {mobiles.length > 0 && <HomeSlider products={mobiles} title={dict.category.mobiles} />}
        {tablets.length > 0 && <HomeSlider products={tablets} title={dict.category.tablets} />}
        {playstations.length > 0 && <HomeSlider products={playstations} title={dict.category.gaming} />}
      </div>
      
    </main>
  );
}