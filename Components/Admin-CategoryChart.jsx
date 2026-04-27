"use client"


import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { PieChart , Pie , Cell, ResponsiveContainer,Tooltip,Legend } from "recharts"


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];


export default function CategoryChart({data}){

// not crash if no data is passed
if (!data || data.length === 0) {
    return <p className="text-center text-slate-400">No data available</p>
  }

return(
    <>
<header className="flex items-center justify-between mb-8">

    <Link 
        href="/dashboard" 
        className="flex group-hover:px-2 items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl hover:scale-105 transition-all font-bold shadow-lg shadow-blue-500/20"
    >
        <HiOutlineArrowLeft className="hover:group" />
        My Dashbord
    </Link>
</header>


    <div className=" w-full bg-linear-to-br from-slate-200 to-slate-400/60 dark:from-slate-800 dark:to-slate-900 p-6 
    rounded-[2.5rem] border border-slate-100 dark:border-slate-800">

      <div className="h-110 w-full">
    <ResponsiveContainer width="100%" height={400}>

  <PieChart >
      <Pie 
        data={data} 
        dataKey="value" 
        nameKey="name" 
        cx="50%" 
        cy="50%"  
        innerRadius="70%" 
        outerRadius="80%" 
        cornerRadius={8} 
        paddingAngle={9} 
        key={data.length}
        fill="#8884d8" 
        label={(entry) => `${entry.name} (${entry.value})`}
        labelLine={true}    
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
        ))}
      </Pie>
      <Tooltip 
        contentStyle={{
          borderRadius: '15px', 
          border: 'none', 
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
        }} 
      />
    </PieChart>
    </ResponsiveContainer>
</div>
    </div>
    
    </>
)









}








