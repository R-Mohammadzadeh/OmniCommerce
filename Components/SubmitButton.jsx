"use client";

import { useFormStatus } from "react-dom";

/**
 * SubmitButton Component
 * Includes an animated SVG spinner that appears during the pending state.
 */
export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full max-w-xs mx-auto flex items-center justify-center gap-3 py-4 
        bg-blue-600 text-white font-black rounded-2xl shadow-xl 
        transition-all duration-300 active:scale-95 
        hover:bg-blue-700 hover:shadow-blue-200/50
        disabled:opacity-70 disabled:cursor-not-allowed
        cursor-pointer
      `}
    >
      {pending ? (
        <>
          {/* Animated SVG Spinner */}
          <svg 
            className="animate-spin h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Wird gespeichert...</span>
        </>
      ) : (
        "Änderungen speichern"
      )}
    </button>
  );
}