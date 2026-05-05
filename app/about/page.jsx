"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import {
  FaBolt,
  FaFacebook,
  FaGem,
  FaHandshake,
  FaInstagramSquare,
  FaLinkedinIn,
  FaShieldAlt,
  FaTelegram,
} from "react-icons/fa";
import { de } from "@/dictionaries/de";

/**
 * AboutPage: Repräsentiert die Markengeschichte, Werte und das Team des Shops.
 * Nutzt Framer Motion für Scroll-Animationen und CountUp für dynamische Zahlen.
 */
export default function AboutPage() {
  // Zugriff auf das deutsche Sprach-Dictionary
  const dict = de.about;

  // Zuordnung der Icons für die Werte-Sektion (Reihenfolge entspricht dem Dictionary-Array)
  const icons = [FaHandshake, FaBolt, FaGem, FaShieldAlt];

  // Definition der Team-Mitglieder (Bilder via Pravatar für Demo-Zwecke)
  const teamMembers = [
    {
      name: "Sahar",
      role: dict.team.roles.founder,
      image: "https://i.pravatar.cc/150?u=sina",
    },
    {
      name: "Sarah",
      role: dict.team.roles.designer,
      image: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Alex",
      role: dict.team.roles.developer,
      image: "https://i.pravatar.cc/150?u=alex",
    },
  ];

  // Konfiguration der Statistik-Karten
  const stats = [
    {
      label: dict.stats.founded,
      value: 2024,
      suffix: "",
      color: "text-blue-400",
    },
    {
      label: dict.stats.community,
      value: 10000,
      suffix: "+",
      color: "text-purple-500",
    },
    {
      label: dict.stats.products,
      value: 500,
      suffix: "+",
      color: "text-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto mt-44">

        {/* --- Hero / Header Sektion --- */}
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
          >
            {/* Trennt den Titel dynamisch, um das Wort 'Shopping' blau einzufärben */}
            {dict.hero.title.split("Shopping")[0]}{" "}
            <span className="text-blue-600">Shopping</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
          >
            {dict.hero.subtitle}
          </motion.p>
        </header>

        {/* --- Statistik-Karten mit CountUp Animation --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-center shadow-sm"
            >
              <p className="text-slate-500 text-sm font-bold uppercase mb-2">
                {stat.label}
              </p>
              <p className={`text-4xl font-black ${stat.color}`}>
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  separator="," 
                  enableScrollSpy 
                  scrollSpyOnce 
                />
                {stat.suffix}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- Mission-Statement (Callout Box) --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-600 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6">{dict.mission.title}</h2>
            <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto">
              {dict.mission.description}
            </p>
          </div>
          {/* Dekoratives Element im Hintergrund */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-50 blur-3xl" />
        </motion.section>

        {/* --- CTA Button zur Startseite --- */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            {dict.cta}
          </Link>
        </div>
      </div>

      {/* --- Unsere Werte Sektion --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-4xl mx-auto">
        {dict.values.map((value, index) => {
          const Icon = icons[index] || FaGem;
          return (
            <div
              className="flex gap-5 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-4xl border border-transparent hover:border-blue-100 transition-all"
              key={value.title}
            >
              <div className="text-4xl text-sky-400">
                <Icon aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {value.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Team Sektion --- */}
      <section className="mt-24 mb-16">
        <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12">
          {dict.team.title}{" "}
          <span className="text-blue-600">{dict.team.titleHighlight}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <motion.div
              className="group relative bg-white dark:bg-slate-900 cursor-pointer p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              key={member.name}
              whileHover={{ y: -10 }}
            >
              {/* Profilbild mit Graustufen-Filter, der beim Hover verschwindet */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-4 border-slate-50 dark:border-slate-800"
                />
                {/* Glow-Effekt hinter dem Profilbild beim Hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/20 blur-xl" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-4">
                {member.role}
              </p>

              {/* Social Media Links der Teammitglieder */}
              <div className="pt-4 flex justify-center gap-4 text-slate-500 dark:text-slate-400">
                <Link href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  <FaLinkedinIn size={20} />
                </Link>
                <Link href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                  <FaInstagramSquare size={20} />
                </Link>
                <Link href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition-colors">
                  <FaFacebook size={20} />
                </Link>
                <Link href="#" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-colors">
                  <FaTelegram size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}