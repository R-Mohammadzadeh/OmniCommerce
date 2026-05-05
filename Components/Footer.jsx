"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

/**
 * Konfiguration der Footer-Links
 * Unterteilt in Kategorien für eine bessere Übersicht.
 */
const footerLinks = [
  {
    title: "Shop",
    links: [
      { name: "Kameras", href: "/category/camera" },
      { name: "Laptops", href: "/category/laptop" },
      { name: "Smartphones", href: "/category/mobile" },
      { name: "Gaming & Konsolen", href: "/category/playStation" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { name: "Über uns", href: "/about" },
      { name: "Kontakt", href: "/contact" },
      { name: "Impressum", href: "/impressum" },
      { name: "Datenschutz", href: "/datenschutz" },
    ],
  },
];

const socials = [FaInstagram, FaTwitter, FaLinkedin, FaGithub];

/**
 * Footer Komponente
 * Enthält Branding, Navigation, Kontaktinfo und Zahlungsmethoden.
 */
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* OBERER GRID-BEREICH */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRANDING & BESCHREIBUNG */}
          <div>
            <Link href="/" className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              REZA<span className="text-blue-600">STORE</span>
            </Link>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Ihre erste Adresse für moderne Technik und Elektronik. 
              Wir bringen Innovation direkt zu Ihnen nach Hause.
            </p>

            {/* SOCIAL MEDIA ICONS */}
            <div className="flex gap-3 mt-6">
              {socials.map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl
                  bg-slate-100 dark:bg-slate-900
                  text-slate-600 dark:text-slate-400
                  hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* LINK-GRUPPEN (SHOP & UNTERNEHMEN) */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-bold text-slate-900 dark:text-white mb-5">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* KONTAKT INFORMATIONEN */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-5">
              Kontakt
            </h3>

            <div className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex gap-3">
                <HiOutlineLocationMarker className="text-blue-600 mt-1" size={20} />
                <span>
                  Tech-Straße 123 <br />
                  12345 Berlin, Deutschland
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <HiOutlineMail className="text-blue-600" size={20} />
                <span>support@rezastore.de</span>
              </div>
            </div>
          </div>

        </div>

        {/* UNTERE LEISTE (COPYRIGHT & ZAHLUNG) */}
        <div className="mt-16 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400 text-center md:text-left">
            © 2026 REZASTORE. Alle Rechte vorbehalten.
          </p>

          {/* ZAHLUNGSMETHODEN */}
          <div className="flex gap-6 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              className="h-5 opacity-60 grayscale hover:grayscale-0 transition"
              alt="PayPal"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/Visa_Inc._logo_%282005%E2%80%932014%29.svg"
              className="h-5 opacity-60 grayscale hover:grayscale-0 transition"
              alt="Visa"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              className="h-7 opacity-60 grayscale hover:grayscale-0 transition"
              alt="Mastercard"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}