export const dynamic = "force-static";
import Link from "next/link";

/**
 * Metadata for the Legal Notice (Impressum) page.
 * 'noindex' prevents this legal page from appearing in search results.
 */
export const metadata = {
  title: "Impressum | Reza Store",
  robots: 'noindex',
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-black mb-8">Impressum</h1>
        
        {/* Section: Legal provider identification according to German TMG */}
        <section className="mb-8">
          <h2 className="text-xl font-bold">Angaben gemäß § 5 TMG</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Reza Store<br />
            Zum Mühlenfeld 9<br />
            50127 Bergheim
          </p>
        </section>

        {/* Section: Direct contact details */}
        <section className="mb-8">
          <h2 className="text-xl font-bold">Kontakt</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Telefon: <a href="tel:+4917647116508" className="hover:text-blue-600 transition-colors">0176 47116508</a><br />
            E-Mail: <a href="mailto:reza203393@yahoo.de" className="hover:text-blue-600 transition-colors">reza203393@yahoo.de</a>
          </p>
        </section>

        {/* Section: Editorial responsibility */}
        <section className="mb-8">
          <h2 className="text-xl font-bold">Redaktionell verantwortlich</h2>
          <p className="text-gray-600 dark:text-gray-400">R.M SHAMS</p>
        </section>

        <footer className="text-sm text-gray-500 mt-12 border-t pt-8 dark:border-slate-800">
          <p>Quelle: <Link href="https://www.e-recht24.de" target="_blank" className="underline hover:text-blue-600">e-recht24.de</Link></p>
        </footer>
      </div>
    </main>
  );
}