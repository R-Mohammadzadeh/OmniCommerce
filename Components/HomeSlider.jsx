"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, Mousewheel } from "swiper/modules";
import Link from "next/link";
import { cn } from "@/lib/utlis";


/*-----styles-----*/

const styles = {
  section : 'mb-16 w-full' ,

  title : cn(
    'mb-8 border-l-4 border-blu-600 pl-4',
    'text-3xl font-extrabold tracking-tight',
    'text-slate-800 dark:text-white',
  ),

  swiper:'py-14',

  card: cn(
    'flex flex-col min-h-50 group',
    'p-4 shadow-sm  transition-all duration-500',
    'border border-slate-100 dark:border-slate-800',
    'bg-slate-300 dark:bg-slate-900 rounded-3xl ',
  ),

  imageCard:cn(
    'h-52 w-full relative mb-4',
    'overflow-hidden rounded-2xl bg-white',
    ' dark:bg-slate-800 flex items-center justify-center',
  ),

  image:cn(
    'group-hover:scale-110 transition-transform duration-500',
    'object-contain w-4/5 h-4/5 p-2 ',
    
  ),

  cardBody: 'flex flex-col grow space-y-3',
   
  cardBadge :cn(
    'text-[10px] uppercase tracking-widest font-black',
    ' bg-blue-50 dark:bg-blue-900/30 px-2.5 ',
    'text-blue-600 py-1 rounded-lg w-fit ',
  ),

  productName:cn(
    'h-12 text-sm hover:text-blue-600 transition-colors',
    'py-1 dark:text-slate-100 line-clamp-2 ',
    'font-bold text-slate-700 ',
  ),

  footer:cn(
    'flex justify-between items-center pt-4',
    ' mt-auto border-t border-slate-50 dark:border-slate-800',
  ),

  price:cn(
    'text-xl font-black text-slate-900 dark:text-white',
  ),

  Details:cn(
    'bg-slate-950 dark:bg-blue-600 text-white text-[11px] ',
    ' hover:bg-blue-700 transition-all active:scale-95',
    'font-bold px-5 py-2.5 rounded-xl',
  ),
  
};


/* ----------------------------- component ----------------------------- */
/**
 * HomeSlider Komponente
 * Zeigt eine Liste von Produkten in einem interaktiven Swiper-Slider an.
 * @param {Array} products - Liste der anzuzeigenden Produkte
 * @param {string} title - Überschrift für den Slider-Bereich
 */
export default function HomeSlider({ products, title }) {
  return (
    <section className={styles.section}>
      {/* Sektions-Überschrift mit blauem Akzent */}
      <h2 className={styles.title}>
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
        className={styles.swiper}
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
              <div className={styles.card}>

                {/* Bild-Container */}
                <Link href={`/product/${product._id}`}>
                  <div className={styles.imageCard}>
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className={styles.image}
                    />
                  </div>
                </Link>

                {/* Produkt-Details */}
                <div className={styles.cardBody}>
                  
                  {/* Kategorie-Badge */}
                  <span className={styles.cardBadge}>
                    {product.category}
                  </span>

                  <Link href={`/product/${product._id}`}>
                    <h3 className={styles.productName}>
                      {product.name}
                    </h3>
                  </Link>

                  {/* Preis und Action-Button */}
                  <div className={styles.footer}>

                    <span className={styles.price}>
                      {product.price?.toLocaleString("de-DE")} €
                    </span>

                    <Link
                      href={`/product/${product._id}`}
                      className={styles.Details}
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
    </section>
  );
}