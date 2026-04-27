"use client";

import Link from "next/link";
import * as motion from "framer-motion/client" 

export default function NotFound() {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
    <div className="text-center">
    {/* 404 Error Message */}
    <motion.h1
        initial={{ opacity: 0, y: -20 }} 
        animate={{
        opacity: 1,
        y: [0, -15, 0], 
        }}
        transition={{
        opacity: { duration: 0.8 }, 
        y: {
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut",
        },
        }}
        className="text-9xl font-extrabold text-blue-600 dark:text-blue-500 mb-6 tracking-tight" 
    >
        404
    </motion.h1>

    <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-8" 
    >
        Page Not Found
    </motion.p>
    
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
    >
        <Link 
        href="/" 
        className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
        Go Back Home
        </Link>
    </motion.div>
    </div>
</div>
);
}