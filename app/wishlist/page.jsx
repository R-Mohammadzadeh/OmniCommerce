"use client";

import ProductCard from "@/Components/ProductCard";
import { useWishlistStore } from "@/store/useWishlistStore";
import Link from "next/link";
import { IoHeartDislikeOutline } from "react-icons/io5";


export default function WishlistPage (){

const wishlist = useWishlistStore((state) => state.wishlist) ;

if(wishlist.length === 0) {
return (
<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
<h2 className="text-2xl font-bold text-gray-400">
    Your Wishlist is empty!
    <span className="flex justify-center py-3 font-bold">
        <IoHeartDislikeOutline size={42} />
    </span>
</h2>
<Link href='/' 
className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
Go Shoping
</Link>
</div>
)
}




return(
<div className="max-w-7xl mx-auto p-6 ">
<h1 className="text-3xl font-black mb-8 dark:text-white"> My Favorites</h1>
{/* Grid Layout */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{wishlist.map((product) =>(
    <ProductCard key={product._id} product={product} />
))}
</div>
</div>
)


}

















