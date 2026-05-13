import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import Footer from "@/Components/Footer";
import CookieConsent from "@/Components/CookieConsent";
import { SessionProvider } from "next-auth/react";

// Konfiguration der Geist-Schriftarten
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
});

// Metadaten für SEO und Browser-Tab
export const metadata = {
  title: "Reza Store | Premium Gadgets",
  description: "Kaufen Sie die neuesten Laptops, Handys und Gaming-Zubehör",
    icon: "/my-fave.png",
};

/**
 * RootLayout Komponente
 * Das Haupt-Layout der Anwendung, das alle Seiten umschließt.
 * Hier werden globale Provider wie SessionProvider und UI-Komponenten wie Navbar/Footer geladen.
 */
export default async function RootLayout({ children }) {
  // 1. Session serverseitig abrufen
  const session = await auth();
  const user = session?.user;

  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        bg-white dark:bg-slate-950 text-slate-900 dark:text-white 
        antialiased min-h-screen flex flex-col transition-colors duration-300`}
      >
        {/* 
          Der SessionProvider ermöglicht den Zugriff auf die Session-Daten 
          in Client-Komponenten (über den useSession Hook). 
        */}
        <SessionProvider session={session}>
          {/* Toaster für Benachrichtigungen (Erfolg, Fehler, etc.) */}
          <Toaster
            richColors
            closeButton
            duration={3000}
            position="top-center"
            visibleToasts={1}
          />
          
          {/* Navigation mit Übergabe der Benutzerdaten */}
          <Navbar user={user} />
          
          {/* Hauptinhalt der jeweiligen Seite */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4">
            {children}
          </main>
          
          {/* Footer und Cookie-Hinweis */}
          <Footer />
          <CookieConsent />
        </SessionProvider>
      </body>
    </html>
  );
}