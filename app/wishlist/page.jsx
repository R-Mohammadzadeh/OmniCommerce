"use client";

import ProductCard from "@/Components/ProductCard";
import { useWishlistStore } from "@/store/useWishlistStore";
import Link from "next/link";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { ShoppingBag } from "lucide-react";

/**
 * Wunschliste-Seite Komponente
 * Zeigt die Favoriten an, die im Zustand gespeichert sind.
 */
export default function WishlistPage() {
  // Zugriff auf die Wunschliste aus dem Store
  const wishlist = useWishlistStore((state) => state.wishlist);

  // Zustand: Wunschliste ist leer
  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center cls duration-500">
        {/* Icon-Container für leere Wunschliste */}
        <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-full mb-2">
          <IoHeartDislikeOutline size={60} className="text-slate-400" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">
            Deine Wunschliste ist leer!
          </h2>
          <p className="text-slate-500 max-w-xs">
            Es sieht so aus, als hättest du noch keine Favoriten hinzugefügt. Entdecke jetzt unseren Shop!
          </p>
        </div>

        {/* Button zum Shop */}
        <Link 
          href='/' 
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
        >
          <ShoppingBag size={20} />
          Jetzt Shoppen
        </Link>
      </div>
    );
  }

  // Zustand: Wunschliste enthält Produkte
  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 lg:mt-32">
      <header className="mb-12 flex items-center justify-between ">
        <div>
          <h1 className="text-4xl font-black mb-2 dark:text-white">Meine Favoriten</h1>
          <p className="text-slate-500">
            Du hast {wishlist.length} {wishlist.length === 1 ? 'Artikel' : 'Artikel'} in deiner Liste
          </p>
        </div>
      </header>

      {/* Grid-Layout für die Produktkarten */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <div key={product._id} className="animate-in zoom-in-95 duration-300">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}