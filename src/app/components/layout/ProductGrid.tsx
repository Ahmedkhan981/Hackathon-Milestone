"use client";
import React, { useState } from "react";
import type { Product, Sale } from "../../../../sanity.types";
import ProductCard from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";
import {Button } from "../ui/button";
type Props = {
  products: Product[];
  sale: Sale|null;
};

const ProductGrid: React.FC<Props> = ({ products, sale }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-gray-600 text-xl font-semibold"
      >
        No products available.
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 h-[190vh] w-full "
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-gray-800"
        >
          Our Products
        </motion.h1>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {currentProducts.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { type: "spring", stiffness: 300, damping: 25 },
                  layout: { duration: 0.3 },
                }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:shadow-xl transition duration-300"
              >
                <ProductCard product={product} sale={sale || null} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 flex justify-center items-center gap-6"
      >
        <Button
          onClick={goToPreviousPage}
          variant="outline"
          className="relative overflow-hidden group"
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <span className="text-gray-700 text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          onClick={goToNextPage}
          variant="default"
          className="relative overflow-hidden group"
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </motion.div>
    </>
  );
};

export default ProductGrid;
