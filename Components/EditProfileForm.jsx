"use client";

import { updateProfileAction } from "@/app/profile/action";
import { useState } from "react";
import { toast } from "sonner";

/**
 * EditProfileForm Komponente
 * Erlaubt Benutzern, ihren Namen und ihre E-Mail-Adresse über eine Server Action zu aktualisieren.
 */
export default function EditProfileForm({ user }) {
  const [loading, setLoading] = useState(false);

  // Verarbeitet das Absenden des Formulars
  async function handleForm(formData) {
    setLoading(true);
    try {
      // Aufruf der Server Action für das Profil-Update
      const result = await updateProfileAction(formData);

      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (err) {
      toast.error("Netzwerkfehler!"); // Fehler bei der Verbindung
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="bg-white dark:bg-slate-900 p-8 rounded-2rem border border-slate-100 dark:border-slate-800 shadow-sm transition-colors"
      action={handleForm}
    >
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
        Profil bearbeiten
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feld für den vollständigen Namen */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Vollständiger Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user?.name}
            placeholder="Ihr Name"
            className="w-full mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none 
            focus:ring-2 focus:ring-blue-500 dark:text-white transition-all outline-none"
            required
          />
        </div>

        {/* Feld für die E-Mail-Adresse */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            E-Mail-Adresse
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            placeholder="beispiel@mail.de"
            className="w-full mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none 
            focus:ring-2 focus:ring-blue-500 dark:text-white transition-all outline-none"
            required
          />
        </div>
      </div>

      {/* Absende-Button mit Ladezustand */}
      <button
        type="submit"
        className="mt-8 w-full md:w-max px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-blue-500/20 cursor-pointer"
        disabled={loading}
      >
        {loading ? 'Wird gespeichert...' : 'Profil aktualisieren'}
      </button>
    </form>
  );
}