"use client"

import { deleteProduct } from "@/app/actions/deleteProductAction"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2"
import { toast } from "sonner"




export default function ProductActions ({productId , productName}) {

const router = useRouter()    

const handleDelete = async () => {
const confirmDelete = confirm(`Are you sure you want to delete ${productName}`)

if(confirmDelete){
    const result = await deleteProduct(productId)
if(result.success){
    toast.success("Product deleted successfully")

    router.refresh()
}else{
    toast.error("Error deleting product")
}
}
}


return(
    
<div className="flex justify-end items-center gap-2">


{/* edite click */}
<Link href={`/admin/products/edit/${productId}`}>
<button className="p-2.5 text-blue-600 hover:bg-blue-50
 dark:hover:bg-blue-900/30 rounded-xl transition-colors border border-transparent hover:border-blue-100 cursor-pointer">
<HiOutlinePencilSquare size={20} />
</button>
</Link>


{/* delete click */}
<button onClick={handleDelete} 
className="p-2.5 cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors border border-transparent hover:border-red-100">
<HiOutlineTrash size={20} />
</button>


</div>
)}






