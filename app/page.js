import HomeSlider from '@/Components/HomeSlider'

import { getHomeProducts } from "./actions/getHomeProductsAction";
import Link from "next/link";
import {de} from '@/dictionaries/de'




export default async function HomePage() {

// Zugriff auf den Startbereich
 const dict = de.home

// 1. Daten aus der Aktion abrufen
  const {success , products } = await getHomeProducts();

// 2. Fehlerbehandlung
if(!success){
  return <div className='text-red-500 p-10 text-center'>{de.common.error}</div>
}

// 3. Behandlung des leeren Zustands
if(!products || products.length === 0){
  return( 
  <div className='p-10 text-center'>
   <h2 className="text-xl mb-4">
   {dict.empty.message}
   </h2>
   <Link href='/products' className='text-blue-600 underline' >{dict.empty.link}</Link>
  </div>)
}

  //4. Produkte nach Kategorie filtern
  const cameras = products.filter(p => p.category?.toLowerCase() === 'camera');
  const laptops = products.filter(p => p.category?.toLowerCase() === 'laptop');
  const mobiles = products.filter(p => p.category?.toLowerCase() === 'mobile');
  const tablets = products.filter(p => p.category?.toLowerCase() === 'tablet');
  const playstations = products.filter(p => p.category?.toLowerCase() === 'playstation');

  return (
    <>
      <main className="min-h-screen pb-20 p-8">
        {/* Heldenbereich */}
        <section className="bg-slate-900 text-white py-16 px-4 mt-32 text-center mb-10 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{dict.hero.title}</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{dict.hero.subtitle}</p>
        </section>

        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {/* Slider werden basierend auf gefilterten Kategorien gerendert. */}
          {cameras.length > 0 && <HomeSlider products={cameras} title={dict.category.cameras}/>}
          {laptops.length > 0 && <HomeSlider products={laptops} title={dict.category.laptops} />}
          {mobiles.length > 0 && <HomeSlider products={mobiles} title={dict.category.mobiles} />}
          {tablets.length > 0 && <HomeSlider products={tablets} title={dict.category.tablets} />}
          {playstations.length > 0 && <HomeSlider products={playstations} title={dict.category.gaming} />}
        </div>
      </main>
    </>
  );
}
