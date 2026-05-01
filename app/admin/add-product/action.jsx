"use server" 

import connectDB from "@/config/connectDB";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache"; 
import ProductsData from "@/models/ProductsData"; 


export const addProductAction = async (prevState, formData) => {
  try {
    // 1. 
    await connectDB();

    // 2. 
 const session = await auth()


  if (!session || session.user?.role !== 'admin') {
    return { error: true, message: "Zugriff verweigert! Nur für Admins." };
  }

   
   // 3. 
    const file = formData.get('image');
    if (!file || file.size === 0) {
      return { error: true, message: "Bitte wählen Sie eine Bilddatei aus!" };
    }

    // 4. 
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');
    
    //    
    const dataURI = `data:${file.type};base64,${base64String}`;

    // 
   
    if(base64String.startsWith('PCFK')){
    return {error : true , message :"Systemfehler: Das Formular sendet HTML anstelle eines Bildes. Bitte aktualisieren Sie die Seite (Strg+F5)."}
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
      message: `erfolgrich! ${newProduct.name} wurde hinzugefügt` 
    }; 

  } catch (error) {
    console.error("VOLLSTÄNDIGES FEHLERPROTOKOLL:", error);
    
    //    
    return { 
      error: true, 
      message: error.message || "Es ist ein unerwarteter Fehler aufgetreten!" 
    };
  }
}