"use client";

import { useActionState, useEffect, useRef } from "react";
import { addProductAction } from "./action";
import Link from "next/link";
import { de } from '@/dictionaries/de';

/**
 * AddProductPage: A Client Component for the administrator to add new products.
 * Uses useActionState for form handling and useRef to manage form resets.
 */
export default function AddProductPage() {
  // Accessing the dictionary for German translations
  const dict = de.admin.addProduct;

  // useActionState handles the server action, returning current state and pending status
  const [state, formAction, isPending] = useActionState(addProductAction, null);
  
  // Reference to the form element for direct DOM manipulation (e.g., resetting)
  const formRef = useRef(null);

  /**
   * Effect: Resets the form fields specifically when a product 
   * is successfully added (state.error === false).
   */
  useEffect(() => {
    if (state?.error === false) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-32 dark:bg-blue-950/20 dark:border-slate-800 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl dark:bg-blue-950 dark:text-white shadow-xl overflow-hidden">

        {/* Header Section */}
        <div className="bg-slate-800 p-6">
          <h1 className="text-2xl font-bold text-white text-center">{dict.title}</h1>
          <p className="text-slate-300 text-center text-sm mt-1">{dict.subtitle}</p>
        </div>

        <form action={formAction} className="p-8 space-y-6" ref={formRef}>

          {/* Feedback Message Section (Success or Error) */}
          {state?.message && (
            <div className={`p-4 rounded-lg text-sm font-medium ${state.error
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
              {state.message}
            </div>
          )}

          {/* Main Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-white dark:bg-blue-950/20 p-4 rounded-lg border border-gray-200">

            {/* Product Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-white">{dict.form.name}</label>
              <input
                name="name"
                type="text"
                placeholder={dict.form.namePlaceholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-slate-900"
                required
              />
            </div>

            {/* Category Select - Uses lowercase values to match backend requirements */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-white">{dict.form.category}</label>
              <select name="category" required
                className="w-full py-2 px-4 border dark:bg-slate-900 dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">{dict.form.selectCategory}</option>
                <option value="laptop">{dict.categories.laptop}</option>
                <option value="camera">{dict.categories.camera}</option>
                <option value="mobile">{dict.categories.mobile}</option>
                <option value="tablet">{dict.categories.tablet}</option>
                <option value="playstation">{dict.categories.playstation}</option>
              </select>
            </div>

            {/* Brand Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm dark:text-white font-semibold text-gray-700">{dict.form.brand}</label>
              <input
                name="brand"
                placeholder={dict.form.brandPlaceholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900"
                required
              />
            </div>

            {/* Price Input - Supports decimals for currency */}
            <div className="flex flex-col gap-2">
              <label className="text-sm dark:text-white font-semibold text-gray-700">{dict.form.price}</label>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900"
                required
              />
            </div>

            {/* Stock / Quantity Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm dark:text-white font-semibold text-gray-700">{dict.form.stock}</label>
              <input
                name="stock"
                type="number"
                min="0"
                placeholder="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900"
                required
              />
            </div>
            
            {/* Image File Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm dark:text-white font-semibold text-gray-700">{dict.form.image}</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="w-full px-4 py-1.5 border border-gray-300 rounded-lg outline-none dark:bg-slate-900"
                required
              />
            </div>
          </div>

          {/* Product Description Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-sm dark:text-white font-semibold text-gray-700">{dict.form.description}</label>
            <textarea
              name="description"
              rows="4"
              placeholder={dict.form.descriptionPlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900"
              required
            ></textarea>
          </div>

          {/* Form Actions (Submit & Cancel) */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {isPending ? dict.form.buttonLoading : dict.form.buttonSubmit}
            </button>
            <Link
              href="/admin"
              className="px-8 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-center flex items-center dark:text-white dark:hover:bg-slate-700"
            >
              {dict.form.cancel}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}