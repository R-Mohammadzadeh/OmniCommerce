"use server"

import connectDB from "@/config/connectDB";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import ProductsData from "@/models/ProductsData";

/**
 * Server Action to add a new product to the database.
 * Includes authentication check, image upload to Cloudinary, and data validation.
 */
export const addProductAction = async (prevState, formData) => {
  try {
    // 1. Authorization check - must be performed before DB connection for efficiency
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return { error: true, message: "Access denied! Admins only." };
    }

    // 2. Establish database connection after successful auth
    await connectDB();

    // 3. Input validation and sanitization
    const name = formData.get('name')?.toString().trim();
    const description = formData.get('description')?.toString().trim();
    const price = Number(formData.get('price'));
    const stock = Number(formData.get('stock'));
    const category = formData.get('category')?.toLowerCase();
    const brand = formData.get('brand')?.toLowerCase();

    if (!name || !description || !category || !brand) {
      return { error: true, message: "Please fill in all required fields!" };
    }
    if (isNaN(price) || price < 0) {
      return { error: true, message: "Invalid price value!" };
    }
    if (isNaN(stock) || stock < 0) {
      return { error: true, message: "Invalid stock value!" };
    }

    // 4. Image file validation
    const file = formData.get('image');
    if (!file || file.size === 0) {
      return { error: true, message: "Please select an image file!" };
    }

    // 5. Convert image file to Base64 for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64String}`;

    // Security check: ensure the payload isn't an HTML error page (common during session timeouts)
    if (base64String.startsWith('PCFK')) {
      return { error: true, message: "System error: Form sent HTML instead of an image. Please refresh the page (Ctrl+F5)." };
    }

    // 6. Upload image to Cloudinary folder
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'my_store_products',
      resource_type: 'image',
    });

    const imageUrl = uploadResponse.secure_url;

    // 7. Save the new product to MongoDB
    const newProduct = await ProductsData.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      image: [imageUrl],
    });

    // 8. Revalidate paths to update the cache for the home and admin pages
    revalidatePath('/');
    revalidatePath('/admin/add-product');

    return {
      error: false,
      message: `Success! ${newProduct.name} has been added.`
    };

  } catch (error) {
    // Log the full error on the server for debugging
    console.error("FULL ERROR LOG:", error);
    return {
      error: true,
      message: error.message || "An unexpected error occurred!"
    };
  }
}