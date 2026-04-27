import connectDB from "@/config/connectDB";
import UsersData from "@/models/UsersData";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json();

    await connectDB();

    // 
    const user = await UsersData.findOne({
      email: email.toLowerCase().trim(),
      otpCode: otp.toString().trim(), //
    });

    // 
    if (!user) {
      console.log("ERROR: User or OTP not found in DB");
      return NextResponse.json({ error: "Invalid code or email" }, { status: 400 });
    }

    // 
    if (user.otpExpires && user.otpExpires < Date.now()) {
      console.log("ERROR: OTP Expired");
      return NextResponse.json({ error: "Code expired. Request a new one." }, { status: 400 });
    }

    // 
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 
    user.password = hashedPassword;
    user.otpCode = undefined; 
    user.otpExpires = undefined;

    await user.save();
  

    return NextResponse.json({ message: "Password updated successfully!" });

  } catch (error) {
    console.error("CRITICAL ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}