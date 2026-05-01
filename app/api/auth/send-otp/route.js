// import connectDB from "@/config/connectDB"
// import UsersData from "@/models/UsersData"
// import { NextResponse } from "next/server";
// import nodemailer from 'nodemailer'


// export async function POST(req){
// try{
// const {email} = await req.json()

// await connectDB()

// // 1. Check if user exists in the database
// const user = await UsersData.findOne({email}) ;
// if(!user){
//     return NextResponse.json({error : 'User not found'} , {status:404})
// }

// // 2. Generate a random 6-digit OTP code
// const otp = Math.floor(100000 + Math.random() * 900000).toString() ;

// // 3. Save OTP and 10-minute expiry time to the user document
// user.otpCode = otp ;
// user.otpExpires = Date.now() + 600000 ; // Expires in 10 minutes

// await user.save()

// // 4. Configure Nodemailer for Mailtrap
// const transporter = nodemailer.createTransport({
//     host: 'sandbox.smtp.mailtrap.io',
//     port:2525,
//     auth :{
//         user : process.env.MAILTRAP_USER ,
//         pass : process.env.MAILTRAP_PASS ,
//     },
// })

// // 5. Define the email content
// const mailOptions = {
//     from : '"Tech Store Support" <support@mystore.com>',
//     to : email ,
//     subject : "Your Password Reset Code",
//     html : `
// <div style="font-family: sans-serif; text-align: center; padding: 20px;">
//     <h1>Reset Your Password</h1>
//     <p>Your 6-digit verification code is:</p>
//     <h2 style="color: #2563eb; font-size: 32px; letter-spacing: 5px;">${otp}</h2>
//     <p>This code will expire in 10 minutes.</p>
// </div>
//     `
// }

// // 6. Send the email via Mailtrap
// await transporter.sendMail(mailOptions) ;

// return NextResponse.json({message : "OTP sent successfully to your email"})
// }
// catch(error){
// console.error('Mailtarp OTP Errro :' , error)
// return NextResponse.json(
//     {error :"Failed to send email. Check your Mailtrap credentials." } ,
//     {status:500}
// )
// }
// }