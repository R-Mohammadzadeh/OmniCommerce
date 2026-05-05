"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import StarRating from "./StartRating";

/**
 * ProductCard Komponente
 * Zeigt eine interaktive Produktkarte mit Bild, Preis, Bewertung und Warenkorb-Logik.
 */
export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const cart = useCartStore((state) => state.cart);
  const { wishlist, toggleWishlist } = useWishlistStore();

  const isLiked = wishlist.some((item) => item._id === product?._id);
  const isInCart = cart.some((item) => item._id === product?._id);
  const quantity = cart.find((item) => item._id === product?._id)?.quantity || 0;

  const fallbackImage = "/image/placeholder.png";

  // Initialer Bildpfad basierend auf Kategorie oder absoluter URL
  const getInitialImage = () => {
    if (product?.image?.[0]?.startsWith('http')) return product.image[0];
    return `/image/${product?.category?.toLowerCase()}s/${product?.image?.[0] || 'placeholder.png'}`;
  };

  const [imgSrc, setImgSrc] = useState(getInitialImage());
  const [loading, setLoading] = useState(true);

  // Aktualisiert das Bild, wenn sich das Produkt-Prop ändert
  useEffect(() => {
    if(!product) return;
    setLoading(true);
    const src = product?.image?.[0]?.startsWith('http') ? product.image[0] :
    `/image/${product?.category?.toLowerCase()}s/${product?.image?.[0] || 'placeholder.png' }`;
    setImgSrc(src);
  }, [product]);

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product?._id) return;
    addToCart(product);
    toast.success(`${product.name} zum Warenkorb hinzugefügt`);
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
    if (!isLiked) {
      toast.success("Auf die Wunschliste gesetzt 💗");
    } else {
      toast.error("Von der Wunschliste entfernt 💔");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col h-full group"
    >
      {/* BILD-BEREICH */}
      <div className="relative h-60 w-full bg-gray-50 dark:bg-white overflow-hidden flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-slate-600 z-10" />
        )}

        <Link href={`/product/${product._id}`} className="relative w-full h-full block p-4">
          <Image
            src={imgSrc || fallbackImage}
            onError={() => setImgSrc(fallbackImage)}
            onLoad={() => setLoading(false)}
            alt={product?.name || "Produktbild"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Kategorie-Label */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm z-20 uppercase tracking-wider text-blue-600">
          {product?.category}
        </div>

        {/* Wunschlisten-Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 p-2 rounded-full shadow hover:scale-110 transition z-20 group/heart"
        >
          {isLiked ? (
            <HiHeart size={18} className="text-red-500" />
          ) : (
            <HiOutlineHeart size={18} className="text-gray-600 dark:text-gray-300 group-hover/heart:text-red-400" />
          )}
        </button>
      </div>

      {/* INFO-BEREICH */}
      <div className="p-5 flex flex-col grow">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
            {product?.name}
          </h3>
        </Link>

        {/* Bewertung */}
        <div className="my-2 flex items-center gap-2">
          <StarRating initialRating={product.rating || 0} readonly={true} />
          <span className="text-xs text-gray-400">({product.numReviews || 0})</span>
        </div>

        {/* Beschreibung */}
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">
          {product?.description}
        </p>

        {/* Preis und Warenkorb */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-slate-700">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Preis</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {product?.price?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
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
                className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 transition-all text-white shadow-lg flex items-center justify-center"
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