"use client";

import { useState } from "react";
import StarRating from "./StartRating"; // Achte auf den Dateinamen (Start vs Star)
import { toast } from "sonner";
import { addReviewAction } from "@/app/actions/addReviewAction";

/**
 * ProductReviews Komponente
 * Ermöglicht Benutzern das Verfassen von Rezensionen und zeigt bestehende Bewertungen an.
 * @param {Object} product - Das aktuelle Produkt-Objekt inklusive Rezensionen
 */
export default function ProductReviews({ product }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [pending, setPending] = useState(false);

  // Verarbeitet das Absenden einer neuen Rezension
  const handleSabmit  = async (e) => {
    e.preventDefault();

    // Validierung: Bewertung muss ausgewählt sein
    if (rating === 0) {
      return toast.error('Bitte wählen Sie eine Sterne-Bewertung aus.');
    }

    setPending(true);
    
    try {
      // Daten für die Server Action vorbereiten
      const reviewData = {
        user: 'Reza User', // Hier könnte später der echte Name aus der Session stehen
        rating,
        comment,
      };

      const result = await addReviewAction(product._id, reviewData);

      if (result.success) {
        toast.success(result.message || 'Vielen Dank für Ihre Bewertung!');
        // Formular zurücksetzen
        setComment('');
        setRating(0);
      } else {
        // Fallback, falls die Action zwar antwortet, aber ein Problem meldet
        toast.error(result.message || 'Fehler beim Speichern der Bewertung.');
      }
    } catch (err) {
      toast.error("Ein Netzwerkfehler ist aufgetreten.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl">
      <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
        Rezensionen
      </h3>

      {/* Formular zum Schreiben einer Rezension */}
      <form onSubmit={handleSabmit} className="mb-10 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
        <p className="mb-3 font-semibold text-slate-700 dark:text-slate-200">
          Schreiben Sie eine Rezension
        </p>
        
        <div className="mb-4">
          <StarRating 
            initialRating={rating} 
            readonly={false} 
            onRate={(val) => setRating(val)} 
          />
        </div>

        <textarea 
          className="w-full p-3 rounded-lg border border-slate-200 dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
          value={comment} 
          rows={3} 
          required
          onChange={(e) => setComment(e.target.value)}  
          placeholder="Teilen Sie Ihre Meinung zu diesem Produkt mit..." 
        />

        <button 
          className="mt-4 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-blue-500/20 cursor-pointer"
          disabled={pending}
        >
          {pending ? "Wird gesendet..." : "Bewertung abschicken"}
        </button>
      </form>

      {/* Liste der bestehenden Kommentare */}
      <div className="space-y-6">
        {product.reviews?.length > 0 ? (
          product.reviews.map((rev, index) => (
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 last:border-0" key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800 dark:text-white">
                  {rev.user}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(rev.createdAt).toLocaleDateString('de-DE')}
                </span>
              </div> 
              
              <StarRating initialRating={rev.rating} readonly={true} />   
              
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center py-4">
            Noch keine Rezensionen vorhanden. Schreiben Sie die erste!
          </p>
        )}
      </div>
    </div>
  );
}