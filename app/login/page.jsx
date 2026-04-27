"use client";

import {  useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner" 
import { sendOtpAction } from "@/lib/authActions"
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GrUserAdmin } from "react-icons/gr";




export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState(1); 
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  // erste Phase: Überprüfen der Anmeldeinformationen und Senden des OTPs 
  async function handleSendOtp(e) {
    e.preventDefault();
    setIsSubmit(true);
    try {
      
      const res = await sendOtpAction(email, password);
      if (res.success) {
        toast.success("Verification code sent to your phone!");
        setStep(2);
      } else {
        toast.error(res.message || "Invalid credentials");
      }
    } finally {
      setIsSubmit(false);
    }
  }

  // zweite Phase: Überprüfen des OTPs und Anmelden des Benutzers
 async function handleVerifyAndLogin(e) {
  e.preventDefault();
  setIsSubmit(true);
  try {
    const res = await signIn('credentials' , {
      email ,
      otp:otpCode ,
      redirect:false ,
    });
    
    if (res?.error) {
      toast.error("Invalid verification code or expired.");
      
    } else {
      toast.success("Login successful!");
      router.refresh()

      window.location.replace('/admin')
    }
  } catch(err) {
    console.error("Auth error:", err);
    toast.error("An unexpected error occurred");
  } finally {
    setIsSubmit(false);
  }
}

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0f172a] p-4">
      <div className="bg-white dark:bg-slate-900/50 dark:backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border dark:border-white/10">
        
        <h2 className="text-3xl font-black mb-2 text-center dark:text-white">
          {step === 1 ? "Login" : "Verify SMS"}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
          {step === 1 
            ? "Enter your credentials to receive a security code." 
            : `Please enter the 5-digit code sent to your phone.`}
        </p>

        <form onSubmit={step === 1 ? handleSendOtp : handleVerifyAndLogin} className="space-y-6">
          
          {step === 1 ? (
            /* erste Phase: E-Mail und Passwort */
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          ) : (
            /* zweite Phase: OTP-Feld */
            <div className="space-y-2">
              <label className="text-sm font-semibold dark:text-gray-300 ml-1">Verification Code</label>
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
              ${step === 1 ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'}
              ${isSubmit ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {isSubmit ? 'Processing...' : (step === 1 ? 'Verify Password' : 'Login Now')}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t dark:border-white/5 flex flex-col items-center gap-3">
          {step === 2 && (
            <button 
              onClick={() => setStep(1)}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              ← Change Credentials
            </button>
          )}
          
          <div className="text-sm dark:text-gray-400">
            Don't have an account? 
            <Link href="/register" className="ml-1 text-indigo-500 font-bold hover:underline">Register</Link>
          </div>
        </div>
        {/* Login Page UI */}
<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <p className="text-sm text-blue-800 flex items-center gap-2">
    <span className="py-1"><GrUserAdmin size={20} /></span>
    <strong>Demo Admin Access:</strong>
  </p>
  <div className="mt-2 text-xs text-blue-700">
    <p>Email: <span className="font-mono font-bold">demo-admin@test.com</span></p>
    <p>Password: <span className="font-mono font-bold">12345678@</span></p>
    <p>OTP Code: <span className="font-mono font-bold">11111</span></p>
  </div>
</div>
      </div>
    </section>
  );
}