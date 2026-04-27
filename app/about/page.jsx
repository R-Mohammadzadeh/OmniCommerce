"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CountUp from 'react-countup';
import { FaTwitter ,  FaLinkedinIn ,FaInstagramSquare ,FaTelegram, FaFacebook} from "react-icons/fa";




export default function AboutPage() {
return (
<div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
<div className="max-w-4xl mx-auto">
{/* Header Section */}
<header className="text-center mb-16">
<motion.h1 
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
>
We are redefining <span className="text-blue-600">Shopping</span>
</motion.h1>
<motion.p 
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.2 }}
className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
>
Welcome to our store. We believe in quality, innovation, and providing 
the best experience for our community.
</motion.p>
</header>

{/* Stats / Features Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
{[
{ label: "Founded", value: 2024, suffix: "", color: "text-blue-400" },
{ label: "Community", value:10000 ,suffix:"+", color: "text-purple-500" },
{ label: "Products", value: 500,suffix:'+', color: "text-green-500" }
].map((stat, index) => (
<motion.div
    key={index}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 + 0.3 }}
    className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-center shadow-sm"
>
    <p className="text-slate-500 text-sm font-bold uppercase mb-2">{stat.label}</p>
    <p className={`text-4xl font-black ${stat.color}`}>
        <CountUp  end={stat.value} duration={2.5} separator=","   />
        {stat.suffix}</p>
</motion.div>
))}
</div>

{/* Mission Section */}
<motion.section 
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.6 }}
className="bg-blue-600 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden"
>
<div className="relative z-10">
<h2 className="text-3xl font-black mb-6"><span>Our Mission</span></h2>
<p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto">
    To empower customers by providing a seamless interface and high-quality products 
    delivered with integrity and speed. Every click you make, we ensure it's worth it.
</p>
</div>
{/* Decorative Circle */}
<div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-50 blur-3xl"></div>
</motion.section>

{/* Call to Action */}
<div className="mt-16 text-center">
<Link 
href="/" 
className="inline-block px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-transform"
>
Back to Shopping
</Link>
</div>
</div>

{/* Core and Values section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-4xl mx-auto">
  {[
    { title: "Customer First", desc: "We prioritize your satisfaction in every step of the journey.", icon: "🤝" },
    { title: "Fast Delivery", desc: "Getting your tech to your doorstep in record time.", icon: "⚡" },
    { title: "Secure Payment", desc: "Your data and transactions are always protected.", icon: "🔒" },
    { title: "Authentic Products", desc: "We only source 100% genuine products from top brands.", icon: "💎" }
  ].map((value, index) => (
    <div key={index} className="flex gap-5 p-6 hover:bg-slate-400/10 
     bg-slate-50 dark:bg-slate-900/50 rounded-4xl border border-transparent hover:border-blue-100 dark:hover:border-slate-800 transition-all">
      <div className="text-4xl">{value.icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white">{value.title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{value.desc}</p>
      </div>
    </div>
  ))}
</div>






{/* team section */}
<section className="mt-24 mb-16">
<h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12">
Meet the <span className="text-blue-600">Visionaries</span>
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
{[
    {name:'Sahar' , role:"Founder & CEO" , image: "https://i.pravatar.cc/150?u=sina"},
    {name:'Sarah' , role:"UI/UX Designer" , image: "https://i.pravatar.cc/150?u=sarah"},
    {name:'Alex' , role:"Lead Developer" , image: "https://i.pravatar.cc/150?u=alex"},
].map((member , index) => (

    <motion.div className="group relative bg-white dark:bg-slate-900 cursor-pointer
    p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800
     text-center shadow-lg hover:shadow-2xl transition-all duration-300"
      key={index}  whileHover={{y:-10}}  >

<div className="relative w-32 h-32 mx-auto mb-6">
<img src={member.image} alt={member.name}
 className="rounded-full w-full h-full object-cover grayscale 
 group-hover:grayscale-0 transition-all duration-500 border-4
  border-slate-50 dark:border-slate-800"
 />

<div 
className="absolute inset-0 rounded-full 
opacity-0 group-hover:opacity-100 transition-opacity
 bg-blue-500/20 blur-xl  "></div>

<h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
<p className="text-blue-600 font-medium text-sm mb-4">{member.role}</p>
</div>

{/* team social links */}
<div className="p-10 flex justify-center 
gap-10 text-slate-500 dark:text-slate-400 text-xl">
<div className="">
    <Link href="#" target="_blank" rel="noopener noreferrer"> 
     <FaLinkedinIn size={20} className="" />
    </Link>
</div>
<div className="">
   <Link href="#" target="_blank" rel="noopener noreferrer">
        <FaInstagramSquare size={20} className="" />
    </Link>
</div>
<div className="">
    <Link href="#" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={20} className="" />
    </Link>
</div>
<div className="">
    <Link href="#" target="_blank" rel="noopener noreferrer">
        <FaTelegram size={20} className="" />
    </Link>
</div>
</div>


    </motion.div>
))
}   
</div>


</section>


</div>
);
}