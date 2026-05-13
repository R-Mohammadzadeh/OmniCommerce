"use client"
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlinePassword } from "react-icons/md";
import { FaBarcode } from "react-icons/fa6";

const demoCredentials = [
  {
    label: "Email",
    value: "demo-admin@test.com",
    icon: GrUserAdmin,
    valueClass:
      "text-gray-900 dark:text-gray-100 font-semibold",
  },
  {
    label: "Password",
    value: "12345678@",
    icon: MdOutlinePassword,
    valueClass:
      "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-lg font-bold tracking-wider",
  },
  {
    label: "OTP",
    value: "11111",
    icon: FaBarcode,
    valueClass:
      "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg font-bold tracking-[3px]",
  },
];

 export default function DemoInfo(){


    return (
        <>
    <div className="pt-5 mt-8 border-t border-gray-200 dark:border-gray-700">
  <div className="flex flex-col gap-3 text-sm font-mono">

    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
      Demo Admin Access
    </h3>

    {demoCredentials.map(
      ({
        label,
        value,
        icon: Icon,
        valueClass,
      }) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/50 px-4 py-3"
        >
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Icon className="text-indigo-500 text-lg" />
            <span>{label}</span>
          </div>

          <span className={valueClass}>
            {value}
          </span>
        </div>
      )
    )}
  </div>
</div>
        </>
    )
 }
