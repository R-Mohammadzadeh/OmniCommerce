import connectDB from "@/config/connectDB";
import ProductsData from "@/models/ProductsData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import ProductAction from "./ProductActions";
import { getRelatedProducts } from "@/app/actions/getRelatedProductsAction";
import HomeSlider from "@/Components/HomeSlider";
import StarRating from "@/Components/StartRating";
import ProductReviews from "@/Components/ProductReviews";


// Dynamic metadata generation for product pages
export async function generateMetadata({ params }) {
  const { id } = await params;
  
  await connectDB();
  const product = await ProductsData.findById(id).lean();

  if (!product) {
    return {
      title: "Product Not Found | MyStore",
    };
  }

  return {
    title: `${product.name} | MyStore`,
    description: product.description.substring(0, 160), // First 160 characters for SEO
    openGraph: {
      images: [product.image[0]], // Image for social media sharing
    },
  };
}



// This is a Server Component
export default async function ProductDetailsPage({ params }) {
const { id } = await params;

await connectDB();

// Fetch product and convert to plain object
const product = await ProductsData.findById(id).lean();

if (!product) {
notFound(); // Redirects to 404 if ID is invalid
}

// finde related article
const relatedProducts = await getRelatedProducts(product.category , id)



return (
<main className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-16 px-4">
<div className="max-w-7xl mx-auto">

{/* Back Button */}
<Link 
href="/" 
className="inline-flex items-center gap-2 text-sm font-medium
 text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
>
<HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
Back to Shop
</Link>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

{/* 1. Left Column: Image Gallery */}
<div className=" top-28">
<div className="relative aspect-square bg-gray-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-slate-800 shadow-inner group">
<img
    src={product.image[0].startsWith('http') ? product.image[0] :
   `/image/${product.category.toLowerCase()}s/${product.image[0]}`}
    alt={product.name}
    className="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-105"
/>
</div>
{/* can add thumbnail mapping here if there are more images */}
</div>

{/* 2. Right Column: Product Details */}
<div className="flex flex-col">
<div className="mb-6">
<span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-widest">
    {product.category}
</span>
</div>

<h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
{product.name}
</h1>

{/* rating */}
<div className="flex items-center gap-5 my-4">
         <StarRating initialRating={product.rating} readonly={true} />
         <span className="text-gray-400 text-sm">({product.numReviews || 0} reviews)</span>
</div>


<div className="flex items-center gap-6 mb-8">
<div className="flex flex-col">
    <span className="text-sm text-gray-400 uppercase font-bold tracking-tighter">Price</span>
    <span className="text-4xl font-black text-blue-600">
        €{product.price?.toLocaleString()}
    </span>
</div>

<div className="h-12 w-px bg-gray-100 dark:bg-slate-800"></div>

<div className="flex flex-col">
    <span className="text-sm text-gray-400 uppercase font-bold tracking-tighter">Availability</span>
    {product.stock > 0 ? (
        <span className="text-green-500 font-bold">In Stock ({product.stock})</span>
    ) : (
        <span className="text-red-500 font-bold">Out of Stock</span>
    )}
</div>
</div>

<div className="prose dark:prose-invert max-w-none mb-10">
<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Description</h3>
<p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
    {product.description}
</p>
</div>

{/* Action Buttons */}
<ProductAction product={JSON.parse(JSON.stringify(product))} />

{/* Trust Badges */}
<div className="grid grid-cols-3 gap-4 mt-12 border-t dark:border-slate-800 pt-8">
<div className="text-center">
    <div className="text-xs font-bold text-gray-400 uppercase">Free Delivery</div>
</div>
<div className="text-center">
    <div className="text-xs font-bold text-gray-400 uppercase">Original Product</div>
</div>
<div className="text-center">
    <div className="text-xs font-bold text-gray-400 uppercase">7 Days Return</div>
</div>
</div>
</div>

</div>

{/* comments section */}
<div className="mt-20 border-t dark:border-slate-800 pt-16 ">
<ProductReviews product={JSON.parse(JSON.stringify(product))} />
</div>
{/* related article */}
<div className="flex justify-between items-center my-9">
<h2 className="text-2xl font-black text-slate-800 dark:text-white">
You Might Also Like
</h2>
<span className="text-blue-600 text-sm font-bold">Similar{product.category}</span>
</div>

{ relatedProducts.length > 0 ?(
    <HomeSlider  products={relatedProducts} title='' />
) : (
    <p className="text-gray-500">No similar products found</p>
)

}
</div>
</main>
);
}