"use client";

import { updateProfileAction } from "@/app/profile/action";
import { useState } from "react";
import { toast } from "sonner";


export default function EditProfileForm ({user}) {

const [loading , setLoading] = useState(false)


async function handleForm(formData){
setLoading(true);
    try {
        
        const result = await updateProfileAction(formData);
        
        if (result.error) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
        }
    } catch (err) {
        toast.error("Network error!");
        
    } finally {
        setLoading(false);
    }
}




return(
<form
className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"

action={handleForm}  >

<h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">
Edite Profile</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div>
<label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
    <input type="text" name="name" defaultValue={user.name}
 className="w-full mt-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none 
 focus:ring-2 focus:ring-blue-500 dark:text-white transition-all
 "   
    />
</div>

<div>
<label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
    <input type="text" name="email" defaultValue={user.email}
 className="w-full mt-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none 
 focus:ring-2 focus:ring-blue-500 dark:text-white transition-all
 "   
    />
</div>
</div>

<button type="submit" className="mt-8 w-full md:w-max px-12 py-3 bg-blue-400 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all disabled:opacity-50 active:scale-95 shadowlg shadow-blue-500/20 "
disabled={loading}  >
{loading ? 'Saving...' : 'Update Profile'}
</button>

</form>
)    

}