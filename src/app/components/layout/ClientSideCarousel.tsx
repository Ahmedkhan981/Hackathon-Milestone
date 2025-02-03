"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Product, Sale } from "../../../../sanity.types";
import ProductCard from "./ProductCard"; // Import the ProductCard component

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface RecommendedProductsProps {
  products: Product[];
  sale?: Sale | null;
}

const ClientSideCarousel = ({ products, sale }: RecommendedProductsProps) => {
  if (!products || products.length === 0) {
    return <div>No recommended products found.</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      className="recommended-products-swiper"
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard product={product} sale={sale || null} />{" "}
            {/* Use ProductCard here */}
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default ClientSideCarousel;
