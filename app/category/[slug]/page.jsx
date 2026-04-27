
import CategoryToolbar from "@/Components/CategoryToolbar";
import ProductCard from "@/Components/ProductCard";
import connectDB from "@/config/connectDB";
import ProductsData from "@/models/ProductsData";


export default async function BrandPage({ params, searchParams }) {
  
  const { slug } = await params;
  const { brand, sort } = await searchParams; 

  

  await connectDB();

  // 1.
  const query = {
    category: { $regex: new RegExp(`^${slug}$`, "i") },
  };
  if (brand) {
    query.brand = { $regex: new RegExp(`^${brand}$`, "i") };
  }

  // (Sorting Logic)
  let sortOption = { createdAt: -1 }; // 
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };

  // 3.
  const [products, allBrands] = await Promise.all([
    ProductsData.find(query).sort(sortOption).lean(),
    ProductsData.find({ category: { $regex: new RegExp(`^${slug}$`, "i") } }).distinct("brand")
  ]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl font-black  text-slate-900 dark:text-white mb-2">
            {brand ? `${brand} ` : ""}
            {slug}s
          </h1>
          <p className="text-gray-500">Found {products.length} items</p>
        </header>

    <CategoryToolbar slug={slug} brand={brand} sort={sort} allBrands={allBrands} />

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed dark:border-slate-800 text-gray-500">
            No products match your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const serializedProduct = JSON.parse(JSON.stringify(product)) ;
              return (
              <ProductCard
                key={serializedProduct._id}
                product={serializedProduct}
              />)
            })}
          </div>
        )}
      </div>
    </main>
  );
}