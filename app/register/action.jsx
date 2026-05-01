"use server"

import UsersData from "@/models/UsersData"
import connectDB from "@/config/connectDB"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import z from "zod"

// Schema-Definition auf Deutsch
const registerSchema = z.object({
  email: z.email("Ungültige E-Mail-Adresse").toLowerCase(),
  password: z.string()
    .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein")
    .max(20, "Das Passwort darf maximal 20 Zeichen lang sein"),
  confirmPassword: z.string(),
  vorname: z.string().min(2, "Vorname ist zu kurz").max(100, "Vorname ist zu lang"),
  nachname: z.string().min(2, "Nachname ist zu kurz").max(100, "Nachname ist zu lang"),
  phone: z.string()
    .regex(/^\+?[0-9]+$/, "Die Telefonnummer darf nur Ziffern enthalten")
    .min(8, "Telefonnummer ist zu kurz")
    .max(20, "Telefonnummer ist zu lang")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ['confirmPassword']
})

export const registerAction = async (_prevState, formData) => {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    vorname: formData.get('vorname'),
    nachname: formData.get('nachname'),
    phone: formData.get('phone')
  }

  // Validierung mit Zod
  const validation = registerSchema.safeParse(rawData)
  if (!validation.success) {
    const firstError = validation.error.errors[0]?.message || "Validierungsfehler aufgetreten";
    return { error: true, message: firstError }
  }

  const { email, password, phone, vorname, nachname } = validation.data

  try {
    await connectDB();

    const normalizedEmail = email.trim().toLowerCase();
    const userExists = await UsersData.findOne({ email: normalizedEmail }).select("_id").lean();
    
    if (userExists) {
      return { error: true, message: "Benutzer existiert bereits" };
    }

    // Passwort-Hashing
    const hashedPassword = await bcrypt.hash(password, 12);
    const userCount = await UsersData.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    const newUser = await UsersData.create({
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      name: vorname.trim(),
      familyName: nachname.trim(),
      role
    });

    revalidatePath("/", 'layout');

    return {
      error: false,
      message: "Registrierung erfolgreich! Bitte melden Sie sich an.",
      role: newUser.role,
      timestamp:Date.now()
    };
  } catch (error) {
    console.error("Registrierungsfehler:", error);
    return { error: true, message: "Interner Serverfehler" };
  }
};