"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function CategoryToolbar({slug , brand , sort , allBrands}) {

const router = useRouter()
const pathname = usePathname()
const searchParams = useSearchParams()

// resresh not loading url
const handleSort = (value) =>{
const params = new URLSearchParams(searchParams) ;
params.set('sort' , value) ;
router.push(`${pathname}?${params.toString()}`)
}



return (
<>
{/* Toolbar: Filters & Sorting */}
<div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border dark:border-slate-800">
    
    {/* Brand Quick Filters */}
    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
    <span className="text-xs font-bold uppercase text-gray-400 mr-2">Brands:</span>
    <Link 
        href={`/category/${slug}`}
        className={`px-4 py-1.5 rounded-full text-sm transition-all ${!brand ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-800'}`}
    >
        All
    </Link>
    {allBrands.map((b) => (
        <Link 
        key={b}
        href={`/category/${slug}?brand=${b.toLowerCase()}`}
        className={`px-4 py-1.5 rounded-full text-sm transition-all ${brand === b.toLowerCase() ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-800'}`}
        >
        {b}
        </Link>
    ))}
    </div>

    {/* Sort Dropdown or Buttons */}
    <div className="flex items-center gap-2">
    <span className="text-xs font-bold uppercase text-gray-400 mr-2">Sort:</span>
    <select 
        onChange={(e) => handleSort(e.target.value)}
        className="bg-transparent text-sm font-medium outline-none cursor-pointer dark:text-white"
        defaultValue={sort || "newest"}
    >
        <option value="newest">Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
    </select>
    </div>
</div>
</>
)
}
