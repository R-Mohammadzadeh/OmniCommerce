"use client";

import Link from "next/link";
import * as motion from "framer-motion/client";

/**
 * 404 - Seite nicht gefunden
 * Diese Seite wird automatisch von Next.js angezeigt, wenn eine Route nicht existiert.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="text-center p-6">
        
        {/* Animierte 404 Fehlermeldung */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: [0, -15, 0], // Schwebe-Effekt
          }}
          transition={{
            opacity: { duration: 0.8 },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="text-9xl font-black text-blue-600 dark:text-blue-500 mb-6 tracking-tighter"
        >
          404
        </motion.h1>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4 mb-10"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            Seite nicht gefunden
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Entschuldigung! Die von Ihnen gesuchte Seite existiert nicht یا wurde verschoben.
          </p>
        </motion.div>
        
        {/* Zurück-Button mit Interaktion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="inline-block px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 hover:scale-105"
          >
            Zurück zur Startseite
          </Link>
        </motion.div>

      </div>
    </div>
  );
}