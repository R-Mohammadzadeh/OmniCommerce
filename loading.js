export default function Loading () {
return (

    <>
<div className="container mx-auto p-4 space-y-8">
{/* 1. Banner Skeleton */}
<div className="w-full h-64 md:h-112 bg-gray-200 animate-pulse rounded-2xl"></div>

{/* 2. Categories/Slider Label Skeleton */}
<div className="h-8 bg-gray-200 animate-pulse w-48 rounded-md"></div>
{/* 3. Product Cards Skeleton Grid */}
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
{[...Array(10)].map((_,index) =>(
    <div className="space-y-4 border border-gray-100 p-4 rounded-xl" key={index} >
        {/* Image placeholder */}
<div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div> 
{/* Title placeholder */}   
<div className="h-4 bg-gray-200 animate-pulse w-3/4 rounded"></div>
{/* Price placeholder */}
<div className="h-4 bg-gray-200 animate-pulse w-1/4 rounded"></div>    
    </div>
) )  }
</div>
</div>


    </>
)
}