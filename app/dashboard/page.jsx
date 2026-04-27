import LogoutButton from "@/Components/LogoutButton"
import { auth} from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"


export default async function DashboardPage () {

// Get current session and user data 
const session = await auth()
const user = session?.user


// Redirect if user is not found
if(!user) {
   redirect('/login')
}

return (
<div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 mt-32">
<div className="max-w-4xl mx-auto">
<header 
className="flex justify-between p-6 rounded-3xl shadow-sm mb-8 border border-slate-100 dark:border-slate-800 
items-center bg-white dark:bg-slate-900">

<div>
<h1 className="capitalize text-2xl font-black text-slate-900 dark:text-white mb-2">
welcome back<span className="text-blue-600 ml-1">{user?.familyName || 'User'}</span>!
</h1>

<div className="space-y-2.5 ">
<p className="text-slate-500 text-sm py-2">{user?.email}</p>
{/* Last Login Session  */}
<p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider ">Last Login Session</p>

{/* Last entry card  */}
<p className="text-sm font-bold text-slate-800 dark:text-white">
 {user.lastLogin ? new Date(user.lastLogin).toLocaleTimeString('en-GB',{hour: '2-digit', minute: '2-digit'}):'New Member'}   
</p>

</div>

</div>
<LogoutButton />
</header>



<main>
  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
      <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">status</h3>
      <p className="text-3xl font-black text-green-500">Active</p>
    </div>

    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
      <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">role</h3>
      <p className={`text-3xl font-black capitalize ${user.role === 'admin' ? 'text-red-500' : 'text-blue-600'}`}>{user.role || 'Member'}</p>
    </div>

    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
      <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Member Since</h3>
      <p className="text-3xl font-black text-purple-500">
        {new Date(user.createdAt).toLocaleDateString('en-GB')}
      </p>
    </div>
  </div>

  {/* Administrative Control */}
  {user.role === 'admin' && (
    <section className="mt-12 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
        Administrative Control
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href='/admin/add-product' className="group p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-blue-500 transition-all">
          <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600">Add New Product</h3>
          <p className="text-sm text-slate-500 mt-1">List a new item in the store</p>
        </Link>

        <Link href='/admin/products' className="group p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-blue-500 transition-all">
          <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600">Inventory</h3>
          <p className="text-sm text-slate-500 mt-1">Edit price or delete products</p>
        </Link>

        <Link href='/admin'>
        <div className="p-6 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
          <h3 className="font-bold">Store Insights</h3>
          <p className="text-blue-100 text-sm mt-1">Analytics coming soon...</p>
        </div>
        </Link>

      </div>
    </section>
  )}

  {/* User Orders */}
  {user.role !== 'admin' && (
    <div className="mt-12 p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-center">
      <p className="text-slate-500">You don't have any orders yet. Start shopping!</p>
      <Link className="inline-block mt-4 text-blue-600 font-bold hover:underline"
       href='/'>Browse Products →</Link>
    </div>
  )}
</main>

</div>
</div>
)
}