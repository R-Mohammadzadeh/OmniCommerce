import ProductActions from "@/Components/Admin-productActions";
import connectDB from "@/config/connectDB";
import ProductsData from "@/models/ProductsData";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";


export default async function InventoryPage() {
await connectDB();
const products = await ProductsData.find().sort({ createdAt: -1 }).lean();

return (
<>

 <div className="mt-32 flex justify-center ">
     <Link 
        href="/dashboard" 
        className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl hover:scale-105 transition-all font-bold shadow-lg shadow-blue-500/20"
    >
        <HiOutlineArrowLeft />
        My Dashbord
    </Link>
 </div>

<div className="bg-white mt-10 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">

{/* Header Row */}
<div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800 text-xs font-bold uppercase text-slate-400">
<div className="col-span-5">Product</div>
<div className="col-span-2">Category</div>
<div className="col-span-2">Price</div>
<div className="col-span-1">Stock</div>
<div className="col-span-2 text-right">Actions</div>
</div>

{/* Product Rows */}
<div className="divide-y dark:divide-slate-800">
{products.map((product) => (
  <div 
    key={product._id.toString()} 
    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-8 py-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all"
  >
    {/* Name & Image */}
    <div className="col-span-1 md:col-span-5 flex items-center gap-4">
      <img 
        src={product.image[0].startsWith('http') ? product.image[0] : `/image/${product.category.toLowerCase()}s/${product.image[0]}`} 
        className="w-12 h-12 rounded-xl object-contain bg-slate-100 dark:bg-slate-800 p-1 shrink-0"
        alt=""
      />
      <div className="min-w-0"> {/* overflow hidden */}
        <p className="font-bold text-slate-800 dark:text-white truncate pr-4">
          {product.name}
        </p>
        <p className="text-[10px] text-slate-400 font-medium md:hidden uppercase mt-1">
          {product.category}
        </p>
      </div>
    </div>

    {/* Category - in desc*/}
    <div className="hidden md:block col-span-2">
      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[11px] font-bold">
        {product.category}
      </span>
    </div>

    {/* Price */}
    <div className="col-span-1 md:col-span-2">
      <span className="text-sm md:text-base font-black text-slate-700 dark:text-slate-200">
        €{product.price.toLocaleString()}
      </span>
    </div>

    {/* Stock */}
    <div className="col-span-1 md:col-span-1">
<div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${
product.stock < 5 
? 'bg-red-50 dark:bg-red-900/20 text-red-600' 
: 'bg-green-50 dark:bg-green-900/20 text-green-600'
}`}>
{/* animate-ping*/}
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

    {/*delete Action  */}
    <div className="col-span-1 md:col-span-2">
  <ProductActions 
    productId={product._id.toString()} 
    productName={product.name} 
  />
</div>
  </div>
))}
</div>
</div>
</>
);
}