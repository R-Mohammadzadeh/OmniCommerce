"use client";

import { useState, useActionState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { de } from '@/dictionaries/de'
import { resetPasswordAction, sendOtpAction } from "../actions/resetPasswordAction";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const dict = de.forgotPassword;
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email/OTP Request, 2: New Password/OTP Verification
  const [email, setEmail] = useState("");

  // Server Action states for sending OTP and resetting password
  const [sendState, sendAction, isSendPending] = useActionState(sendOtpAction, null);
  const [resetState, resetAction, isResetPending] = useActionState(resetPasswordAction, null);

  /**
   * Effect to handle the result of the OTP sending process.
   * If successful, moves the user to step 2.
   */
  useEffect(() => {
    if (sendState) {
      if (sendState.error) {
        toast.error(sendState.message)
      } else {
        toast.success(sendState.message)
        setStep(2)
      }
    }
  }, [sendState])

  /**
   * Effect to handle the result of the password reset process.
   * If successful, redirects the user to the login page after a short delay.
   */
  useEffect(() => {
    if (resetState) {
      if (resetState.error) {
        toast.error(resetState.message)
      } else {
        toast.success(resetState.message)
        // Delay to allow the user to read the success message
        setTimeout(() => router.push('/login'), 2000)
      }
    }
  }, [resetState, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <Toaster richColors position="top-center" visibleToasts={1} />

      <motion.div
        layout
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2.5rem] p-8"
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            /* Step 1: Request OTP by providing email */
            <motion.form
              key="step1"
              action={sendAction}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  {dict.title}
                </h2>
                <p className="text-slate-500 mt-2">{dict.subtitle}</p>
              </div>

              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail Adresse"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />

              <button
                disabled={isSendPending}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
              >
                {isSendPending ? "Wird gesendet..." : "OTP anfordern"}
              </button>
            </motion.form>
          ) : (
            /* Step 2: Verify OTP and set new password */
            <motion.form
              key="step2"
              action={resetAction}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <input type="hidden" name="email" value={email} />
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Neues Passwort</h2>
                <p className="text-slate-500 mt-2">Code eingeben und Passwort ändern</p>
              </div>

              <input
                name="otp"
                type="text"
                required
                placeholder="6-stelliger Code"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-center tracking-[1em] font-bold"
              />

              <input
                name="newPassword"
                type="password"
                required
                placeholder="Neues Passwort"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl"
              />

              <button
                disabled={isResetPending}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg shadow-green-500/30 transition-all"
              >
                {isResetPending ? "Wird aktualisiert..." : "Passwort speichern"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}