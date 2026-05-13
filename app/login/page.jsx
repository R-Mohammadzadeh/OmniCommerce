"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { sendOtpAction } from "@/lib/authActions";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import DemoInfo from "@/Components/Demo.info";

/**
 * LoginPage Komponente
 * Verwaltet einen zweistufigen Authentifizierungsprozess:
 * 1. Validierung von E-Mail/Passwort und Anforderung des OTP-Codes.
 * 2. Überprüfung des OTP-Codes und Durchführung des Logins.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState(1); // Schritt 1: Anmeldedaten, Schritt 2: OTP
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShow, setIsShow] = useState(false); // Umschalten der Passwort-Sichtbarkeit

  const router = useRouter();
  const { update } = useSession();

  // --- Phase 1: OTP-Code anfordern ------------------------------------
  async function handleSendOtp(e) {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const res = await sendOtpAction(email, password);
      if (res.success) {
        toast.success("Verifizierungscode wurde gesendet!");
        setStep(2);
      } else {
        toast.error(res.message || "Ungültige Anmeldedaten");
      }
    } catch (err) {
      console.error("Fehler beim Senden des OTP:", err);
      toast.error("Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsSubmit(false);
    }
  }

  // --- Phase 2: OTP verifizieren und Login durchführen ------------------------
  async function handleVerifyAndLogin(e) {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        otp: otpCode,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Ungültiger oder abgelaufener Code.");
        return;
      }

      toast.success("Anmeldung erfolgreich!");

      // Session aktualisieren, um die neuesten Benutzerdaten (z. B. Rolle) zu erhalten
      const updatedSession = await update();
      const role = updatedSession?.user?.role;

      // Weiterleitung basierend auf der Benutzerrolle
      router.push(role === "admin" ? "/admin" : "/");
      router.refresh();

    } catch (err) {
      console.error("Login-Fehler:", err);
      toast.error("Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f172a] p-4 mt-20">
      <div className="bg-white dark:bg-slate-900/50 dark:backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border dark:border-white/10">

        <h2 className="text-3xl font-black mb-2 text-center dark:text-white">
          {step === 1 ? "Anmelden" : "E-Mail bestätigen"}
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
          {step === 1
            ? "Geben Sie Ihre Daten ein, um einen Sicherheitscode zu erhalten."
            : "Bitte geben Sie den 5-stelligen Code ein, den wir Ihnen gesendet haben."}
        </p>

        <form
          onSubmit={step === 1 ? handleSendOtp : handleVerifyAndLogin}
          className="space-y-6"
        >
          {step === 1 ? (
            // --- Schritt 1: Formular für Anmeldedaten ---
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">
                  E-Mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@beispiel.de"
                  className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">
                  Passwort
                </label>
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
            // --- Schritt 2: Formular für OTP-Verifizierung ---
            <div className="space-y-2">
              <label className="text-sm font-semibold dark:text-gray-300 ml-1">
                OTP-Code
              </label>
              <input
                type="text"
                required
                maxLength={5}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="00000"
                className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white text-center text-2xl tracking-widest font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => { setStep(1); setOtpCode(""); }}
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors mt-1"
              >
                ← Zurück
              </button>
            </div>
          )}

          <button
            disabled={isSubmit}
            type="submit"
            className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg 
              ${step === 1
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
              }
              ${isSubmit ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"}
            `}
          >
            {isSubmit
              ? "Bitte warten..."
              : step === 1
                ? "Code anfordern"
                : "Anmelden"}
          </button>
        </form>

        {step === 1 && (
          <div className="mt-6 text-center space-y-2">
            <Link
              href="/forget-password"
              className="text-indigo-500 hover:underline text-sm block"
            >
              Passwort vergessen?
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Noch kein Konto?{" "}
              <Link href="/register" className="text-indigo-500 font-bold hover:underline">
                Jetzt registrieren
              </Link>
            </p>
            <DemoInfo />
          </div>
        )}

      </div>
    </section>
  );
}