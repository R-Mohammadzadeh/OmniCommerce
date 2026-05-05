export const dynamic = "force-static";

/**
 * Metadata for the Privacy Policy page.
 * robots: index: false ensures this legal page doesn't clutter search results unnecessarily,
 * while follow: true allows crawlers to follow links within it.
 */
export const metadata = {
  title: "Datenschutzerklärung - My Shop",
  description: "Hier finden Sie unsere Datenschutzerklärung, die erklärt, wie wir Ihre Daten schützen und verwenden.",
  robots: { index: false, follow: true }
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-black mb-8">Datenschutzerklärung</h1>

        {/* Section 1: Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-lg font-semibold mt-4">Allgemeine Hinweise</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        {/* Section 2: Data Collection & Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold">2. Datenerfassung auf dieser Website</h2>
          <h3 className="text-lg font-semibold mt-4">Cookies</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicher zu machen.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Wir verwenden notwendige Cookies (z. B. für den Warenkorb-Status via Zustand) und Analyse-Cookies zur Verbesserung unseres Services.
          </p>
        </section>

        {/* Section 3: Hosting & Infrastructure */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold">3. Hosting</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Wir hosten unsere Website bei <strong>Vercel</strong>. Anbieter ist die Vercel Inc., 440 N Barranca Ave #4133 Covina, CA 91723, USA. 
            Ihre Daten werden in der <strong>MongoDB Atlas</strong> Cloud gespeichert. Die Datenübertragung erfolgt stets verschlüsselt via SSL/TLS.
          </p>
        </section>

        {/* Section 4: Payment Providers (Crucial for your Stripe integration) */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold">4. Zahlungsanbieter</h2>
          <h3 className="text-lg font-semibold mt-4">Stripe</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Wir bieten die Zahlung über <strong>Stripe</strong> an. Anbieter für Kunden innerhalb der EU ist Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Wenn Sie die Zahlung via Stripe wählen, werden Ihre Zahlungsdaten an Stripe übermittelt. Dies geschieht auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
          </p>
        </section>

        {/* Section 5: User Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold">5. Ihre Rechte</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sie haben jederzeit das Recht auf:
          </p>
          <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400">
            <li>Auskunft über Ihre gespeicherten Daten</li>
            <li>Berichtigung oder Löschung Ihrer Daten</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
          </ul>
        </section>
      </div>
    </main>
  );
}