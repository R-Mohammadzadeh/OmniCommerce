"use client";
import { useActionState, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import { registerAction } from "./action";
import { useRouter } from "next/navigation";
import { form } from "framer-motion/client";


const initialState = { error: false, message: "" , role :"" };

export default function Register() {

  

  // Using useFormState to handle Server Action response
  const [state, formAction , isPending] = useActionState(registerAction, initialState);

  const router = useRouter()
  const formRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Fokus auf den ersten Eingang beim Einrichten
      inputRef.current?.focus();
  }, []); 

  // Nebenwirkungen basierend auf der Aktionsantwort behandeln
 useEffect(() => {
  // Nur ausführen, wenn eine Nachricht vorhanden ist
  if(!state?.message) return

if(state.error){
toast.error(state.message)
}else{
  toast.success(state.message)
}

formRef.current?.reset() ;

// Den Benutzer nach 2 Sekunden weiterleiten
setTimeout(() => {
  if(state.role === 'admin' || 'user'){
  router.push('/login')
}else{
  router.push('/')
}
},2000)
return () => clearTimeout() // Aufräumen des Timers bei Komponentenunmount
 } , [state.message,state.error,state.role,router])
  


  return (
    <div 
    className="max-w-md mx-auto my-32 p-6 bg-white rounded shadow ">
      
      <Toaster duration={3000} position="top-right" richColors />
      <h1 className="text-2xl font-bold mb-6 text-center">Register Page</h1>

      <form action={formAction} ref={formRef}>
        <input 
          type="email" 
          name="email" 
          placeholder=" Inter your email"
          ref={inputRef} 
          required 
          className="w-full p-2 border rounded  "
          disabled={isPending} // Disable input while pending
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password (8-20 characters)" 
          required 
          className="w-full p-2 border rounded my-4 "
          disabled={isPending} 
        />
        <input 
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
         className="w-full p-2 border rounded my-4"
        />
         <input 
        type="text"
        name="vorname"
        placeholder="First Name"
        required
         className="w-full p-2 border rounded my-4"
        />
         <input 
        type="text"
        name="nachname"
        placeholder="Last Name"
        required
         className="w-full p-2 border rounded my-4"
        />
         <input 
        type="tel"
        name="phone"
        placeholder="Phone Number (e.g. 49176...)"
        required
         className="w-full p-2 border rounded my-4"
        />
        <button type="submit" disabled={isPending}
className=
{`w-full p-2 rounded transition-all duration-300  bg-blue-500 hover:bg-blue-600 
 cursor-pointer
  disabled:bg-gray-400 disabled:cursor-not-allowed disabled:
 text-white ${isPending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`} >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

