"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"
import { revalidatePath } from "next/cache"



export async function  deleteProduct(id) {

try{
await connectDB()
await ProductsData.findByIdAndDelete(id)

revalidatePath('/admin/products')

return {success : true}
}
catch(error){
return {success : false , error:error.message}
}



}


