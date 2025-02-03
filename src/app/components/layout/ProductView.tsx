"use client"
import React, { useState, useEffect, useCallback } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts } from "../../../sanity/lib/products/getAllProducts";
import ProductGrid from "./ProductGrid";
import CategoriesSelectionComponent from "./CategroiesSelectionComponent";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";
import { Sale, Category } from "../../../../sanity.types";

type Props = {
  categories: Category[];
  sale: Sale | null;
};

const ProductView: React.FC<Props> = ({ categories, sale }: Props) => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const limit = 100000;

  const {
    data: products,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["products", page, selectedCategory],
    queryFn: () => getAllProducts(page, limit, selectedCategory),
    placeholderData:keepPreviousData,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  // Scroll event to load more products when reaching the bottom of the page
  const loadMoreProducts = useCallback(() => {
    if (products?.length === limit) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [products]);

  // Infinite Scroll: Call loadMoreProducts when scrolled near the bottom
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight;
      if (bottom) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreProducts]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <CategoriesSelectionComponent
          categories={categories}
          onChange={handleCategoryChange}
        />
      </motion.div>

      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}
      {isError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 font-semibold"
        >
          Error loading products.
        </motion.div>
      )}
      <AnimatePresence mode="wait">
        {isSuccess && products && (
          <motion.div
            key={page + (selectedCategory || "all")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ProductGrid products={products} sale={sale} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductView;
