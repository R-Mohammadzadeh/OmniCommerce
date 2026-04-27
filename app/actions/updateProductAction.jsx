'use server'

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"
import { revalidatePath } from "next/cache"

export async function updateProductAction(formData) {
    try {
        await connectDB()

        const id = formData.get('id')
        const existingProduct = await ProductsData.findById(id);
        
        if (!existingProduct) return { error: true, message: 'Product not found!' }

        const name = formData.get("name");
        const price = formData.get("price");
        const stock = formData.get("stock");
        const category = formData.get("category"); 
        const description = formData.get("description");

        const updatedFields = {
            name,
            price: Number(price), 
            stock: Number(stock),
            description,
          
            category: category || existingProduct.category 
        }

        
        const result = await ProductsData.findByIdAndUpdate(
            id, 
            { $set: updatedFields }, 
            { returnDocument: 'after' }
        )

        if (!result) {
            return { error: true, message: "Update failed in database!" }
        }

        revalidatePath('/admin/products')
        
        
        return { error: false, message: "Product updated successfully!" }

    } catch (error) {
        console.error(error)
        return { error: true, message: error.message || 'Update failed!' } 
    }
}