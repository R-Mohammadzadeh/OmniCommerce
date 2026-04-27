"use server"

import connectDB from "@/config/connectDB";
import ProductsData from "@/models/ProductsData";





export async function searchProducts(query) {
    if(!query || query.length < 2) return [] ;

try{
await connectDB()

// Search in name and category using case-insensitive regex
const products = await ProductsData.find({
    $or:[
        {name: {$regex:query , $options:'i'}},
        {category:{$regex:query,$options:'i'}},
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


