'use server'

import nodemailer from 'nodemailer'

/**
 * HTML-Sicherheitsfunktion
 * Escaped gefährliche Zeichen, um XSS-Angriffe zu verhindern.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')   // & verhindern
    .replace(/</g, '&lt;')    // < verhindern
    .replace(/>/g, '&gt;')    // > verhindern
    .replace(/"/g, '&quot;')  // " verhindern
    .replace(/'/g, '&#039;')  // ' verhindern
}

/**
 * contactAction
 * Server Action zur Verarbeitung des Kontaktformulars
 * und zum Versand einer E-Mail über Nodemailer.
 */
export async function contactAction(formData) {
  // Formulardaten extrahieren
  const name = formData.get('name')
  const email = formData.get('email')
  const subject = formData.get('subject')
  const message = formData.get('message')

  /**
   * Validierung der Pflichtfelder
   * Falls etwas fehlt → Fehler zurückgeben
   */
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Bitte füllen Sie alle Felder aus."
    }
  }

  try {
    /**
     * SMTP Transporter erstellen
     * (Yahoo Mail Server als Beispiel)
     */
    const transporter = nodemailer.createTransport({
      service: 'yahoo',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })

    /**
     * E-Mail-Konfiguration
     */
    const mailOption = {
      from: process.env.EMAIL_USER, // Absender
      to: 'reza203393@yahoo.de',    // Empfänger
      replyTo: email,               // direkte Antwort an Kunden

      subject: `Reza Store Kontakt: ${subject}`,

      /**
       * Plain Text Version
       */
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,

      /**
       * HTML Version (mit Escaping für Sicherheit)
       */
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #2563eb;">
            Neue Nachricht vom Reza Store
          </h2>

          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
          <p><strong>Betreff:</strong> ${escapeHtml(subject)}</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

          <p style="white-space: pre-wrap;">
            ${escapeHtml(message)}
          </p>
        </div>
      `,
    }

    /**
     * E-Mail senden
     */
    await transporter.sendMail(mailOption)

    return {
      success: true,
      message: "Ihre Nachricht wurde erfolgreich gesendet!"
    }

  } catch (error) {
    /**
     * Fehlerbehandlung beim E-Mail-Versand
     */
    console.error("Fehler beim E-Mail-Versand:", error)

    return {
      success: false,
      message: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut."
    }
  }
}