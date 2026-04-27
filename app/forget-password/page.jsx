"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast, Toaster } from "sonner";

export default function ForgotPassword() {
const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");
const [loading, setLoading] = useState(false);

// Step 1: Send OTP to Email
const handleSendOTP = async (e) => {
e.preventDefault();
setLoading(true);

try {
// Make API call to send OTP to the provided email address.  
const res = await fetch("/api/auth/send-otp", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email: email.toLowerCase().trim() }),
});

const data = await res.json();

if (res.ok) {
toast.success("Verification code sent!");
setStep(2);
} else {
toast.error(data.error || "User not found");
}
} catch (error) {
toast.error("Network error. Try again.");
} finally {
setLoading(false);
}
};

// Step 2: Verify OTP & Reset Password
const handleResetPassword = async (e) => {
e.preventDefault();
setLoading(true);

try {
console.log("FRONTEND SENDING:", { email, otp, newPassword });
const res = await fetch("/api/auth/reset-password", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ 
    email: email.toLowerCase().trim(), 
    otp: otp.trim(), 
    newPassword: newPassword 
}),
});

const data = await res.json();

if (res.ok) {
toast.success("Password reset successfully!");

setTimeout(() => (window.location.href = "/login"), 2000);
} else {
toast.error(data.error || "Invalid or expired code");
}
} catch (error) {
toast.error("Something went wrong");
} finally {
setLoading(false);
}
};

return (
<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">

<Toaster richColors position="top-center" />

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
        <h2 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">Forgot Password?</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
        Enter your email and we'll send a 6-digit code.
        </p>

        <form onSubmit={handleSendOTP} className="space-y-4">
        <input
            type="email"
            required
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        />
        <button
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-500/30"
        >
            {loading ? "Sending..." : "Get OTP Code"}
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
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Verify OTP</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
        Code sent to: <span className="text-blue-500 font-medium">{email}</span>
        </p>

        <form onSubmit={handleResetPassword} className="space-y-4">
        <input
            type="text" name="otp-code" autoComplete="one-time-code"
            required
            maxLength={6}
            placeholder="6-Digit Code (e.g. 123456)"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-5 py-4 text-center text-2xl tracking-[0.3em] font-mono rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input name="new-password" autoComplete="new-password"
            type="password"
            required
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
            disabled={loading}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-green-500/30"
        >
            {loading ? "Updating..." : "Reset Password"}
        </button>

        <button
            className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-2 uppercase tracking-wider"
            type="button"
            onClick={() => setStep(1)}
        >
            Back to Email
        </button>
        </form>
    </motion.div>
    )}
</AnimatePresence>
</motion.div>
</div>
);
}