"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

/**
 * CategoryToolbar Component
 * Allows users to filter products by brand and sort them via URL query parameters.
 */
export default function CategoryToolbar({ slug, brand, sort, allBrands }) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Helper function to update or create a new query string
  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }

  // Updates the sort parameter in the URL and replaces the current history entry
  const handleSort = (value) => {
    router.replace(`${pathname}?${createQueryString("sort", value)}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 mb-10 bg-white dark:bg-slate-900 p-5 rounded-2rem shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">

      {/* Brands Selection: Horizontal scrollable area for brand filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mr-2">
          Marken:
        </span>

        <Link
          href={pathname}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${
            !brand 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Alle
        </Link>

        {allBrands.map((b) => (
          <Link
            key={b}
            href={`${pathname}?${createQueryString("brand", encodeURIComponent(b.toLowerCase()))}`}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
              brand === b.toLowerCase()
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {b}
          </Link>
        ))}
      </div>

      {/* Sort Selection: Dropdown for ordering products */}
      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-transparent focus-within:border-blue-500 transition-all">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
          Sortierung:
        </span>

        <select
          value={sort || "newest"}
          onChange={(e) => handleSort(e.target.value)}
          className="bg-transparent text-sm font-bold outline-none cursor-pointer dark:text-white appearance-none"
        >
          <option value="newest">Neueste</option>
          <option value="price_asc">Preis: Aufsteigend</option>
          <option value="price_desc">Preis: Absteigend</option>
        </select>
      </div>

    </div>
  )
}