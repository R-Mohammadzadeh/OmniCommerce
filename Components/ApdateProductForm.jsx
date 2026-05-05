"use client";

import { updateProductAction } from "@/app/actions/updateProductAction";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
* UpdateProductForm-Komponente * 
Rendert ein Formular zur Bearbeitung vorhandener Produktdetails mithilfe von Serveraktionen.
 */
export default function UpdateProductForm({ product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Verarbeitet Formularübermittlung über Serveraktion
  async function handleForm(formData) {
    setLoading(true);
    try {
      const result = await updateProductAction(formData);
      
      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        router.push("/admin/products");
        router.refresh();
      }
    } catch (err) {
      toast.error("Netzwerkfehler!"); // Netzwerkfehler
    } finally {
      setLoading(false);
    }
  }

  return (
    <form 
      action={handleForm} 
      className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm"
    >
      {/* Hidden inputs for ID and category safety */}
      <input type="hidden" name="id" defaultValue={product?._id?.toString() || ''} />
      <input type="hidden" name="category" defaultValue={product?.category || ''} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Produktname</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={product.name} 
            className="w-full mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all" 
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Preis (€)</label>
          <input 
            type="number" 
            name="price" 
            step="0.01"
            defaultValue={product.price} 
            className="w-full mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white" 
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Lagerbestand</label>
          <input 
            type="number" 
            name="stock" 
            defaultValue={product.stock} 
            className="w-full mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white" 
            required 
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Beschreibung</label>
          <textarea 
            name="description" 
            defaultValue={product.description} 
            rows="4" 
            className="w-full mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white" 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-500/20"
      >
        {loading ? 'Änderungen werden gespeichert...' : 'PRODUKTÄNDERUNGEN SPEICHERN'}
      </button>
    </form>
  );
}