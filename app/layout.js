import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import Footer from "@/Components/Footer";
import CookieConsent from "@/Components/CookieConsent";

// Konfiguration der Geist-Schriftarten mit CSS-Variablen
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
});

/**
 * Metadaten für SEO und Favicon
 * Hinweis: Das 'icons'-Objekt ist der Standard für Next.js Metadata
 */
export const metadata = {
  title: "Reza Store | Premium Gadgets",
  description: "Kaufen Sie die neuesten Laptops, Handys und Gaming-Zubehör",
    icon: "/my-fave.png",
};

/**
 * Root Layout Komponente
 * Diese Komponente umschließt alle Unterseiten und bietet globale UI-Elemente.
 */
export default async function RootLayout({ children }) {
  // Abrufen der Sitzungsdaten auf der Serverseite
  const session = await auth();
  const user = session?.user;

  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}
        bg-white dark:bg-slate-950 text-slate-900 dark:text-white 
        antialiased min-h-screen flex flex-col transition-colors duration-300`}
      >
        {/* Globale Benachrichtigungen (Toasts) */}
        <Toaster 
          richColors 
          closeButton 
          duration={3000} 
          position="top-center" 
          visibleToasts={1} 
        />
        
        {/* Navigation mit Benutzer-Kontext */}
        <Navbar user={user} />
        
        {/* Hauptinhalt mit responsivem Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4">
          {children}
        </main>
        
        {/* Fußzeile und rechtliche Hinweise */}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}