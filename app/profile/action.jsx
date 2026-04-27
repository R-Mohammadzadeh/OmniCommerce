"use server";
import connectDB from "@/config/connectDB";
import { auth } from "@/lib/auth";
import UsersData from "@/models/UsersData";
import { revalidatePath } from "next/cache";
import { z} from 'zod'


// (Schema)
const profileSchema = z.object({
  name: z.string().trim().min(3 ,"Name must be at least 3 characters"),
  familyName:z.string().trim().min(3,"Family name is too short"),
  email:z.email("Please enter a valid email address").trim(),
  phone:z.string().trim().min(10, "Phone number must be at least 10 digits").regex(/^(\+49|0)[1-9][0-9]{8,13}$/,"Please enter a valid German phone number (e.g., +49... or 0...)"),
  stadt:z.string().trim().min(2,"City name is required"),
  strasse:z.string().trim().min(2,"Street name is required") ,
  PLZ:z.string().regex(/^\d{5}$/ , "Postal code must be 5 digits"),
  Hausnummer:z.string().trim().min(1,"House number is required")
})



export async function updateProfileAction(formData) {

  try {
await connectDB();

// 
const rawData = Object.fromEntries(formData.entries())

// 
const validation = profileSchema.safeParse(rawData)


if(!validation.success){
return {error : true , message:validation.error.errors[0].message}

}

// 
const validatedData = validation.data

// Next-Auth
  const session = await auth()
  if(!session || !session.user){
    return {error: true , message : 'Unauthorized! Please login again.'}
  }

const userId = session.user.id;


// --------------------
    const updatedUser = await UsersData.findByIdAndUpdate(
      userId,
      {
        $set: {
      name:validatedData.name,
      familyName:validatedData.familyName,
      phone:validatedData.phone,
      email: validatedData.email,
      "address.stadt":validatedData.stadt ,
      "address.strasse":validatedData.strasse,  
      "address.PLZ":validatedData.PLZ,     
      "address.Hausnummer":validatedData.Hausnummer,    
          
        },
      },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedUser) {
      return { error: true, message: "User not found!" };
    }

    revalidatePath("/" , 'layout');
    revalidatePath('/dashbord')

    return { success: true, message: "Profile updated successfully! " };
    
  } catch (error) {
    console.error("Update Error:", error.message);
    return { error: true, message: "Failed to update profile.Please check your data." };
  }
}