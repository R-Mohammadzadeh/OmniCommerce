export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-black mb-8">Datenschutzerklärung</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-bold">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-lg font-semibold mt-4">Allgemeine Hinweise</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold">2. Datenerfassung auf dieser Website</h2>
          <h3 className="text-lg font-semibold mt-4">Cookies</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Wie Sie bereits in unserem Cookie-Banner gesehen haben, verwenden wir Cookies für grundlegende Funktionen des Shops und zur Analyse des Datenverkehrs.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold">3. Hosting</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter: <strong>MongoDB Atlas / Vercel</strong>. Die Übertragung der Daten erfolgt verschlüsselt (SSL/TLS).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold">4. Ihre Rechte</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
          </p>
        </section>
      </div>
    </main>
  );
}