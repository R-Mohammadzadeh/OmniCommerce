// import connectDB from "@/config/connectDB";
// import UsersData from "@/models/UsersData";
// import { NextResponse } from "next/server";
// import crypto from 'crypto'
// import nodemailer from 'nodemailer'





// export async function POST (req) {
//     try{
// const {email} = await req.json()        
// await connectDB() ;

// // Find the user by email from the database
// const user = await UsersData.findone({email})

// if(!user){
//     return NextResponse.json({error : 'No user found with this email'} , {status:404})
// }

// //1.Generate a secure random reset token
// const resetToken = crypto.randomBytes(32).toString('hex')

// //2.Hash the token and save it to the user object (the one we found above)

// user.resetPasswordToken = crypto
// .createHash('sha256')
// .update(resetToken)
// .digest('hex')

// //3.Set token expiration time (e.g., 1 hour from now)
// user.resetPasswordExpire = Date.now() + 3600000 ;

// await user.save()

// // 4.Construct the reset URL
// const result = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${resetToken}`

// // 5.Configure Nodemailer transporter
// const transport = nodemailer.createTransport({
//     service : 'gmail',
//     auth:{
//         user:process.env.EMAIL_USER ,
//         pass : process.env.EMAIL_PASS , // from google
//     }
// })

// const mailOptions = {
//     from : process.env.EMAIL_USER,
//     to:user.email,
//     subject : 'Password Reset Request' ,
//     html : `
//     <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
//           <h2>Password Reset</h2>
//           <p>You requested a password reset. Please click the link below to set a new password:</p>
//           <a href="${resetUrl}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
//           <p>This link will expire in 1 hour.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//         </div>
//     `,
// }

// await transport.sendMail(mailOptions)

// return NextResponse.json({message: 'A reset link has been sent to your email.'})

//     }
//     catch(error){
// console.error(error)
// return NextResponse.json({error : "Error in the email sending system"} , {status:500})
//     }
// }