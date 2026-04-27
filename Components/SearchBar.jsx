"use client"

import { searchProducts } from "@/app/actions/searchAction"
import Link from "next/link"
import { useEffect, useState } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"

export default function SearchBar () {

    
// Text that the user types in the search box
const [query , setQuery] = useState('') 
//List of products coming from the database 
const [results , setResults] = useState([]) 
//Did the user click inside the search box?
const[isFocused , setIsFocused] = useState(false) 

// Use effect to trigger search when query changes with a debounce
useEffect(()=>{
    const delayFn = setTimeout(async () => {
        if(query.length >= 2){
            const data = await searchProducts(query)
            setResults(data)
        }else{
            setResults([])
        }
    }, 300) // Wait 300ms after last keystroke

    return () => clearTimeout(delayFn)
},[query])



return(
<div className="relative flex-1 max-w-md mx-4">

<div className="relative">
    
<HiMagnifyingGlass className="absolute leading-3 top-1/2
 -translate-y-1/2 text-gray-400" size={18} />
 <input type="text" placeholder="Search products...." 
 className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all 
  dark:bg-slate-800 border-none text-sm "
 value={query}
 onChange={(e) =>setQuery(e.target.value)}
 onFocus={() =>setIsFocused(true)}
 onBlur={()=>setTimeout(() =>setIsFocused(false),200)} // Delay to allow clicks
 />
</div>

 {/* Results Dropdown */}

{isFocused && results.length > 0 && (
    <div 
    className="absolute top-full left-0 right-0 shadow-2xl rounded-2xl border border-gray-100
     dark:border-slate-700 overflow-hidden z-100
     mt-2 bg-white dark:bg-slate-800">

{results.map((product) => (
    <Link key={product._id} href={`/product/${product._id}`}
    className='flex items-center gap-3 p-3 hover:bg-blue-50
     dark:hover:bg-slate-700 transition-colors'
     onClick={() => setQuery('')}
    >
    <img src={product.image[0]} alt="" className="w-10 h-10 object-contain bg-gray-50 rounded-lg" />
    <div>
        <p className="text-sm font-bold text-shadow-gray-800 dark:text-white line-clamp-1">{product.name}</p>
        <p className="text-xs text-blue-500 font-bold">{product.price}</p>
    </div>
    </Link>
))}

    </div>
)}


</div>
)
}



