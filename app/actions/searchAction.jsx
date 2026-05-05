"use server"

import connectDB from "@/config/connectDB";
import ProductsData from "@/models/ProductsData";





export async function searchProducts(query) {
    const trimmed = query.trim();
    if(!trimmed || trimmed.length < 2) return [] ;

try{
await connectDB()

// Search in name and category using case-insensitive regex
const products = await ProductsData.find({
    $or:[
        {name: {$regex:trimmed , $options:'i'}},
        {category:{$regex:trimmed,$options:'i'}},
    ]
})
.limit(5) // Limit results for the dropdown
.lean()

return JSON.parse(JSON.stringify(products))
}
catch(error){
console.error('Search Error:' , error)
return[]
}


    }


