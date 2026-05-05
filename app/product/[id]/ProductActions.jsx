"use client"

import { useCartStore } from "@/store/useCartStore"
import { useWishlistStore } from "@/store/useWishlistStore";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { toast } from "sonner";

export default function ProductAction({ product }) {
  
  const addToCart = useCartStore((state) => state.addToCart);
  const { wishlist, toggleWishlist } = useWishlistStore();
  
  // Überprüfen, ob das Produkt bereits in der Wunschliste ist
  const inWishlist = wishlist.some((item) => item._id.toString() === product._id.toString());

  const handleAddToCart = () => {
    if (product.stock <= 0) return;

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });

    toast.success("Zum Warenkorb hinzugefügt", {
      description: product.name
    });
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    if (!inWishlist) {
      toast.success("Zur Wunschliste hinzugefügt");
    } else {
      toast.info("Von der Wunschliste entfernt");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
      <button 
        onClick={handleAddToCart} 
        disabled={product.stock <= 0}
        title={product.stock <= 0 ? 'Nicht verfügbar' : ''}
        className="flex-3 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed
        rounded-2xl shadow-xl shadow-blue-500/20 transition-all 
        text-white font-bold py-5 px-8"
      >
        {product.stock > 0 ? 'In den Warenkorb' : 'Ausverkauft'}
      </button>

      <button 
        onClick={handleWishlist}
        aria-label="Wunschliste"
        className="flex-1 bg-gray-100 dark:bg-slate-800 font-bold py-5 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700
        text-slate-900 dark:text-white transition-all active:scale-90 flex items-center justify-center gap-2 border border-transparent dark:border-slate-700"
      >
        {inWishlist ? (
          <HiHeart size={28} className="text-red-500 animate-pulse" />
        ) : (
          <HiOutlineHeart size={28} />
        )}
      </button>
    </div>
  );
}