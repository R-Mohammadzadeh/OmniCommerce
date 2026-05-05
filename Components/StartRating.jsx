"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

/**
 * StarRating Komponente
 * Zeigt eine interaktive oder schreibgeschützte Sterne-Bewertung an.
 * Unterstützt Halbe-Sterne (Dezimalwerte) im Read-only-Modus.
 */
const StarRating = ({ initialRating = 0, totalStars = 5, onRate, readonly = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  // Synchronisiert den lokalen Status, wenn sich initialRating von außen ändert
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <div className="flex items-center gap-1.5">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const activeRating = hover || rating || initialRating;

        // Berechnung der Füllung für Dezimalwerte (z.B. 4.5 Sterne)
        const fillPercent = readonly
          ? Math.min(Math.max((activeRating - index) * 100, 0), 100)
          : starValue <= activeRating ? 100 : 0;

        return (
          <button
            key={index}
            type="button"
            className={`relative transition-all ${
              readonly 
                ? 'cursor-default' 
                : 'cursor-pointer hover:scale-125 active:scale-95'
            }`}
            disabled={readonly}
            onClick={() => {
              if (!readonly) {
                setRating(starValue);
                if (onRate) onRate(starValue);
              }
            }}
            onMouseEnter={() => !readonly && setHover(starValue)}
            onMouseLeave={() => !readonly && setHover(0)}
          >
            {/* Hintergrund-Stern (Grau) */}
            <Star 
              size={18} 
              className="text-slate-200 dark:text-slate-700 transition-colors" 
            />

            {/* Vordergrund-Stern (Gelb) - mit Clip für Dezimalwerte */}
            <span
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${fillPercent}%` }}
            >
              <Star 
                size={18} 
                className="fill-yellow-400 text-yellow-400" 
              />
            </span>
          </button>
        );
      })}

      {/* Anzeige der numerischen Bewertung (nur wenn > 0) */}
      {initialRating > 0 && (
        <span className="ml-2 text-sm font-bold text-slate-600 dark:text-slate-400">
          {Number(initialRating).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;