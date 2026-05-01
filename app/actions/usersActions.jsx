"use server"

import connectDB from "@/config/connectDB";
import { auth } from "@/lib/auth"
import UsersData from "@/models/UsersData";
import { revalidatePath } from "next/cache";


// 1. Benutzer löschen
export async function deleteUser(userId){
try{

const session = await auth() ;
if(!session || session.user.role !== 'admin') throw new Error('Nicht autorisiert')

await connectDB() ;

// Verhindern, dass man sich selbst löscht
if(session.user.id === userId) {
    return {error : true , message:"Sie können sich nicht selbst löschen!"};
}

await UsersData.findByIdAndDelete(userId)
revalidatePath('/admin/users')
return {success : true , message:"Benutzer erfolgreich gelöscht."}
}
catch(error){
console.error('Benutzer konnte nicht gelöscht werden')
return {error:true , message:'Benutzer wurde nicht gelöscht'}
}
}



// 2. Rolle ändern (Admin <-> User)
export  async function toggleUserRole(userId,currentRole){
const session = await auth() ;
if(!session || session.user.role !== 'admin') throw new Error('Nicht autorisiert');

await connectDB()

const newRole = currentRole == 'admin' ? 'user' : 'admin' ;

await UsersData.findByIdAndUpdate(userId,{role:newRole})

revalidatePath('/admin/users')
return {success: true , message:`Rolle zu ${newRole} geändert`}
}
























