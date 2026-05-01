"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
// checken, ob der Benutzer bereits eine Entscheidung getroffen hat
if(typeof window !== 'undefined'){
  const consent = localStorage.getItem("cookie-consent");
if (!consent) {
setIsVisible(true);}
return ;
} 
try{
const parsed = JSON.parse(consent)

// Falls akzeptiert → nicht erneut anzeigen
if(parsed.status === 'accepted') return ;

// Falls abgelehnt → nach 24 Stunden erneut anzeigen
const now = Date.now();
const oneDay = 24 * 60 * 60 * 1000 ;

if(now - parsed.time > oneDay){
    setIsVisible(true)
}


}
catch(err){
 // Falls das JSON-Objekt beschädigt war → erneute Anzeige   
setIsVisible(true)
}

}, []);




const handleAccept = () => {
localStorage.setItem("cookie-consent", JSON.stringify({
    status: 'handleAccept',
    time : Date.now()
}));
setIsVisible(false);
};

const handleDecline = () => {
localStorage.setItem("cookie-consent", JSON.stringify({
    status: 'declined',
    time : Date.now()
}));
setIsVisible(false);
};

return (
<AnimatePresence>
{isVisible && (
<motion.div
  initial={{ y: 80, opacity: 0, scale: 0.95 }}
  animate={{ y: 0, opacity: 1, scale: 1 }}
  exit={{ y: 80, opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.4, ease: "easeOut" }}

    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-100 z-100"
>
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xl rounded-2xl p-6">
    <div className="flex items-start gap-4">
        <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-lg">
            Cookie-Einstellungen
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
           Wir verwenden Cookies, um Ihr Einkaufserlebnis zu verbessern
        </p>
        </div>
    </div>

    <div className="flex gap-3 mt-6">
        <button
        onClick={handleAccept}
        className="flex-1 bg-slate-900 dark:bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-all text-sm"
        >
        Alle akzeptieren
        </button>
        <button
        onClick={handleDecline}
        className="flex-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-all text-sm"
        >
       Ablehnen
        </button>
    </div>
    
    <div className="text-[10px] text-center mt-4 text-gray-400 flex justify-center gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
        <Link  className="text-[11px] text-gray-400 hover:text-blue-500 transition-colors uppercase tracking-wider font-medium"
        href='/impressum'>
        Impressum
        </Link>
        <Link  className="text-[11px] text-gray-400 hover:text-blue-500 transition-colors uppercase tracking-wider font-medium"
        href='/datenschutz'>
        Datenschutz
        </Link>
    </div>
    </div>
</motion.div>
)}
</AnimatePresence>
);
}