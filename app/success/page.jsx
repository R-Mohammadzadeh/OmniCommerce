"use client" ;

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Den Warenkorb nach erfolgreichem Kauf leeren
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950 px-4">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl text-center border dark:border-slate-800">
        
        {/* Erfolgssymbol */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Vielen Dank für Ihren Einkauf!
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Ihre Zahlung war erfolgreich und Ihre Bestellung wird jetzt bearbeitet. 
          Sie erhalten in Kürze eine Bestätigungs-E-Mail.
        </p>
        
        <Link 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          Zurück zum Shop
        </Link>
      </div>
    </div>
  );
}