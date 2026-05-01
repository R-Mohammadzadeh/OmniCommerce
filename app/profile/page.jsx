"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { EditeProfileAction } from "./action";
import SubmitButton from "@/Components/SubmitButton";
import { toast } from "sonner"; 

export default function ProfileForm({user}) {

 
  const formRef = useRef(null);
  const router = useRouter();

  async function handleAction(formData) {
    const res = await EditeProfileAction(formData);

    if (res?.success) {
      toast.success(res.message || "Profil aktualisiert!");
      
      router.refresh();          
    } else {
      
      toast.error(res?.message || "Fehler beim Aktualisieren");
    }
  }

  return (
    <section className="min-h-screen px-5 pb-20">
      <div className="bg-white mt-32 mx-auto max-w-3xl dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5">
        
        <h2 className="text-2xl font-black mb-8 dark:text-white uppercase tracking-tight">
          Benutzerprofil bearbeiten
        </h2>

        <form
          ref={formRef}
          action={handleAction}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Vorname */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Vorname</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.name}
              className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white transition-all border border-transparent focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          {/* Nachname */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Nachname</label>
            <input
              type="text"
              name="familyName"
              defaultValue={user?.familyName}
              className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white transition-all border border-transparent focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

         {/* email */}
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">E-Mail Adresse</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white transition-all border border-transparent focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          {/* Phone */}
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Telefonnummer</label>
            <input
              type="text"
              name="phone"
              defaultValue={user?.phone}
              placeholder="+49..."
              className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white transition-all border border-transparent focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div className="md:col-span-2 border-t dark:border-white/5 my-4 pt-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Adresse</h3>
          </div>

          {/* Strasse */}
          <div className="md:col-span-1">
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Straße</label>
            <input
              type="text"
              name="strasse"
              defaultValue={user?.addresse?.strasse}
              className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
            />
          </div>

          {/* Hausnummer */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Hausnr.</label>
            <input
              type="text"
              name="Hausnummer"
              defaultValue={user?.addresse?.Hausnummer}
              className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
            />
          </div>

          {/* PLZ */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">PLZ</label>
            <input
              type="text"
              name="PLZ"
              defaultValue={user?.addresse?.PLZ}
              className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
            />
          </div>

          {/* Stadt */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Stadt</label>
            <input
              type="text"
              name="stadt"
              defaultValue={user?.addresse?.stadt}
              className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
            />
          </div>

          <div className="md:col-span-2 py-5">
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  );
}