"use client"

import { useCartStore } from "@/store/useCartStore"
import { useWishlistStore } from "@/store/useWishlistStore";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { toast } from "sonner";
// import { IoIosCart } from "react-icons/io";




export default function ProductAction({product}){

const addToCart = useCartStore((state) =>state.addToCart) ;

const {wishlist , toggleWishlist} = useWishlistStore()
const inWishlist = wishlist.some((item) => item._id === product._id)

const handleAddToCart = () => {
    // Add product to Zustand store
    addToCart({
        _id:product._id,
        name:product.name,
        price:product.price,
        image:product.image,
        quantity : 1
    }) ;

    // Optional: Add a small alert or toast here
    toast(`${product.name} added to cart!`)
}


return (
<div className="flex flex-col sm:flex-row gap-4 mt-auto">
<button onClick={handleAddToCart} disabled={product.stock <= 0}
className="flex-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed
rounded-2xl shadow-xl shadow-blue-500/20 transition-all 
 text-white font-bold py-5"
>
{product.stock > 0 ?'ADD to Cart' : 'Out of Stock'}
</button>

<button onClick={()=>toggleWishlist(product)}
className="flex-1 bg-gray-100 dark:bg-slate-800 font-bold py-5 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700
 text-slate-900 dark:text-white transition-all active:scale-90 flex items-center justify-center gap-2"
>
{inWishlist ? <HiHeart size={24} className="text-red-500" /> : <HiOutlineHeart size={24} />}
</button>


</div>
)
}