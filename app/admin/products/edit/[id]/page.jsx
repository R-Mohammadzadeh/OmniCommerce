import ApdateProductForm from "@/Components/ApdateProductForm"
import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"
import { notFound } from "next/navigation"


export default async function EditProductPage ({params}) {

const {id} = await params //  get url to id

await connectDB()

const product = await ProductsData.findById(id).lean()

if(!product){
    notFound() //404 page
}



return (
    <>
    <div className="min-h-screen p-24 pb-12 px-4">
    <div className="max-w-3xl mx-auto">
    <h1 className="text-3xl font-black mb-8 dark:text-white text-center">
       <span className="text-slate-600 ">{product.name}</span>
    </h1>
    
    < ApdateProductForm  product={JSON.parse(JSON.stringify(product))} />
    </div>
    
    </div>
    </>

)
}