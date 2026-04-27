"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import StarRating from "./StartRating";


export default function ProductCard({ product }) {
const addToCart = useCartStore((state) => state.addToCart);
const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
const cart = useCartStore((state) => state.cart);
const { wishlist, toggleWishlist } = useWishlistStore();

const isLiked = wishlist.some((item) => item._id === product?._id);
const isInCart = cart.some((item) => item._id === product?._id);
const quantity = cart.find((item) => item._id === product?._id)?.quantity || 0;

const fallbackImage = "/image/placeholder.png";

// 1.
const getInitialImage = () => {
if (product?.image?.[0]?.startsWith('http')) return product.image[0];
return `/image/${product?.category?.toLowerCase()}s/${product?.image?.[0] || 'placeholder.png'}`;
};

const [imgSrc, setImgSrc] = useState(getInitialImage());
const [loading, setLoading] = useState(true);

// 
useEffect(() => {
setImgSrc(getInitialImage());
}, [product]);

const handleAddToCartClick = (e) => {
e.preventDefault();
e.stopPropagation();
if (!product?._id) return;
addToCart(product);
toast.success(`${product.name} added to cart`);
};

const handleIncrease = (e) => {
e.preventDefault();
e.stopPropagation();
addToCart(product);
};

const handleDecrease = (e) => {
e.preventDefault();
e.stopPropagation();
decreaseQuantity(product._id);
};

const handleWishlist = (e) => {
e.preventDefault();
e.stopPropagation();
toggleWishlist(product);
toast.success(isLiked ? "Removed from wishlist ❤️" : "Added to wishlist 🤍");
};

return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
whileHover={{ y: -5 }}
state={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}

//  
className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col h-full group"
>
{/* Image Section */}
<div className="relative h-60 w-full bg-gray-50 dark:bg-white overflow-hidden flex items-center justify-center">
{loading && (
<div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-slate-600 z-10" />
)}

<Link href={`/product/${product._id}`} className="relative w-full h-full block p-4">
<Image
  src={imgSrc || fallbackImage}
  onError={() => setImgSrc(fallbackImage)}
  onLoad={() => setLoading(false)}
  alt={product?.name || "product"}
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  // fill and obj contain to maintain aspect ratio and prevent distortion    
  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
/>
</Link>

{/* Category Label */}
<div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm z-20">
{product?.category}
</div>

{/* Wishlist Button */}
<button
onClick={handleWishlist}
className="absolute top-3 left-3 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition z-20"
>
{isLiked ? "❤️" : "🤍"}
</button>
</div>

{/* Content Section */}
<div className="p-5 flex flex-col grow ">
<h3 className="text-base font-bold text-gray-800 dark:text-white mb-1 line-clamp-1 h-6">
{product?.name}
</h3>

{/* rating */}
<div className="my-2 flex items-center gap-2 ">
   <StarRating initialRating={product.rating || 0} readonly={true} />
  <span className="text-xs text-yellow-300">({product.numReviews || 0})</span>
  </div>

{/* Description   */}
<p className="text-gray-500 dark:text-gray-400 text-xs mb-4 line-clamp-2 h-auto leading-relaxed text-justify ">
{product?.description}
</p>

<div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50 dark:border-slate-700">
<div className="flex flex-col">
  <span className="text-xs text-gray-400">Price</span>
  <span className="text-lg font-black text-blue-600 dark:text-blue-400">
    €{product?.price?.toLocaleString()}
  </span>
</div>

<div className="flex items-center z-20">
  {isInCart ? (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-900 rounded-xl p-1 shadow-inner">
      <button onClick={handleDecrease} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:text-red-500 transition-colors">-</button>
      <span className="font-bold px-1 dark:text-white text-sm">{quantity}</span>
      <button onClick={handleIncrease} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:text-green-500 transition-colors">+</button>
    </div>
  ) : (
    <button
      onClick={handleAddToCartClick}
      className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-blue-600 transition-all text-white shadow-lg flex items-center justify-center"
    >
      <HiPlus size={20} />
    </button>
  )}
</div>
</div>
</div>
</motion.div>
);
}