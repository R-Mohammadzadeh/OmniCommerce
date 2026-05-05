import { HiOutlineCube, HiOutlineCurrencyEuro, HiOutlineExclamationTriangle, HiOutlineTag } from "react-icons/hi2"
import { getDashboardStats } from "../actions/getDashboardStats"
import CategoryChart from "@/Components/Admin-CategoryChart"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users } from "lucide-react";

/**
 * Die Hauptseite des Admin-Dashboards.
 * Diese Seite ist serverseitig gerendert (Server Component) und schützt den Zugriff
 * durch eine Rollenprüfung.
 */
export default async function AdminDashboard() {

  // 1. Zugriffskontrolle: Prüfen, ob eine Session existiert und der User Admin-Rechte hat
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    // Falls nicht, sofortiger Redirect auf die Startseite
    redirect('/')
  }

  // 2. Statistiken abrufen: Holt Daten für Produkte, Lagerwert und Diagramme
  const stats = await getDashboardStats()

  // Fallback: Falls keine Daten geladen werden konnten (z.B. DB-Fehler oder leere DB)
  if (!stats) {
    return (
      <div className="p-8 mt-16 text-center">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white my-8">Dashboard-Übersicht</h1>
        <p className="text-slate-500 dark:text-slate-400">Derzeit sind keine Statistiken verfügbar.</p>
      </div>
    )
  }

  // 3. Konfiguration der Statistik-Karten:
  // Definiert Look & Feel sowie die anzuzeigenden Werte für die Top-Karten.
  const statsCard = [
    {
      title: 'Gesamtprodukte',
      value: stats?.totalProducts || 0,
      icon: <HiOutlineCube size={22} />,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Lagerwert',
      // Formatierung des Preises für deutsche Darstellung
      value: `€${stats?.totalValue?.toLocaleString('de-DE') || 0}`,
      icon: <HiOutlineCurrencyEuro size={22} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: 'Niedriger Lagerbestand',
      value: stats?.lowStock || 0,
      icon: <HiOutlineExclamationTriangle size={22} />,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      title: 'Kategorien',
      value: stats?.categories || 0,
      icon: <HiOutlineTag size={22} />,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
  ];

  return (
    <div className="p-10 mt-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-black text-slate-800 dark:text-white my-8 tracking-tighter uppercase">
        Dashboard-Übersicht
      </h1>

      {/* Statistik-Grid: Passt sich von 1 auf bis zu 4 Spalten an */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsCard.map((card, index) => (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md  transition-all justify-between min-w-0" key={index}>
            <div className="flex items-center gap-4 min-w-0">
              <div className={`${card.bg} ${card.color} p-4 rounded-2xl`}>
                {card.icon}
              </div>
              <div className="flex flex-col min-w-0 justify-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{card.title}</p>
                <h3 className="text-xl font-black text-slate-800 dark:text-white mt-2 -mx-3">{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schnellzugriff-Bereich: Direkte Links zu anderen Admin-Funktionen */}
      <div className="flex justify-center gap-6 my-10 ">
        <Link 
          href='/admin/users' 
          className="group w-full md:w-auto hover:rounded-3xl bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2rem flex items-center justify-between hover:bg-blue-600 transition-all duration-300"
        >
          <div className="flex items-center gap-4 ">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl group-hover:text-blue-600 transition-colors">
              <Users size={24} className="dark:text-white group-hover:text-blue-600" />
            </div>
            <span className="font-bold text-slate-700 dark:text-white group-hover:text-white transition-colors">
              Benutzer verwalten
            </span>
          </div>
          <div className="text-slate-400 group-hover:text-white font-black text-xl ml-4">→</div>
        </Link>
      </div>

      {/* Chart-Bereich: Grafische Auswertung der Produkt-Kategorien */}
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl text-slate-800 dark:text-white font-black mb-10 text-center uppercase tracking-widest">
          Produkte nach Kategorie
        </h3>
        <div className="w-full">
          {/* Das Chart-Objekt wird als Prop an eine Client Component übergeben */}
          <CategoryChart data={stats.chartData} />
        </div>
      </div>
    </div>
  )
}