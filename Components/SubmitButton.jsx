"use client"

import { useFormStatus } from "react-dom"





export default function SubmitButton () {

const {pending} = useFormStatus()


    return (
        <button  type="submit" disabled={pending} 
className={`w-59 mx-auto flex text-center justify-center py-4 bg-blue-600 shadow-xl transition-all active:scale-95
      text-white font-black hover:text-slate-700 duration-300 hover:border-gray-900
      rounded-2xl hover:cursor-pointer
      hover:shadow-xl hover:shadow-blue-200 hover:bg-gray-300

     ${pending ? "opacity-70 cursor-not-allowed" : ""}
     `}        
        >
         {pending ? "SAVING..." : "SAVE ALL CHANGES "}

        </button>
    )
}