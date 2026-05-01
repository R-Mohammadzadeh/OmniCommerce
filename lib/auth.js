import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/config/connectDB";
import UsersData from "@/models/UsersData";
import { authConfig } from "./auth.config";




export const {handlers , auth , signIn , signOut } = NextAuth({
    ...authConfig,
    providers : [
        Credentials({
            async authorize(credentials){
                await connectDB() ;

            const user = await UsersData.findOne({email:credentials.email})
            if (!user) throw new Error("User not found");

// (Aktualisierung in der DB)
user.lastLogin = new Date()
await user.save()    

// --- Demo-Kontobereich ---
const isDemoAdmin = credentials.email === "demo-admin@test.com";
const demoOtp = '11111' // Korrigierter Code für die Demo

// Erstelle ein Benutzerobjekt mit allen erforderlichen Feldern
const userPayload = {
  
        id:user._id.toString(),
        name:user.name ,
        email:user.email,
        role:user.role ,
        createdAt: user.createdAt ? user.createdAt.toISOString() : null,
        lastLogin: user.lastLogin ? user.lastLogin.toISOString() :null,
   
}

if(isDemoAdmin && credentials.otp === demoOtp){
    return userPayload;
}

// Hauptlogik für echte Benutzer

if(user && user.otpCode === credentials.otp && user.otpExpires > Date.now()){
  return userPayload
}
return null

            }
        })
    ]
})









