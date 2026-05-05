"use server"

import connectDB from "@/config/connectDB"
import UsersData from "@/models/UsersData";
import bcrypt from "bcryptjs";
import { signOut } from "@/lib/auth";

/**
 * Seven.io API Helper
  * Note: Seven's API can be inconsistent. Always check the raw response structure.
 */
// async function sendSmsViaSeven(to, message) {
//   try {
//     const response = await fetch("https://gateway.seven.io/api/sms", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Api-Key": process.env.SEVEN_API_KEY,
//       },
//       body: JSON.stringify({
//         to,
//         text: message,
//         from: "Mystore",
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
      
//       return { success: "error", error: errorData };
//     }

//     return await response.json();
//   } catch (err) {
//     console.error("Seven API Error:", err);
//     return null;
//   }
// }

/**
 * SCHRITT 1: Passwort verifizieren & OTP senden
 * Diese Funktion prüft die Anmeldedaten und sendet einen 5-stelligen Code per SMS.
 */
export async function sendOtpAction(email, password) {
  try {
    await connectDB();

    // 1. Benutzer suchen
    const user = await UsersData.findOne({ email });
    if (!user) {
      return { success: false, message: "E-Mail-Adresse nicht gefunden!" };
    }

    // 2. Passwort validieren
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !user.phone) {
      return { success: false, message: "Ungültige Anmeldedaten oder fehlende Telefonnummer!" };
    }

    // 3. Telefonnummer formatieren (Standardisierung auf Ländercode 49 für Deutschland)
    let cleanPhone = user.phone.replace(/\D/g, '');// Alle Nicht-Ziffern entfernen
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '49' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('49')) {
      cleanPhone = '49' + cleanPhone;
    }

    // 4.Test-Ausgabe in der Entwicklungskonsole
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
if(process.env.NODE_ENV === 'development'){
  console.log("🔥 YOUR TEST OTP IS:", otp); 
}



   // 5. SMS-Versand (Platzhalter für API-Anbindung wie Seven.io)
    // const smsResponse = await sendSmsViaSeven(
    //   cleanPhone,
    //   `Your verification code: ${otp}. Valid for 5 minutes.`
    // );

   
// Seven's API can return success in different ways. We need to check both the top-level success and the message status.
    let isSmsSent = true;
    // if (smsResponse === 100 || smsResponse === "100" )
    //    {
    //   isSmsSent = true;
    // }else if (smsResponse && smsResponse.messages) {
    //   const messageStatus = Array.isArray(smsResponse.messages) 
    //     ? smsResponse.messages[0]?.status 
    //     : smsResponse.messages.status;
    //   isSmsSent = messageStatus === 100 || messageStatus === "100";
    // }

    if (isSmsSent) {
      // OTP und Ablaufdatum im Benutzerdokument speichern
      user.otpCode = otp;
      user.otpExpires = expires;

      // Speichern ohne Validierung anderer Felder (da wir nur OTP updaten)
      await user.save({ validateBeforeSave: false });
      return { success: true, message: "Code erfolgreich gesendet!" };
    }

    // If SMS failed but code reached here
    return { 
      success: false, 
      message: `SMS-Zustellung fehlgeschlagen. (Code: ${smsResponse?.success || 'Unknown'})` 
    };

  } catch (error) {
    console.error('KRITISCHER OTP-FEHLER:', error);
    return { success: false, message: "Ein Serverfehler ist während des OTP-Vorgangs aufgetreten." };
  }
}

/**
 * STEP 2: Verify OTP & Establish Session
 */
// export async function verifyOtpAction(email, code) {
  
//   try {
//     await connectDB();


//     // 1. Validate Code and Expiry
//     const user = await UsersData.findOne({
//       email,
//       otpCode: code,
//       otpExpires: { $gt: new Date() }
//     });

//     if (!user) {
//       return { success: false, message: "Invalid or expired verification code." };
//     }

//     // 2. Clean up OTP and update login data
//     user.otpCode = null;
//     user.otpExpires = null;
//     user.lastLogin = new Date();
//     await user.save();

//     // 3. Generate JWT
//     const userRole = String(user.role || 'user').toLowerCase(); // Default to 'user' if role is missing   
//     const token = await createToken({ 
//       userId: user._id.toString(), 
//       email: user.email, 
//       role: userRole 
//     });
// console.log("DEBUG: Token created with role:", userRole);
//     // 4. Set Secure Cookie
//     const cookieStore = await cookies();
//     cookieStore.set('auth_token', token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'lax',
//       maxAge: 60 * 60 * 24, // 1 day
//       path: '/'
//     });

//     return { success: true, role: user.role };

//   } catch (error) {
//     console.error('CRITICAL OTP VERIFICATION ERROR:', error);
//     return { success: false, message: "System failed to verify code." };
//   }
// }

// Logout Aktion
export async function LogoutAction() {
  try {
    // Führt das Sign-Out aus und leitet optional direkt um
    await signOut({ redirect: false });
    return {success : true};
  } catch (error) {
    // Falls ein Fehler auftritt (z.B. Redirect-Fehler), wird er hier abgefangen
    console.error(error)
    return { error: "Abmeldung fehlgeschlagen" };
  }
}