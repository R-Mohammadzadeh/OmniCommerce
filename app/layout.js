
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import Footer from "@/Components/Footer";
import CookieConsent from "@/Components/CookieConsent";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Reza Store | Premium Gadgets",
  description: "Buy the latest Laptops, Mobiles and Gaming Gear",
  icon: "/my-fave.png",
};



export default async function RootLayout({ children }) {
  const session = await auth()
  
  const user = session?.user
  return (
    <html lang="en" suppressHydrationWarning>
      <body
       className={`${geistSans.variable} ${geistMono.variable}
        bg-white dark:bg-slate-950 text-slate-900 dark:text-white 
         antialiased min-h-screen flex flex-col`}>
           <Toaster richColors duration={3000}  position="top-center" visibleToasts={1} />
        <Navbar user={user} />
        <main className="flex-1">
          {children}
        </main>
         <Footer />
         <CookieConsent />
      </body>
    </html>
  );
}
