"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation ,Mousewheel} from 'swiper/modules';
import Link from 'next/link';

export default function HomeSlider({ products , title}) {

return (
<div className="w-full mb-16">
<h2 className="text-3xl font-extrabold mb-8 text-slate-800 dark:text-white border-l-4 border-blue-600 pl-4">
   {title}</h2>

<Swiper
modules={[Navigation, Pagination, Autoplay ,Mousewheel]}
spaceBetween={25}
slidesPerView={1}
navigation
autoplay={{ delay: 8000, disableOnInteraction: false }}
mousewheel={true}
breakpoints={{
640: { slidesPerView: 2 },
1024: { slidesPerView: 3 },
1280: { slidesPerView: 4 }

}}
className='py-14 '
>
{products.map((product) => (
<SwiperSlide key={product._id} className="h-full">

{/*    */}
<div className="bg-slate-200 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full min-h-105">

   {/* */}
   <Link href={`/product/${product._id}`}>
      <div className="h-48 w-full relative mb-4 overflow-hidden rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center cursor-pointer">
      <img
         src={product.image[0].startsWith('http') ? product.image[0] : `/image/${product.category.toLowerCase()}s/${product.image[0]}`}
         alt={product.name}
         className='object-contain w-full h-full p-2 transform hover:scale-110 transition-transform duration-500 rounded-xl'
      />
      </div>
   </Link>

   {/* */}
   <div className="flex flex-col grow space-y-3">
      <span className='text-[10px] uppercase tracking-wider font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded w-fit'>
      {product.category}
      </span>

      {/**/}
      <Link href={`/product/${product._id}`}>
      <h3 className='font-bold text-gray-800 dark:text-gray-100 line-clamp-2 h-12 text-sm hover:text-blue-600 transition-colors cursor-pointer'>
         {product.name}
      </h3>
      </Link>

      <div className="flex justify-between items-center pt-4 mt-auto border-t border-gray-50 dark:border-slate-800">
      <span className='text-lg font-black text-slate-900 dark:text-white'>
         {product.price?.toLocaleString()}€
      </span>
      
      <Link href={`/product/${product._id}`}>
         <button className='bg-slate-900 dark:bg-blue-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors'>
            View
         </button>
      </Link>
      </div>
   </div>
</div>
</SwiperSlide>
))}
</Swiper>
</div>
)
}