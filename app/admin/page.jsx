import { HiOutlineCube, HiOutlineCurrencyEuro, HiOutlineExclamationTriangle, HiOutlineTag } from "react-icons/hi2"
import { getDashboardStats } from "../actions/getDashboardStats"
import CategoryChart from "@/Components/Admin-CategoryChart"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users } from "lucide-react";

export default async function AdminDashboard() {

  // 1. Zugriffskontrolle: Nur für Administratoren
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  // 2. Statistiken abrufen
  const stats = await getDashboardStats()

  if (!stats) {
    return (
      <div className="p-8 mt-16 text-center">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white my-8">Dashboard-Übersicht</h1>
        <p className="text-slate-500 dark:text-slate-400">Derzeit sind keine Statistiken verfügbar.</p>
      </div>
    )
  }

  // 3. Konfiguration der Statistik-Karten (auf Deutsch)
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
      value: `€${stats?.totalValue?.toLocaleString() || 0}`,
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

      {/* Statistik-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCard.map((card, index) => (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all" key={index}>
            <div className="flex items-center gap-4">
              <div className={`${card.bg} ${card.color} p-4 rounded-2xl`}>
                {card.icon}
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.title}</p>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1">{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schnellzugriff-Bereich (z.B. Benutzerverwaltung) */}
      <div className="flex justify-center  gap-6 my-10 ">
        <Link 
          href='/admin/users' 
          className="group hover:rounded-3xl bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2rem flex items-center justify-between hover:bg-blue-600 transition-all duration-300"
        >
          <div className="flex items-center gap-4 ">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl group-hover:text-blue-600 transition-colors">
              <Users size={24} className="dark:text-white group-hover:text-blue-600" />
            </div>
            <span className="font-bold text-slate-700 dark:text-white group-hover:text-white transition-colors">
              Benutzer verwalten
            </span>
          </div>
          <div className="text-slate-400 group-hover:text-white font-black text-xl">→</div>
        </Link>
      </div>

      {/* Chart-Bereich */}
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl text-slate-800 dark:text-white font-black mb-10 text-center uppercase tracking-widest">
          Produkte nach Kategorie
        </h3>
        <div className="w-full">
          <CategoryChart data={stats.chartData} />
        </div>
      </div>
    </div>
  )
}