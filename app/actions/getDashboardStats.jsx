"use server"

import connectDB from "@/config/connectDB"
import ProductsData from "@/models/ProductsData"




export async function getDashboardStats() {
    try{
await connectDB()
const products = await ProductsData.find().lean()

// Calculate stats

const totalProducts = products.length
const totalValue = products.reduce((sum , p) => sum + (p.price * p.stock) , 0)
const lowStock = products.filter(p => p.stock < 5).length


// Product categories for charts or statistics
const categories = [...new Set(products.map(p => p.category))].length


// Count products per category for chart data
const categoryCounts = products.reduce((acc , p) => {
    if(p && p.category) {
        acc[p.category] = (acc[p.category] || 0) + 1
    }else{
        acc["Unknown"] = (acc["Unknown"] || 0) + 1
    }
    return acc
},{})

const chartData = Object.keys(categoryCounts).map(name => ({
    name,
    value:categoryCounts[name]
}))

return{
    totalProducts,
    totalValue,
    lowStock,
    categories ,
    chartData
}
    }
    catch(error){
console.error("Dashboard Stats Error:" , error)
return null
    }
}