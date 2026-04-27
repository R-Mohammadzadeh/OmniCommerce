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

// --- Demo-Kontobereich ---
const isDemoAdmin = credentials.email === "demo-admin@test.com";
const demoOtp = '11111' // Korrigierter Code für die Demo


if(isDemoAdmin && credentials.otp === demoOtp){
    return {
        id:user._id.toString(),
        name:user.name ,
        email:user.email,
        role:user.role
    }
}

// Hauptlogik für echte Benutzer

if(user && user.otpCode === credentials.otp && user.otpExpires > Date.now()){
    return {
        id : user._id.toString(),
        name:user.name ,
        email:user.email,
        role:user.role
    }
}
return null

            }
        })
    ]
})









