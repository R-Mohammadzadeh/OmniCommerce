"use server"

import connectDB from "@/config/connectDB"
import UsersData from "@/models/UsersData";
import bcrypt from "bcryptjs";







// --- Aktion für Schritt 1: OTP senden ---
export async function sendOtpAction(prevState , formData){
try{
await connectDB() ;
const email = formData.get('email')?.toLowerCase().trim();

if(!email) return {error :true , message:"Bitte E-Mail eingeben."}

const user = await UsersData.findOne({email})
if(!user) return{error : true , message :"Benutzer nicht gefunden."}

// OTP generieren und speichern
const otp = Math.floor(100000 + Math.random() * 900000).toString()
user.otpCode = otp;
user.otpExpires = Date.now() + 600000 ; // 10 Minuten
await user.save()


// E-Mail-Versand Logik einfügen
console.log(`OTP für ${email} : ${otp}`)

return {error : false , message :"Code wurde gesendet!"}

}
catch(error){
return { error: true, message: "Fehler beim Senden." };
}
}




// --- Aktion für Schritt 2: Passwort zurücksetzen ---
export async function resetPasswordAction (prevState , formData){
    try{
await connectDB();

const email = formData.get('email')?.toLowerCase().trim() ;
const otp = formData.get('otp-code').toString().trim() ;
const newPassword = formData.get('new-Password')

if(!email ||!otp ||!newPassword){
    return {error : true , message : "Bitte füllen Sie alle Felder aus."}
}

const user = await UsersData.findOne({email , otpCode : otp})

if(!user) {
    return {error : true , message :"Ungültiger Code oder E-Mail-Adresse."}
}

if(user.otpExpires && user.otpExpires < Date.now()) {
    return {error : true , message :"Der Code ist abgelaufen." }
}

const salt = await bcrypt.genSalt(12) ;
const hashedPassword = await bcrypt.hash(newPassword , salt) ;

user.password = hashedPassword ;
user.otpCode = undefined ;
user.otpExpires = undefined ;
await user.save() ;

return {error : false , message : "Passwort erfolgreich aktualisiert!"}

    }
    catch(error){
        return {error: true , message : 'Serverfehler.'}
    }
}



