"use server"

import connectDB from "@/config/connectDB";
import { auth } from "@/lib/auth"
import UsersData from "@/models/UsersData";
import { revalidatePath } from "next/cache";


// 1. Benutzer löschen
export async function deleteUser(userId) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') throw new Error('Nicht autorisiert')

    await connectDB();

    if (session.user.id === userId) {
      return { error: true, message: "Sie können sich nicht selbst löschen!" };
    }

    await UsersData.findByIdAndDelete(userId)
    revalidatePath('/admin/users')
    return { success: true, message: "Benutzer erfolgreich gelöscht." }

  } catch (error) {
    console.error('Benutzer konnte nicht gelöscht werden:', error) 
    return { error: true, message: 'Benutzer wurde nicht gelöscht' }
  }
}


// 2. Rolle ändern (Admin <-> User)
export async function toggleUserRole(userId, currentRole) {
  try { //  try/catch wrapper
    const session = await auth();
    if (!session || session.user.role !== 'admin') throw new Error('Nicht autorisiert');

    // Verhindern, dass man sich selbst die Admin-Rolle entzieht
    if (session.user.id === userId) {
      return { error: true, message: "Sie können Ihre eigene Rolle nicht ändern!" };
    }

    await connectDB()

    const newRole = currentRole === 'admin' ? 'user' : 'admin'; 

    await UsersData.findByIdAndUpdate(userId, { role: newRole })

    revalidatePath('/admin/users')
    return { success: true, message: `Rolle zu ${newRole} geändert` }

  } catch (error) {
    console.error('Rolle konnte nicht geändert werden:', error)
    return { error: true, message: 'Rollenänderung fehlgeschlagen' }
  }
}