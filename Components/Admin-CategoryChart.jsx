"use client"

import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Sector } from "recharts";

// Farben für die Segmente
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function CategoryChart({ data }) {

  /**
   * Custom Shape Renderer (Moderne Lösung statt Cell)
   * Hier definieren wir das Aussehen jedes Segments individuell.
   */
  const renderCustomShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, index } = props;
    const fill = COLORS[index % COLORS.length];

    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={12} // Abgerundete Ecken für modernen Look
        stroke="none"
      />
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-center text-slate-400 font-medium">Keine Daten verfügbar</p>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between mb-8">
        <Link 
          href="/dashboard" 
          className="group flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl hover:scale-105 transition-all font-bold shadow-lg shadow-blue-500/20"
        >
          <HiOutlineArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Mein Dashboard
        </Link>
      </header>

      <div className="w-full bg-linear-to-br from-slate-200 to-slate-400/60 dark:from-slate-800 dark:to-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-inner">
        
        <div className="h-100 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={data} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%"  
                innerRadius="70%" 
                outerRadius="85%" 
                paddingAngle={8} 
                shape={renderCustomShape} // Hier wird die Custom Shape genutzt
                stroke="none"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              />

              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderRadius: '20px', 
                  border: 'none', 
                  color: '#fff',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)',
                  padding: '12px 20px'
                }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}