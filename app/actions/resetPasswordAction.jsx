"use server"

import connectDB from "@/config/connectDB"
import UsersData from "@/models/UsersData"
import bcrypt from "bcryptjs"


//  Erzeugt einen OTP (One-Time Password) und speichert ihn beim Benutzer.

export async function sendOtpAction(prevState, formData) {
  try {
    // 1. Datenbankverbindung herstellen
    await connectDB()

    const email = formData.get('email')?.toLowerCase().trim()
    if (!email) return { success: false, message: "Bitte E-Mail eingeben." }

    // 2. Benutzer prüfen
    const user = await UsersData.findOne({ email })
    if (!user) return { success: false, message: "Benutzer mit dieser E-Mail wurde nicht gefunden." }

    // 3. 6-stelligen Code generieren
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // 4. Code und Ablaufzeit (10 Min) in der DB speichern
    user.otpCode = otp
    user.otpExpires = Date.now() + 600000 
    await user.save()

    // Im Entwicklungsmodus geben wir den Code in der Konsole aus, 
    // da noch kein E-Mail-Dienst (wie Nodemailer/Resend) angebunden ist.
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] Passwort-Reset OTP für ${email}: ${otp}`)
    }

    return { success: true, message: "Ein Bestätigungscode wurde an Ihre E-Mail gesendet!" }

  } catch (error) {
    console.error("OTP Fehler:", error)
    return { success: false, message: "Fehler beim Senden des Codes." }
  }
}


// Validiert den OTP und setzt das Passwort des Benutzers neu.

export async function resetPasswordAction(prevState, formData) {
  try {
    await connectDB()

    const email = formData.get('email')?.toLowerCase().trim()
    const otp = formData.get('otp-code')?.toString().trim()
    const newPassword = formData.get('new-Password')

    // 1. Validierung der Eingaben
    if (!email || !otp || !newPassword) {
      return { success: false, message: "Bitte füllen Sie alle Felder aus." }
    }

    if (newPassword.length < 8) {
      return { success: false, message: "Das Passwort muss mindestens 8 Zeichen lang sein." }
    }

    /**
     * 2. Benutzer-Validierung:
     * Wir suchen nach einem Benutzer, bei dem E-Mail und OTP übereinstimmen 
     * UND bei dem die Ablaufzeit ($gt = greater than) noch in der Zukunft liegt.
     */
    const user = await UsersData.findOne({
      email,
      otpCode: otp,
      otpExpires: { $gt: Date.now() }
    })

    if (!user) {
      return { success: false, message: "Der Code ist ungültig oder bereits abgelaufen." }
    }

    // 3. Neues Passwort sicher hashen
    const salt = await bcrypt.genSalt(12)
    user.password = await bcrypt.hash(newPassword, salt)

    // 4. OTP-Felder bereinigen, damit der Code nicht mehrfach verwendet werden kann
    user.otpCode = undefined
    user.otpExpires = undefined
    await user.save()

    return { success: true, message: "Dein Passwort wurde erfolgreich aktualisiert!" }

  } catch (error) {
    console.error("Reset Fehler:", error)
    return { success: false, message: "Ein Serverfehler ist aufgetreten." }
  }
}