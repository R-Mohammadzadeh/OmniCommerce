"use client"

import { useEffect } from "react";

export default function Error({ error, reset }) {
  // Den Fehler an einen Fehlerberichtsdienst melden
  useEffect(() => {
    console.error("Critical UI Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600">
        Etwas ist schiefgelaufen!
      </h2>
      <p className="mb-4 text-gray-600">
        Wir entschuldigen uns für die Unannehmlichkeiten.
      </p>
      <button
        type="button"
        onClick={reset} // Sicherstellen, dass die Reset-Funktion korrekt aufgerufen wird
        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        Versuchen Sie es erneut
      </button>
    </div>
  );
}
