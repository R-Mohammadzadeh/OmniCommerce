"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineTrash, HiMinus, HiPlus } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createCheckoutAction } from "../actions/stripeActions";


export default function CartPage() {


const { cart, removeFromCart, addToCart, clearCart , decreaseQuantity } = useCartStore(); 
const [mounted, setMounted] = useState(false);
const [loading , setLoading] = useState(false)


useEffect(() => {
setMounted(true);
}, []);

const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1),0);

// Optimierte Checkout-Funktion mit Server Action
const handleCheckout = async () => {
    if (cart.length === 0) {
    toast.error("Ihr Warenkorb ist leer!");
    return;
  }
 try{
setLoading(true)
// Aufruf der Server Action statt Fetch
   const result = await createCheckoutAction(cart)

if(result.error){
    toast.error(result.message)
}else if (result.url){
    // Weiterleitung zum sicheren Stripe-Zahlungsportal
window.location.href=result.url
}
 }
 catch(err){
console.error("Checkout Request Failed:", err)
toast.error("Ein unerwarteter Fehler ist aufgetreten.")
 }finally{
    setLoading(false)
 }
}

if (!mounted) return null;
return (
<div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12 px-4 transition-colors duration-300">
<div className="max-w-6xl mx-auto">
<h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b dark:border-slate-800 pb-4">
 Warenkorb
</h1>

{cart.length === 0 ? (
<div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800">
<h2 className="text-xl text-gray-500 mb-6 font-medium">Ihr Warenkorb ist leer!</h2>
<Link 
    href="/" 
    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full transition-all inline-block shadow-lg shadow-blue-500/20"
>
    Zurück zum Store
</Link>
</div>
) : (
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

{/* Artikelliste */}
<div className="lg:col-span-2 space-y-4">
    <AnimatePresence mode='popLayout'>
    {cart.map((item) => (
        <motion.div
        key={item._id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, x: -100 }}
        className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border dark:border-slate-800"
        >
        <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg">
            <Image
            // Prüfen, ob Bilder vorhanden sind, andernfalls Platzhalter verwenden
            src={item.image && item.image.length > 0 ? item.image[0] : "/image/placeholder.png"}
            alt={item.name}
            fill
            unoptimized
            className="object-cover"
            />
        </div>

        <div className="grow">
            <h3 className="font-semibold text-slate-800 dark:text-gray-200 line-clamp-1">
            {item.name}
            </h3>
            <p className="text-blue-600 font-bold mt-1">${item.price.toLocaleString()}</p>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            <button 
            onClick={() => decreaseQuantity(item._id,)}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 p-1"
            >
            <HiMinus size={16} />
            </button>
            <span className="font-bold dark:text-white w-5 text-center text-sm">
            {item.quantity || 1}
            </span>
            <button 
            onClick={() => addToCart(item)}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 p-1"
            >
            <HiPlus size={16} />
            </button>
        </div>

        <button
            onClick={() => removeFromCart(item._id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
        >
            <HiOutlineTrash size={22} />
        </button>
        </motion.div>
    ))}
    </AnimatePresence>

    <button 
    onClick={clearCart}
    className="text-sm text-gray-400 hover:text-red-500 transition-colors mt-2"
    >
   Warenkorb leeren
    </button>
</div>


{/* Summary Sidebar */}
<div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border dark:border-slate-800 h-fit sticky top-24">
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
       Bestellübersicht
    </h2>
    
    <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Zwischensumme</span>
            <span className="font-medium">€{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400 border-b dark:border-slate-800 pb-4">
            <span>Versand</span>
            <span className="text-green-500 font-bold text-sm">FREE</span>
        </div>
        <div className="flex justify-between text-xl font-extrabold text-slate-900 dark:text-white">
            <span>Gesamt</span>
            <span>€{totalPrice.toLocaleString()}</span>
        </div>
    </div>

    {/* */}
    <button 
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-center`}
    >
        {loading ? "Verbindung zu Stripe..." : "Zur Kasse"}
    </button>
    
    <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest">
        Sicherer SSL-Checkout
    </p>
</div>

</div>
)}
</div>
</div>
);
}