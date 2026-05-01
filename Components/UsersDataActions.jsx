'use client'

import {toggleUserRole , deleteUser} from "@/app/actions/usersActions"
import { RefreshCw, Trash2 } from "lucide-react"

export default function UsersDataActions({userId , userRole}){


const handleToggle = async () => {
if(confirm("Möchten Sie die Rolle dieses Benutzers wirklich ändern?")){
    await toggleUserRole(userId , userRole)
}}
    

const handleDelete = async () => {
    if (confirm("Möchten Sie diesen Benutzer wirklich löschen?")) {
    await deleteUser(userId);
}
}



return (
    <>
    <div className="flex items-center gap-2 border-red-100 p-2">
{/* Button: Rolle ändern */}
<button onClick={handleToggle} title="Rolle ändern"
className="p-2 hover:bg-amber-100 text-amber-600 rounded-lg transition-colors"
>
<RefreshCw size={18} />
</button>



{/* Button: Löschen */}
<button onClick={handleDelete} title="Löschen"
className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
>
    <Trash2 size={18} />
</button>
    </div>
    </>
)
}

















