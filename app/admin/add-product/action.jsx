"use server" 

import connectDB from "@/config/connectDB";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache"; 
import ProductsData from "@/models/ProductsData"; 
import { cookies } from "next/headers";

export const addProductAction = async (prevState, formData) => {
  try {
    // 1. 
    await connectDB();

    // 2. 
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const user = await auth(token);


    if (!user || user.role !== 'admin') {
      return { error: true, message: "Unauthorized access! Admin only." };
    }

   
   // 3. 
    const file = formData.get('image');
    if (!file || file.size === 0) {
      return { error: true, message: "Please select an image file!" };
    }

    // 4. 
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');
    
    //    
    const dataURI = `data:${file.type};base64,${base64String}`;

    // 
   
    if(base64String.startsWith('PCFK')){
      return {error : true , message :"System Error: Form is sending HTML instead of Image. Please refresh (Ctrl+F5)."}
    }  

    // 5. 
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'my_store_products',
      resource_type: 'image', //  
    });

    const imageUrl = uploadResponse.secure_url;

    // 6. 
    const newProduct = await ProductsData.create({
      name: formData.get('name'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      category: formData.get('category')?.toLowerCase(),
      brand:formData.get('brand')?.toLowerCase() ,
      stock: Number(formData.get('stock')),
      image: [imageUrl], // 
    });

    // 7. 
    revalidatePath('/'); 
    revalidatePath('/admin/add-product');

    return { 
      error: false, 
      message: `Success! ${newProduct.name} has been added.` 
    }; 

  } catch (error) {
    console.error("FULL ERROR LOG:", error);
    
    //    
    return { 
      error: true, 
      message: error.message || "An unexpected error occurred!" 
    };
  }
}