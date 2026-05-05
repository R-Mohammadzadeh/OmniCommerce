"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, Mousewheel } from "swiper/modules";
import Link from "next/link";

/**
 * HomeSlider Komponente
 * Zeigt eine Liste von Produkten in einem interaktiven Swiper-Slider an.
 * @param {Array} products - Liste der anzuzeigenden Produkte
 * @param {string} title - Überschrift für den Slider-Bereich
 */
export default function HomeSlider({ products, title }) {
  return (
    <div className="w-full mb-16">
      {/* Sektions-Überschrift mit blauem Akzent */}
      <h2 className="text-3xl font-extrabold mb-8 text-slate-800 dark:text-white border-l-4 border-blue-600 pl-4 tracking-tight">
        {title}
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, Mousewheel]}
        spaceBetween={25}
        slidesPerView={1}
        navigation
        mousewheel={{ forceToAxis: true }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="py-14"
      >
        {products?.map((product) => {
          // Bildpfad-Logik: Prüft auf absolute URLs oder generiert lokalen Pfad
          const img = product.image?.[0];
          const imageSrc = img?.startsWith("http")
            ? img
            : `/image/${product.category.toLowerCase()}s/${img || "placeholder.png"}`;

          return (
            <SwiperSlide key={product._id}>
              {/* Produktkarte */}
              <div className="bg-slate-300 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm  transition-all duration-500 flex flex-col min-h-50 group">

                {/* Bild-Container */}
                <Link href={`/product/${product._id}`}>
                  <div className="h-52 w-full relative mb-4 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="object-contain w-4/5 h-4/5 p-2 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Produkt-Details */}
                <div className="flex flex-col grow space-y-3">
                  
                  {/* Kategorie-Badge */}
                  <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-lg w-fit">
                    {product.category}
                  </span>

                  <Link href={`/product/${product._id}`}>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2 h-12 text-sm hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Preis und Action-Button */}
                  <div className="flex justify-between items-center pt-4 mt-auto border-t border-slate-50 dark:border-slate-800">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {product.price?.toLocaleString("de-DE")} €
                    </span>

                    <Link
                      href={`/product/${product._id}`}
                      className="bg-slate-950 dark:bg-blue-600 text-white text-[11px] font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all active:scale-95"
                    >
                      Details
                    </Link>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}