import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"


export async function getRelatedProducts(category , currentProductId) {

try{

await connectDB()
 
const related = await ProductsData.find({
    category:{$regex : new RegExp(`^${category}$`,'i')} ,
    _id :{$ne : currentProductId} // not show moment article
})
.limit(4) // 4 enouth
.lean()

return JSON.parse(JSON.stringify(related))

}
catch(error){
console.error("Related Products Error:", error);
return []
}
} 



