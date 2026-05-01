"use client";
import { useActionState, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import { registerAction } from "./action";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState = { error: false, message: "", role: "" , timestamp:null};

export default function Register() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const router = useRouter();
  const formRef = useRef(null);
  const inputRef = useRef(null);
 const lastProcessedTimestamp = useRef(null) // Referenz zum Speichern des Zeitpunkts der letzten Nachricht


  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
 // Wenn keine Nachricht vorhanden ist oder diese Nachricht bereits verarbeitet wurde, tue nichts.   
    if (!state?.message ||state.timestamp === lastProcessedTimestamp.current) return;

    if (state.error) {
      toast.error(state.message);
    } else {
      toast.success(state.message);
      formRef.current?.reset();

      // Weiterleitung nach Erfolg
      const timer = setTimeout(() => {
        router.push('/login');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <div className="max-w-md mx-auto my-32 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border dark:border-slate-800">
      <Toaster duration={3000} position="top-right" richColors />
      <h1 className="text-3xl font-black mb-6 text-center dark:text-white">Registrieren</h1>

      <form action={formAction} ref={formRef} className="space-y-4">
        <input 
          type="email" 
          name="email" 
          placeholder="E-Mail Adresse"
          ref={inputRef} 
          required 
          className="w-full p-3 border dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          disabled={isPending}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Passwort (8-20 Zeichen)" 
          required 
          className="w-full p-3 border dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          disabled={isPending} 
        />
        <input 
          type="password"
          name="confirmPassword"
          placeholder="Passwort bestätigen"
          required
          className="w-full p-3 border dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          disabled={isPending}
        />
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text"
            name="vorname"
            placeholder="Vorname"
            required
            className="w-full p-3 border dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={isPending}
          />
          <input 
            type="text"
            name="nachname"
            placeholder="Nachname"
            required
            className="w-full p-3 border dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={isPending}
          />
        </div>
        <input 
          type="tel"
          name="phone"
          placeholder="Telefonnummer (z.B. 49...)"
          required
          className="w-full p-3 border dark:bg-slate-800 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          disabled={isPending}
        />
        
        <button 
          type="submit" 
          disabled={isPending}
          className={`w-full p-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg
            ${isPending 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] shadow-blue-500/20'}`}
        >
          {isPending ? "Wird registriert..." : "Jetzt registrieren"}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-500">
        Haben Sie bereits ein Konto? 
        <Link href="/login" className="text-blue-600 font-bold ml-1 hover:underline">Anmelden</Link>
      </p>
    </div>
  );
}