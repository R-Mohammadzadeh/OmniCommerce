"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LogoutAction } from "@/lib/authActions";
import { useRouter } from "next/navigation";

/**
 * LogoutButton Komponente
 * Ermöglicht es dem Benutzer, sich abzumelden, führt eine Server Action aus
 * und leitet anschließend zur Login-Seite weiter.
 */
export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Verarbeitet den Abmeldevorgang im Frontend
  const handleLogout = async () => {
    try {
      setLoading(true);

      // 1. Aufruf der Server Action
      const result = await LogoutAction();

      // 2. Fehlerprüfung (falls die Action ein Fehlerobjekt zurückgibt)
      if (result?.error) {
        toast.error("Abmeldung fehlgeschlagen");
        return;
      }

      // 3. Erfolgmeldung anzeigen
      toast.success("Erfolgreich abgemeldet");

      // 4. Client-seitige Navigation und Cache-Aktualisierung
      router.push("/login");
      router.refresh();

    } catch (error) {
      // Catch-Block für unerwartete Fehler (z.B. Verbindungsabbrüche)
      toast.error("Netzwerkfehler aufgetreten");
    } finally {
      // Ladezustand beenden, egal ob Erfolg oder Fehler
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-6 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl font-bold transition-all active:scale-95 border border-red-100 dark:border-red-900/30 disabled:opacity-50 cursor-pointer shadow-sm"
    >
      {loading ? "Wird abgemeldet..." : "Abmelden"}
    </button>
  );
}