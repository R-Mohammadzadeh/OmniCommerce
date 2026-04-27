import Link from "next/link";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-black mb-8">Impressum</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold">Angaben gemäß § 5 TMG</h2>
          <p>
            Reza Store<br />
            Zum Mühlenfeld 9<br />
            50127 Bergheim
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold">Kontakt</h2>
          <p>
            Telefon: 017647116508<br />
            E-Mail: reza203393@yahoo.de
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold">Redaktionell verantwortlich</h2>
          <p>R.M SHAMS</p>
        </section>

        <section className="text-sm text-gray-500 mt-12 border-t pt-8">
          <p>
            Quelle:<Link href="https://www.e-recht24.de" target="_blank" rel="noreferrer">e-recht24.de</Link>
          </p>
        </section>
      </div>
    </main>
  );
}