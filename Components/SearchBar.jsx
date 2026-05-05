"use client";

import { searchProducts } from "@/app/actions/searchAction";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

/**
 * SearchBar Komponente
 * Ermöglicht eine Echtzeit-Suche (Live Search) mit Debounce-Funktion
 * und zeigt die Ergebnisse in einem Dropdown-Menü an.
 */
export default function SearchBar() {
  // Der Text, den der Benutzer in das Suchfeld eingibt
  const [query, setQuery] = useState(''); 
  // Liste der gefundenen Produkte aus der Datenbank
  const [results, setResults] = useState([]); 
  // Status, ob das Suchfeld aktiv (fokussiert) ist
  const [isFocused, setIsFocused] = useState(false); 

  // Trigger für die Suche mit Debounce (Verzögerung), um API-Anfragen zu sparen
  useEffect(() => {
    const delayFn = setTimeout(async () => {
      if (query.length >= 2) {
        try {
          const data = await searchProducts(query);
          setResults(data);
        } catch (error) {
          console.error("Fehler bei der Suche:", error);
          setResults([]);
        }
      } else {
        setResults([]);
      }
    }, 300); // 300ms warten nach dem letzten Tastendruck

    return () => clearTimeout(delayFn);
  }, [query]);

  return (
    <div className="relative flex-1 max-w-md mx-4">
      {/* Suchfeld-Eingabe */}
      <div className="relative">
        <HiMagnifyingGlass 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
          size={18} 
        />

        <input 
          type="text" 
          placeholder="Produkte suchen..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all border-none text-sm dark:text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          // Verzögerung beim Blur, damit Klicks auf Links im Dropdown registriert werden
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} 
        />
      </div>

      {/* Ergebnis-Dropdown */}
      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 shadow-2xl rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden z-100 mt-2 bg-white dark:bg-slate-800">
          {results.map((product) => {
            // Bildpfad-Logik (konsistent mit ProductCard)
            const img = product.image?.[0];
            const imageSrc = img?.startsWith('http') 
              ? img 
              : `/image/${product.category?.toLowerCase()}s/${img || 'placeholder.png'}`;

            return (
              <Link 
                key={product._id} 
                href={`/product/${product._id}`}
                className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border-b last:border-none border-gray-50 dark:border-slate-700"
                onClick={() => { setQuery(''); setIsFocused(false); }}
              >
                <div className="relative w-10 h-10 shrink-0">
                  <Image 
                    src={imageSrc} 
                    alt={product.name} 
                    width={40}
                    height={40}
                    className="w-full h-full object-contain bg-gray-50 dark:bg-slate-700 rounded-lg" 
                  />
                </div>
                
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-gray-800 dark:text-white line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-xs text-blue-500 font-black">
                    {product.price?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}