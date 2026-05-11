"use server";

import bcrypt from "bcryptjs";

import connectDB from "@/config/connectDB";
import UsersData from "@/models/UsersData";

const OTP_EXPIRES = 10 * 60 * 1000;

/* -------------------------- SEND OTP -------------------------- */

export async function sendOtpAction(_, formData) {
  try {
    await connectDB();

    const email = formData.get("email")?.trim().toLowerCase();

    if (!email) {
      return error("Bitte E-Mail eingeben.");
    }

    const user = await UsersData.findOne({ email });

    if (!user) {
      return error("Benutzer wurde nicht gefunden.");
    }

    user.otpCode = generateOtp();
    user.otpExpires = Date.now() + OTP_EXPIRES;

    await user.save();

    if (process.env.NODE_ENV === "development") {
      console.log(`[DEV OTP] ${email}: ${user.otpCode}`);
    }

    return success(
      "Ein Bestätigungscode wurde gesendet."
    );

  } catch (err) {
    console.error("OTP Fehler:", err);

    return error("Fehler beim Senden des Codes.");
  }
}

/* ----------------------- RESET PASSWORD ----------------------- */

export async function resetPasswordAction(_, formData) {
  try {
    await connectDB();

    const email = formData.get("email")?.trim().toLowerCase();

    const otp = formData
      .get("otp-code")
      ?.toString()
      .trim();

    const newPassword =
      formData.get("new-Password");

    if (!email || !otp || !newPassword) {
      return error("Bitte alle Felder ausfüllen.");
    }

    if (newPassword.length < 8) {
      return error(
        "Passwort muss mindestens 8 Zeichen haben."
      );
    }

    const user = await UsersData.findOne({
      email,
      otpCode: otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return error(
        "Code ungültig oder abgelaufen."
      );
    }

    user.password = await bcrypt.hash(
      newPassword,
      12
    );

    user.otpCode = undefined;
    user.otpExpires = undefined;

    await user.save();

    return success(
      "Passwort erfolgreich aktualisiert!"
    );

  } catch (err) {
    console.error("Reset Fehler:", err);

    return error("Serverfehler.");
  }
}

// /* ---------------------------- HELPERS ---------------------------- */

// function generateOtp() {
//   return Math.floor(
//     100000 + Math.random() * 900000
//   ).toString();
// }

// function success(message) {
//   return {
//     success: true,
//     message,
//   };
// }

// function error(message) {
//   return {
//     success: false,
//     message,
//   };
// }