import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/config/connectDB";
import UsersData from "@/models/UsersData";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // Übernimmt die Basis-Konfiguration (Callbacks, Pages, etc.)
  providers: [
    Credentials({
      /**
       * Die authorize-Funktion steuert die Überprüfung der Login-Daten.
       * Hier wird die E-Mail und der OTP-Code validiert.
       */
      async authorize(credentials) {
        // Verbindung zur Datenbank herstellen
        await connectDB();

        // Benutzer anhand der E-Mail-Adresse suchen
        const user = await UsersData.findOne({ email: credentials.email });
        if (!user) throw new Error("Benutzer nicht gefunden");

        // Konfiguration für das Demo-Konto (Test-Admin)
        const isDemoAdmin = credentials.email === "demo-admin@test.com";
        const demoOtp = process.env.DEMO_OTP || '11111';

        /**
         * Das User-Objekt, das in das JWT-Token geschrieben wird.
         * Wichtig: Nur notwendige Daten übertragen.
         */
        const userPayload = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt ? user.createdAt.toISOString() : null,
          lastLogin: new Date().toISOString(),
        };

        // FALL 1: Prüfung für den Demo-Admin
        if (isDemoAdmin && credentials.otp === demoOtp) {
          // Login-Zeitpunkt aktualisieren und OTP-Felder leeren
          user.lastLogin = new Date();
          user.otpCode = null;
          user.otpExpires = null;
          await user.save();
          
          return userPayload;
        }

        // FALL 2: Prüfung für reguläre Benutzer (Echter OTP-Check)
        const isOtpValid = user.otpCode === credentials.otp;
        const isOtpNotExpired = user.otpExpires > Date.now();

        if (isOtpValid && isOtpNotExpired) {
          // Zeitstempel für den letzten Login setzen
          user.lastLogin = new Date();
          // Einmal-Passwort nach erfolgreichem Login ungültig machen
          user.otpCode = null;
          user.otpExpires = null;
          
          // Änderungen in der Datenbank speichern
          await user.save();
          
          return userPayload;
        }

        // Falls keine Bedingung zutrifft, schlägt der Login fehl
        return null;
      }
    })
  ]
});