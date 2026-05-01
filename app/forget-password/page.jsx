"use client";

import { useState , useActionState , useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import {de} from '@/dictionaries/de'
import { resetPasswordAction , sendOtpAction } from "../actions/resetPasswordAction";




export default function ForgotPassword() {
const dict = de.forgotPassword;    
const [step, setStep] = useState(1); // 1: E-Mail, 2: OTP & Neues Passwort
const [email, setEmail] = useState("");

// Action-Status für beide Schritte
const [sendState , sendAction , isSendPending] = useActionState(sendOtpAction , null) ;
const [resetState , resetAction , isResetPending] = useActionState(resetPasswordAction ,null)

// Überwachung für Schritt 1: OTP Senden
useEffect(() => {
  if(sendState){
    if(sendState.error){
        toast.error(sendState.message)
    }else{
        toast.success(sendState.message)
        setStep(2) // Zum Passwort-Schritt wechseln
    }
  }  
} , [sendState])


// Überwachung für Schritt 2: Passwort Zurücksetzen
useEffect(() => {
if(resetState){
    if(resetState.error){
        toast.error(resetState.message)
    }else{
        toast.success(resetState.message)
        setTimeout(() => (window.location.href = '/login'), 2000) ;
    }
}
}, [resetState])




return (
<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">

<Toaster richColors position="top-center" visibleToasts={1} />

<motion.div
layout
className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2.5rem] p-8"
>
<AnimatePresence mode="wait">
    {step === 1 ? (
    // Step 1: Enter Email to receive OTP
    <motion.div
        key="step1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
    >
        <h2 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">{dict.step1.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
       {dict.step1.desc}
        </p>

        <form action={sendAction} className="space-y-4">
        <input
            type="email" 
            name="email"
            required
            placeholder={dict.step1.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        />
        <button
            disabled={isSendPending}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-500/30"
        >
            {isSendPending ? dict.step1.sending : dict.step1.button}
        </button>
        </form>
    </motion.div>
    ) : (
    // Step 2: Verify OTP and Set New Password
    <motion.div
        key="step2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
    >
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{dict.step2.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
       {dict.step2.sentTo} <span className="text-blue-500 font-medium">{email}</span>
        </p>

        <form action={resetAction} className="space-y-4">
         <input type="hidden" name="email" value={email} />   
        <input
            type="text" name="otp-code" autoComplete="one-time-code"
            required
            maxLength={6}
            placeholder={dict.step2.otpPlaceholder}
            className="w-full px-5 py-4 text-center text-2xl tracking-[0.3em] font-mono rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input name="new-Password" autoComplete="new-password"
            type="password"
            required
            placeholder={dict.step2.newPassPlaceholder}
            className="w-full px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
            disabled={isResetPending}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-green-500/30"
        >
            {isResetPending ?dict.step2.updating : dict.step2.button}
        </button>

        <button
            className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-2 uppercase tracking-wider"
            type="button"
            onClick={() => setStep(1)}
        >
            {dict.step2.back}
        </button>
        </form>
    </motion.div>
    )}
</AnimatePresence>
</motion.div>
</div>
);
}