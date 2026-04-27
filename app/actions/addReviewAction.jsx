"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData";
import { revalidatePath } from "next/cache";






export async function addReviewAction(productId , reviewData){

try{
await connectDB() ;

const {user , rating , comment } = reviewData ;

// 1.products find
const product = await ProductsData.findById(productId)

if(!product){
    return {success:false , message:"Product not found"}
}

// 2.object build
const newReview = {
    user ,
    rating:Number(rating),
    comment,
    createdAt:new Date(),
}

// 3.commenta adding
product.reviews.push(newReview)

// 4.commentar update
product.numReviews = product.reviews.length 

// 5.avrage rating on comment
const totalRating = product.reviews.reduce((acc,item) => item.rating + acc ,0 )
product.rating = totalRating / product.reviews.length;

// 6.save to data
await product.save()

// 7.
revalidatePath(`/product/${productId}`)

return {success:true , message : "Review added successfully!"}
}
catch(error){
console.error('Error Adding revwie :' , error)
return {error :true , message : "Something went wrong"}
}
}
