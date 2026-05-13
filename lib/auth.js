import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/config/connectDB";
import UsersData from "@/models/UsersData";
import { authConfig } from "./auth.config";
import bcrypt from "bcryptjs";

const DEMO_ADMIN_EMAIL = "demo-admin@test.com";
const DEMO_ADMIN_OTP = process.env.DEMO_OTP || "11111";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      /**
       * Die authorize-Funktion validiert die Anmeldedaten des Benutzers.
       * Hier werden E-Mail, Passwort und der OTP-Code überprüft.
       */
      async authorize(credentials) {
        try {
          // 1. Verbindung zur Datenbank herstellen
          await connectDB();

          const email = credentials?.email?.toLowerCase().trim();
          const password = credentials?.password;
          const otp = credentials?.otp?.trim();

          // Pflichtfelder prüfen
          if (!email || !password || !otp) return null;

          // 2. Benutzer anhand der E-Mail suchen
          const user = await UsersData.findOne({ email });
          if (!user) return null;

          // 3. Passwort-Vergleich (Asynchron für bessere Performance)
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) return null;

          const isDemoAdmin = email === DEMO_ADMIN_EMAIL;

          // 4. Validierung des OTP-Codes
          if (isDemoAdmin) {
            // Prüfung für den Demo-Admin (Nutzt Wert aus .env oder Fallback)
            if (String(otp) !== String(DEMO_ADMIN_OTP)) {
              console.warn(`[Auth] OTP-Mismatch für Demo-Admin. Erwartet: ${DEMO_ADMIN_OTP}, Erhalten: ${otp}`);
              return null;
            }
          } else {
            // Prüfung für reguläre Benutzer inkl. Ablaufzeit (TTL)
            const isExpired = user.otpExpires && new Date() > new Date(user.otpExpires);
            
            if (!user.otpCode || isExpired || String(otp) !== String(user.otpCode)) {
              return null;
            }

            // Einmal-Code nach erfolgreicher Nutzung entwerten (Sicherheitsbestimmung)
            user.otpCode = null;
            user.otpExpires = null;
          }

          // 5. Zeitstempel des letzten Logins aktualisieren
          user.lastLogin = new Date();
          await user.save({ validateBeforeSave: false });

          // 6. Rückgabe der Benutzerdaten für die Session
          // Diese Daten sind im Client über useSession() verfügbar
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role ?? "user",
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
          };
        } catch (error) {
          // Fehlerprotokollierung für Server-Logs
          console.error("Authentifizierungsfehler (Authorize):", error.message);
          return null;
        }
      },
    }),
  ],
});