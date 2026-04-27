"use client";

import { useActionState, useEffect, useRef } from "react";
import { addProductAction } from "./action";
import Link from "next/link";
// import { addProductAction } from "@/app/product/productAction";



export default function AddProductPage() {


const [state, formAction, isPending] = useActionState(addProductAction, null);
const formRef = useRef(null);

useEffect(() => {
if(state?.error === false){
formRef.current?.reset()
}
} , [state])

return (
// Main container with full height and gray background
<div className="min-h-screen bg-gray-50 py-12 px-4 mt-32 dark:bg-blue-950/20 dark:border-slate-800 dark:text-white" >
<div className="max-w-3xl mx-auto bg-white rounded-2xl dark:bg-blue-950 dark:text-white shadow-xl overflow-hidden">

{/* Header Section */}
<div className="bg-slate-800 p-6">
<h1 className="text-2xl font-bold text-white text-center">Add New Product</h1>
<p className="text-slate-300 text-center text-sm mt-1">Fill in the details to list a new item</p>
</div>

<form action={formAction} className="p-8 space-y-6" ref={formRef} >

{/* Status Message */}
{state?.message && (
<div className={`p-4 rounded-lg text-sm font-medium ${state.error ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
{state.message}
</div>
)}

{/* Form Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-white dark:bg-blue-950/20 p-4 rounded-lg border border-gray-200">

{/* Product Name */}
<div className="flex flex-col gap-2 ">
<label className="text-sm font-semibold text-gray-700 dark:text-white ">Product Name</label>
<input 
name="name" 
type="text" 
placeholder="e.g. Wireless Mouse" 
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
required 
/>
</div>

{/* Category */}
<div className="flex flex-col gap-2  ">
<label className="text-sm font-semibold text-gray-700 dark:text-white ">Category</label>
<select name="category" required
className="w-full py-2 px-4 border dark:bg-blue-950 dark:text-white 
 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">

<option value="">select Category</option>
<option value="Laptop">Laptop</option>
<option value="Camera">Camera</option>
<option value="Mobile">Mobile</option>
<option value="Tablet">Tablet</option>
<option value="Playstation">Playstation</option>

</select>
</div>
{/* brand */}
<div className="flex flex-col gap-2">
    <label className="text-sm dark:text-white font-semibold text-gray-700">Brand</label>
<input 
name="brand" 
placeholder="e.g. Asus, Sony, Apple" 
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
required 
/>
</div>

{/* Price */}
<div className="flex flex-col gap-2">
<label className="text-sm dark:text-white font-semibold text-gray-700">Price ($)</label>
<input 
name="price" 
type="number" 
placeholder="0.00" 
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
required 
/>
</div>

{/* Stock */}
<div className="flex flex-col gap-2">
<label className="text-sm dark:text-white font-semibold text-gray-700">Stock Quantity</label>
<input 
name="stock" 
type="number" 
placeholder="100" 
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
required 
/>
</div>
</div>

{/* Description - Full Width */}
<div className="flex flex-col gap-2">
<label className="text-sm font-semibold dark:text-white text-gray-700">Description</label>
<textarea 
name="description" 
rows="4" 
placeholder="Tell customers more about this product..." 
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
required 
/>
</div>

{/* Image URL */}
<div className="flex flex-col gap-2">
<label className="text-sm font-semibold dark:text-white text-gray-700">Image URL</label>
<input 
name="image" type="file" accept="image/*" required  
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>
</div>

{/* Submit Button */}
<button 
disabled={isPending}
type="submit" 
className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
>
{isPending ? (
<span className="flex items-center justify-center gap-2">
{/* Simple Spinner */}
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
Processing...
</span>
) : "Create Product Listing"}
</button>
</form>
</div>
<button className=" max-w-3xl mx-auto mt-8 flex items-center gap-2
 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm ">
 <Link href="/admin" className=" text-center  text-sm text-gray-600 hover:text-gray-800">
&#8592; Back to Dashboard
</Link>
</button>
</div>
);
}