"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"



export async function getHomeProducts() {
try{
  await connectDB()

//1. Define target categories for the home page sliders 
const targetCategory = ["Camera", "PlayStation", "Tablet" , "Laptop" , "Mobile"] ;


// 2. Fetch products from the database that belong to the target categories, sorted by creation date (newest first) 
const products = await ProductsData.find(
    {category : { $in : targetCategory.map((cat) => new RegExp(`^${cat}$` , 'i'))}})
.sort({createdAt : -1})
.limit(20)
.lean()
return {
    products : JSON.parse(JSON.stringify(products)) , // to handle date serialization
};

}
catch(error){
    console.error('Fetch Products Error :' , error)
    return {products : [] , totalPage : 0}
}

}




