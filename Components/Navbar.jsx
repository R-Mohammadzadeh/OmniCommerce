"use client";

import { LogoutAction } from "@/lib/authActions";
import { useThemeStore } from "@/store/themeStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosLogIn, IoIosLogOut, IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuSun, LuMoon } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { IoCaretDownOutline } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import SearchBar from "./SearchBar";
import { useWishlistStore } from "@/store/useWishlistStore";
import { HiOutlineHeart } from "react-icons/hi2";


// Define navigation items with sub-items for dropdowns
const navItems = [
{ name: "Camera", href: "/category/camera", subItems: ["Canon", "Lubitel", "Sony"] },
{ name: "Laptop", href: "/category/laptop", subItems: ["Acer", "Samsung", "HP", "AMD" , "Sony"] },
{ name: "Tablet", href: "/category/tablet", subItems: ["Acer", "Apple" ,"Samsung"] },
{ name: "Mobile", href: "/category/mobile", subItems: ["iPhone", "Samsung", "Xiaomi", "Pixel"] },
{ name: "PlayStation", href: "/category/Playstation", subItems: ["Sony"] },
{ name: "About Us", href: "/about", subItems: [] },
];

export default function Navbar({ user }) {

const cart = useCartStore((state) => state.cart);
const clearCart = useCartStore((state) => state.clearCart);
const theme = useThemeStore((state) => state.theme);
const toggleTheme = useThemeStore((state) => state.toggleTheme);
const wishlist = useWishlistStore((state) => state.wishlist)


// Status zur Verwaltung der Sichtbarkeit des Profil-Dropdowns
const [profileOpen , setProfileOpen] = useState(false) 
// Um ​​ein Ungleichgewicht im Flüssigkeitshaushalt zu vermeiden
const [mounted, setMounted] = useState(false); 
const [menuOpen, setMenuOpen] = useState(false);
const [activeMenu, setActiveMenu] = useState(null);

// Hintergrund der Navigationsleiste ändert sich beim Scrollen
const [scrolled, setScrolled] = useState(false);

// Add scroll listener to change navbar background
useEffect(() => {
const handleScroll = () => {
// Füge einen Scroll-Listener hinzu, um den Hintergrund der Navigationsleiste zu ändern.
 if(window.scrollY > 20){
  setScrolled(true);
 } else {
  setScrolled(false);
 }
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

useEffect(() => {
  setMounted(true)
},[])

// Designänderungen verarbeiten und sicherstellen, dass die Klasse für den Dunkelmodus beim Mounten angewendet wird.
useEffect(() => {
if (theme === 'dark') {
document.documentElement.classList.add('dark');
} else {
document.documentElement.classList.remove('dark');
}
}, [theme]);


useEffect(()=>{
  if(!profileOpen) return ;
  const handleClickOutside = () => setProfileOpen(false)
if(profileOpen){
  window.addEventListener('click' , handleClickOutside)
}
return () => window.removeEventListener('click' , handleClickOutside)
},[profileOpen])





// Berechne die Anzahl nur, wenn das Gerät montiert ist, andernfalls zeige 0 oder null an.
const wishlistCount = mounted ? wishlist.length : 0

// Berechne die Gesamtzahl der Artikel im Warenkorb für die Badge-Anzeige.
const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

// Verhindert Hydratationsfehler, indem erst nach dem Mounten gerendert wird.
if (!mounted) return null;

return (
<nav className={`fixed top-0 left-0 w-full z-60 transition-colors duration-700 ${scrolled ? 'bg-white/50 backdrop-blur-xs shadow-lg py-8 dark:bg-slate-900/90' : 
'dark:bg-transparent bg-linear-to-r from-slate-500 py-5 dark:border-slate-800'}`}>

<div className="max-w-7xl mx-auto px-4 flex items-center justify-between ">

{/* Logo & Mobile Toggle */}
<div className="flex items-center gap-4 ">
<button 
className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
onClick={() => setMenuOpen(!menuOpen)}
>
{menuOpen ? <IoMdClose size={26} /> : <RxHamburgerMenu size={26} />}
</button>

<Link href="/" className="text-xl font-bold text-slate-900 dark:text-white 
tracking-tight dark:hover:bg-slate-800 rounded-lg px-2 py-1 hover:bg-gray-100 transition-colors ">
MY<span className="text-blue-600">STORE</span>
</Link>

{/* searchBar */}
<div className="hidden lg:block  max-w-75 xl:max-w-md mx-4">
<SearchBar />
</div>

</div>

{/* Desktop Menu */}
<div className="hidden md:flex items-center gap-6 h-full">
{navItems.map((item) => (
<div 
className="relative h-full flex items-center" 
key={item.name}
onMouseEnter={() => setActiveMenu(item.name)} 
onMouseLeave={() => setActiveMenu(null)}
>
<Link href={item.href} className="text-sm font-medium hover:text-blue-600 transition-colors">
{item.name}
</Link>

<AnimatePresence>
{activeMenu === item.name && item.subItems.length > 0 && (
<motion.div 
  initial={{ opacity: 0, y: 10 }} 
  animate={{ opacity: 1, y: 0 }} 
  exit={{ opacity: 0, y: 5 }}
  className="absolute top-full left-0 w-48 bg-slate-100 dark:bg-slate-800 shadow-xl rounded-xl border border-gray-100 dark:border-slate-700 py-2 z-50 my-2 "
>
  {item.subItems.map((sub) => (
    <Link 
      key={sub}
      href={`${item.href}?brand=${sub.toLowerCase()}`}
      className="block hover:text-white hover:bg-sky-500 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:rounded-2xl dark:hover:bg-slate-700 transition-colors"
    >
      {sub}
    </Link>
  ))}
</motion.div>
)}
</AnimatePresence>
</div>
))}
</div>

{/* Right Icons */}
<div className="flex items-center gap-3 sm:gap-3 shrink-0 flex-nowrap">

{/* Theme Toggle */}
<button 
onClick={toggleTheme} 
className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 mx-2
 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform overflow-hidden hover:cursor-pointer"
>
<AnimatePresence mode="wait">
<motion.div
key={theme}
initial={{ y: -10, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
exit={{ y: 10, opacity: 0 }}
transition={{ duration: 0.2 }}
>
{theme === 'light' ? <LuMoon size={20} /> : <LuSun size={20} className="text-yellow-400" />}
</motion.div>
</AnimatePresence>
</button>

{/* Wishlist Icon */}
<div className="flex items-center justify-around">

<Link  href='/wishlist' 
className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-100 rounded-full transition  "   >

<HiOutlineHeart size={24} 
className={`transition-colors duration-300 ${
  wishlistCount > 0 ?'text-red-500 fill-red-500':'text-gray-700 dark:text-gray-300 group-hover:text-red-500'
}`} />

 {mounted && wishlistCount > 0 && (
  <span 
 className="-top-1 absolute -right-1 h-5 w-5 rounded-full
  bg-red-500 text-white text-[10px] font-bold border-2 border-white dark:border-slate-900 shadow-lg animate-in zoom-in duration-300
  flex item-center justify-center"> 

{ wishlistCount}
</span>
 )}

</Link>
</div>



{/* Cart Icon */}
<Link href='/cart' className="group relative p-2 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-sky-500 transition-colors ">
<HiOutlineShoppingBag size={22} className="text-gray-700 dark:text-gray-300 group-hover:text-white  group-hover:scale-110 group-hover:-rotate-8 group-hover:transition-transform transition duration-700 ease-in-out " />
{totalItems > 0 && (
<span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold border-2 border-white dark:border-slate-900 shadow-lg group-hover:animate-bounce">
{totalItems}
</span>
)}
</Link>


{/* Auth Section */}
<div className="hidden sm:block border-l dark:border-slate-700 h-6 mx-1"></div>

{!!user ? (
  <div className="flex items-center gap-4 relative">
    {/* Profile Toggle */}
    <button 
      onClick={(e) => {
        e.stopPropagation(); // 
        setProfileOpen(!profileOpen);
      }}
      className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors group px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-transparent hover:border-blue-200 dark:hover:border-slate-700"
    >
      <span className="font-bold cursor-pointer">
        {user?.name?.split(' ')[0] || user?.familyName || 'User'}
      </span>
      <motion.span 
        animate={{ rotate: profileOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }} 
        className="text-gray-500"
      >
        <IoCaretDownOutline size={16} />
      </motion.span>
    </button>

    {/* Profile Dropdown */}
    <AnimatePresence>
      {profileOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()} // 
          className="rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 absolute top-full right-0 mt-3 w-52 bg-white dark:bg-slate-800 py-2 z-50 overflow-hidden"
        >
          <Link 
            href='/dashboard' 
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
            onClick={() => setProfileOpen(false)} 
          >
            <MdDashboardCustomize size={20} className="text-blue-500" />
            <span>Dashboard</span>
          </Link>

          <Link 
            href='/profile' 
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
            onClick={() => setProfileOpen(false)}
          >
            <CgProfile size={20} className="text-purple-500" />
            <span>My Profile</span>
          </Link>

          <div className="h-px bg-gray-100 dark:bg-slate-700 my-1 mx-2"></div>
          
          <button 
            onClick={async () => {
              await LogoutAction();
              clearCart();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium text-red-500 transition-colors"
          >
            <IoIosLogOut size={20} />
            <span>Logout</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
) : (
  <Link 
    href="/login" 
    className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
  >
    <IoIosLogIn size={22} />
    <span className="hidden lg:inline">Login</span>
  </Link>
)}
</div>
</div> 

{/* Mobile Menu Drawer */}
<AnimatePresence>
{menuOpen && (
<motion.div
initial={{ height: 0, opacity: 0  }}
animate={{ height: 'auto', opacity: 1 , transition: { duration: 0.8, ease: 'easeInOut' }}}
exit={{ height: 0, opacity: 0 , transition: { duration: 0.5, ease: 'easeInOut' }}}
className="md:hidden bg-gray-400 dark:bg-slate-900 border-t mx-auto border-gray-100
dark:border-slate-800 overflow-hidden text-center max-h-[80vh] my-3 "
>
<div className="flex flex-col p-4 gap-2">
{navItems.map((item) => (
<Link 
key={item.name} 
href={item.href} 
onClick={() => setMenuOpen(false)}
className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium py-3 border-b border-gray-50 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors "
>
{item.name}
</Link>
))}
</div>
</motion.div>
)}
</AnimatePresence>
</nav>
);
}