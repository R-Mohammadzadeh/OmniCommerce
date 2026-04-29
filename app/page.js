import HomeSlider from '@/Components/HomeSlider'

import { getHomeProducts } from "./actions/getHomeProductsAction";
import Link from "next/link";





export default async function HomePage() {
 // 1. Fetching data from the action 
  const {success , products ,error  } = await getHomeProducts();

// 2. Error handling
if(!success){
  return <div className='text-red-500 p-10 text-center'>{error}</div>
}

// 3. Empty state handling
if(!products || products.length === 0){
  return( 
  <div className='p-10 text-center'>
   <h2 className="text-xl mb-4">
     In unserer Kollektion wurden keine Produkte gefunden.
   </h2>
   <Link href='/products' className='text-blue-600 underline' >View all products</Link>
  </div>)
}

  //4. Filtering products by category 
  const cameras = products.filter(p => p.category?.toLowerCase() === 'camera');
  const laptops = products.filter(p => p.category?.toLowerCase() === 'laptop');
  const mobiles = products.filter(p => p.category?.toLowerCase() === 'mobile');
  const tablets = products.filter(p => p.category?.toLowerCase() === 'tablet');
  const playstations = products.filter(p => p.category?.toLowerCase() === 'playstation');

  return (
    <>
      <main className="min-h-screen pb-20 p-8">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-16 px-4 mt-32 text-center mb-10 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">New Arrivals</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Premium collection of your favorite gadgets.</p>
        </section>

        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {/* Rendering Sliders based on filtered categories */}
          {cameras.length > 0 && <HomeSlider products={cameras} title="Cameras" />}
          {laptops.length > 0 && <HomeSlider products={laptops} title="Laptops" />}
          {mobiles.length > 0 && <HomeSlider products={mobiles} title="Smartphones" />}
          {tablets.length > 0 && <HomeSlider products={tablets} title="Tablets" />}
          {playstations.length > 0 && <HomeSlider products={playstations} title="Gaming Gear" />}
        </div>
      </main>
    </>
  );
}
