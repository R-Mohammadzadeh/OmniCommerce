"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { contactAction } from "@/app/actions/contactAction";

/**
 * KontaktPage: Die Hauptseite für den Kundensupport.
 * Enthält Kontaktinformationen und ein Formular, das die Server Action nutzt.
 */
export default function KontaktPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-seitige Funktion zum Verarbeiten des Formulars
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    
    try {
      // Aufruf der Server Action
      const result = await contactAction(formData);

      if (result.success) {
        toast.success(result.message);
        e.target.reset(); // Leert das Formular bei Erfolg
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <Toaster richColors position="top-center" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header Bereich */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
          >
            Kontaktieren Sie uns
          </motion.h1>
          <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
            Haben Sie Fragen zu Ihrer Bestellung oder unseren Produkten? 
            Unser Team im Reza Store hilft Ihnen gerne weiter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Info-Sektion: Kontakt-Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-bold mb-8 dark:text-white">Kontaktinformationen</h2>
              
              <div className="space-y-8">
                {/* Telefon */}
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Rufen Sie uns an</p>
                    <a href="tel:+4917647116508" className="font-bold text-lg hover:text-blue-600 transition-colors dark:text-white">
                      +49 176 47116508
                    </a>
                  </div>
                </div>

                {/* E-Mail */}
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Schreiben Sie uns</p>
                    <a href="mailto:reza203393@yahoo.de" className="font-bold text-lg hover:text-emerald-500 transition-colors dark:text-white">
                      reza203393@yahoo.de
                    </a>
                  </div>
                </div>

                {/* Standort */}
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Unser Standort</p>
                    <p className="font-bold text-lg dark:text-white">
                      Zum Mühlenfeld 9, 50127 Bergheim
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hinweis Box */}
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-900/30">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Hinweis : </strong> Wir antworten in der Regel innerhalb von 24 Stunden auf Ihre Anfragen.
              </p>
            </div>
          </motion.div>

          {/* Formular-Sektion */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                    placeholder="Erika Mustermann"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">E-Mail</label>
                  <input 
                    name="email"
                    type="email" 
                    required 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                    placeholder="beispiel@mail.de"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Betreff</label>
                <input 
                  name="subject"
                  type="text" 
                  required 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  placeholder="Wie können wir helfen?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Nachricht</label>
                <textarea 
                  name="message"
                  required 
                  rows="5"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                ></textarea>
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-5 hover:cursor-pointer  bg-slate-900 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Nachricht jetzt senden 
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}