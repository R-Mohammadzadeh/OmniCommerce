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
 * STEP 1: Verify Password & Send OTP
 */
export async function sendOtpAction(email, password) {
  try {
    await connectDB();

    // 1. Find user
    const user = await UsersData.findOne({ email });
    if (!user) {
      return { success: false, message: "User email not found!" };
    }

    // 2. Validate Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !user.phone) {
      return { success: false, message: "Invalid credentials or missing phone!" };
    }

    // 3. Telefonnummer formatieren (Standardisierung auf 49...)
    let cleanPhone = user.phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '49' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('49')) {
      cleanPhone = '49' + cleanPhone;
    }

    // 4. Generate OTP (5 digits)
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

console.log("------------------------------");
console.log("🔥 YOUR TEST OTP IS:", otp); 
console.log("------------------------------");

    // 5. Trigger SMS
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
      user.otpCode = otp;
      user.otpExpires = expires;
      await user.save({ validateBeforeSave: false });
      return { success: true, message: "Code sent successfully!" };
    }

    // If SMS failed but code reached here
    return { 
      success: false, 
      message: `SMS delivery failed. (Code: ${smsResponse?.success || 'Unknown'})` 
    };

  } catch (error) {
    console.error('CRITICAL OTP ERROR:', error);
    return { success: false, message: "A server error occurred during OTP process." };
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

// logout action 
export async function LogoutAction() {
await signOut({redirectTo:'/login'})
}