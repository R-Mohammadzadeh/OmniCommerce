"use server";
import connectDB from "@/config/connectDB";
import { auth } from "@/lib/auth";
import UsersData from "@/models/UsersData";
import { revalidatePath } from "next/cache";
import { z} from 'zod'


// (Schema)
const profileSchema = z.object({
  name: z.string().trim().min(3 ,"Name must be at least 3 charactersDer Name muss mindestens 3 Zeichen lang sein"),
  familyName:z.string().trim().min(3,"Der Nachname ist zu kurz"),
  email:z.email("Bitte geben Sie eine gültige E-Mail-Adresse ein").trim(),
  phone:z.string().trim().min(10, "Die Telefonnummer muss mindestens 10 Stellen haben").regex(/^(\+49|0)[1-9][0-9]{8,13}$/,"Please enter a valid German phone number (e.g., +49... or 0...)"),
  stadt:z.string().trim().min(2,"Stadt ist erforderlich"),
  strasse:z.string().trim().min(2,"Straße ist erforderlich") ,
  PLZ:z.string().regex(/^\d{5}$/ , "Die Postleitzahl muss 5 Stellen haben"),
  Hausnummer:z.string().trim().min(1,"Hausnummer ist erforderlich")
})



export async function EditeProfileAction(formData) {

  try {
await connectDB();


const rawData = Object.fromEntries(formData.entries())

const validation = profileSchema.safeParse(rawData)


if(!validation.success){
return {error : true , message:validation.error.errors[0].message}

}


const validatedData = validation.data

// Identitätsprüfung
  const session = await auth()
  if(!session || !session.user){
    return {error: true , message : 'Nicht autorisiert! Bitte melden Sie sich erneut an.'}
  }

const userId = session.user.id;



// Datenbank aktualisieren
    const updatedUser = await UsersData.findByIdAndUpdate(
      userId,
      {
        $set: {
      name:validatedData.name,
      familyName:validatedData.familyName,
      phone:validatedData.phone,
      email: validatedData.email.toLowerCase(),
      adresse:{
      stadt:validatedData.stadt ,
      strasse:validatedData.strasse,  
      PLZ:validatedData.PLZ,     
      Hausnummer:validatedData.Hausnummer, 
      }
         
          
        },
      },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedUser) {
      return { error: true, message: "Benutzer nicht gefunden!" };
    }

    revalidatePath("/" , 'layout');
    revalidatePath('/dashboard')

    return { success: true, message: "Profil erfolgreich aktualisiert! " };
    
  } catch (error) {
    console.error("Aktualisierungsfehler:", error.message);
    return { error: true, message: "Fehler beim Aktualisieren. Bitte überprüfen Sie Ihre Daten." };
  }
}