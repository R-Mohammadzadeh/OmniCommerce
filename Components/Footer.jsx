"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { GrPaypal } from "react-icons/gr";
import { SiVisa } from "react-icons/si";
const footerLinks = [{
title: 'Shop' ,
links :[
    {name:'Cameras' , href:'/category/camera'},
    {name:'Laptops' , href:'/category/laptop'},
    {name:'Mobiles' , href:'/category/mobile'},
    {name:'PlayStation' , href:'/category/playStation'},
],

title : 'Company',
links : [
    {name : 'About Us' , href:'/about'},
    {name : 'Contact' , href:'/contact'},
    {name : 'Terms of Service' , href:'/terms'},
    {name : 'Privacy Policy' , href:'/privacy'},
],
}]


export default function Footer() {
  return (
    <footer className="bg-white dark:border-slate-900 pt-16 pb-8 transition-colors duration-300
     dark:bg-slate-950 border-slate-100 border-t">
     
<div className="max-w-7xl mx-auto px-9 ">
<div className="grid grid-cols-1 md:grid-cols-2 space-x-9
 lg:grid-cols-3 xl:grid-cols-4 mb-16 gap-12">

{/* Logo & Intro */}
<div className="space-y-6 text-center md:text-left">
<Link href='#' className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">MY
<span className="text-blue-600">STORE</span>
</Link>
<p className=" dark:text-slate-300 leading-relaxed text-sm pt-4">
Your one-stop destination for the latest in tech and electronics. 
              We bring the future to your doorstep.
</p>

<div className="flex gap-4 justify-center md:justify-start pt-5">
{[FaInstagram, FaTwitter, FaLinkedin, FaGithub].map((Icon , i) => (
<motion.a key={i} className="w-10 h-10 rounded-xl flex items-center 
justify-center text-slate-600 dark:text-slate-400
 hover:bg-green-600 hover:text-white transition-all cursor-pointer
 bg-slate-50 dark:bg-slate-900"
 whileHover={{y:-3 , scale:1.1}}  >
<Icon size={18} />
</motion.a>
))}
</div>
</div>

{/* Dynamic Links */}
{footerLinks.map((group) => (
    <div key={group.title} className="text-center">
<h3 className="text-slate-900 dark:text-white font-bold mb-6">{group.title}</h3>

<ul className="space-y-3">
{group.links.map((link) => (
<li key={link.name} >

<Link  href={link.href} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 text-sm transition-colors"  >
{link.name}
</Link>

</li>
))}
</ul>
    </div>
))}

{/* Contact Info */}
<div className=''>
<h4 className="text-slate-900 dark:text-white font-bold mb-6">Contact Us</h4>
<div className="space-y-3">
<div className="">
  <HiOutlineLocationMarker size={20} className="text-blue-600 shrink-0" />
  <span className="">123 Tech strasse,Digital <br />Innovation State, 45678</span>  
</div>

<div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
<HiOutlineMail size={20} className="text-blue-600 shrink-0" />
                <span>support@mystore.com</span>
</div>
</div>
</div>

{/* Bottom Bar */}
<div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
<p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            © 2026 MYSTORE. All rights reserved. Made with for tech lovers.
</p>
</div>

<div className="flex items-center gap-6  md:text-left justify-center md:justify-start">

            <Link href='#' className="" >
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="opacity-50 grayscale hover:grayscale-0 transition-all hover:cursor-pointer h-6 " />
            </Link>

            <Link href='#'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Visa_Inc._logo_%282005%E2%80%932014%29.svg"
             alt="Visa" className="opacity-50 grayscale hover:grayscale-0 transition-all hover:cursor-pointer h-6 " />

            </Link>

</div>
</div>
</div>

  


    </footer>
  );
}