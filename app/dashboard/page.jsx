import LogoutButton from "@/Components/LogoutButton"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Calendar, ShieldCheck, Activity } from "lucide-react"

/**
 * DashboardPage Komponente
 * Zeigt Benutzerprofil-Informationen, Aktivitätsstatistiken und bedingte Admin-Tools an.
 * Geschützt durch eine serverseitige Sitzungsprüfung.
 */
export default async function DashboardPage() {
  // 1. Sitzungs- und Authentifizierungsprüfung
  const session = await auth()
  const user = session?.user

  // Umleitung zum Login, falls keine aktive Sitzung gefunden wurde
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 mt-32 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* Header: Benutzerprofil-Bereich */}
        <header className="flex flex-wrap justify-between p-6 rounded-3xl shadow-sm mb-8 border border-slate-100 dark:border-slate-800 items-center bg-white dark:bg-slate-900 gap-4">
          <div>
            <h1 className="capitalize text-2xl font-black text-slate-900 dark:text-white mb-2">
              Willkommen zurück, <span className="text-blue-600">{user?.name || 'Benutzer'}</span>!
            </h1>
            <div className="space-y-1">
              <p className="text-slate-500 text-sm">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                  Letzter Login
                </span>
                {/* Formatierte Anzeige des letzten Login-Zeitstempels */}
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString('de-DE', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })
                    : 'Neues Mitglied'}
                </p>
              </div>
            </div>
          </div>
          <LogoutButton />
        </header>

        <main>
          {/* Bereich für Statistik-Karten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Karte: Kontostatus */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Status</h3>
                <Activity size={16} className="text-green-500" />
              </div>
              <p className="text-2xl text-center font-black text-green-500">Aktiv</p>
            </div>

            {/* Karte: Benutzerrolle (Bedingtes Styling) */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Rolle</h3>
                <ShieldCheck size={16} className={user.role === 'admin' ? 'text-red-500' : 'text-blue-600'} />
              </div>
              <p className={`text-2xl text-center font-black capitalize ${user.role === 'admin' ? 'text-red-500' : 'text-blue-600'}`}>
                {user.role === 'admin' ? 'Administrator' : 'Mitglied'}
              </p>
            </div>

            {/* Karte: Registrierungsdatum */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Mitglied seit</h3>
                <Calendar size={16} className="text-purple-500" />
              </div>
              <p className="text-2xl font-black text-center text-purple-500">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('de-DE')
                  : 'Unbekannt'}
              </p>
            </div>
          </div>

          {/* Bedingter Bereich: Admin-Werkzeuge (Nur für Admins sichtbar) */}
          {user.role === 'admin' && (
            <section className="mt-12 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Admin Panel
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href='/admin/add-product'
                  className="shadow-lg shadow-blue-500/20 opacity-90 group p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-blue-500 transition-all"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 text-lg">Produkt hinzufügen</h3>
                  <p className="text-sm text-slate-500 mt-1">Einen neuen Artikel im Store listen</p>
                </Link>

                <Link
                  href='/admin/products'
                  className="shadow-lg shadow-blue-500/20 opacity-90 group p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-blue-500 transition-all"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 text-lg">Inventar</h3>
                  <p className="text-sm text-slate-500 mt-1">Preise bearbeiten oder Produkte löschen</p>
                </Link>

                <Link
                  href='/admin'
                  className="block dark:bg-slate-800/50 p-6 bg-slate-50 hover:bg-blue-400 transition-all rounded-2xl shadow-lg shadow-blue-500/20 opacity-90"
                >
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Analyse</h3>
                  <p className="text-cyan-300 text-sm mt-1">Statistiken folgen in Kürze...</p>
                </Link>
              </div>
            </section>
          )}

          {/* Bedingter Bereich: Benutzerbestellungen (Nur für Nicht-Admins) */}
          {user.role !== 'admin' && (
            <div className="mt-12 p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-center bg-white/50 dark:bg-slate-900/50">
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
                  <ShieldCheck size={40} />
                </div>
              </div>
              <p className="text-slate-500 font-medium">Sie haben noch keine Bestellungen. Fangen Sie jetzt an!</p>
              <Link
                className="inline-block mt-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                href='/'
              >
                Produkte durchsuchen
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}