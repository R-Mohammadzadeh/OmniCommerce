"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { updateProfileAction } from "./action";
import SubmitButton from "@/Components/SubmitButton";


export default function ProfileForm({ user }) {

  const formRef = useRef(null);
  const router = useRouter();

  async function handleAction(formData) {
    const res = await updateProfileAction(formData);

    if (res?.success) {
      formRef.current?.reset();   
      router.refresh();          
    }
  }

  return (
   <section className="min-h-screen px-5">
    <div className="bg-gray-200 mt-35 mx-auto max-w-3xl
    dark:bg-slate-900 p-6 rounded-2xl shadow-xl">

     <form
      ref={formRef}
      action={handleAction}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >

      {/* Name */}
      <div >
        <label className="text-xs font-bold text-slate-400 ml-2">FULL NAME</label>
        <input
          type="text"
          name="name"
          defaultValue={user?.name}
          className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
        />
      </div>
{/* familyName */}
       <div>
        <label className="text-xs font-bold text-slate-400 ml-2 uppercase">familyName</label>
        <input
          type="text"
          name="familyName"
          defaultValue={user?.familyName}
          className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
        />
      </div>

      {/* Phone */}
      <div >
        <label className="text-xs font-bold text-slate-400 ml-2">PHONE NUMBER</label>
        <input
          type="text"
          name="phone"
          defaultValue={user?.phone}
          placeholder="+49..."
          className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
        />
      </div>

    {/* email */}
  <div >
        <label className="text-xs font-bold text-slate-400 ml-2 uppercase">email</label>
        <input
          type="text"
          name="email"
          defaultValue={user?.email}
          placeholder="+49..."
          className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
        />
      </div>
      {/* Strasse */}
      <div>
        <label className="text-xs font-bold text-slate-400 ml-2">STRASSE</label>
        <input
          type="text"
          name="strasse"
          defaultValue={user?.address?.strasse}
          className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
        />
      </div>

      {/* Hausnummer */}
      <div>
        <label className="text-xs font-bold text-slate-400 ml-2">HAUSNUMMER</label>
        <input
          type="text"
          name="Hausnummer"
          defaultValue={user?.address?.Hausnummer}
          className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
        />
      </div>

      {/* Stadt */}
      <div>
        <label className="text-xs font-bold text-slate-400 ml-2">STADT</label>
        <input
          type="text"
          name="stadt"
          defaultValue={user?.address?.stadt}
          className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
        />
      </div>

      {/* PLZ */}
      <div>
        <label className="text-xs font-bold text-slate-400 ml-2">PLZ</label>
        <input
          type="text"
          name="PLZ"
          defaultValue={user?.address?.PLZ}
          className="w-full p-4 mt-1 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500 dark:text-white"
        />
      </div>

      <div className="md:col-span-2 py-5 ">
        <SubmitButton />
      </div>

    </form>
   </div>
   </section>
  );
}