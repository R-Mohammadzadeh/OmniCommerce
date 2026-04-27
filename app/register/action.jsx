"use server"

import UsersData from "@/models/UsersData"
import connectDB from "@/config/connectDB"
import { revalidatePath } from "next/cache" // Correct import for revalidating
import bcrypt from "bcryptjs" // Highly recommended for security
import z from "zod"





// Define the schema
const registerSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
  password : z.string()
  .min(8 , "Password must be at least 8 characters")
  .max(20,"Password cannot exceed 20 characters"),

  confirmPassword : z.string() ,
  vorname : z.string().min(2 , "First name is too short").max(100 , "First name is too long") ,
  nachname : z.string().min(2 , "Last name is too short").max(100 , "Last name is too long") ,

  phone : z.string()
  .regex(/^\+?[0-9]+$/, "Phone number must contain only digits")
  .min(8 , "Phone number is too short") 
  .max(20 , "Phone number is too long")
}).refine((data) => data.password === data.confirmPassword , {
  message:"Passwords do not match",
  path:['confirmPassword'] // show errro
}) 

export const registerAction = async (prevState, formData) => {
  
  // Extract data from formData
const rawData = {
  email:formData.get('email'),
  password : formData.get('password') ,
  confirmPassword : formData.get('confirmPassword') ,
  vorname : formData.get('vorname') ,
  nachname : formData.get('nachname') ,
  phone : formData.get('phone')
}


// validation with zod
const validation = registerSchema.safeParse(rawData)
if(!validation.success){
  const firstError = validation.error.errors[0].message;
  return {error : true , message : firstError}
}

// get data from validation
const {email , password , phone , vorname , nachname} = validation.data

  try {
    await connectDB();

    // 3. Normalize email 
    const normalizedEmail = email.trim().toLowerCase();
    const userExists = await UsersData.findOne({ email: normalizedEmail }).select("_id").lean();
     
    if (userExists) {
      return {
        error: true,
        message: "User already exists",
      };
    }

    // 4. Secure password hashing bcryptjs
    const hashedPassword = await bcrypt.hash(password, 12);
    const userCount = await UsersData.countDocuments();
    const role = userCount === 0 ? "admin" : "user" ;
    


    // 5. Create user record
    const newUser = await UsersData.create({
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      name: vorname ,
      familyName : nachname ,
      role  // First user is admin
    });

 //. Clear cache for the registration path
    revalidatePath("/" , 'layout');

    return {
      error: false,
      message: "Registration successful! Please login with your credentials.",
      role : newUser.role,
    };
  } catch (error) {
    return {
      error: true,
      message: "Internal server error",
     
    };
  }
};