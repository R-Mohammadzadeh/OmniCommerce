import HomeSlider from '@/Components/HomeSlider'

import { getHomeProducts } from "./actions/getHomeProductsAction";
import Link from "next/link";





export default async function HomePage() {
  // 
  const {success , products ,error } = await getHomeProducts();

if(!success){
  return <div className='text-red-500 p-10 text-center'>{error}</div>
}


if(products.length === 0){
  return <div className='p-10 text-center'>
    In unserer Kollektion wurden keine Produkte gefunden.
  </div>
}


  const rawProducts = response?.products || [];

  // 
  const cameras = rawProducts.filter(p => p.category?.toLowerCase() === 'camera');
  const laptops = rawProducts.filter(p => p.category?.toLowerCase() === 'laptop');
  const mobiles = rawProducts.filter(p => p.category?.toLowerCase() === 'mobile');
  const tablets = rawProducts.filter(p => p.category?.toLowerCase() === 'tablet');
  const playstations = rawProducts.filter(p => p.category?.toLowerCase() === 'playstation');

  return (
    <>
      <main className="min-h-screen pb-20 p-8">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-16 px-4 mt-32 text-center mb-10 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">New Arrivals</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Premium collection of your favorite gadgets.</p>
        </section>

        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {/* */}
          {cameras.length > 0 && <HomeSlider products={cameras} title="Cameras" />}
          {laptops.length > 0 && <HomeSlider products={laptops} title="Laptops" />}
          {mobiles.length > 0 && <HomeSlider products={mobiles} title="Smartphones" />}
          {tablets.length > 0 && <HomeSlider products={tablets} title="Tablets" />}
          {playstations.length > 0 && <HomeSlider products={playstations} title="Gaming Gear" />}

          {/* */}
          {rawProducts.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No Products Available</h2>
              <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                View All Products
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
