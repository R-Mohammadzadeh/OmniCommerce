"use client";

import { useEffect, useState, useActionState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { toast, Toaster } from "sonner";

import { useRouter } from "next/navigation";

import { de } from "@/dictionaries/de";

import {sendOtpAction,resetPasswordAction} from "../actions/resetPasswordAction";
  
import { cn } from "@/lib/utlis_temps";  





const dict = de.forgotPassword;

/* ----------------------------- styles ----------------------------- */

const styles = {
  wrapper: cn(
    "flex min-h-screen items-center justify-center p-6",
    "bg-slate-50 dark:bg-slate-950"
  ),

  card: cn(
    "w-full max-w-md rounded-[2.5rem] p-8",
    "border border-slate-200 dark:border-slate-800",
    "bg-white dark:bg-slate-900",
    "shadow-2xl"
  ),

  form: "space-y-5",

  input: cn(
    "w-full rounded-2xl px-6 py-4",
    "bg-slate-50 dark:bg-slate-800",
    "outline-none transition-all",
    "focus:ring-2 focus:ring-blue-500"
  ),

  title:
    "text-3xl font-black text-slate-900 dark:text-white",

  subtitle: "mt-2 text-slate-500",

  button: cn(
    "w-full rounded-2xl py-4",
    "font-bold text-white transition-all",
    "disabled:opacity-50"
  ),
};

/* ----------------------------- motion ----------------------------- */

const slideAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/* ----------------------------- component ----------------------------- */

export default function ForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [sendState, sendAction, sendPending] =
    useActionState(sendOtpAction, null);

  const [resetState, resetAction, resetPending] =
    useActionState(resetPasswordAction, null);

  /* ----------------------------- effects ----------------------------- */

  useEffect(() => {
    if (sendState?.success) {
      toast.success(sendState.message);

      setStep(2);
    }

    if (sendState?.error) {
      toast.error(sendState.message);
    }
  }, [sendState]);

  useEffect(() => {
    if (!resetState?.message) return;

    if (resetState.success) {
      toast.success(resetState.message);

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } else {
      toast.error(resetState.message);
    }
  }, [resetState, router]);

  return (
    <div className={styles.wrapper}>
      <Toaster richColors position="top-center" />

      <motion.div layout className={styles.card}>
        <AnimatePresence mode="wait">

          {/* STEP 1 */}

          {step === 1 ? (
            <motion.form
              key="step1"
              action={sendAction}
              className={styles.form}
              {...slideAnimation}
            >
              <Header
                title={dict.title}
                subtitle={dict.subtitle}
              />

              <input
                required
                name="email"
                type="email"
                value={email}
                placeholder="E-Mail Adresse"
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className={styles.input}
              />

              <button
                disabled={sendPending}
                className={cn(
                  styles.button,
                  "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {sendPending
                  ? "Wird gesendet..."
                  : "OTP anfordern"}
              </button>
            </motion.form>

          ) : (

            /* STEP 2 */

            <motion.form
              key="step2"
              action={resetAction}
              className="space-y-4"
              {...slideAnimation}
            >
              <input
                type="hidden"
                name="email"
                value={email}
              />

              <Header
                title="Neues Passwort"
                subtitle="Code eingeben und Passwort ändern"
              />

              <input
                required
                type="text"
                name="otp"
                placeholder="6-stelliger Code"
                className={cn(
                  styles.input,
                  "text-center font-bold tracking-[1em]"
                )}
              />

              <input
                required
                type="password"
                name="newPassword"
                placeholder="Neues Passwort"
                className={styles.input}
              />

              <button
                disabled={resetPending}
                className={cn(
                  styles.button,
                  "bg-green-600 hover:bg-green-700"
                )}
              >
                {resetPending
                  ? "Wird aktualisiert..."
                  : "Passwort speichern"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ----------------------------- ui ----------------------------- */

function Header({ title, subtitle }) {
  return (
    <div className="mb-6 text-center">
      <h2 className={styles.title}>{title}</h2>

      <p className={styles.subtitle}>
        {subtitle}
      </p>
    </div>
  );
}