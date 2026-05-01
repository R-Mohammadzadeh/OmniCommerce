"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { sendOtpAction } from "@/lib/authActions";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GrUserAdmin } from "react-icons/gr";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

  // Phase 1: Anmeldedaten überprüfen und OTP senden
  async function handleSendOtp(e) {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const res = await sendOtpAction(email, password);
      if (res.success) {
        toast.success("Verifizierungscode wurde an Ihr Telefon gesendet!");
        setStep(2);
      } else {
        toast.error(res.message || "Ungültige Anmeldedaten");
      }
    } finally {
      setIsSubmit(false);
    }
  }

  // Phase 2: OTP verifizieren und Benutzer anmelden
  async function handleVerifyAndLogin(e) {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const res = await signIn("credentials", {
        email,
        otp: otpCode,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Ungültiger oder abgelaufener Verifizierungscode.");
      } else {
        toast.success("Anmeldung erfolgreich!");
        router.refresh();

        // Weiterleitung zum Admin-Bereich
        window.location.replace("/admin");
      }
    } catch (err) {
      console.error("Auth-Fehler:", err);
      toast.error("Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0f172a] p-4">
      <div className="bg-white dark:bg-slate-900/50 dark:backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border dark:border-white/10">
        
        <h2 className="text-3xl font-black mb-2 text-center dark:text-white">
          {step === 1 ? "Anmelden" : "SMS Verifizierung"}
        </h2>
        
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
          {step === 1
            ? "Geben Sie Ihre Daten ein, um einen Sicherheitscode zu erhalten."
            : "Bitte geben Sie den 5-stelligen Code ein, den wir Ihnen gesendet haben."}
        </p>

        <form onSubmit={step === 1 ? handleSendOtp : handleVerifyAndLogin} className="space-y-6">
          {step === 1 ? (
            /* Phase 1: Felder für E-Mail und Passwort */
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">E-Mail Adresse</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="beispiel@mail.de"
                  className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">Passwort</label>
                <div className="relative">
                  <input
                    type={isShow ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                  <span
                    className="absolute top-3 right-3 dark:text-gray-400 cursor-pointer"
                    onClick={() => setIsShow(!isShow)}
                  >
                    {isShow ? <Eye className="mx-2" /> : <EyeOff className="mx-2" />}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Phase 2: Eingabefeld für den Verifizierungscode */
            <div className="space-y-2">
              <label className="text-sm font-semibold dark:text-gray-300 ml-1">Verifizierungscode</label>
              <input
                type="text"
                required
                maxLength={5}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="00000"
                className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white text-center text-2xl tracking-widest font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          )}

          <button
            disabled={isSubmit}
            type="submit"
            className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg 
              ${
                step === 1
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"
                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
              }
              ${isSubmit ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"}`}
          >
            {isSubmit ? "Wird bearbeitet..." : step === 1 ? "Passwort prüfen" : "Jetzt anmelden"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t dark:border-white/5 flex flex-col items-center gap-3">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              ← Anmeldedaten ändern
            </button>
          )}

          <div className="text-sm dark:text-gray-400">
            Noch kein Konto?
            <Link href="/register" className="ml-1 text-indigo-500 font-bold hover:underline"> Registrieren</Link>
          </div>
          
          <div className="text-sm dark:text-gray-400">
            Passwort vergessen?
            <Link href="/forget-password" className="ml-1 text-indigo-500 font-bold hover:underline"> Passwort zurücksetzen</Link>
          </div>
        </div>

        {/* Demo Admin Zugangsinformationen */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-slate-800/20 dark:border-blue-900/30">
          <p className="text-sm text-blue-800 dark:text-blue-400 flex items-center gap-2">
            <span className="py-1"><GrUserAdmin size={20} /></span>
            <strong>Demo Admin-Zugang:</strong>
          </p>
          <div className="mt-2 text-xs text-blue-700 dark:text-blue-300">
            <p>E-Mail: <span className="font-mono font-bold">demo-admin@test.com</span></p>
            <p>Passwort: <span className="font-mono font-bold">12345678@</span></p>
            <p>OTP-Code: <span className="font-mono font-bold">11111</span></p>
          </div>
        </div>
        
      </div>
    </section>
  );
}