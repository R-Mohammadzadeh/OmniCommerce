"use client" ;


import { toast } from "sonner";
import { LogoutAction } from "@/lib/authActions";

export default function LogoutButton () {
  
return (
    <div className="px-6 py-3 
    rounded-2xl font-bold ">
        <button onClick={async () => {
            await LogoutAction() ;
            toast.success('Logged out successfully')
        }} className="px-6 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:cursor-pointer      hover:text-white rounded-2xl font-bold transition-all active:scale-95 border border-red-200  ">
    Logout
        </button>
    </div>
)
  
}