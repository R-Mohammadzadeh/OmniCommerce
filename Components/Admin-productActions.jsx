"use client"

import { deleteProduct } from "@/app/actions/deleteProductAction"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2"
import { toast } from "sonner"
import { useState } from "react"

/** * Produktaktionen-Komponente * Verarbeitet Bearbeitungs
 * - und Löschvorgänge für ein einzelnes Produkt. */
export default function ProductActions({ productId, productName }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  //  Funktion zur Bearbeitung der Produktlöschung mit einer Bestätigungs-Toast-Nachricht
  const handleDelete = () => {
    toast("Sind Sie sicher?", {
      description: `Produkt: ${productName}`,
      action: {
        label: "Löschen",
        onClick: async () => {
          try {
            setLoading(true)

            // Führen Sie die Serveraktion zum Löschen des Produkts aus.
            const result = await deleteProduct(productId)

            if (!result?.success) throw new Error()

            toast.success("Erfolgreich gelöscht")
            router.refresh()

          } catch {
            toast.error("Fehler beim Löschen des Produkts")
          } finally {
            setLoading(false)
          }
        },
      },
    })
  }

  return (
    <div className="flex justify-end items-center gap-3">
      
      {/* Link „Bearbeiten“: Führt zur Produktbearbeitungsseite */}
      <Link
        href={`/admin/products/edit/${productId}`}
        className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all border border-transparent hover:border-blue-100 active:scale-95 shadow-sm hover:shadow-md"
        title="Bearbeiten"
      >
        <HiOutlinePencilSquare size={20} />
      </Link>

      {/* Schaltfläche „Löschen“: Löst den Bestätigungsvorgang aus. */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all border border-transparent hover:border-red-100 active:scale-95 disabled:opacity-50 shadow-sm hover:shadow-md cursor-pointer"
        title="Löschen"
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full block" />
        ) : (
          <HiOutlineTrash size={20} />
        )}
      </button>

    </div>
  )
}