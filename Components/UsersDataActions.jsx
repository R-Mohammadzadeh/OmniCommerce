'use client'

import { toggleUserRole, deleteUser } from "@/app/actions/usersActions"
import { RefreshCw, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

/**
 * UsersDataActions Component
 * Provides administrative actions like toggling roles or deleting a user.
 */
export default function UsersDataActions({ userId, userRole }) {
  const [isPending, setIsPending] = useState(false);

  // Switches the user role between 'user' and 'admin'
  const handleToggle = async () => {
    if (confirm("Möchten Sie die Rolle dieses Benutzers wirklich ändern?")) {
      setIsPending(true);
      try {
        await toggleUserRole(userId, userRole);
        toast.success("Benutzerrolle erfolgreich aktualisiert.");
      } catch (error) {
        toast.error("Fehler beim Ändern der Rolle.");
      } finally {
        setIsPending(false);
      }
    }
  }

  // Permanently deletes a user from the database
  const handleDelete = async () => {
    if (confirm("Möchten Sie diesen Benutzer wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden!")) {
      setIsPending(true);
      try {
        await deleteUser(userId);
        toast.success("Benutzer wurde erfolgreich gelöscht.");
      } catch (error) {
        toast.error("Benutzer konnte nicht gelöscht werden.");
      } finally {
        setIsPending(false);
      }
    }
  }

  return (
    <div className="flex items-center gap-2 p-1">
      {/* Toggle Role Button */}
      <button 
        onClick={handleToggle} 
        disabled={isPending}
        title="Rolle ändern"
        className="p-2 hover:bg-amber-100 text-amber-600 rounded-lg transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw size={18} className={`${isPending ? 'animate-spin' : ''}`} />
      </button>

      {/* Delete User Button */}
      <button 
        onClick={handleDelete} 
        disabled={isPending}
        title="Benutzer löschen"
        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}