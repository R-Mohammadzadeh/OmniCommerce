

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig, // Übernimmt die Basis-Konfiguration (Callbacks, Pages, etc.)
//   providers: [
//     Credentials({
//       /**
//        * Die authorize-Funktion steuert die Überprüfung der Login-Daten.
//        * Hier wird die E-Mail und der OTP-Code validiert.
//        */
//       async authorize(credentials) {
//         // Verbindung zur Datenbank herstellen
//         await connectDB();

//         // Benutzer anhand der E-Mail-Adresse suchen
//         const user = await UsersData.findOne({ email: credentials.email });
//         if (!user) throw new Error("Benutzer nicht gefunden");

//         // Konfiguration für das Demo-Konto (Test-Admin)
//         const isDemoAdmin = credentials.email === "demo-admin@test.com";
//         const demoOtp = process.env.DEMO_OTP || '11111';

//         /**
//          * Das User-Objekt, das in das JWT-Token geschrieben wird.
//          * Wichtig: Nur notwendige Daten übertragen.
//          */
//         const userPayload = {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           createdAt: user.createdAt ? user.createdAt.toISOString() : null,
//           lastLogin: new Date().toISOString(),
//         };

//         // FALL 1: Prüfung für den Demo-Admin
//         if (isDemoAdmin && credentials.otp === demoOtp) {
//           // Login-Zeitpunkt aktualisieren und OTP-Felder leeren
//           user.lastLogin = new Date();
//           user.otpCode = null;
//           user.otpExpires = null;
//           await user.save();
          
//           return userPayload;
//         }

//         // FALL 2: Prüfung für reguläre Benutzer (Echter OTP-Check)
//         const isOtpValid = user.otpCode === credentials.otp;
//         const isOtpNotExpired = user.otpExpires > Date.now();

//         if (isOtpValid && isOtpNotExpired) {
//           // Zeitstempel für den letzten Login setzen
//           user.lastLogin = new Date();
//           // Einmal-Passwort nach erfolgreichem Login ungültig machen
//           user.otpCode = null;
//           user.otpExpires = null;
          
//           // Änderungen in der Datenbank speichern
//           await user.save();
          
//           return userPayload;
//         }

//         // Falls keine Bedingung zutrifft, schlägt der Login fehl
//         return null;
//       }
//     })
//   ]
// });






// 1.zod validation
// const credentialsSchema  = z.object({
//   email:z.string().email(),
//   otp:z.string().min(4).max(10)
// })



// export const {handlers, auth,signIn, signOut} = NextAuth({
//   ...authConfig,
//   secret:process.env.AUTH_SECRET ,
//   providers:[
//     Credentials({
//       async authorize(credentials){
//         try{
//           // 2.Eingabevalidierung
//           const parsed = credentialsSchema.safeParse(credentials);
//            console.log("1. Zod parsed:", parsed.success, parsed.error?.issues);
//           if(!parsed.success) return null;
//           const {email,otp} = parsed.data;

//           // 3.Verbindung zur Datenbank herstellen und den Benutzer finden
//           await connectDB();
//           const user = await UsersData.findOne({email});
//             console.log("2. User found:", !!user);
//           if(!user) return null;

//           // 4.Demo-Admin-Überprüfung
//           const isDemoAdmin = email === 'demo-admin@test.com';
//           console.log("3. isDemoAdmin:", isDemoAdmin);
//     console.log("4. DEMO_OTP exists:", !!process.env.DEMO_OTP);
//           const demoOtp = process.env.DEMO_OTP;

//           if(isDemoAdmin){
//             // Falls DEMO_OTP in den Umgebungsvariablen nicht gesetzt ist, ist das Demo-Login deaktiviert.
//             if(!demoOtp){
//               console.error('DEMO_OTP ist nicht in den Umgebungsvariablen konfiguriert.');
//               return null ;
//                         console.log("5. OTP entered:", otp);
//       console.log("6. Hash prefix:", demoOtp.substring(0, 10));
//             }
//            // Vergleich von OTP für Demos mit bcrypt
//            const isDemoOtpValid = await bcrypt.compare(otp,demoOtp) ;
//               console.log("7. bcrypt result:", isDemoOtpValid);
//            if(!isDemoOtpValid) return null ;
           
 
//           }else{
//             // 5.OTP-Verifizierung für reguläre Benutzer

//             // Überprüfen, ob das OTP in der Datenbank vorhanden ist
//             if(!user.otpCode || !user.otpExpires) return null ;

//             // OTP-Ablauf prüfen
//             const isOtpNotExpired = user.otpExpires > Date.now() ;
//             if(!isOtpNotExpired) return null ;

//          // Sichere Überprüfung des OTP mittels bcrypt (resistent gegen Timing-Angriffe)
//             const isOtpValid = await bcrypt.compare(otp,user.otpCode)
//             if(!isOtpValid) return null ;
//           }

//           // 6. Anmeldeinformationen aktualisieren und OTP löschen
//           user.lastLogin = new Date();
//           user.otpCode = null ;
//           user.otpExpires = null ;
//           await user.save();

//           // 7. Nur die erforderlichen Felder zurückgeben (ohne Passwort und OTP-Code)
//           return{
//             id:user._id.toString(),
//             name:user.name,
//             email:user.email,
//             role:user.role,
//             createdAt:user.createdAt ?  user.createdAt.toISOString() : null ,
//             lastLogin:new Date().toISOString(),
//           }
//         }
//         catch(error){
//           console.error('Authentifizierungsfehler:',error);
//           return null ;
//         }
//       }
//     })
//   ]
// })