"use client"

import { useEffect } from "react"


export default function Error({error , reset}){
    
useEffect(() => {
    console.error("Critical UI Error:", error)
},[error])


return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
<h2 className="text-2xl font-bold text-red-600">Etwas ist schiefgelaufen!</h2>
<p className="text-gray-600 mb-4">
    Wir entschuldigen uns für die Unannehmlichkeiten.
</p>
<button onClick={() => reset()} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" >
Versuchen Sie es erneut
</button>
    </div>
    
    
    </>
)
}