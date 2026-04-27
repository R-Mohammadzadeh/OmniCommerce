import { HiOutlineCube, HiOutlineCurrencyEuro, HiOutlineExclamationTriangle, HiOutlineTag } from "react-icons/hi2"

import { getDashboardStats } from "../actions/getDashboardStats"
import CategoryChart from "@/Components/Admin-CategoryChart"
import { auth } from "@/lib/auth";




export default async function AdminDashbord(){

const session = await auth(); 

if(!session || session.user.role !== 'admin'){
  return('/')
}




const stats = await getDashboardStats()

if(!stats) {
    return (
        <div className="p-8 mt-16">         
        <h1 className="text-3xl font-black text-slate-800 dark:text-white my-8">Dashboard Overview</h1>
        <p className="text-center text-slate-500 dark:text-slate-400">No stats available at the moment.</p>
        </div>
    )
}


const statsCard = [
  {
    title: 'Total Products',
    value: stats?.totalProducts || 0,
    icon: <HiOutlineCube size={24} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Inventory Value',
    value: `€${stats?.totalValue?.toLocaleString() || 0}`,
    icon: <HiOutlineCurrencyEuro size={24} />,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: 'Low Stock Items',
    value: stats?.lowStock || 0,
    icon: <HiOutlineExclamationTriangle size={24} />,
    color: 'text-amber-600', 
    bg: 'bg-amber-50'
  },
  {
    title: 'Categories',
    value: stats?.categories || 0,
    icon: <HiOutlineTag size={24} />,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
];




    return(
<>

<div className="p-8 mt-16">
<h1 className="text-3xl font-black text-slate-800 dark:text-white my-8">Dashboard Overview</h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{statsCard.map((card , index) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all" key={index}  >

<div className="flex items-center gap-4">
<div className={`${card.bg} ${card.color} p-4 rounded-2xl`}>
    {card.icon}
</div>

<div className="">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title} </p>
    <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1">{card.value}</h3>
</div>
</div>
    </div>
))}
</div>


<div className="m-10 grid gap-6 ">
    <h3 className="text-lg text-slate-300 text-center font-bold dark:text-white">Products by Category</h3>
   <div className=" py-14 ">
     <CategoryChart data={stats.chartData} />
   </div>
</div>

</div>
</>
    )
}